/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineChannelNineUaEventManager(WidgetContentEventManager) {

    /**
     * Define ChannelNineUa event manager
     * @class ChannelNineUaEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ChannelNineUaEventManager = function ChannelNineUaEventManager() {

        this.updateEventList({});
    };

    return ChannelNineUaEventManager.extend('ChannelNineUaEventManager', {

    }, WidgetContentEventManager.prototype);
});
