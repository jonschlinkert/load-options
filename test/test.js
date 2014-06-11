/*!
 * load-options <https://github.com/jonschlinkert/load-options>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

var expect = require('chai').expect;
var loadOptions = require('../');

describe('when foo is passed:', function () {
  it('should convert foo to bar.', function () {
    console.log(loadOptions({layout: 'index.hbs'}));
    // expect().to.eql(expected);
  });
});