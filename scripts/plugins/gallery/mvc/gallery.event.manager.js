/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineGalleryEventManager(Event) {

    /**
     * Define Gallery event manager
     * @class GalleryEventManager
     * @constructor
     * @extends Event
     */
    var GalleryEventManager = function GalleryEventManager() {

        /**
         * Define events
         * @member GalleryEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member GalleryEventManager
         * @type {{
         *      updateTranslations: string,
         *      setProviders: string,
         *      loadContent: string
         * }}
         */
        this.eventList = {
            updateTranslations: 'update.translations',
            loadContent: 'load.content',
            setProviders: 'set.providers'
        };
    };

    return GalleryEventManager.extend('GalleryEventManager', {
    }, Event.prototype);
});