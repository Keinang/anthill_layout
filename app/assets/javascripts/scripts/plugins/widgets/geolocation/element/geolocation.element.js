/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineGeolocationElement(PluginElement) {

    /**
     * Define Geolocation Element
     * @param view
     * @param opts
     * @returns {GeolocationElement}
     * @constructor
     * @class GeolocationElement
     * @extends PluginElement
     */
    var GeolocationElement = function GeolocationElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('geolocation', {resource: '/widgets'});

        return this;
    };

    return GeolocationElement.extend('GeolocationElement', {

        /**
         * Render Embedded content
         * @memberOf GeolocationElement
         * @param {{
         *      latitude: number,
         *      longitude: number,
         *      zoom: number,
         *      width: number,
         *      height: number,
         *      maptype: string,
         *      sensor: boolean,
         *      scale: boolean,
         *      sensor: boolean,
         *      stretch: boolean
         * }} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            var url = [
                'http://maps.googleapis.com/maps/api/staticmap',
                '?center=', opts.latitude, ',', opts.longitude,
                '&markers=color:blue|label:S|', opts.latitude, ',', opts.longitude,
                '&maptype=', opts.maptype.toLowerCase(),
                '&zoom=', opts.zoom,
                '&scale=', (opts.scale ? 2 : 1),
                '&size=', opts.width, 'x', opts.height,
                '&sensor=', opts.sensor
            ].join('');

            this.$.append(
                $('<img />').attr({
                    src: url,
                    alt: url
                }).addClass(opts.stretch ? 'stretch' : undefined)
            );

            this.view.controller.clearParentThumbnail();
        }

    }, PluginElement.prototype);

});