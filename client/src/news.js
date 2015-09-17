var openEstekaNews = (function() {

    'use strict';

    function NewsController() {}

    NewsController.prototype = {
        setNews: function(news) {
            // Set values
            this.htmlContent = '';
            $.each(news, this.setNewsLoop.bind(this));
            $('#news-title').text('Noticias de última hora');
            $('#news-icon').attr('data-webicon', 'material:subject');
            $('#news-list').html(this.htmlContent);
            // Reload icons
            $(document).webicons();
        },
        setNewsLoop: function(index, news) {
            this.htmlContent += this.generateNewsHtml(news);
        },
        generateNewsHtml: function(news) {
            console.log(news);
            var htmlItem = '<li class="traffic-issues-item">' +
                                '<p class="traffic-issues-item-title">' +
                                    news.title +
                                '</p>' +
                                '<p class="traffic-issues-item-cause">' +
                                    news.date +
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
