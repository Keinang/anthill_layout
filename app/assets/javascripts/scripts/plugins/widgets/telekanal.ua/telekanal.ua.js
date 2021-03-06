/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/telekanal.ua/mvc/telekanal.ua.controller',
    'plugins/widgets/telekanal.ua/mvc/telekanal.ua.model',
    'plugins/widgets/telekanal.ua/mvc/telekanal.ua.view',
    'plugins/widgets/telekanal.ua/mvc/telekanal.ua.event.manager',
    'plugins/widgets/telekanal.ua/mvc/telekanal.ua.permission'
], function defineTelekanalUa(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define TelekanalUa
     * @param containment
     * @param [opts]
     * @constructor
     * @class TelekanalUa
     * @extends AntHill
     */
    var TelekanalUa = function TelekanalUa(containment, opts) {

        /**
         * Define containment
         * @memberOf TelekanalUa
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf TelekanalUa
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
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      },
         *      regex: RegExp,
         *      mask: string
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
         * @memberOf TelekanalUa
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

    return TelekanalUa.extend('TelekanalUa', {

    }, AntHill.prototype);
});
