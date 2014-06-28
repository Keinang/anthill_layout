/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/icefloe/mvc/icefloe.controller',
    'plugins/widgets/icefloe/mvc/icefloe.model',
    'plugins/widgets/icefloe/mvc/icefloe.view',
    'plugins/widgets/icefloe/mvc/icefloe.event.manager',
    'plugins/widgets/icefloe/mvc/icefloe.permission'
], function defineIcefloe(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Icefloe
     * @param containment
     * @param [opts]
     * @constructor
     * @class Icefloe
     * @extends AntHill
     */
    var Icefloe = function Icefloe(containment, opts) {

        /**
         * Define containment
         * @member Icefloe
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Icefloe
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
         * Init observer
         * @member Icefloe
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Icefloe
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Icefloe
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Icefloe
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Icefloe
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {
                    uuid: [
                        this.containment.model.getUUID(),
                        this.constructor.name.toDash()
                    ].join('')
                },
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

    return Icefloe.extend('Icefloe', {

    }, AntHill.prototype);
});