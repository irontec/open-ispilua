'use strict';

var _ = require('underscore'),
    NewsModel = require('./model');

var application, config;

var newsController = {
    getNews: function() {

        return application.locals.api.getData(
            config.url,
            true
        )
        .then(this._filterByLimit);
    },
    _filterByLimit: function(data) {
        var newsArr = data.rss.channel[0].item,
            filteredNews = [];

        _.each(newsArr, function(news) {
            if (filteredNews.length >= config.limit) {
                return;
            }

            var newsModel = new NewsModel(news);

            filteredNews.push(newsModel);
        });
        var returnData = { news: filteredNews };
        return returnData;
    }
};

module.exports = function(app) {
    application = app;
    config = application.locals.config.opendata.news;
    return newsController;
};
