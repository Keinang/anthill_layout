/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineYoutubeEventManager(Event) {

    /**
     * Define Youtube event manager
     * @class EventManager
     * @constructor
     * @extends Event
     */
    var EventManager = function EventManager() {

        /**
         * Define events
         * @member EventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member EventManager
         * @type {{
         *      initWidget: string,
         *      updateTranslations: string,
         *      defineContainer: string,
         *      setEmbeddedContent: string,
         *      loadPreferences: string,
         *      transferPreferences: string
         * }}
         */
        this.eventList = {
            initWidget: 'init.widget',
            updateTranslations: 'update.translations',
            defineContainer: 'define.container',
            setEmbeddedContent: 'set.embedded.content',
            loadPreferences: 'load.preferences',
            transferPreferences: 'transfer.preferences'
        };
    };

    return EventManager.extend({
    }, Event.prototype);
});