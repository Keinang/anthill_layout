/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineGeolocationElement(BaseElement) {

    /**
     * Define Geolocation Element
     * @param view
     * @param opts
     * @returns {GeolocationElement}
     * @constructor
     * @class GeolocationElement
     * @extends BaseElement
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
         * @member GeolocationElement
         * @param {{
         *      latitude: number,
         *      longitude: number,
         *      zoom: number,
         *      width: number,
         *      height: number,
         *      sensor: boolean,
         *      stretch: boolean
         * }} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            var url = [
                'http://maps.googleapis.com/maps/api/staticmap?center=',
                opts.latitude, ',', opts.longitude,
                '&zoom=', opts.zoom, '&size=', opts.width, 'x', opts.height,
                'sensor=', opts.sensor
            ].join('');

            this.$.append(
                $('<img />').attr({
                    src: url
                }).addClass(opts.stretch ? 'stretch' : undefined)
            );
        }

    }, BaseElement.prototype);

});