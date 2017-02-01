'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Update = require('update');
var banners = require('..');
var app;

describe('banners', function() {
  beforeEach(function() {
    app = new Update();
  });

  it('should register an updater', function() {
    app.register('banners', banners);
    app.updaters.hasOwnProperty('banners');
  });

  it('should register as an updater by path', function() {
    app.register('banners', path.resolve(__dirname, '..'));
    app.updaters.hasOwnProperty('banners');
  });

  it('should run the the default task by the updater name', function(cb) {
    app.register('banners', banners);
    var count = 0;

    app.on('task', function() {
      count++;
    });

    app.update('banners', function(err) {
      if (err) return cb(err);
      assert.equal(count, 4);
      cb();
    });
  });

  it('should run the the default task by string name', function(cb) {
    app.register('banners', banners);
    var count = 0;

    app.on('task', function() {
      count++;
    });

    app.update('banners:default', function(err) {
      if (err) return cb(err);
      assert.equal(count, 4);
      cb();
    });
  });

  it('should run the the default task in array form', function(cb) {
    app.register('banners', banners);
    var count = 0;

    app.on('task', function() {
      count++;
    });

    app.update('banners', ['default'], function(err) {
      if (err) return cb(err);
      assert.equal(count, 4);
      cb();
    });
  });

  it('should run the the task in array form', function(cb) {
    app.register('banners', banners);
    var count = 0;

    app.on('task', function() {
      count++;
    });

    app.update(['banners'], function(err) {
      if (err) return cb(err);
      assert.equal(count, 4);
      cb();
    });
  });
});
