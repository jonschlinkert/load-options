/*!
 * load-options <https://github.com/jonschlinkert/load-options>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

var expect = require('chai').expect;
var resolve = require('resolve-dep');
var isAbsolute = require('is-absolute');
var relative = require('relative');
var loadOptions = require('..');



describe('when no custom options are passed:', function () {
  it('should use the defaults.', function () {
    var opts = loadOptions();
    expect(opts.layout).to.equal('default');
  });

  it('should allow a custom `layout` to be defined', function () {
    var opts = loadOptions({layout: 'a'});
    expect(opts.layout).to.equal('a');
  });

  it('should allow a custom `layoutdir` to be defined', function () {
    var opts = loadOptions({layoutdir: 'test/fixtures/templates/layouts'});
    expect(isAbsolute(opts.layoutdir)).to.be.true;
  });
});

describe('when a cwd is defined:', function () {
  it('should use the cwd with dest, extensions and templates.', function () {
    var opts = loadOptions({cwd: 'test/fixtures'});
    expect(opts.data.a.one).to.eql('Apple');
  });

  it('should load an array of layouts from a custom dir', function () {
    var opts = loadOptions({layouts: ['test/fixtures/templates/layouts/*.hbs']});
    expect(opts.layouts).to.be.an('array');
    expect(opts.layouts).to.have.length.above(1);
  });

  it('should load pages from a custom dir', function () {
    var opts = loadOptions({pages: ['test/fixtures/templates/pages/*.hbs']});
    expect(opts.layout).to.eql('default');
    expect(opts.pages).to.be.an('array');
    expect(opts.pages).to.have.length.above(1);
  });

  it('should use a custom cwd.', function () {
    var opts = loadOptions('test/fixtures/options.yml');
    expect(opts.layout).to.eql('foo');
  });
});


describe('when options are passed as an object:', function () {
  it('should extend the defaults with the specified options.', function () {
    var opts = loadOptions({layout: 'index.hbs'});
    expect(opts.layout).to.eql('index.hbs');
  });
});

describe('when options are passed as a filepath:', function () {
  it('should read and parse the file, and extend the defaults with the specified options.', function () {
    var opts = loadOptions('test/fixtures/options.yml');
    expect(opts.layout).to.eql('foo');
    expect(opts.layoutext).to.eql('.hbs');
    expect(opts.plugins).to.have.length(3);
    expect(opts.mixins).to.have.length(3);
  });
});

describe('when a custom option is passed:', function () {
  it('should extend the defaults with the custom option.', function () {
    var filters = resolve('test/fixtures/extensions/filters/*.js');
    var opts = loadOptions(['test/fixtures/options.yml', {filters: filters}]);
    expect(opts.filters).to.have.length(3);
    expect(opts.mixins).to.have.length(3);
  });
});
