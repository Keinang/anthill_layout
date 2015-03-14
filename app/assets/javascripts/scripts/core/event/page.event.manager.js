/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
], function definePageEventManager(BaseEvent) {

    /**
     * Define page event manager
     * @class PageEventManager
     * @constructor
     */
    var PageEventManager = function PageEventManager() {

        /**
         * Define events
         * @member PageEventManager
         * @type {{}}
         */
        this.events = {};
    };

    return PageEventManager.extend('PageEventManager', {

        /**
         * Define event list
         * @member PageEventManager
         * @type {{
         *      setMaximized: string,
         *      unsetMaximized: string,
         *      createWidget: string,
         *      destroyWidget: string,
         *      destroyWidgets: string,
         *      createLayout: string,
         *      destroyLayout: string,
         *      updateSiteDescription: string,
         *      updateSiteKeywords: string,
         *      updateLayoutConfig: string,
         *      expandLayout: string,
         *      resizeWidgets: string,
         *      resizeWidget: string,
         *      loadItemsContent: string,
         *      setLoadedContent: string,
         *      updateHashOnMaximize: string,
         *      updateHashOnReduce: string,
         *      updateHeight: string,
         *      afterLoadingItems: string,
         *      disableItemInteractions: string,
         *      enableItemInteractions: string,
         *      loadPreferences: string,
         *      transferPreferences: string,
         *      transferContentPreferences: string,
         *      afterUpdatePreferences: string
         * }}
         */
        eventList: {

            setMaximized: 'set.maximized',
            unsetMaximized: 'unset.maximized',

            createWidget: 'create.widget',
            destroyWidget: 'destroy.widget',
            destroyWidgets: 'destroy.widgets',
            approveItemsDestroy: 'approve.items.destroy',

            createLayout: 'create.layout',
            destroyLayout: 'destroy.layout',
            updateLayoutConfig: 'update.layout.config',
            expandLayout: 'expand.layout',

            resizeWidget: 'resize.widget',

            resizeWidgets: 'resize.widgets',
            updateHashOnMaximize: 'update.hash.on.maximize',

            updateHashOnReduce: 'update.hash.on.reduce',

            updateHeight: 'update.height',

            updateSiteDescription: 'update.site.description',
            updateSiteKeywords: 'update.site.keywords',

            afterLoadingItems: 'after.loading.items',
            disableItemInteractions: 'disable.item.interactions',
            loadItemsContent: 'load.items.content',
            setLoadedContent: 'set.loaded.content',
            enableItemInteractions: 'enable.item.interactions',

            loadPreferences: 'load.preferences',
            transferContentPreferences: 'transfer.content.preferences',
            transferPreferences: 'transfer.preferences',
            afterUpdatePreferences: 'after.update.preferences'
        }

    }, BaseEvent.prototype);
});