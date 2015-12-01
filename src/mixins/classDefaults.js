'use strict';
import MixinDelegate from './mixin.js';
import _ from '../_.js';

/**
 * Mixin
 *
 * Class Defaults
 * @type {Function}
 * @param {object} object
 * @param {boolean} call
 */
export default MixinDelegate.createMixin({

  /**
   * Class default state
   * @type {object|function}
   */
  defaults: {},

  /**
   * Applies default state to Class
   * @param [{object}] defaults
   * @returns {applyDefaults}
   */
  applyDefaults: function(defaults = {}) {
    _.defaultsDeep(this, _.result(this, 'defaults', {}), defaults);
    return this;
  }

}, 'applyDefaults');
