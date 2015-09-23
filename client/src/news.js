/*jshint -W079 */
/*jshint -W098 */
var openIspiluaNews = (function() {

    'use strict';

    function NewsController() {
        this.newsArr = null;
    }

    NewsController.prototype = {
        setNews: function(newsArr, force) {
            if ( !_.isEqual(this.newsArr, newsArr) || force ) {
                this.newsArr = newsArr;
                this.redraw();
            }

        },
        redraw: function() {
            var newsDOM = $('#openIspiluaNews');

            var newsDOMHeader = '<div class="news-header-layout">' +
                                    '<div id="news-icon" data-webicon="material:subject">' +
                                    '</div>' +
                                    '<div id="news-title">' +
                                        'Noticias de última hora' +
                                    '</div>' +
                                '</div>';

            var newsList = '';
            $.each(this.newsArr, function(index, news) {
                newsList += this.generateNewsHtml(news);
            }.bind(this));

            var newsDOMContent = '<div class="news-content-layout">' +
                                    '<ul id="news-list">' +
                                        newsList +
                                    '</ul>' +
                                 '</div>';

             newsDOM.html(newsDOMHeader + newsDOMContent);
             $(document).webicons();
        },
        generateNewsHtml: function(news) {
            console.log(news);
            var htmlItem = '<li class="traffic-issues-item">' +
                                '<p class="traffic-issues-item-title">' +
                                    news.title +
                                '</p>' +
                                '<p class="traffic-issues-item-cause">' +
                                    news.date + ' ' +
                                    moment(new Date(news.date)).locale('es').fromNow() +
                                '</p>' +
                                '<p class="traffic-issues-item-level">' +
                                    news.description +
                                '</p>' +
                            '</li>';
            return htmlItem;

        }
    };


    return new NewsController();
})();
