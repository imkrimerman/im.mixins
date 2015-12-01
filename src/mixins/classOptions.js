"use strict";
import _ from '../_.js';
import MixinDelegate from './mixin.js';

/**
 * Class options defaults
 * @type {string[]}
 */
let defaultClassOptions = [];

/**
 * Class Options mixin
 * @type {Function}
 * @param {object} object
 * @param {boolean} call
 */
export default MixinDelegate.createMixin({

  /**
   * BaseClass options to auto merge
   * @returns {string[]|function}
   */
  classOptions: [],

  /**
   * Returns class options concatenated with default options
   * @param [{string[]}] options
   * @returns {Array.<string>}
   */
  getClassOptions: function(options = []) {
    if (! _.isArray(options)) options = [];
    return defaultClassOptions.concat(_.result(this, 'classOptions', [])).concat(options);
  },

  /**
   * Applies class options to current object
   * @param [{string[]}] options
   * @returns {applyClassOptions}
   */
  applyClassOptions: function(options = []) {
    Object.assign(this, this.pickClassOptions(options));
    return this;
  },

  /**
   * Picks class options values
   * @param [{object}] from
   * @param [{Array}] classOptions
   * @returns {{}|*}
   */
  pickClassOptions: function(from = this, classOptions = []) {
    return _.pick(from, this.getClassOptions(classOptions));
  },

  /**
   * Extends class options
   * @param [{Array}] options
   * @returns {Array.<string>}
   */
  extendClassOptions: function(options = []) {
    return this.classOptions = this.getClassOptions(options);
  },

}, 'applyClassOptions');
