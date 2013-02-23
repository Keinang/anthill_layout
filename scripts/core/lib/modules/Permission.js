/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base'
], function defineBasePermission(Base) {

    var Permission = function Permission() {
    };

    return Permission.extend({
        config: function config() {
            var base = this.base,
                permissions = base.define(this.scope.config.permission, {}, true);

            $.each(permissions, function each(index, permission) {
                this.setCapability(index, permission);
            }.bind(this));

        },
        check: function check(opts) {
            var base = this.base;

            opts = base.define(opts, {}, true);

            var capability = this.getCapability(opts.capability),
                callback = opts.callback,
                fallback = opts.fallback,
                args = base.define(opts.args, [], true);

            if (base.isFunction(callback)) {
                if (capability) {
                    callback(args);
                } else if (base.isFunction(fallback)) {
                    fallback(args);
                }
            }
        },
        setCapability: function setCapability(key, value) {
            this.capability[key] = this.base.defineBoolean(value, false, true);
            return this.getCapability(key);
        },

        getCapability: function getCapability(key) {
            return this.base.defineBoolean(this.capability[key], false, true);
        },

        authorizedFunctionCall: function authorizedFunctionCall(fn) {
            if (fn.getCallerName() !== this.check.getConstructorName()) {
                this.scope.logger.warn('Unauthorized function call');
                return false;
            }
            return true;
        },

        eventTunnelFunctionCall: function eventTunnelFunctionCall(fn) {
            var callerName = fn.getCallerName();
            if (callerName.toPoint() !== this.scope.eventmanager.eventList[callerName]) {
                this.scope.logger.warn('Unauthorized function call');
                return false;
            }
            return true;
        }

    }, Base);
});