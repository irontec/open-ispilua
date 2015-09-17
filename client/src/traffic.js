var openEstekaTraffic = (function() {

    'use strict';

    function TrafficController() {}

    TrafficController.prototype = {
        setTrafficIssues: function(issues) {
            this.htmlContent = '';

            $.each(issues, this.setIssuesLoop.bind(this));

            $('#traffic-issues-list').html(this.htmlContent);

            console.log(issues);
        },
        setIssuesLoop: function(index, issue) {
            if (!issue.carretera || !issue.poblacion || !issue.causa || !issue.nivel) {
                return;
            }
            this.htmlContent += this.generateIssueHtml(issue);
        },
        generateIssueHtml: function(issue) {
            var issueTitle = 'Incidencia en la ' +  issue.carretera + ' (' + issue.poblacion + ')';
            var issueCause = 'Causa: ' + issue.causa;
            var issueLevel = 'Nivel: ' + issue.nivel;

            var htmlItem = '<li class="traffic-issues-item">' +
                                '<p class="traffic-issues-item-title">' +
                                    issueTitle +
                                '</p>' +
                                '<p class="traffic-issues-item-cause">' +
                                    issueCause +
                                '</p>' +
                                '<p class="traffic-issues-item-level">' +
                                    issueLevel +
                                '</p>' +
                            '</li>';
            return htmlItem;
        }
    };

    return new TrafficController();

})();
