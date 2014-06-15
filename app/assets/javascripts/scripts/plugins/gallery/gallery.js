/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/gallery/mvc/gallery.controller',
    'plugins/gallery/mvc/gallery.model',
    'plugins/gallery/mvc/gallery.view',
    'plugins/gallery/mvc/gallery.event.manager',
    'plugins/gallery/mvc/gallery.permission'
], function defineGallery(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Gallery
     * @constructor
     * @param containment
     * @class Gallery
     * @extends AntHill
     */
    var Gallery = function Gallery(containment) {

        /**
         * Define containment
         * @member Gallery
         */
        this.containment = containment;

        /**
         * Define defaults
         * @type {{
         *      plugin: boolean,
         *      html: {
         *          style: string,
         *          header: boolean,
         *          footer: boolean,
         *          floating: boolean,
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      }
         * }}
         */
        var DEFAULTS = {
            plugin: true,
            html: {
                style: 'default',
                header: true,
                footer: true,
                floating: true,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        };

        /**
         * Init observer
         * @member Gallery
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Gallery
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Gallery
         * @type {*}
         */
        this.config = undefined;

        /**
         * Define MVC
         * @member Gallery
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [DEFAULTS],
            components: [
                Controller,
                Model,
                View,
                EventManager,
                Permission
            ],
            render: true
        });

        this.observer.publish(
            this.eventmanager.eventList.successCreated
        );

        this.observer.publish(
            this.eventmanager.eventList.setProviders
        );

        this.observer.publish(
            this.eventmanager.eventList.setCurrentProvider
        );

        this.observer.publish(
            this.eventmanager.eventList.updateTranslations,
            ['plugins/gallery/translations/en-us']
        );
    };

    return Gallery.extend('Gallery', {

    }, AntHill.prototype);
});