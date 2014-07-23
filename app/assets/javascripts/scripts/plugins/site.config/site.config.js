/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/site.config/mvc/site.config.controller',
    'plugins/site.config/mvc/site.config.model',
    'plugins/site.config/mvc/site.config.view',
    'plugins/site.config/mvc/site.config.event.manager',
    'plugins/site.config/mvc/site.config.permission'
], function defineSiteConfig(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define SiteConfig
     * @constructor
     * @param containment
     * @class SiteConfig
     * @extends AntHill
     */
    var SiteConfig = function SiteConfig(containment) {

        /**
         * Define containment
         * @member SiteConfig
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
         * Define MVC
         * @member SiteConfig
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
            this.eventmanager.eventList.updateTranslations,
            ['plugins/site.config/translations/en-us']
        );
    };

    return SiteConfig.extend('SiteConfig', {

    }, AntHill.prototype);
});