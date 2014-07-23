/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSiteConfigContentElement(BaseElement) {

    /**
     * Define SiteConfig Content Element
     * @constructor
     * @class SiteConfigContentElement
     * @extends BaseElement
     * @param view
     * @param opts
     * @returns {SiteConfigContentElement}
     */
    var SiteConfigContentElement = function SiteConfigContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.setAttributes(opts.data);
        this.showContentPreferences(opts.data);

        return this;
    };

    return SiteConfigContentElement.extend('SiteConfigContentElement', {

        /**
         * Set item attributes
         * @member SiteConfigContentElement
         * @param data
         */
        setAttributes: function setAttributes(data) {

            this.renderTooltip({
                title: data.title,
                description: data.description,
                $container: this
            });
        },

        /**
         * Show content preferences
         * @member SiteConfigContentElement
         * @param data
         */
        showContentPreferences: function showContentPreferences(data) {

            /**
             * Define scope
             * @type {SiteConfig}
             */
            var scope = this.view.scope;

            /**
             * Click prefs
             * @private
             * @param e
             */
            function _clickPreferences(e) {
                scope.observer.publish(
                    scope.eventmanager.eventList.loadPreferences,
                    data
                );
            }

            this.$.off('click.preferences').on(
                'click.preferences',
                _clickPreferences.bind(this)
            );
        }

    }, BaseElement.prototype);

});