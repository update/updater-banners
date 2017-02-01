'use strict';

var through = require('through2');
var isValid = require('is-valid-app');
var hasBanner = require('has-banner');
var banner = require('update-banner');

module.exports = function(app) {
  if (!isValid(app, 'updater-banners')) return;

  app.task('banners', function() {
    var pattern = app.options.files || app.options.banners || 'index.js';
    return app.src(pattern, {cwd: app.cwd})
      .pipe(through.obj(function(file, enc, next) {
        if (file.isNull()) {
          next();
          return;
        }

        var str = file.contents.toString();
        if (!hasBanner(str)) {
          next();
          return;
        }

        file.contents = new Buffer(banner(str));
        next(null, file);
      }))
      .pipe(app.dest(app.cwd));
  });

  app.task('default', ['banners']);
};
