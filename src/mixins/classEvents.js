'use strict';
import Events from 'backbone-events-standalone';
import MixinDelegate from './mixin.js';

/**
 * Mixin
 *
 * Class Events
 * @type {Function}
 * @param {object} object
 * @param {boolean} call
 */
export default MixinDelegate.createMixin(Object.assign({}, Events, {

  /**
   * Events configuration object
   * @type {Object}
   */
  eventsConfig: {
    // Event namespace
    ns: '',
    // Event catalog
    catalog: {}
  },

  /**
   * Registered events
   * @type {Object}
   */
  __registeredEvents: {},

  /**
   * Fires event with namespace
   * @param {String} event
   * @param {*} payload
   * @returns {*}
   */
  fire: function(event, payload) {
    this.trigger(this.nsEvent(event), payload);
    return this;
  },

  /**
   * Attaches listener for event with namespace
   * @param {String} event
   * @param {Function} cb
   * @param {Object} listenable
   * @returns {*}
   */
  when: function(event, cb, listenable) {
    listenable = listenable || this;
    this.listenTo(listenable, this.nsEvent(event), cb);
    return this;
  },

  /**
   * Attaches listener for event with namespace and removes at once it invoked
   * @param {String} event
   * @param {Function} cb
   * @param {Object} listenable
   * @returns {*}
   */
  after: function(event, cb, listenable) {
    listenable = listenable || this;
    this.listenToOnce(listenable, this.nsEvent(event), cb);
    return this;
  },

  /**
   * Returns Object events namespace
   * @returns {String}
   */
  getNs: function() {
    return this.eventsConfig.ns;
  },

  /**
   * Sets Object events namespace
   * @param {String} namespace
   */
  setNs: function(namespace) {
    this.eventsConfig.ns = namespace;
  },

  /**
   * Checks if Object has valid events namespace
   * @returns {Boolean}
   */
  hasNs: function() {
    return this.eventsConfig.ns.trim() !== '';
  },

  /**
   * Returns event from catalog by `alias`
   * @param {String} alias
   * @returns {String}
   */
  getNsEvent: function(alias) {
    return this.eventsConfig.catalog[alias];
  },

  /**
   * Sets event to catalog by `alias`
   * @param {String} alias
   * @param {String} event
   */
  setNsEvent: function(alias, event) {
    this.eventsConfig.catalog[alias] = event;
  },

  /**
   * Checks if Object has given event by `alias` in catalog
   * @param {String} alias
   * @returns {Boolean}
   */
  hasNsEvent: function(alias) {
    return _.has(this.eventsConfig.catalog, alias);
  },

  /**
   * Extends event catalog with given `catalog`
   * @param {Object} catalog
   * @returns {*}
   */
  extendNsEventCatalog: function(catalog) {
    if (! _.isObject(catalog)) return this;
    Object.assign(this.eventsConfig.catalog, catalog);
    return this;
  },

  /**
   * Adds namespace to event name
   * @param {String} event - event key from catalog or custom event
   * @returns {String}
   */
  nsEvent: function(event) {
    if (! this.eventsConfig || ! this.eventsConfig.catalog)
      return event;

    var objNs = this.eventsConfig.ns,
      ns = objNs === '' ? '' : objNs + ':';
    if (this.hasNsEvent(event))
      event = this.getNsEvent(event);
    if (this.eventWithNs(event)) return event;
    return ns + event;
  },

  /**
   * Checks if event includes namespace
   * @param {String} event
   * @returns {Boolean}
   */
  eventWithNs: function(event) {
    if (! this.hasNs()) return false;
    return event.indexOf(this.eventsConfig.ns) !== -1;
  },

  /**
   * Registers event as hooked
   * @param {String} event
   * @param {Function} handler
   * @returns {*}
   */
  registerEvent: function(event, handler) {
    this.__registeredEvents[event] = handler;
    return this;
  },

  /**
   * Deletes registered event
   * @param {String} event
   * @returns {*}
   */
  unregisterEvent: function(event) {
    delete this.__registeredEvents[event];
    return this;
  },

  /**
   * Bind an event to a `callback` function. Passing `"all"` will bind
   * the callback to all events fired.
   * Adds to registered events.
   * @param {String} event
   * @param {Function} handler
   * @returns {*}
   */
  on: function(event, handler) {
    this.registerEvent(event, handler);
    return Backbone.Events.on.apply(this, arguments);
  },

  /**
   * Returns handler for `event`
   * @param {String} event
   * @returns {Function}
   */
  getEventHandler: function(event) {
    var handler = this.__registeredEvents[event];
    if (_.isString(handler) && _.isFunction(this[handler]))
      handler = this[handler].bind(this);
    return handler;
  },

  /**
   * Attaches registered events
   * @param [{Boolean}] detach - auto detach events before attach new one
   * @returns {*}
   */
  attachRegisteredEvents: function(detach = true) {
    detach && this.detachRegisteredEvents();
    for (var event in this.__registeredEvents)
      Events.on.call(this, event, this.getEventHandler(event));
    return this;
  },

  /**
   * Detaches registered events
   * @returns {*}
   */
  detachRegisteredEvents: function() {
    for (var event in this.__registeredEvents)
      Events.off.call(this, event, this.getEventHandler(event));
    return this;
  },

}));
