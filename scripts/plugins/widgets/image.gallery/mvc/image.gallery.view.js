/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/image.gallery/element/image.gallery.element',
    'plugins/widgets/image.gallery/element/image.gallery.preferences.element'
], function defineImageGalleryView(BaseView, Header, Footer, ImageGalleryElement, ImageGalleryPreferencesElement) {

    /**
     * Define view
     * @class ImageGalleryView
     * @extends BaseView
     * @constructor
     */
    var ImageGalleryView = function ImageGalleryView() {
    };

    return ImageGalleryView.extend('ImageGalleryView', {

        /**
         * Render image.gallery element
         * @member ImageGalleryView
         */
        renderImageGallery: function renderImageGallery() {

            this.header(Header, this.elements.$container);

            /**
             * Define $image.gallery
             * @type {ImageGalleryElement}
             */
            this.elements.$imagegallery = new ImageGalleryElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member ImageGalleryView
         * @returns {ImageGalleryPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define ImageGallery Preferences Element
             * @type {ImageGalleryPreferencesElement}
             */
            this.elements.$preferences = new ImageGalleryPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render image.gallery
         * @member ImageGalleryView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderImageGallery.bind(this)
            );
        }

    }, BaseView.prototype)

});