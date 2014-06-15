/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'controller/behavior/behavior.crud',
    'controller/behavior/behavior.window.resize'
], function defineBaseController(AntHill, Crud, Resize) {

    /**
     * Define Base Controller
     * @class BaseController
     * @extends AntHill
     * @extends BaseCrud
     * @extends BaseResize
     * @constructor BaseController
     */
    var BaseController = function BaseController() {

    };

    return BaseController.extend('BaseController', {

        /**
         * Before init config
         * @member BaseController
         */
        beforeInitConfig: function beforeInitConfig() {
            this.logger.debug('Before init config', arguments);
        },

        /**
         * After init config
         * @member BaseController
         */
        afterInitConfig: function afterInitConfig() {
            this.logger.debug('After init config', arguments);
        },

        /**
         * Set core loading attribute
         * @member BaseController
         * @param load
         */
        setAsLoading: function setAsLoading(load) {

            /**
             * Get root
             * @type {App}
             */
            var root = this.root();

            root.loading = load;

            if (this.scope === root) {

                root.observer.publish(
                    root.eventmanager.eventList.setAsLoaded
                );
            }
        },

        /**
         * Set as loaded
         * @member BaseController
         */
        setAsLoaded: function setAsLoaded() {

            this.logger.debug('Application was loaded');

            /**
             * Get item constructor name
             * @type {string}
             */
            var namespace = this.model.getItemNameSpace();

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this[namespace];

            if (workspace.controller) {

                workspace.controller.switchPageOnHashChange.bind(workspace)();
            }
        },

        /**
         * Check if core already loaded
         * @member @BaseController
         * @returns {boolean}
         */
        isLoading: function isLoading() {
            return this.root().loading;
        },

        /**
         * Get Application mode
         * @member BaseController
         * @returns {*|number}
         */
        getMode: function getMode() {
            return this.root().config.mode;
        },

        /**
         * Get parent node object
         * @member BaseController
         * @returns {*}
         */
        getContainment: function getContainment() {
            return this.scope.containment;
        },

        /**
         * Get Application Root
         * @member BaseController
         * @returns {*|string}
         */
        root: function root() {

            /**
             * Define root instance
             * @type {*}
             */
            var root = this.scope;
            while (root.hasOwnProperty('containment')) {
                root = root.containment;
            }

            return root;
        },

        /**
         * Get Config Logger
         * @member BaseController
         * @param {String} log
         * @param {Object} hash
         */
        getConfigLog: function getConfigLog(log, hash) {
            this.logger.debug(log, hash);
        },

        /**
         * Get scope view
         * @member BaseController
         * @returns {view}
         */
        getView: function getView() {
            return this.scope.view;
        },

        /**
         * Get scope model
         * @member BaseController
         * @returns {model}
         */
        getModel: function getModel() {
            return this.scope.model;
        },

        /**
         * Success Created
         * @member BaseController
         */
        successCreated: function successCreated() {
            this.logger.debug(
                    this.constructor.name +
                    ' was successfully created',
                this
            );
        },

        /**
         * Success Rendered
         * @member BaseController
         */
        successRendered: function successRendered() {
            this.logger.debug(
                this.i18n.t('success.rendered').replace(/\{0\}/, this.constructor.name),
                this
            );
        },

        /**
         * Get current items
         * @member BaseController
         * @returns {*}
         */
        getCurrentItem: function getCurrentItem() {
            var scope = this.scope,
                item = scope.model.getItemNameSpace();
            if (item === 'object') {
                scope.logger.warn('Unable to locate current item');
            }
            return scope[scope.model.getItemNameSpace()];
        },

        /**
         * Set item as current in parent node
         * @member BaseController
         */
        setAsCurrent: function setAsCurrent() {
            this.getContainment().controller.setCurrentItem(this.scope);
        },

        /**
         * Set current item
         * @member BaseController
         * @param {{}} item
         * @returns {*}
         */
        setCurrentItem: function setCurrentItem(item) {
            var scope = this.scope;
            scope[scope.model.getItemNameSpace()] = item;
            return this.getCurrentItem();
        },

        /**
         * Check condition
         * @member BaseController
         * @param {{condition, msg, [type], [args]}} opts
         * @returns {boolean}
         */
        checkCondition: function checkCondition(opts) {
            if (opts.condition) {
                opts.args ?
                    this.scope.logger[opts.type || 'debug'](opts.msg, opts.args) :
                    this.scope.logger[opts.type || 'debug'](opts.msg);
                return true;
            }
            return false;
        },

        /**
         * Get Development Mode
         * @member BaseController
         * @returns {Boolean}
         */
        isDevelopmentMode: function isDevelopmentMode() {
            return this.getMode() === 'development';
        },

        /**
         * Get Authorize Mode
         * @member BaseController
         * @returns {Boolean}
         */
        isAuthorizeMode: function isAuthorizeMode() {
            return this.getMode() === 'authorize';
        },

        /**
         * Get Consumption Mode
         * @member BaseController
         * @returns {boolean}
         */
        isConsumptionMode: function isConsumptionMode() {
            return this.getMode() === 'consumption';
        },

        /**
         * Get Custom Mode
         * @member BaseController
         * @returns {boolean}
         */
        isCustomMode: function isCustomMode() {
            return this.getMode() === 'custom';
        },

        /**
         * Set Order
         * @member BaseController
         * @param collector
         */
        setOrder: function setOrder(collector) {
            var scope = this.scope,
                base = this.base;

            scope.config.order = base.define(
                scope.config.order,
                base.lib.hash.hashLength(collector)
            );
        },

        /**
         * Get preferences
         * @member BaseController
         * @returns {{}}
         */
        getPreferences: function getPreferences() {
            return this.model.preferences;
        },

        /**
         * Get Preference
         * @member BaseController
         * @param {string} pref
         * @returns {*}
         */
        getPreference: function getPreference(pref) {

            var data = this.model.getPrefs(pref);

            if (!data) {
                this.scope.logger.debug('No Preference available', pref);
                return false;
            }

            return data;
        },

        /**
         * Get rules
         * @member BaseController
         * @returns {{}}
         */
        getRules: function getRules() {
            return this.model.rules;
        },

        /**
         * Extend Config
         * @member BaseController
         * @param {{config, [dom]}} opts
         * @returns {*}
         */
        extendConfig: function extendConfig(opts) {
            var base = this.base,
                scope = this.scope;

            opts.config = base.lib.hash.extendHash({
                html: {
                    container: [
                        '#', scope.model.getUUID(),
                        '-', scope.constructor.name.toLowerCase()
                    ].join('')
                },
                containment: scope
            }, opts.config);

            scope.logger.debug('Configuration', opts.config);

            return opts;
        },

        /**
         * Set Interaction
         * @member BaseController
         * @param {Resizable|Draggable|Function} Event
         * @returns {*}
         */
        setInteraction: function setInteraction(Event) {

            /**
             * Event name
             * @type {string}
             */
            var ename = Event.name.toLowerCase();

            /**
             * Register interactions
             * @type {Draggable|Resizable}
             */
            this.scope.interactions[ename] = new Event(this.scope);

            return this.getInteraction(ename);
        },

        /**
         * Get Interaction
         * @member BaseController
         * @param {String} event
         * @returns {*}
         */
        getInteraction: function getInteraction(event) {
            return this.scope.interactions[event];
        },

        /**
         * Check is root
         * @member BaseController
         * @param scope
         * @returns {boolean}
         */
        isRoot: function isRoot(scope) {
            return scope === this.root();
        },

        /**
         * Store data after layout organize
         * @member BaseController
         * @param [node]
         * @param [data]
         */
        store: function store(node, data) {

            /**
             * Define root
             * @type {App}
             */
            var root = this.root();

            /**
             * Define node
             * @type {*}
             */
            node = this.base.define(
                node,
                root,
                true
            );

            /**
             * Define data
             * @type {*}
             */
            data = this.base.define(data, {
                collector: {}
            }, true);

            /**
             * Define item list
             * @type {*}
             */
            var items = node.model.getItems(),
                index;

            /**
             * Define item name space
             * @type {string}
             */
            var cname = node.model.getItemNameSpace();

            if (!items || !node[cname].model) {
                node.logger.debug('Collector', data);
                root.model.setting.save(data);
                return false;
            }

            /**
             * Define data
             * @type {*}
             */
            data.collector[cname] = data.collector[cname] || {};

            $.extend(
                true,
                data.collector[cname],
                node.controller.collectItemProperties(
                    !node[cname].model.getItems()
                )
            );

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    this.store.bind(node.controller)(items[index], data);
                }
            }
        },

        /**
         * Get subscribers list
         * @member BaseController
         * @param {string} event
         * @return {Array}
         */
        getSubscribers: function getSubscribers(event) {

            /**
             * Define rules
             * @type {{}}
             */
            var rules = this.model.rules;

            return rules.subscribers ?
                rules.subscribers[event] : []
        },

        /**
         * Collect items data
         * @member BaseController
         * @param {Boolean} collectDOM
         * @returns {{}}
         */
        collectItemProperties: function collectItemProperties(collectDOM) {

            var collector = {},
                items = this.model.getItems();

            if (items) {

                for (var index in items) {

                    if (items.hasOwnProperty(index)) {

                        var item = items[index],
                            uuid = item.model.getConfig('uuid');

                        collector[uuid] = {};

                        /**
                         * Define config
                         * @type {{}}
                         */
                        collector[uuid].config = this.base.lib.hash.extendHash(
                            item.model.getConfig(),
                            collector[uuid].config
                        );

                        /**
                         * Define containment
                         * @type {String}
                         */
                        collector[uuid].containment = item.containment.model.getConfig('uuid');

                        if (collectDOM) {

                            /**
                             * Collect DOM
                             * @type {{}}
                             */
                            collector[uuid].dom = item.dom;
                        }
                    }
                }
            }

            return collector;
        }

    }, AntHill.prototype, Crud.prototype, Resize.prototype);
});