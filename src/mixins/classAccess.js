'use strict';
import forget from 'forget';
import MixinDelegate from './mixin.js';
import _ from '../_.js';

/**
 * Mixin
 *
 * Class Access
 * @type {Function}
 * @param {object} object
 * @param {boolean} call
 */
export default MixinDelegate.createMixin({

  /**
   * Accessor key
   * @type {string|function|null}
   */
  __accessor: null,

  /**
   * Access object for getters and setters
   * @type {object|null}
   */
  __access: null,

  /**
   * Creates access object for getters and setters
   * @return {object}
   */
  applyAccess: function() {
    let __accessor = _.result('__accessor', null);
    if (! __accessor || ! _.has(this, __accessor)) this.__access = this;
    else this.__access = _.result(this, __accessor, this);
    return this;
  },

  /**
   * Gets value by property
   * @param {string} prop
   * @param [{*}] defaults
   * @returns {*}
   */
  get: function(prop, defaults = null) {
    return _.result(this.__access, prop, defaults);
  },

  /**
   * Sets value by property
   * @param {string} prop
   * @param {*} value
   * @returns {Object}
   */
  set: function(prop, value) {
    return _.set(this.__access, prop, value);
  },

  /**
   * Checks if class has given property
   * @param {string} prop
   * @returns {boolean}
   */
  has: function(prop) {
    return _.has(this.__access, prop);
  },

  /**
   * Removes value by property
   * @param {string} prop
   * @returns {Container}
   */
  forget: function(prop) {
    return forget(this.__access, prop);
  }

}, 'applyAccess');
