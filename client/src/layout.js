var openIspiluaLayout = (function() {

    'use strict';

    function LayoutManager() {
        this.layout = null;
        this.toRedraw = false;
    }

    LayoutManager.prototype = {
        setLayout: function(layout) {
            if ( !_.isEqual(this.layout, layout) ) {
                this.layout = layout;
                this.toRedraw = true;
                this.redraw();
            }
        },
        redraw: function() {
            var layoutDOM = $('#layout');
            var layoutDOMContent = '';

            _.each(this.layout, function(section) {
                var sectionContent = '<div class="section group">';
                _.each(section, function(col) {

                    var colContent = '<div class="col span_' + col.colSize + '">';

                    _.each(col.modules, function(module) {
                        var moduleContent = '<div class="' + module.name + '-layout ' + module.position + '-layout " id="' + module.name + '">' + '</div>';
                        colContent += moduleContent;
                    });
                    colContent += '</div>';

                    sectionContent += colContent;
                });
                sectionContent += '</div';

                layoutDOMContent += sectionContent;
            });

            layoutDOM.html(layoutDOMContent);
        }
    };

    return new LayoutManager();

})();
