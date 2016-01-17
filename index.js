/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-calendar',

  included: function(app) {
    this._super.included(app);

    app.import(path.join(app.bowerDirectory, 'lodash/lodash.js'));
    app.import(path.join(app.bowerDirectory, 'interact/interact.js'));
    app.import(path.join(app.bowerDirectory, 'moment/moment.js'));
    app.import(path.join(app.bowerDirectory, 'moment-timezone/builds/moment-timezone-with-data.js'));

    app.import('vendor/ember-calendar/lodash.js', {
      type: 'vendor',
      exports: { 'lodash': ['default'] }
    });

    app.import('vendor/ember-calendar/jstz.js', {
      type: 'vendor',
      exports: { 'jstz': ['default'] }
    });

    app.import('vendor/ember-calendar/interact.js', {
      type: 'vendor',
      exports: { 'interact': ['default'] }
    });

    app.import('vendor/jstz.js', {
      type: 'vendor'
    });

    app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.ttf'), {
      destDir: 'assets/fonts'
    });

    app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.woff'), {
      destDir: 'assets/fonts'
    });

    app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.woff2'), {
      destDir: 'assets/fonts'
    });

    app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.svg'), {
      destDir: 'assets/fonts'
    });

    app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.eot'), {
      destDir: 'assets/fonts'
    });

    if (app.env === 'test') {
      app.import(path.join(app.bowerDirectory, 'jquery-simulate/jquery.simulate.js'), {
        type: 'test'
      });
    }
  }
};
