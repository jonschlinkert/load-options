/*!
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
var root = require('cwd');

var defaults = path.join(__dirname, 'defaults.yml');

var dir = function(base) {
  base = base || root();
  return function(filepath) {
    return path.join(base, filepath || '');
  }
};


/**
 * ## .loadOptions(options)
 *
 * Load options from an object or file.
 *
 * **Example:**
 *
 * Use the defaults:
 *
 * ```js
 * var assemble = require('assemble');
 * var opts = require('load-options');
 *
 * assemble.options(opts());
 * assemble.task('site', function() {
 *   assemble.src(opts.src)
 *     .dest(opts.dest);
 * });
 * ```
 *
 * @method  exports
 * @param   {Object}  `options`
 * @return  {Object}
 */

module.exports = function(options) {
  options = plasma(options);
  defaults = plasma(defaults);
  var cwd = dir(options.cwd);

  var settings = _.extend({}, defaults, {
    dest: cwd('_gh_pages'),
    extensions: cwd('extensions'),
    templates: cwd('templates'),
    _default: defaults
  }, options);

  // Defaults
  var opts = plasma.process(settings);

  // Data
  opts.plasma = plasma(opts.plasma);
  var data = (opts.data == null) ? {} : plasma({
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
  opts.src = opts.src || opts.pages;

  return opts;
};
