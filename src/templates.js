angular.module('nuBoard').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/app.tpl.html',
    "<nu-toolbar></nu-toolbar>\n" +
    "<nu-surface width=\"surfaceWidth\" height=\"surfaceHeight\"\n" +
    "            surface-id='main-surface' shapes=\"shapes\"\n" +
    "            shapes-log=\"log\"\n" +
    "            relative-focus=\"focus\"\n" +
    "            visible-measurements=\"surfaceVisibleMeasurements\"\n" +
    "  ></nu-surface>\n" +
    "<nu-follow-action relative-focus=\"focus\"\n" +
    "                  surface-width=\"surfaceWidth\"\n" +
    "                  surface-height=\"surfaceHeight\"\n" +
    "                  surface-visible-measurements=\"surfaceVisibleMeasurements\"\n" +
    "  ></nu-follow-action>\n" +
    "<nu-minimap width=\"minimapWidth\" height=\"minimapHeight\"\n" +
    "            relative-focus=\"focus\"\n" +
    "            surface-visible-measurements=\"surfaceVisibleMeasurements\"\n" +
    "            zoom-scale=\"minimapZoomScale\"\n" +
    "  ></nu-minimap>\n"
  );


  $templateCache.put('app/minimap/minimap.tpl.html',
    "<div id=\"minimap-container\">\n" +
    "  <div id=\"minimap\" nu-kinetic>\n" +
    "  </div>\n" +
    "  <div id=\"minimap-frame\"\n" +
    "       style=\"    top: {{frameMeasurments.position.top}}px;    left: {{frameMeasurments.position.left}}px;    width: {{frameMeasurments.dimension.width}}px;    height: {{frameMeasurments.dimension.height}}px;  pointer-events: none\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/surface/surface.tpl.html',
    "<div id=\"main-surface\" class=\"surface\" config=\"config\" name=\"kinetic\" shapes=\"shapes\" nu-kinetic nu-watch-surface>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('app/toolbar/toolbar.tpl.html',
    "<div class=\"toolbar\">\n" +
    "  <div class=\"tools\">\n" +
    "\n" +
    "    <div\n" +
    "      ng-repeat=\"tool in menu.tools\"\n" +
    "      class=\"tool {{tool.id}}\"\n" +
    "      >\n" +
    "\n" +
    "      <div\n" +
    "        ng-if=\"tool.id === 'followAction'\"\n" +
    "        title=\"follow actions of a collaborator (currently {{tool.active? 'on' : 'off'}})\"\n" +
    "        >\n" +
    "        <div\n" +
    "          ng-click=\"toggleTool(tool)\"\n" +
    "          class=\"tool-option follow-action\"\n" +
    "          ng-class=\"{active : tool.active}\"\n" +
    "          >\n" +
    "          <i class=\"fa fa-dot-circle-o\"></i>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-if=\"tool.id === 'stylus'\">\n" +
    "        <div\n" +
    "          ng-repeat=\"option in tool.options\"\n" +
    "          ng-click=\"pickTool(tool, option)\"\n" +
    "          class=\"tool-option\"\n" +
    "          style=\"color: {{selected.color}}\"\n" +
    "          >\n" +
    "          <i ng-if=\"option.logoId\" class=\"fa fa-{{option.logoId}}\"></i>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-if=\"tool.id === 'color'\">\n" +
    "        <div\n" +
    "          ng-repeat=\"option in tool.options\"\n" +
    "          ng-click=\"pickTool(tool, option)\"\n" +
    "          class=\"tool-option color\"\n" +
    "          style=\"color: {{option.value}}\"\n" +
    "          >\n" +
    "          <i class=\"fa fa-tint\"></i>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-if=\"tool.id === 'width'\">\n" +
    "        <div\n" +
    "          ng-repeat=\"option in tool.options\"\n" +
    "          ng-click=\"pickTool(tool, option)\"\n" +
    "          class=\"tool-option width\"\n" +
    "          style=\"\n" +
    "                                     font-size: {{option.value}}px;\n" +
    "                                     color: {{selected.color}}\n" +
    "                                     \"\n" +
    "          >\n" +
    "          <i class=\"fa fa-circle\"></i>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);
