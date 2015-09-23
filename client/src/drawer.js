/*jshint -W079 */
/*jshint -W098 */
var openIspiluaDrawer = (function() {

    'use strict';

    function Drawer() {
        this.layout = null;
        this.parentElement = '#layout';
        this.timeouts = [];
    }

    Drawer.prototype = {
        draw: function(data) {

            var mustReDraw = false;

            if (
                    !_.isEqual(this.layout, data.layout) ||
                    !_.isEqual(this.templates, data.templates)
                ) {
                console.log('Layout has changed! Redrawing layout...');
                this.layout = data.layout;
                this.templates = data.templates;
                this.drawLayout();
                mustReDraw = true;
            }

            if (
                    !_.isEqual(this.datasets, data.datasets) ||
                    mustReDraw
                ) {
                this.datasets = data.datasets;
                this.drawModules(this.templates.modules);
                $(document).webicons();
            }

            this.templates = data.templates;
            this.datasets = data.datasets;

        },
        drawLayout: function() {
            var layoutContent = '';

            _.each(this.layout.sections, function(section, index) {
                console.log('Rendering Section ' + index + '...');
                layoutContent += this.renderSection(section);
            }, this);

            $(this.parentElement).html(layoutContent);
        },
        drawModules: function(modules) {

            _.each(modules, function(module) {
                this.drawModule(module);
            }, this);

            _.each(this.layout.sections, function(section) {
                _.each(section.columns, function(column) {
                    _.each(column.modules, function(module) {
                        this.startModuleInterval(module);
                    }, this);
                }, this);
            }, this);
        },
        drawModule: function(module) {
            if (!module.custom) {

                var elements = $('.' + module.name + '-layout'),
                    headerElements = elements.children('.module-header'),
                    contentElements = elements.children('.module-content');

                var headerTmpl = $.templates(module.template.header),
                    contentTmpl = $.templates(module.template.content);

                var headerHtml = headerTmpl(this.datasets[module.dataset]),
                    contentHtml = contentTmpl(this.datasets[module.dataset]);

                headerElements.html(headerHtml);
                contentElements.html(contentHtml);
            } else {
                window[module.name].start();
            }

        },
        startModuleInterval: function(moduleData) {
            var module = _.extend({}, moduleData);
            module.displayOffset = module.displayOffset || 0;
            module.hideTime = module.hideTime || 0;

            var self = this;

            this.timeouts.push(
                setTimeout(function() {
                    self.showModule(module);
                }, module.displayOffset * 1000)
            );
        },
        showModule: function(module) {
            var self = this;

            $('.' + module.name + '-layout').fadeIn();

            if (module.displayTime) {
                this.timeouts.push(
                    setTimeout(function() {
                        self.hideModule(module);
                    }, module.displayTime * 1000)
                );
            }

        },
        hideModule: function(module) {
            var self = this;

            $('.' + module.name + '-layout').fadeOut();

            this.timeouts.push(
                setTimeout(function() {
                    self.showModule(module);
                }, module.hideTime * 1000)
            );
        },
        renderSection: function(section) {
            var tmpl,
                sectionData = {
                    content: ''
                };

            _.each(section.columns, function(column, index) {
                console.log('Rendering Column ' + index + '...');
                sectionData.content += this.renderColumn(column);
            }, this);

            tmpl = $.templates(this.templates.common.section);
            return tmpl(sectionData);
        },
        renderColumn: function(column) {
            var tmpl,
                columnData = {
                    colSize: column.colSize,
                    content: ''
                };

            _.each(column.modules, function(module) {
                console.log('Rendering Module ' + module.name + '...');
                columnData.content += this.renderModule(module);
            }, this);

            tmpl = $.templates(this.templates.common.column);
            return tmpl(columnData);
        },
        renderModule: function(module) {
            var tmpl;
            tmpl = $.templates(this.templates.common.module);
            return tmpl(module);
        }
    };

    return new Drawer();

})();
