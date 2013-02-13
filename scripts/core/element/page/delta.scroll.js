/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/element'
], function defineDeltaScroll(Base, BaseElement) {

    var DeltaScroll = function DeltaScroll(view, opts) {
        return this.config(view, opts).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return DeltaScroll.extend({
        config: function config(view, opts) {
            this.view = view;
            this.style = opts.style;
            this.$ = $('<div />').addClass(this.style);

            return this;
        }

    }, Base, BaseElement.prototype);
});