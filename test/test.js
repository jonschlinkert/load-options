/*!
 * load-options <https://github.com/jonschlinkert/load-options>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

var expect = require('chai').expect;
var resolve = require('resolve-dep');
var loadOptions = require('../');


describe('when no custom options are passed:', function () {
  it('should use the defaults.', function () {
    var opts = loadOptions();
    expect(opts.layout).to.eql('default');
  });
});

describe('when a cwd is defined:', function () {
  it('should use the cwd with dest, extensions and templates.', function () {
    var opts = loadOptions({cwd: 'test/fixtures'});
    expect(opts.layout).to.eql('default');
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
    var opts = loadOptions('test/options.yml');

    expect(opts.layout).to.eql('foo');
    expect(opts.layoutext).to.eql('.hbs');
    expect(opts.extensions).to.eql('test/fixtures/extensions');
    expect(opts.plugins).to.eql([]);
    expect(opts.mixins).to.have.length(3);
  });
});

describe('when a custom option is passed:', function () {
  it('should extend the defaults with the custom option.', function () {
    var filters = resolve('test/fixtures/extensions/filters/*.js');
    var opts = loadOptions(['test/options.yml', {filters: filters}]);
    expect(opts.filters).to.have.length(3);
    expect(opts.mixins).to.have.length(3);
  });
});
