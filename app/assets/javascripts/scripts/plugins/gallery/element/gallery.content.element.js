/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineGalleryContentElement(BaseElement) {

    /**
     * Define Gallery Content Element
     * @param view
     * @param opts
     * @returns {GalleryContentElement}
     * @constructor
     * @class GalleryContentElement
     * @extends BaseElement
     * @extends Renderer
     */
    var GalleryContentElement = function GalleryContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        /**
         * Define data
         * @member GalleryContentElement
         * @type {*}
         */
        this.data = opts.data;

        this.setAttributes();
        this.bindInstallWidget();
        this.bindShowInfo();

        return this;
    };

    return GalleryContentElement.extend('GalleryContentElement', {

        /**
         * Set attributes
         * @member GalleryContentElement
         */
        setAttributes: function setAttributes() {

            this.$.attr({

                title: this.data.name,
                resource: this.data.resource

            }).addClass(

                this.view.controller.getResourceClassName(
                    this.data.resource
                )
            );
        },

        /**
         * Bind Install widget
         * @member GalleryContentElement
         */
        bindInstallWidget: function bindInstallWidget() {

            /**
             * Click to install
             * @private
             */
            function _clickInstall() {
                this.view.controller.addWidget(this);
            }

            this.$.on(
                'click.install',
                _clickInstall.bind(this)
            );
        },

        /**
         * Show item info
         * @member GalleryContentElement
         */
        bindShowInfo: function bindShowInfo() {

            /**
             * Define content element
             * @type {GalleryContentElement}
             */
            var $content = this;

            $content.renderTooltip({
                title: $content.data.name,
                description: $content.data.description,
                $container: $content
            });
        }

    }, BaseElement.prototype);

});