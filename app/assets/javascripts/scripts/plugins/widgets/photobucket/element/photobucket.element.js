/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePhotobucketElement(BaseElement) {

    /**
     * Define Photobucket Element
     * @param view
     * @param opts
     * @returns {PhotobucketElement}
     * @constructor
     * @class PhotobucketElement
     * @extends BaseElement
     */
    var PhotobucketElement = function PhotobucketElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('photobucket', {resource: '/widgets'});

        return this;
    };

    return PhotobucketElement.extend('PhotobucketElement', {

        /**
         * Render Embedded content
         * @member PhotobucketElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(embed);
        }

    }, BaseElement.prototype);

});
