'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // angular html5 routing with rewrite
  var modRewrite = require('connect-modrewrite');

  // configurable paths
  var vxlbrdConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    vxlbrdConfig.app = require('./bower.json').appPath || vxlbrdConfig.app;
  } catch (e) {}

  grunt.initConfig({
    vxlbrd: vxlbrdConfig,
    watch: {
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= vxlbrd.app %>/**/*.html',
          'example/**/*.html',
          'example/**/*.js',
          '.tmp/styles/**/*.css',
          '{.tmp,<%= vxlbrd.app %>}/**/*.js',
          '<%= vxlbrd.app %>/assets/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      stylus: {
        files: [
          '<%= vxlbrd.app %>/stylus/{,*/}*.styl'
        ],
        tasks: ['stylus:compile', 'cssmin'],
        options: { spawn: false }
      },
      ngtemplates: {
        files: [
          '<%= vxlbrd.app %>/**/*.tpl.html'
        ],
        tasks: ['ngtemplates', 'concat', 'copy:dist'],
        options: { spawn: false }
      },
      concat: {
        files: [
          '<%= vxlbrd.app %>/**/*.js'
        ],
        tasks: ['concat', 'copy:dist'],
        options: { spawn: false }
      }
    },
    stylus: {
      compile: {
        options: {
          paths: [
            'node_modules/grunt-contrib-stylus/node_modules',
            'vendor'
          ],
          urlfunc: 'embedurl'
        },
        files: [
          {
            expand: true,
            cwd: '<%= vxlbrd.app %>/stylus/',
            src: '*.styl',
            dest: '.tmp/styles/',
            ext: '.css'
          }
        ]
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }
        ]
      }
    },
    connect: {
      options: {
        port: grunt.option('port') || 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: grunt.option('host') || 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect, options) {
            return [
              modRewrite([
                '!\\.\\w+(\\?.*)?$ /'
              ]),
              lrSnippet,
              mountFolder(connect, '.'),
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'example'),
              mountFolder(connect, vxlbrdConfig.app),
              connect.static(options.base)
            ];
          }
        }
      },
      test: {
        options: {
          port: grunt.option('port') || 9001,
          middleware: function(connect) {
            return [
              modRewrite([
                '!\\.\\w+(\\?.*)?$ /'
              ]),
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function(connect) {
            return [
              modRewrite([
                '!\\.\\w+(\\?.*)?$ /'
              ]),
              mountFolder(connect, vxlbrdConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      },
      dev_index: {
        url: 'http://localhost:<%= connect.options.port %>/index-dev.html'
      }
    },
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              '<%= vxlbrd.dist %>/*',
              '!<%= vxlbrd.dist %>/.git*'
            ]
          }
        ]
      },
      server: '.tmp',
      test: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= vxlbrd.app %>/**/{,*/}*.js'
      ]
    },
    gjslint: {
      options: {
        flags: [
          '--disable 220', //ignore error code 220 from gjslint
          '--max_line_length 150',
          '--jslint_error [devel:false]'
        ],
        reporter: {
          name: 'console'
        }
      },
      all: {
        src: '<%= jshint.all %>'
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    rev: {
      dist: {
        files: {
          src: [
            '<%= vxlbrd.dist %>/**/{,*/}*.js',
            '<%= vxlbrd.dist %>/styles/{,*/}*.css',
            '<%= vxlbrd.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= vxlbrd.dist %>/styles/fonts/*',
            '!<%= vxlbrd.dist %>/scripts/widgets/{,*/}*.js'
          ]
        }
      }
    },
    ngtemplates: {
      vxlbrd: {
        src: '<%= vxlbrd.app %>/**/*.tpl.html',
        dest: '.tmp/scripts/templates.js'
      }
    },
    useminPrepare: {
      html: '<%= vxlbrd.app %>/{,*/}*.html',
      options: {
        dest: '<%= vxlbrd.dist %>'
      }
    },
    usemin: {
      html: ['<%= vxlbrd.dist %>/{,*/}*.html'],
      css: ['<%= vxlbrd.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= vxlbrd.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= vxlbrd.app %>/assets',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= vxlbrd.dist %>/assets'
          }
        ]
      }
    },
    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= vxlbrd.app %>/assets',
            src: '{,*/}*.svg',
            dest: '<%= vxlbrd.dist %>/assets'
          }
        ]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
       dist: {
         files: {
           '<%= vxlbrd.dist %>/vxlbrd.css': [
             '.tmp/styles/{,*/}*.css',
             '<%= vxlbrd.app %>/styles/{,*/}*.css'
           ]
         }
       }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/kbUi/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [
          {
            expand: true,
            cwd: '<%= vxlbrd.app %>',
            src: ['*.html', 'views/**/*.html'],
            dest: '<%= vxlbrd.dist %>'
          }
        ]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dest: '<%= vxlbrd.dist %>',
            src: ['bower.json']
          },
          {
            expand: true,
            cwd: '.tmp',
            dest: '<%= vxlbrd.dist %>',
            src: ['vxlbrd.js']
          }
        ]
      }
    },
    compress: {
      dist: {
        options: {
          archive: '<%= vxlbrd.dist %>/vxlbrd.zip'
        },
        files: [
          {
            expand: true,
            cwd: '<%= vxlbrd.dist %>',
            dest: '',
            src: [
              '*.js',
              '*.css',
              '*.json'
            ]
          }
        ]
      }
    },
    concurrent: {
      server: [
        'stylus',
        'ngtemplates'
      ],
      test: [
        'stylus',
        'ngtemplates'
      ],
      dist: [
        'stylus',
        'ngtemplates'
      ]
    },
    karma: {
      unit: {
        configFile: 'test/config/karma.conf.js'
      }
    },
    protractor: {
      options: {
        configFile: 'node_modules/protractor/referenceConf.js', // Default config file
        keepAlive: false, // If false, the grunt process stops when the test fails.
        args: {
          // Arguments passed to the command
        }
      },
      vxlbrd: {
        configFile: 'test/config/protractor.conf.js', // Target-specific config file
        options: {
          args: {} // Target-specific arguments
        }
      }
    },
    cdnify: {
      dist: {
        html: ['<%= vxlbrd.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= vxlbrd.dist %>/scripts',
            src: '*.js',
            dest: '<%= vxlbrd.dist %>/scripts'
          }
        ]
      }
    },
    concat: {
      compile: {
        files: {
          '.tmp/vxlbrd.js': [
            '<%= vxlbrd.app %>/voxelboard/**/*Module.js',
            '<%= vxlbrd.app %>/voxelboard/**/*.js',
            '.tmp/scripts/*.js'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= vxlbrd.dist %>/vxlbrd.min.js': [
            '<%= vxlbrd.app %>/voxelboard/**/*Module.js',
            '<%= vxlbrd.app %>/voxelboard/**/*.js',
            '.tmp/scripts/*.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('server', [
    'build',
    'open',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('unit-test', [
    'clean:test',
    'concurrent:test',
    'concat',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('e2e-test', [
    'clean:test',
    'concurrent:test',
    'concat',
    'autoprefixer',
    'connect:livereload',
    'protractor'
  ]);

  grunt.registerTask('test', [
    'unit-test',
    'e2e-test'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'stylus',
    'ngtemplates',
    'concat',
    'copy:dist',
    'cssmin:dist',
    'uglify:dist',
    'compress'
  ]);
};
