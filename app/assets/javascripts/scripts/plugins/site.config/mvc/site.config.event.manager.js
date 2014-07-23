/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
], function defineSiteConfigEventManager(BaseEvent) {

    /**
     * Define site event manager
     * @class SiteConfigEventManager
     * @constructor
     * @extends BaseEvent
     */
    var SiteConfigEventManager = function SiteConfigEventManager() {

        /**
         * Define events
         * @member SiteConfigEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member SiteConfigEventManager
         * @type {{
         *      updateTranslations: string,
         *      loadPreferences: string
         * }}
         */
        this.eventList = {
            updateTranslations: 'update.translations',
            loadPreferences: 'load.preferences'
        };
    };

    return SiteConfigEventManager.extend('SiteConfigEventManager', {

    }, BaseEvent.prototype);
});