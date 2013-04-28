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
], function defineContent(Base, BaseElement) {

    var PageContainer = function PageContainer(view, opts) {
        return this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return PageContainer.extend({
        defineHeight: function defineHeight() {
            var header = this.view.elements.$header,
                footer = this.view.elements.$footer,
                $container = this.getRootContainer();

            var headerHeight = header.$ ? header.$.height() : 0,
                footerHeight = footer.$ ? footer.$.height() : 0,
                containerHeight = $container.height();

            this.setHeight(containerHeight - (headerHeight + footerHeight));
        }

    }, Base, BaseElement.prototype);
});