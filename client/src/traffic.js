var openEstekaTraffic = (function() {

    'use strict';

    function TrafficController() {}

    TrafficController.prototype = {
        setTrafficIssues: function(issues) {
            //this.issues = issues;
            this.htmlContent = '';
            this.issuesToShow = 0;

            $.each(issues, this.setIssuesLoop.bind(this));

            $('#traffic-issues-title').html(this.generateTrafficIssuesTitle());
            $('#traffic-issues-list').html(this.htmlContent);

            $(document).webicons();
        },
        setIssuesLoop: function(index, issue) {
            this.htmlContent += this.generateIssueHtml(issue);
        },
        generateTrafficIssuesTitle: function() {
            return '<webicon icon="material:directions-car" class="traffic-issues-icon"/>' +
                                ' Incidencias de tráfico ' +
                                '(' + this.issuesToShow + ')';
        },
        generateIssueHtml: function(issue) {

            if (!issue.carretera || !issue.causa || !issue.nivel) {
                return '';
            }
            this.issuesToShow++;

            var issueTitle = 'Incidencia en la ' +  issue.carretera;
            if (issue.poblacion) {
                issueTitle = issueTitle + ' (' + issue.poblacion + ')';
            }

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
