'use strict';

var _ = require('underscore');

function News(data) {

    this.title = data.title[0];
    this.date = data.pubDate[0];
    this.description = data.description[0];
    this.author = data['dc:creator'][0];

    this.categories = [];
    _.each(data.category, function(category) {
        this.categories.push(category._);
    }, this);
}

module.exports = News;
