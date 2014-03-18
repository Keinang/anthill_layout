/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin'
], function definePagesController(PluginBase) {

    /**
     * Define pages controller
     * @class PagesController
     * @extends PluginController
     * @constructor
     */
    var PagesController = function PagesController() {
    };

    return PagesController.extend('PagesController', {

        /**
         * Load pages content
         * @member PagesController
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened && this.isDataNotExist()) {
                this.getView().renderContent(
                    this.model.getData(
                        this.getWorkspace()
                    )
                );
            }
        },

        /**
         * Get preferences
         * @member PagesController
         * @param {string} uuid
         * @returns {*}
         */
        getPreferences: function getPreferences(uuid) {

            /**
             * Define page
             * @type {*}
             */
            var page = this.getWorkspace().model.getItemByUUID(uuid),
                scope = this.scope;

            /**
             * Define page content
             * @member Pages
             * @type {*|Content}
             */
            scope.activeContent = page.controller.getContent();

            return scope.activeContent.view.renderPreferences();
        },

        /**
         * Check if content was updated
         * @member PagesController
         * @param data
         * @param content
         * @returns {boolean}
         */
        isUpdate: function isUpdate(data, content) {

            /**
             * Define hash
             * @type {*}
             */
            var hash = this.base.lib.hash;

            return hash.hashLength(data || {}) ===
                hash.hashLength(content || {})
        },

        /**
         * Update prefs
         * @member PagesController
         */
        approveUpdatePreferences: function approveUpdatePreferences() {

            /**
             * Define scope
             */
            var scope = this.scope;

            scope.activeContent.controller.updatePreferences(
                scope.view.elements.$modal
            );
        },

        /**
         * Update widgets counter
         * @member PagesController
         */
        updateCounter: function updateCounter(uuid) {

            /**
             * Define page
             * @type {*}
             */
            var page = this.getWorkspace().model.getItemByUUID(uuid),
                scope = this.scope;


        }

    }, PluginBase.prototype);
});