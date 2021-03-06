/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/pavel/mvc/pavel.controller',
    'plugins/widgets/pavel/mvc/pavel.model',
    'plugins/widgets/pavel/mvc/pavel.view',
    'plugins/widgets/pavel/mvc/pavel.event.manager',
    'plugins/widgets/pavel/mvc/pavel.permission'
], function definePavel(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Pavel
     * @param containment
     * @param [opts]
     * @constructor
     * @class Pavel
     * @extends AntHill
     */
    var Pavel = function Pavel(containment, opts) {

        /**
         * Define containment
         * @property Pavel
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Pavel
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
         * @property Pavel
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

    return Pavel.extend('Pavel', {}, AntHill.prototype);
});
