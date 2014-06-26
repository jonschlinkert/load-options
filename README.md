# load-options [![NPM version](https://badge.fury.io/js/load-options.png)](http://badge.fury.io/js/load-options)

> Load Assemble options from a config file, object, glob patterns, or any combination of those. Fallback on defaults if options aren't defined, or you can override or extend the defaults.

## Install
Install with [npm](npmjs.org):

```bash
npm i load-options --save-dev
```

## Usage
### .loadOptions ( options )

Load default options, or define an object or `{json,yml}` file to extend the defaults.

**Example:**

Use the defaults:

```js
var assemble = require('assemble');
var opts = require('load-options');

// Override `default` layout with `blog` layout
assemble.options(opts({layout: 'blog'}));
assemble.task('site', function() {
  assemble.src(opts.src)
    .pipe(assemble.dest(opts.dest));
});
```

* `options` {Object}:  
* `return` {Object}


### Examples

**Add options**

Define new options by passing an object:

```js
var options = require('load-options')({foo: 'bar'});
```

**Reset options**

If there is an option defined that you want to reset or "turn off", just pass an empty value:

```js
var options = require('load-options')({plugins: []});
```

Override the default value with a new value:

```js
var options = require('load-options')({plugins: ['foo/bar/*.js']});
```

**Extend options**

Extend the defaults by using lodash templates (e.g. keep the defaults AND add your own). Just reference a property on the `_default` object that corresponds to the option want to extend:

```js
var loadOpts = require('load-options');
var options = loadOpts({
  plugins: ['<%= _default.plugins %>', 'foo/bar/*.js']
});
```

**.assemblerc.yml**

Extend the default options with user-defined options in `.assemblerc.yml`:

```js
var options = require('load-options')('.assemblerc.yml');
```


### Example output

```js
// paths shortened using ~ to make the example more readable
{ dest: '_gh_pages',
  assets: '_gh_pages/assets',
  flatten: true,
  engine: 'handlebars',
  ext: '.html',
  data: {},
  plasma: {},
  layoutdir: 'test/fixtures/templates/layouts',
  layout: 'foo',
  layoutext: '.hbs',
  pages:
   [ '~/test/fixtures/templates/pages/about.hbs',
     '~/test/fixtures/templates/pages/index.hbs' ],
  partials:
   [ '~/test/fixtures/templates/partials/alert.hbs',
     '~/test/fixtures/templates/partials/nav.hbs',
     '~/test/fixtures/templates/partials/tooltip.hbs' ],
  plugins: [],
  middleware:
   [ '~/test/fixtures/extensions/middleware/a.js',
     '~/test/fixtures/extensions/middleware/b.js',
     '~/test/fixtures/extensions/middleware/c.js' ],
  helpers:
   [ '~/test/fixtures/extensions/helpers/a.js',
     '~/test/fixtures/extensions/helpers/b.js',
     '~/test/fixtures/extensions/helpers/c.js' ],
  mixins:
   [ '~/test/fixtures/extensions/mixins/a.js',
     '~/test/fixtures/extensions/mixins/b.js',
     '~/test/fixtures/extensions/mixins/c.js' ],
  extensions: 'test/fixtures/extensions',
  templates: 'test/fixtures/templates',
  filters:
   [ '~/test/fixtures/extensions/filters/a.js',
     '~/test/fixtures/extensions/filters/b.js',
     '~/test/fixtures/extensions/filters/c.js' ],
  _default:
   { dest: '_gh_pages',
     assets: '_gh_pages/assets',
     flatten: true,
     engine: 'handlebars',
     ext: '.html',
     data: [ 'data/*.{json,yml}' ],
     plasma: null,
     layoutdir: 'test/fixtures/templates/layouts',
     layout: 'default',
     layoutext: '.hbs',
     pages: [ 'test/fixtures/templates/pages/*.hbs' ],
     partials: [ 'test/fixtures/templates/{partials,includes}/*.hbs' ],
     plugins: [ 'test/fixtures/extensions/plugins/*.js' ],
     middleware: [ 'test/fixtures/extensions/middleware/*.js' ],
     helpers: [ 'test/fixtures/extensions/helpers/*.js' ],
     mixins: [ 'test/fixtures/extensions/mixins/*.js' ] } }
```

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on June 26, 2014._