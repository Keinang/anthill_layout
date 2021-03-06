/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/film.ru/mvc/film.ru.controller',
    'plugins/widgets/film.ru/mvc/film.ru.model',
    'plugins/widgets/film.ru/mvc/film.ru.view',
    'plugins/widgets/film.ru/mvc/film.ru.event.manager',
    'plugins/widgets/film.ru/mvc/film.ru.permission'
], function defineFilmRu(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define FilmRu
     * @param containment
     * @param [opts]
     * @constructor
     * @class FilmRu
     * @extends AntHill
     */
    var FilmRu = function FilmRu(containment, opts) {

        /**
         * Define containment
         * @property FilmRu
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property FilmRu
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
         * @property FilmRu
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

    return FilmRu.extend('FilmRu', {}, AntHill.prototype);
});
