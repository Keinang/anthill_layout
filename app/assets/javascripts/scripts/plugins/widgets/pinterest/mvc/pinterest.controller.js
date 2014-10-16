/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePinterestController(PluginBase, WidgetContentController) {

    /**
     * Define Pinterest controller
     * @class PinterestController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PinterestController = function PinterestController() {
    };

    return PinterestController.extend('PinterestController', {

        /**
         * Set embedded content
         * @member PinterestController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$pinterest.renderEmbeddedContent(
                this.model.getPrefs('pinterestApi'),
                this.model.getPrefs('pinterestBoardUrl'), {
                    type: this.model.getPrefs('pinterestType'),
                    iwidth: this.model.getPrefs('pinterestImageWidth'),
                    bheight: this.model.getPrefs('pinterestBoardHeight'),
                    bwidth: this.model.getPrefs('pinterestBoardWidth')
                }
            );
        },

        /**
         * Add Pinterest rule
         * @member PinterestController
         * @param e
         */
        addPinterestRule: function addPinterestRule(e) {

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