/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePixivEventManager(WidgetContentEventManager) {

    /**
     * Define Pixiv event manager
     * @class PixivEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PixivEventManager = function PixivEventManager() {

        this.updateEventList({});
    };

    return PixivEventManager.extend('PixivEventManager', {

    }, WidgetContentEventManager.prototype);
});
