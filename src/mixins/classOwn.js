'use strict';
import MixinDelegate from './mixin.js';
import _ from '../_.js';

/**
 * Mixin
 *
 * Class Own
 * @type {Function}
 * @param {object} object
 * @param {boolean} call
 */
export default MixinDelegate.createMixin({

  /**
   * Class own properties
   * @type {Array<string>|function}
   */
  own: [],

  /**
   * Ensures class has own properties
   * @param {Array<string>} own
   * @return {ensureOwn}
   */
  applyOwn: function(own = []) {
    own = _.result(this, 'own', []).concat(own);
    for (let i = 0; i < own.length; i ++) {
      let prop = own[i];
      if (this.hasOwnProperty(prop)) continue;
      this[prop] = _.clone(this[prop], true);
    }
    return this;
  },

  /**
   * Returns own properties. If `own` is provided then it will be merged
   * @param {Array<string>} own
   * @returns {Array<string>}
   */
  getOwn: function(own = []) {
    return own.concat(_.get(this, 'own', []));
  },

  /**
   * Extends class own properties
   * @param [{Array<string>}] own
   * @returns {Array<string>}
   */
  extendOwn: function(own = []) {
    return this.own = this.getOwn(own);
  },

  
}, 'applyOwn');
