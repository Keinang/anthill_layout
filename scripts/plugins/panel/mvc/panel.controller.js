/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin'
], function definePanelController(PluginBase) {

    /**
     * Define panel controller
     * @class Controller
     * @mixin {BaseController}
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend({

        /**
         * Define modules
         * @param modules
         */
        defineModules: function defineModules(modules) {

            for (var i = 0, l = modules.length; i < l; i++) {
                this.model.defineModule(modules[i]);
            }
        },

        /**
         * Check if opened
         * @returns {boolean|*}
         */
        isOpened: function isOpened() {
            return this.scope.opened;
        },

        /**
         * Update opened
         * @param {Boolean} opened
         */
        setBehavior: function setBehavior(opened) {

            /**
             * Update opened instance
             */
            this.scope.opened = !!opened;
        },

        /**
         * Close panel
         */
        closePanel: function closePanel() {
            this.view.elements.$panel.toggle(false);
        },

        /**
         * Open panel
         */
        openPanel: function openPanel() {
            this.view.elements.$panel.toggle(true);
        },

        /**
         * Show content
         * @param {Boolean} opened
         * @param {Number} [index]
         */
        showContent: function showContent(opened, index) {

            // TODO change to dynamic
            index = index || 0;

            if (opened) {
                this.view.renderContent(
                    this.controller.activateModule(opened, index),
                    false
                );
            }
        },

        /**
         * Get render at
         * @returns {*}
         */
        getRenderAt: function getRenderAt() {
            return [
                this.scope.constructor.name.toLowerCase(),
                this.model.getConfig('renderAt')
            ].join('-');
        },

        /**
         * Activate module
         * @param {Boolean} opened
         * @param {Number} index
         * @returns {*}
         */
        activateModule: function activateModule(opened, index) {

            /**
             * Define module instance
             * @type {{activated: Boolean, module}}
             */
            var data = this.model.getModule(index);

            if (data && !data.activated) {

                data.module.view.defineContainer(
                    this.scope.view.elements.$content
                );

                data.module.view.render();
            }

            return data.module.controller.loadContent(opened);
        }


    }, PluginBase.prototype);
});