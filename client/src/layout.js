/*jshint -W079 */
/*jshint -W098 */
var openIspiluaLayout = (function() {

    'use strict';

    function LayoutManager() {
        this.layout = null;
        this.toRedraw = false;
        this.timeouts = [];
    }

    LayoutManager.prototype = {
        setLayout: function(layout) {
            var self = this;

            if ( !_.isEqual(this.layout, layout) ) {
                _.each(this.timeouts, function(timeout) {
                    clearTimeout(timeout);
                });
                this.layout = layout;
                this.toRedraw = true;
                this.redraw();
            }
        },
        redraw: function() {
            var layoutDOM = $('#layout');
            var layoutDOMContent = '';

            var self = this;

            _.each(this.layout, function(section) {
                var sectionContent = '<div class="section group">';
                _.each(section, function(col) {

                    var colContent = '<div class="col span_' + col.colSize + '">';

                    _.each(col.modules, function(module) {
                        var moduleContent = '<div class="' + module.name + '-layout ' + module.position + '-layout " id="' + module.name + '" style="display: none">' + '</div>';
                        colContent += moduleContent;
                    });
                    colContent += '</div>';

                    sectionContent += colContent;
                });
                sectionContent += '</div';

                layoutDOMContent += sectionContent;
            });

            layoutDOM.html(layoutDOMContent);

            _.each(this.layout, function(section) {
                _.each(section, function(col) {
                    _.each(col.modules, function(module) {
                        self.startModuleInterval(module);
                    });
                });
            });
        },
        startModuleInterval: function(moduleData) {
            var module = _.extend({}, moduleData);
            module.displayOffset = module.displayOffset || 0;
            module.displayTime = module.displayTime || 0;
            module.hideTime = module.hideTime || 0;

            var self = this;

            console.log('start module interval', module);
            this.timeouts.push(
                setTimeout(function() {
                    self.showModule(module);
                }, module.displayOffset * 1000)
            );
        },
        showModule: function(module) {
            console.log('show module', $('#' + module.name));
            var self = this;

            $('#' + module.name).fadeIn();
            console.log(module.displayTime);
            if (module.displayTime) {
                this.timeouts.push(
                    setTimeout(function() {
                        self.hideModule(module);
                    }, module.displayTime * 1000)
                );
            }

        },
        hideModule: function(module) {
            console.log('hide module', $('#' + module.name));
            var self = this;

            $('#' + module.name).fadeOut();

            this.timeouts.push(
                setTimeout(function() {
                    self.showModule(module);
                }, module.hideTime * 1000)
            );
        }
    };

    return new LayoutManager();

})();
