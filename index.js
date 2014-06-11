/**
 * load-options
 * https://github.com/jonschlinkert/load-options
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var resolve = require('resolve-dep');
var plasma = require('plasma');
var _ = require('lodash');


var defaults = path.join(__dirname, 'defaults.yml');


var loadOpts = module.exports = function(options) {
  var settings = _.extend({}, plasma(defaults), {
    dest: '_gh_pages',
    extensions: 'extensions',
    templates: 'templates'
  }, plasma(options));

  // Defaults
  var opts = plasma.process(settings);

  // Data
  opts.plasma = plasma(opts.plasma);
  var data = (opts.data === null) ? {} : plasma({
    namespace: ':basename',
    src: opts.data
  });
  opts.data = _.extend({}, opts.plasma, data);

  // Templates
  opts.partials = resolve(opts.partials);
  opts.pages = resolve(opts.pages);

  // Extensions
  opts.helpers = resolve(opts.helpers);
  opts.plugins = resolve(opts.plugins);
  opts.middleware = resolve(opts.middleware);
  opts.mixins = resolve(opts.mixins);
  return opts;
};
