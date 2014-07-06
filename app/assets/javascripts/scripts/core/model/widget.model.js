/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineWidgetModel(BaseModel) {

    /**
     * Define Widget model
     * @extends BaseModel
     * @class WidgetModel
     * @constructor
     */
    var WidgetModel = function WidgetModel() {
    };

    return WidgetModel.extend('WidgetModel', {

        /**
         * Define DOM
         * @member WidgetModel
         */
        defineDOM: function defineDOM() {

            /**
             * Update DOM
             * @member WidgetModel
             * @type {*}
             */
            this.scope.dom = this.scope.map.getDOM();
        },

        /**
         * Get DOM
         * @member WidgetModel
         * @returns {*}
         */
        getDOM: function getDOM() {
            return this.scope.dom;
        },

        /**
         * Update DOM
         * @member WidgetModel
         * @param {*} hash
         * @returns {*}
         */
        updateDOM: function updateDOM(hash) {

            var scope = this.scope;

            scope.logger.debug('Update DOM', hash);
            $.extend(true, scope.dom, hash);

            return scope;
        },

        /**
         * Get attributes
         * @member WidgetModel
         * @returns {*}
         */
        getAttributes: function getAttributes() {
            return this.getConfig('attributes');
        },

        /**
         * Set attributes
         * @member WidgetModel
         * @param key
         * @param value
         */
        setAttributes: function setAttributes(key, value) {
            this.scope.logger.debug('Set widget attributes', arguments);
            this.getAttributes()[key] = value;
        },

        /**
         * Update rules
         * @member WidgetModel
         * @param data
         */
        updateRules: function updateRules(data) {

            /**
             * Get rules
             * @type {*}
             */
            var rules = this.getConfig('rules');

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    rules[index] = data[index];
                }
            }
        },

        /**
         * Define subscribers
         * @member WidgetModel
         * @param {string} event
         * @param {Widget} subscriber
         */
        setSubscriber: function setSubscriber(event, subscriber) {

            /**
             * Get rules
             * @type {*}
             */
            var rules = this.getConfig('rules'),
                uuid = subscriber.model.getUUID();

            rules.subscribers = this.base.define(rules.subscribers, {}, true);
            rules.subscribers[event] = this.base.define(rules.subscribers[event], [], true);

            if ($.inArray(uuid, rules.subscribers[event]) === -1) {

                rules.subscribers[event].push(uuid);
            }
        },

        /**
         * Set widget preferences
         * @member WidgetModel
         * @param {string} eventName
         */
        setWidgetPreferences: function setWidgetPreferences(eventName) {

            if (typeof(this[eventName]) === 'function') {

                this[eventName](eventName);

            } else {

                this.scope.logger.warn('Undefined event', eventName);
            }
        },

        /**
         * Set layer
         * @member WidgetModel
         * @param {string} eventName
         */
        setLayer: function setLayer(eventName) {
            this.setWidgetPreferences(eventName);
        },

        /**
         * Set stick
         * @member WidgetModel
         * @param {string} eventName
         */
        setStick: function setStick(eventName) {
            this.setWidgetPreferences(eventName);
        },

        /**
         * Set stretch width
         * Adopt to container width
         * @param {boolean} stretch
         */
        setStretchWidth: function setStretchWidth(stretch) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.config.preferences.stretchWidth = stretch;

            scope.observer.publish(
                scope.eventmanager.eventList.stretchWidth,
                stretch
            );
        },

        /**
         * Set stretch height
         * Adopt to container height
         * @param {boolean} stretch
         */
        setStretchHeight: function setStretchHeight(stretch) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope.controller.getContainment();

            scope.config.preferences.stretchHeight = stretch;

            scope.observer.publish(
                scope.eventmanager.eventList.stretchHeight,
                stretch
            );
        },

        /**
         * Set stick to
         * @param {string} eventName
         * @returns {boolean}
         * @private
         */
        _setStickTo: function _setStickTo(eventName) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList[eventName]
            );
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToCenterLeft: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToCenterTop: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToCenter: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToCenterBottom: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToCenterRight: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToTopLeft: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToBottomLeft: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToTopRight: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Save widget stick
         * @member WidgetContentModel
         * @param {string} eventName
         */
        setStickToBottomRight: function setStickToCenterLeft(eventName) {
            this._setStickTo(eventName);
        },

        /**
         * Set on top
         * @member WidgetContentModel
         * @param {boolean} ontop
         */
        setAlwaysOnTop: function setAlwaysOnTop(ontop) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            this.scope.config.preferences.alwaysOnTop = ontop;

            scope.observer.publish(
                scope.eventmanager.eventList.setAlwaysOnTop,
                ontop
            );
        },

        /**
         * Save widget layer
         * @member WidgetContentModel,
         * @param {string} eventName
         */
        setLayerUp: function setLayerUp(eventName) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList[eventName],
                true
            );
        },

        /**
         * Save widget layer
         * @member WidgetContentModel,
         * @param {string} eventName
         */
        setLayerDown: function setLayerDown(eventName) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList[eventName],
                true
            );
        },

        /**
         * Set overlapping
         * @member WidgetContentModel
         * @param {boolean} overlapping
         */
        setOverlapping: function setOverlapping(overlapping) {
            this.scope.config.preferences.overlapping = overlapping;
        }

    }, BaseModel.prototype);
});