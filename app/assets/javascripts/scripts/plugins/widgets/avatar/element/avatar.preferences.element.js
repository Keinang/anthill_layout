/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineAvatarPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Avatar Preferences Element
     * @param view
     * @param opts
     * @returns {AvatarPreferencesElement}
     * @constructor
     * @class AvatarPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var AvatarPreferencesElement = function AvatarPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return AvatarPreferencesElement.extend(
        'AvatarPreferencesElement', {},
        PluginElement.prototype,
        WidgetPreferences.prototype
    );
});