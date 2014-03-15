define([
    'config/anthill',
    'api/application.api',
    'modules/mvc',
    'controller/application.controller',
    'model/application.model',
    'view/application.view',
    'event/application.event.manager',
    'permission/application.permission'
], function defineApp(AntHill, API, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define App
     * @class App
     * @extends AntHill
     * @param {{}} opts
     * @constructor
     */
    var App = function App(opts) {

        /**
         * Default config
         * Ex. logger.namespace: 'App'
         *
         * @type {{
         *      workspace: {
         *          limit: number,
         *          counter: number
         *      },
         *      mode: string,
         *      type: string,
         *      isResized: boolean,
         *      logger: {
         *          show: boolean,
         *          namespaces: string|boolean,
         *          type: {
         *              debug: boolean,
         *              log: boolean,
         *              info: boolean,
         *              error: boolean,
         *              warn: boolean
         *          }
         *      },
         *      html: {
         *          style: string,
         *          header: boolean,
         *          footer: boolean,
         *          stretch: boolean,
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
            workspace: {
                resize: true,
                plural: false,
                limit: 1,
                counter: 0
            },
            appName: 'anthill',
            mode: 'development',
            type: 'default',
            isResized: false,
            limit: true,
            logger: {
                show: true,
                namespaces: false,
                type: {
                    debug: false,
                    log: false,
                    info: false,
                    error: true,
                    warn: true
                }
            },
            html: {
                style: 'default',
                header: false,
                footer: false,
                stretch: true,
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
         * @member App
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member App
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member App
         * @type {*}
         */
        this.config = undefined;

        /**
         * Define items
         * @member App
         * @type {*}
         */
        this.items = {};

        /**
         * Define workspace
         * @member App
         * @type {Workspace}
         */
        this.workspace = {};

        /**
         * Init observer
         * @member App
         * @type {undefined}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member App
         * @type {undefined}
         */
        this.eventmanager = undefined;

        /**
         * Define MVC
         * @member App
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [opts.config, DEFAULTS],
            components: [
                API,
                Controller,
                Model,
                View,
                EventManager,
                Permission
            ],
            render: true
        });

        this.observer.publish(
            this.eventmanager.eventList.defineSetting
        );

        this.observer.publish(
            this.eventmanager.eventList.initResizeWindow
        );

        this.observer.publish(
            this.eventmanager.eventList.successCreated
        );

    };

    return App.extend({

    }, AntHill.prototype);

});
