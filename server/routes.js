'use strict';

module.exports = function(app) {
    app.use('/', require('./partials'));
    app.use('/api/posts', require('./api/posts'));
    app.use('/filter', require('./api/searchbyfilter'));
    app.use('/auth', require('./auth'));
};
