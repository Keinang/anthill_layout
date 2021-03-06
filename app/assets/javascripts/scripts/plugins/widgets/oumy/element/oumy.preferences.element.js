/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineOumyPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Oumy Preferences Element
     * @constructor
     * @class OumyPreferencesElement
     * @param {OumyView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {OumyPreferencesElement}
     */
    var OumyPreferencesElement = function OumyPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return OumyPreferencesElement.extend(
        'OumyPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
