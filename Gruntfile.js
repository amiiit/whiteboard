'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // angular html5 routing with rewrite
    var modRewrite = require('connect-modrewrite');

    var config = require('./build.config.js');

    grunt.initConfig({
            config: config,
            watch: {
                options: {livereload: true},
                livereload: {
                    options: {
                        livereload: LIVERELOAD_PORT
                    },
                    files: ['src/index.html']
                },
                index: {
                    files: ['src/index.html'],
                    tasks: ['index:build']
                },
                stylus: {
                    files: config.app_files.stylus,
                    tasks: ['stylus']
                },
                scripts: {
                    files: config.app_files.js,
                    tasks: ['build']

                },
                templates: {
                    files: config.app_files.atpl,
                    tasks: ['ngtemplates']
                }
            },
            stylus: {
                compile: {
                    options: {
                        compress: false,
                        paths: [
                            'node_modules/grunt-contrib-stylus/node_modules',
                            'vendor',
                            '<%= config.app_files.stylus_sheets %>'
                        ],
                        urlfunc: 'embedurl'
                    },
                    files: [
                        {
                            src: '<%= config.app_files.stylus %>',
                            dest: '<%= config.build_dir %>/styles/main.css'
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
                server: {
                    options: {
                        port: 9000,
                        base: '<%= config.build_dir %>',
                        hostname: 'localhost',
                        livereload: 35729
                    }
                },
            },
            open: {
                server: {
                    url: 'http://localhost:<%= connect.options.port %>'
                },
                dev_index: {
                    url: 'http://localhost:<%= connect.options.port %>/index-dev.html'
                }
            },
            clean: ['<%= config.build_dir %>',
                '<%= config.compile_dir %>'
            ],
            jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },
                all: [
                    'Gruntfile.js',
                    '<%= config.app %>/**/{,*/}*.js'
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
            rev: {
                dist: {
                    files: {
                        src: [
                            '<%= config.dist %>/**/{,*/}*.js',
                            '<%= config.dist %>/styles/{,*/}*.css',
                            '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                            '<%= config.dist %>/styles/fonts/*',
                            '!<%= config.dist %>/scripts/widgets/{,*/}*.js'
                        ]
                    }
                }
            },
            useminPrepare: {
                html: '<%= config.app %>/{,*/}*.html',
                options: {
                    dest: '<%= config.dist %>'
                }
            },
            usemin: {
                html: ['<%= config.dist %>/{,*/}*.html'],
                css: ['<%= config.dist %>/styles/{,*/}*.css'],
                options: {
                    dirs: ['<%= config.dist %>']
                }
            },
            imagemin: {
                dist: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= config.app %>/assets',
                            src: '{,*/}*.{png,jpg,jpeg}',
                            dest: '<%= config.dist %>/assets'
                        }
                    ]
                }
            },
            svgmin: {
                dist: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= config.app %>/assets',
                            src: '{,*/}*.svg',
                            dest: '<%= config.dist %>/assets'
                        }
                    ]
                }
            },
            cssmin: {
                // By default, your `index.html` <!-- Usemin Block --> will take care of
                // minification. This option is pre-configured if you do not wish to use
                // Usemin blocks.
                dist: {
//                    files: {
//                        '<%= config.dist %>/vxlbrd.css': [
//                            '.tmp/styles/{,*/}*.css',
//                            '<%= config.app %>/styles/{,*/}*.css'
//                        ]
//                    }
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
                            cwd: '<%= config.app %>',
                            src: ['*.html', 'views/**/*.html'],
                            dest: '<%= config.dist %>'
                        }
                    ]
                }
            },
            // Put files not handled in other tasks here
            copy: {
                build_app_assets: {
                    files: [
                        {
                            src: [ '**' ],
                            dest: '<%= config.build_dir %>/assets/',
                            cwd: 'src/assets',
                            expand: true
                        }
                    ]
                },
                build_vendor_assets: {
                    files: [
                        {
                            src: [ '<%= config.vendor_files.assets %>' ],
                            dest: '<%= config.build_dir %>/assets/',
                            cwd: '.',
                            expand: true,
                            flatten: true
                        }
                    ]
                },
                build_appjs: {
                    files: [
                        {
                            src: [ '<%= config.app_files.js %>' ],
                            dest: '<%= config.build_dir %>/',
                            cwd: '.',
                            expand: true
                        }
                    ]
                },
                build_vendorjs: {
                    files: [
                        {
                            src: [ '<%= config.vendor_files.js %>' ],
                            dest: '<%= config.build_dir %>/',
                            cwd: '.',
                            expand: true
                        }
                    ]
                }
            },
            compress: {
                dist: {
                    options: {
                        archive: '<%= config.dist %>/vxlbrd.zip'
                    },
                    files: [
                        {
                            expand: true,
                            cwd: '<%= config.dist %>',
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
                        args: {
                        } // Target-specific arguments
                    }
                }
            },
            cdnify: {
                dist: {
                    html: ['<%= config.dist %>/*.html']
                }
            },
            ngmin: {
                dist: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= config.dist %>/scripts',
                            src: '*.js',
                            dest: '<%= config.dist %>/scripts'
                        }
                    ]
                }
            },
            concat: {
                compile: {
                    files: {
                        '.tmp/vxlbrd.js': [
                            '<%= config.app %>/voxelboard/**/*Module.js',
                            '<%= config.app %>/voxelboard/**/*.js',
                            '.tmp/scripts/*.js'
                        ]
                    }
                }
            },
            uglify: {
                dist: {
                    files: {
                        '<%= config.dist %>/vxlbrd.min.js': [
                            '<%= config.app %>/voxelboard/**/*Module.js',
                            '<%= config.app %>/voxelboard/**/*.js',
                            '.tmp/scripts/*.js'
                        ]
                    }
                }
            },
            ngtemplates: {
                nuBoard: {
                    src: 'app/**/*.tpl.html',
                    dest: '<%= config.build_dir%>/<%= config.templates_file %>',
                    cwd: 'src/'
                }

            },

            /**
             * The `index` task compiles the `index.html` file as a Grunt template. CSS
             * and JS files co-exist here but they get split apart later.
             */
            index: {

                /**
                 * During development, we don't want to have wait for compilation,
                 * concatenation, minification, etc. So to avoid these steps, we simply
                 * add all script files directly to the `<head>` of `index.html`. The
                 * `src` property contains the list of included files.
                 */
                build: {
                    dir: '<%= config.build_dir %>',
                    src: [
                        ['templates.js'],
                        '<%= config.vendor_files.js %>',
                        '<%= config.build_dir %>/src/**/*.js',
                        '<%= config.vendor_files.css %>'
                    ]
                }
            }
        }
    );


    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(files) {
        return files.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS(files) {
        return files.filter(function (file) {
            return file.match(/\.css$/);
        });
    }

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask('index', 'Process index.html template', function () {
        var dirRE = new RegExp('^(' + config.build_dir + '|' + config.compile_dir + ')\/', 'g');
        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

    grunt.registerTask('server', [
        'build',
        'connect:server',
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
        'protractor'
    ]);

    grunt.registerTask('test', [
        'unit-test',
        'e2e-test'
    ]);

    grunt.registerTask('build', [
        'clean',
        'stylus',
        'ngtemplates',
        'copy:build_app_assets',
        'copy:build_vendor_assets',
        'copy:build_appjs',
        'copy:build_vendorjs',
        'index:build',
    ]);
}
;
