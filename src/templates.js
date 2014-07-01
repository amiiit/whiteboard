angular.module('nuBoard').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/app.tpl.html',
    "<nu-toolbar></nu-toolbar>\n" +
    "<nu-surface width=2000 height=2000 surface-id='main-surface'></nu-surface>"
  );


  $templateCache.put('app/surface/surface.tpl.html',
    "<div id=\"{{ surfaceId }}\" class=\"surface\" nu-kinetic config=\"config\" name=\"kinetic\"></div>\n"
  );


  $templateCache.put('app/toolbar/toolbar.tpl.html',
    "<div class=\"toolbar\">\n" +
    "    <div class=\"tools\">\n" +
    "        <div\n" +
    "                ng-repeat=\"tool in menu.tools\"\n" +
    "                class=\"tool {{tool.id}}\"\n" +
    "                >\n" +
    "\n" +
    "            <div ng-if=\"tool.id === 'stylus'\">\n" +
    "                <div\n" +
    "                        ng-repeat=\"option in tool.options\"\n" +
    "                        ng-click=\"pickTool(tool, option)\"\n" +
    "                        class=\"tool-option\"\n" +
    "                        style=\"color: {{selected.color}}\"\n" +
    "                        >\n" +
    "                    <i ng-if=\"option.logoId\" class=\"fa fa-{{option.logoId}}\"></i>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"tool.id === 'color'\">\n" +
    "                <div\n" +
    "                        ng-repeat=\"option in tool.options\"\n" +
    "                        ng-click=\"pickTool(tool, option)\"\n" +
    "                        class=\"tool-option color\"\n" +
    "                        style=\"color: {{option.value}}\"\n" +
    "                        >\n" +
    "                    <i class=\"fa fa-tint\"></i>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"tool.id === 'width'\">\n" +
    "                <div\n" +
    "                        ng-repeat=\"option in tool.options\"\n" +
    "                        ng-click=\"pickTool(tool, option)\"\n" +
    "                        class=\"tool-option width\"\n" +
    "                        style=\"\n" +
    "                            font-size: {{option.value}}px;\n" +
    "                            color: {{selected.color}}\n" +
    "                            \"\n" +
    "                        >\n" +
    "                    <i class=\"fa fa-circle\"></i>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
