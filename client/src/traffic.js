/*jshint -W079 */
/*jshint -W098 */
var openIspiluaTraffic = (function() {

    'use strict';

    function TrafficController() {
        this.issues = null;
    }

    TrafficController.prototype = {
        setTrafficIssues: function(issues) {
            if ( !_.isEqual(this.issues, issues) ) {
                this.issues = issues;
                this.redraw();
            }
        },
        redraw: function() {
            this.issuesToShow = 0;
            var issuesDOM = $('#openIspiluaTraffic');

            var issuesListContent = '';
            $.each(this.issues, function(index, issue) {
                issuesListContent += this.generateIssueHtml(issue);
            }.bind(this));

            var issuesDOMHeader = '<div id ="traffic-issues-title">' +
                                    '<webicon icon="material:directions-car" class="traffic-issues-icon"/>' +
                                    ' Incidencias de tráfico ' +
                                    '(' + this.issuesToShow + ')' +
                                  '</div>';

            var issuesDOMContent = '<ul id="traffic-issues-list">' +
                                        issuesListContent +
                                    '</ul>';

            issuesDOM.html(issuesDOMHeader + issuesDOMContent);
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
