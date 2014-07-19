/*!
 * load-options
 * https://github.com/jonschlinkert/load-options
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var cwd = require('cwd');
var extend = require('xtend');
var resolve = require('resolve-dep');
var normalizePath = require('normalize-path');
var plasma = require('plasma');


/**
 * Load default options, define an object, pass JSON/YAML file(s) or
 * glob pattern(s) to extend the defaults.
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

// var arr = ['pages',]

module.exports = function loadOptions() {
  var args = [].slice.call(arguments);

  // Read and expand the user-defined options with plasma
  var options = plasma.apply(plasma, args);
  options.cwd = normalizePath(options.cwd || process.cwd());
  options.srcBase = options.cwd;

  // Read and expand the default options with plasma
  var defaults = plasma(path.join(__dirname, 'defaults.yml'));

  // Merge defaults and user-defined options, and resolve
  // template strings to their respective config values.
  var opts = extend({}, defaults, {
    dest: cwd(options.cwd, '_gh_pages'),
    extensions: cwd(options.cwd, 'extensions'),
    templates: cwd(options.cwd, 'templates'),

    // store defaults so they can be accessed with templates.
    _default: defaults,
  }, options);

  opts = plasma.process(opts);

  // If `options.plasma` was defined, read it with plasma
  opts.plasma = plasma(opts.plasma);

  // Resolve data
  var data = {};
  if (opts.data) {
    data = plasma({namespace: ':basename', patterns: opts.data}, {cwd: opts.cwd});
  }
  opts.data = extend({}, opts.plasma, data);

  try {
    // Resolve templates
    opts.partials   = resolve(opts.partials, {cwd: opts.cwd});
    opts.pages      = resolve(opts.pages, {cwd: opts.cwd});
    opts.layouts    = resolve(opts.layouts, {cwd: opts.cwd});

    opts.layoutdir  = resolve(opts.layoutdir, {cwd: opts.cwd})[0];
    opts.layoutext  = opts.layoutext;
    opts.layout     = opts.layout;

    // Resolve extensions
    opts.helpers    = resolve(opts.helpers, {cwd: opts.cwd});
    opts.plugins    = resolve(opts.plugins, {cwd: opts.cwd});
    opts.middleware = resolve(opts.middleware, {cwd: opts.cwd});
    opts.mixins     = resolve(opts.mixins, {cwd: opts.cwd});
  } catch (err) {
    throw new Error('load-options:', err);
  }

  extend(this, opts);
  return opts;
};
