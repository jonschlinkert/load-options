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
var cwdFn = require('cwd');
var extend = require('xtend');


var defaults = path.join(__dirname, 'defaults.yml');
var dir = function(cwd) {
  cwd = cwd || cwdFn();
  return function(filepath) {
    return path.join(cwd, filepath || '');
  };
};


/**
 * ## .loadOptions(options)
 *
 * Load default options, or define an object or `{json,yml}` file to extend the defaults.
 *
 * **Example:**
 *
 * Use the defaults:
 *
 * ```js
 * var assemble = require('assemble');
 * var opts = require('load-options');
 *
 * // Override `default` layout with `blog` layout
 * assemble.options(opts({layout: 'blog'}));
 * assemble.task('site', function() {
 *   assemble.src(opts.src)
 *     .pipe(assemble.dest(opts.dest));
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

  var settings = extend({}, defaults, {
    dest: cwd('_gh_pages'),
    extensions: cwd('extensions'),
    templates: cwd('templates'),
    _default: defaults
  }, options);

  // Defaults
  var opts = plasma.process(settings);
  opts.cwd = cwd().replace(/[\\\/]/g, '/');

  // Data
  opts.plasma = plasma(opts.plasma);
  var data = (opts.data == null) ? {} : plasma({
    namespace: ':basename',
    patterns: opts.data
  }, {cwd: opts.cwd});
  opts.data = extend({}, opts.plasma, data);

  // Templates
  opts.partials = resolve(opts.partials, {cwd: opts.cwd});
  opts.pages = resolve(opts.pages, {cwd: opts.cwd});
  opts.layouts  = resolve(opts.layouts, {cwd: opts.cwd});

  // Extensions
  opts.src = opts.src || opts.pages;

  opts.helpers = resolve(opts.helpers, {cwd: opts.cwd});
  opts.plugins = resolve(opts.plugins, {cwd: opts.cwd});
  opts.middleware = resolve(opts.middleware, {cwd: opts.cwd});
  opts.mixins = resolve(opts.mixins, {cwd: opts.cwd});

  extend(this, opts);
  return opts;
};
