/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineFacilityElement(PluginElement) {

    /**
     * Define Facility Element
     * @param view
     * @param opts
     * @returns {FacilityElement}
     * @constructor
     * @class FacilityElement
     * @extends PluginElement
     */
    var FacilityElement = function FacilityElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('facility', {resource: '/widgets'});

        return this;
    };

    return FacilityElement.extend('FacilityElement', {

        /**
         * Render Embedded content
         * @memberOf FacilityElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {

            var profile = {
                Equipment: [
                    ["Ball", 3],
                    ["Shirts", 8],
                    ["Water", 20]
                ],
                Logistics: [
                    ["Car", 3]
                ],
                Fun: [
                    ["Photography", 0]
                ],
                Personal: [
                    ["color": "red"],
                    ["number", 11]
                ]
                
            };

            for (var index in profile) {

                if (profile.hasOwnProperty(index)) {

                    var $content = [
                        '<div class="input-group">',
                        '<span class="input-group-addon">',
                        index,
                        '</span>'
                    ];

                    for (var i = 0; i < profile[index].length; i++) {

                        $content.push([
                            '<img src="/assets/demo/', profile[index][i][0].toLowerCase(), '" />',
                            '<span>', profile[index][i][0], ' (', profile[index][i][1], ')</span>'
                        ].join(''));
                    }

                    $content.push('</div>');
                    this.$.append($content.join(''));
                }
            }
        }

    }, PluginElement.prototype);
});
