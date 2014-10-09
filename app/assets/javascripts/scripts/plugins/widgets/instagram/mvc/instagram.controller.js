/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineInstagramController(PluginBase, WidgetContentController) {

    /**
     * Define Instagram controller
     * @class InstagramController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var InstagramController = function InstagramController() {
    };

    return InstagramController.extend('InstagramController', {

        /**
         * Set embedded content
         * @member InstagramController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$instagram.renderEmbeddedContent(
                this.model.getPrefs('instagramEmbed')
            );
        },

        /**
         * Add Instagram rule
         * @member InstagramController
         * @param e
         */
        addInstagramRule: function addInstagramRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
