/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineSportliveController(PluginBase, WidgetContentController) {

    /**
     * Define Sportlive controller
     * @class SportliveController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SportliveController = function SportliveController() {
    };

    return SportliveController.extend('SportliveController', {

        /**
         * Set embedded content
         * @memberOf SportliveController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('sportliveEmbedCode')
            );
        },

        /**
         * Add Sportlive rule
         * @memberOf SportliveController
         * @param e
         */
        addSportliveRule: function addSportliveRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Sportlive|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
