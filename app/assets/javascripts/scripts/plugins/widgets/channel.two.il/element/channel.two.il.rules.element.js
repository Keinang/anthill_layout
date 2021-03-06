/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineChannelTwoIlRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define ChannelTwoIl Rules Element
     * @param view
     * @param opts
     * @returns {ChannelTwoIlRulesElement}
     * @constructor
     * @class ChannelTwoIlRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var ChannelTwoIlRulesElement = function ChannelTwoIlRulesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBaseRulesData(
            opts.data,
            opts.rules.widget,
            opts.rules.content
        );

        return this;
    };

    return ChannelTwoIlRulesElement.extend('ChannelTwoIlRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
