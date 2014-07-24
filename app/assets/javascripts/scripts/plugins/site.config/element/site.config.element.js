/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSiteConfigElement(BaseElement) {

    /**
     * Define SiteConfig Element
     * @param view
     * @param opts
     * @constructor
     * @class SiteConfigElement
     * @type {Function}
     * @extends BaseElement
     * @returns {SiteConfigElement}
     */
    var SiteConfigElement = function SiteConfigElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.addCSS('site.config');
        this.addCSS('preferences');

        return this;
    };

    return SiteConfigElement.extend('SiteConfigElement', {

        /**
         * Get footer html
         * @member SiteConfigElement
         * @returns {*|jQuery}
         */
        getFooter: function getFooter() {
            return $('<div />').text([
                this.base.lib.hash.hashLength(
                    this.view.scope.controller.getData()
                ),
                'items'
            ].join(' '));
        }

    }, BaseElement.prototype);

});