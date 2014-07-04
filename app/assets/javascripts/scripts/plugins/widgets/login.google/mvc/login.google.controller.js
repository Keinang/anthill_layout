/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineLoginGoogleController(PluginBase, WidgetContentController) {

    /**
     * Define login.google controller
     * @class LoginGoogleController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var LoginGoogleController = function LoginGoogleController() {
    };

    return LoginGoogleController.extend('LoginGoogleController', {

        /**
         * Set embedded content
         * @member LoginGoogleController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$logingoogle.renderEmbeddedContent();
        },

        /**
         * Add LoginGoogle rule
         * @member LoginGoogleController
         * @param e
         */
        addLoginGoogleRule: function addLoginGoogleRule(e) {

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