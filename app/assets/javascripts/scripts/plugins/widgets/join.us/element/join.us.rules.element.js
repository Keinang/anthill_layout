/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineJoinUsRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define JoinUs Rules Element
     * @param view
     * @param opts
     * @returns {JoinUsRulesElement}
     * @constructor
     * @class JoinUsRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var JoinUsRulesElement = function JoinUsRulesElement(view, opts) {

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

    return JoinUsRulesElement.extend(
        'JoinUsRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
