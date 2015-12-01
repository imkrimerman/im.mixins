'use strict';
import behaviour from './behaviour.js';

/**
 * Mixin Delegate
 * @type {object}
 */
export default {

  /**
   * Provides mixin behaviours for `object`
   * @param {object} object
   * @returns {*}
   */
  provide: function(object) {
    return Object.assign(object, behaviour);
  },

  /**
   * Creates mixin applier
   * @param {object} mixinObject
   * @param {string} initMethod
   * @returns {Function}
   */
  create: function(mixinObject, initMethod = null) {
    return function(object, call = true) {
      Object.assign(object, mixinObject);
      if (call && initMethod) object[initMethod]();
      return object;
    }
  }
};
