/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePixivPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Pixiv Preferences Element
     * @param view
     * @param opts
     * @returns {PixivPreferencesElement}
     * @constructor
     * @class PixivPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PixivPreferencesElement = function PixivPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PixivPreferencesElement.extend('PixivPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});