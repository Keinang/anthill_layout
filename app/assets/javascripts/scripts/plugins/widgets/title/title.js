/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/title/mvc/title.controller',
    'plugins/widgets/title/mvc/title.model',
    'plugins/widgets/title/mvc/title.view',
    'plugins/widgets/title/mvc/title.event.manager',
    'plugins/widgets/title/mvc/title.permission'
], function defineTitle(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Title
     * @param containment
     * @param [opts]
     * @constructor
     * @class Title
     * @extends AntHill
     */
    var Title = function Title(containment, opts) {

        /**
         * Define containment
         * @property Title
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Title
         * @type {*}
         */
        this.referrer = undefined;

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
                header: false,
                footer: false,
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
         * @property Title
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {uuid: this.containment.model.getContentUUID()},
                DEFAULTS
            ],
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
            this.eventmanager.eventList.initWidget,
            opts
        );
    };

    return Title.extend('Title', {}, AntHill.prototype);
});
