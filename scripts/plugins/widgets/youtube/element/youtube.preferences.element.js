/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/widgets/preferences'
], function defineYoutubePreferencesElement(BaseElement, BasePreferences) {

    /**
     * Define Youtube Preferences Element
     * @param view
     * @param opts
     * @returns {YoutubePreferencesElement}
     * @constructor
     * @class YoutubePreferencesElement
     */
    var YoutubePreferencesElement = function YoutubePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(opts.data);

        return this;
    };

    return YoutubePreferencesElement.extend({


    }, BaseElement.prototype, BasePreferences.prototype);

});