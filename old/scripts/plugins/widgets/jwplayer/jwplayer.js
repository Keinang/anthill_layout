/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/mvc',
    'plugins/widgets/jwplayer/mvc/jwplayer.controller',
    'plugins/widgets/jwplayer/mvc/jwplayer.model',
    'plugins/widgets/jwplayer/mvc/jwplayer.view',
    'plugins/widgets/jwplayer/mvc/jwplayer.event.manager',
    'plugins/widgets/jwplayer/mvc/jwplayer.permission'
], function defineJwplayer(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Jwplayer
     * @param containment
     * @param [opts]
     * @constructor
     * @class Jwplayer
     * @extends AntHill
     */
    var Jwplayer = function Jwplayer(containment, opts) {

        /**
         * Define containment
         * @member Jwplayer
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Jwplayer
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
         * Init observer
         * @member Jwplayer
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Jwplayer
         * @type {JwplayerEventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Jwplayer
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Jwplayer
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Jwplayer
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

    return Jwplayer.extend('Jwplayer', {

    }, AntHill.prototype);
});