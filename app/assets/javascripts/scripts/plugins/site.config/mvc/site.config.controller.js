/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'config/anthill',
    'plugins/plugin'
], function defineSiteConfigController(AntHill, PluginBase) {

    /**
     * Define site controller
     * @class SiteConfigController
     * @extends AntHill
     * @extends PluginController
     * @constructor
     */
    var SiteConfigController = function SiteConfigController() {
    };

    return SiteConfigController.extend('SiteConfigController', {

        /**
         * Load page.data content
         * @member SiteConfigController
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened) {
                this.getView().renderContent(
                    this.model.getData()
                );
            }
        },

        /**
         * Load preferences
         * @member SiteConfigController
         * @param data
         */
        loadPreferences: function loadPreferences(data) {
            this.view.showPreferences(data, this.model.map);
        },

        /**
         * Approve update preferences
         * @member SiteConfigController
         */
        approveUpdatePreferences: function approveUpdatePreferences() {

            /**
             * Define scope
             * @type {SiteConfig}
             */
            var scope = this.scope,
                workspace = scope.controller.getWorkspace();

            workspace.controller.updatePreferences(
                scope.view.elements.$modal,
                false
            );
        },

        /**
         * Revert preferences on cancel
         * @member SiteConfigController
         */
        revertSiteConfig: function revertSiteConfig() {

            /**
             * Define workspace
             * @type {Workspace}
             */
            var workspace = this.getWorkspace();

            workspace.observer.publish(
                workspace.eventmanager.eventList.updateSiteWidth
            );
        }

    }, AntHill.prototype, PluginBase.prototype);
});