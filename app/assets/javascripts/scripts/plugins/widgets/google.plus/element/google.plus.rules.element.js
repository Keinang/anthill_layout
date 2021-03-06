/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineGooglePlusRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define GooglePlus Rules Element
     * @param view
     * @param opts
     * @returns {GooglePlusRulesElement}
     * @constructor
     * @class GooglePlusRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var GooglePlusRulesElement = function GooglePlusRulesElement(view, opts) {

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

    return GooglePlusRulesElement.extend('GooglePlusRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
