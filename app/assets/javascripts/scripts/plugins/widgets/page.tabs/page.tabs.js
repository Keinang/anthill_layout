/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/page.tabs/mvc/page.tabs.controller',
    'plugins/widgets/page.tabs/mvc/page.tabs.model',
    'plugins/widgets/page.tabs/mvc/page.tabs.view',
    'plugins/widgets/page.tabs/mvc/page.tabs.event.manager',
    'plugins/widgets/page.tabs/mvc/page.tabs.permission'
], function definePageTabs(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define PageTabs
     * @param containment
     * @param [opts]
     * @constructor
     * @class PageTabs
     * @extends AntHill
     */
    var PageTabs = function PageTabs(containment, opts) {

        /**
         * Define containment
         * @member PageTabs
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member PageTabs
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
         * @member PageTabs
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member PageTabs
         * @type {PageTabsEventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member PageTabs
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member PageTabs
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member PageTabs
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

        this.observer.publish(
            this.eventmanager.eventList.subscribeCreatePageEvent
        );
    };

    return PageTabs.extend('PageTabs', {

    }, AntHill.prototype);
});