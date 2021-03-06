/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineSoundCloudPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define SoundCloud Preferences Element
     * @param view
     * @param opts
     * @returns {SoundCloudPreferencesElement}
     * @constructor
     * @class SoundCloudPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var SoundCloudPreferencesElement = function SoundCloudPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SoundCloudPreferencesElement.extend('SoundCloudPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
