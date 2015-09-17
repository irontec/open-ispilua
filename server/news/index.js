'use strict';

var application;
var parser = require('parse-rss');
var Promise = require('bluebird');
var _ = require('underscore');
var parserAsync = Promise.promisify(parser);


var newsController = {
    getNews: function() {
        var config = application.locals.config.opendata.news;
        return application.locals.api.getData(
            config.url,
            true
        )
        .then(function(data) {
            var newsArr = data.rss.channel[0].item;
            var filteredNews = [];

            _.each(newsArr, function(news) {
                if (filteredNews.length >= config.limit) {
                    return;
                }

                var categories = [];

                _.each(news.category, function(category) {
                    categories.push(category._);
                });
                var newsModel = {
                    title: news.title[0],
                    date: news.pubDate[0],
                    categories: categories,
                    description: news.description[0],
                    author: news['dc:creator'][0]
                };

                filteredNews.push(newsModel);
            });
            return filteredNews;
        });
    }
};

module.exports = function(app) {
    application = app;
    return newsController;
};
