/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/page.tabs/element/page.tabs.element',
    'plugins/widgets/page.tabs/element/page.tabs.preferences.element',
    'plugins/widgets/page.tabs/element/page.tabs.rules.element',
    'plugins/widgets/page.tabs/element/page.tabs.item.element'
], function definePageTabsView(BaseView, Header, Footer, PageTabsElement, PageTabsPreferencesElement, PageTabsRulesElement, PageTabsItemElement) {

    /**
     * Define view
     * @class PageTabsView
     * @extends BaseView
     * @constructor
     */
    var PageTabsView = function PageTabsView() {

    };

    return PageTabsView.extend('PageTabsView', {

        /**
         * Render page.tabs element
         * @member PageTabsView
         */
        renderPageTabs: function renderPageTabs() {

            this.header(Header, this.elements.$container);

            /**
             * Define $page.tabs
             * @type {PageTabsElement}
             */
            this.elements.$pagetabs = new PageTabsElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID(),
                style: 'page-tabs-container'
            });

            this.footer(Footer, this.elements.$container);

            /**
             * Define page tab items
             * @member PageTabsView
             * @type {Array}
             */
            this.elements.items = [];

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render page tab element
         * @member PageTabsView
         * @param pageTab
         * @return {PageTabsItemElement}
         */
        renderPageTabsItem: function renderPageTabsItem(pageTab) {

            /**
             * Define page tab item
             * @type {PageTabsItemElement}
             */
            var $pageTab = new PageTabsItemElement(this, {
                $container: this.elements.$pagetabs.$,
                pageTab: pageTab,
                style: 'page-tabs-item'
            });

            this.elements.items.push($pageTab);

            return $pageTab;
        },

        /**
         * Render Prefs
         * @member PageTabsView
         * @returns {PageTabsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define PageTabs Preferences Element
             * @type {PageTabsPreferencesElement}
             */
            this.elements.$preferences = new PageTabsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member PageTabsView
         * @param widgetRules
         * @param contentRules
         * @returns {PageTabsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define PageTabs Rules Element
             * @type {PageTabsRulesElement}
             */
            this.elements.$rules = new PageTabsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render page.tabs
         * @member PageTabsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPageTabs.bind(this)
            );
        }

    }, BaseView.prototype)

});