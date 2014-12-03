/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineSomeEcardsController(PluginBase, WidgetContentController) {

    /**
     * Define someecards controller
     * @class SomeEcardsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SomeEcardsController = function SomeEcardsController() {
    };

    return SomeEcardsController.extend('SomeEcardsController', {

        /**
         * Set embedded content
         * @member SomeEcardsController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$someecards.renderEmbeddedContent(
                this.model.getPrefs('someecardsEmbedCode')
            );
        },

        /**
         * Add SomeEcards rule
         * @member SomeEcardsController
         * @param e
         */
        addSomeEcardsRule: function addSomeEcardsRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});