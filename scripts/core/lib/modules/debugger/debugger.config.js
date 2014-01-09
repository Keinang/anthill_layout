/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:32 PM
 */
define([
], function defineDebuggerConfig() {

    /**
     * Define Debugger Config
     * @class DebuggerConfig
     * @param {*} debug
     * @constructor
     */
    var DebuggerConfig = function DebuggerConfig(debug) {

        /**
         * Define debugger
         * @type {Debugger}
         */
        this.debugger = debug;

        this.defineScope();

    };

    return DebuggerConfig.extend({

        /**
         * Define scope
         * @returns {*}
         */
        defineScope: function defineScope() {
            var scope = this.debugger.scope,
                item = scope.model.getItemNameSpace();

            while (item !== 'object') {
                scope = this.setScope(scope, item);

                if (scope.constructor.name === 'Object') {
                    this.debugger.scope.logger.warn('Undefined scope', item);
                    return false;
                }

                item = scope.model.getItemNameSpace();
            }

            this.validateScopes();
        },

        /**
         * Validate required scopes
         */
        validateScopes: function validateScopes() {
            var hash = this.debugger.scopes,
                scopes = ['Workspace', 'Page', 'Widget'];

            if (this.debugger.base.lib.hash.hashLength(hash) < scopes.length) {
                $.each(scopes, function each(index, value) {
                    this.debugger.scope.controller.checkCondition({
                        condition: !hash.hasOwnProperty(value.toLowerCase()),
                        msg: 'Undefined scope',
                        type: 'warn',
                        args: value
                    });
                }.bind(this));
            }
        },

        /**
         * Set scope
         * @param {{}} scope
         * @param {String} item
         * @returns {*}
         */
        setScope: function setScope(scope, item) {
            var node = scope[item];
            this.debugger.scopes[node.constructor.name.toLowerCase()] = node;
            return node;
        },

        /**
         * Get current item by type
         * @param {string} type
         * @returns {App|Workspace|Page|Widget}
         */
        getItem: function getItem(type) {
            var scope = {};

            scope.app = this.debugger.scope;
            scope.workspace = app.controller.getCurrentItem();
            scope.page = scope.workspace.controller.getCurrentItem();
            scope.widget = scope.page.controller.getCurrentItem();

            scope.app.logger.debug('Get item', scope, type);

            return scope[type];
        },

        /**
         * Set item as current
         * @param {string} type
         * @param {string} uuid
         */
        setItem: function setItem(type, uuid) {
            var scope = this.getItem(type),
                item = scope.model.getItemByUUID(uuid);

            item.controller.setAsCurrent();

            scope.logger.debug('Current item', scope, item);

            return this.getItem(item.constructor.name.toLowerCase());
        }


    });

});