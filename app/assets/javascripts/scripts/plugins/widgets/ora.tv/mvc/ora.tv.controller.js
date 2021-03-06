/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineOraTvController(PluginBase, WidgetContentController) {

    /**
     * Define OraTv controller
     * @class OraTvController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var OraTvController = function OraTvController() {
    };

    return OraTvController.extend('OraTvController', {

        /**
         * Set embedded content
         * @memberOf OraTvController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('oratvEmbedCode')
            );
        },

        /**
         * Add OraTv rule
         * @memberOf OraTvController
         * @param e
         */
        addOraTvRule: function addOraTvRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {OraTv|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
