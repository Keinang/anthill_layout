/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineLiveAmchartsController(PluginBase, WidgetContentController) {

    /**
     * Define LiveAmcharts controller
     * @class LiveAmchartsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var LiveAmchartsController = function LiveAmchartsController() {
    };

    return LiveAmchartsController.extend('LiveAmchartsController', {

        /**
         * Set embedded content
         * @memberOf LiveAmchartsController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('liveamchartsEmbedCode')
            );
        },

        /**
         * Add LiveAmcharts rule
         * @memberOf LiveAmchartsController
         * @param e
         */
        addLiveAmchartsRule: function addLiveAmchartsRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {LiveAmcharts|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
