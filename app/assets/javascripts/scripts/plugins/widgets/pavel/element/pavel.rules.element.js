/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function definePavelRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Pavel Rules Element
     * @param view
     * @param opts
     * @returns {PavelRulesElement}
     * @constructor
     * @class PavelRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var PavelRulesElement = function PavelRulesElement(view, opts) {

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

    return PavelRulesElement.extend(
        'PavelRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
