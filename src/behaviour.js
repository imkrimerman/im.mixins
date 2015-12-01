'use strict';

/**
 * Mixin behaviour
 * @type {object}
 */
export default {

  /**
   * Mixins to include
   * @type {Array|function}
   */
  mixins: [],

  /**
   * Includes mixin to BaseClass
   * @param {object|Array<function>} mixin - mixin to include
   * @param [{boolean}] forceInclude - if true include will use method assign, otherwise will use defaultsDeep
   * @returns {object}
   */
  include: function(mixin, forceInclude = false) {
    if (! _.isArray(mixin) && _.isObject(mixin)) this.__mix(mixin, forceInclude);
    else for (let i = 0; i < mixin.length; i ++) this.__mix(mixin[i], forceInclude);
    return this;
  },

  /**
   * Returns class mixins. If `mixins` parameter is provided, then it will be concatenated
   * @param [{object|Array<function>}] mixins
   * @returns {Set}
   */
  getMixins: function(mixins = {}) {
    if (! _.isArray(mixins) && ! _.isObject(mixins)) mixins = [];
    return _.result(this, 'mixins', []).concat(mixins);
  },

  /**
   * Applies mixins to current object
   * @param [{object|Array<function>}] mixins
   * @param [{boolean}] forceInclude
   */
  applyMixins: function(mixins = {}, forceInclude = false) {
    return this.include(this.getMixins(mixins), forceInclude);
  },

  /**
   * Extends class mixins
   * @param [{object|Array<function>}] mixins
   * @returns {Array}
   */
  extendMixins: function(mixins = {}) {
    return this.mixins = this.getMixins(mixins);
  },

  /**
   * Mixes given object to current object
   * @param {object|function} mixin
   * @param forceInclude
   * @return {*}
   * @private
   */
  __mix: function(mixin, forceInclude = false) {
    if (_.isFunction(mixin)) return mixin(this);
    if (forceInclude) Object.assign(this, mixin);
    else _.defaultsDeep(this, mixin);
    return this;
  },
};
