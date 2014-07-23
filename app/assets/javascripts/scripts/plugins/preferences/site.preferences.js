/**
 * Created with RubyMine.
 * User: teamco
 * Date: 7/23/14
 * Time: 8:50 PM
 */

define([
    'plugins/preferences/preferences'
], function defineSitePreferences(BasePreferences) {

    /**
     * Define prefs
     * @class SitePrefsPreferences
     * @extends Renderer
     * @extends BasePreferences
     * @constructor
     */
    var SitePrefsPreferences = function SitePrefsPreferences() {

    };

    return SitePrefsPreferences.extend('SitePrefsPreferences', {

        /**
         * Toggle fieldset
         * @member SitePrefsPreferences
         * @param e
         */
        toggleFieldset: function toggleFieldset(e) {

            /**
             * Define $el
             * @type {*|jQuery|HTMLElement}
             */
            var $el = $(e.target);

            $el.parents('div.html').
                find('.open').
                removeClass('open');

            $el.addClass('open');

            this.adoptModalDialogPosition();
        },

        /**
         * Get preferences HTML
         * @member SitePrefsPreferences
         * @param {Array} map
         * @return string
         */
        getPreferencesHtml: function getPreferencesHtml(map) {

            var nodes = [];

            nodes.push(this.siteWidthSlider(map));

            return $('<ul />').append(nodes);
        },

        /**
         * Render static width
         * @member SitePrefsPreferences
         * @returns {*|jQuery}
         */
        siteStaticWidth: function siteStaticWidth() {

            /**
             * Define index
             * @type {string}
             */
            var text = 'staticWidth';

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.view.controller.getWorkspace(),
                preferences = workspace.model.getConfig('preferences'),
                checked = preferences[text];

            /**
             * Define checkbox
             * @type {*[]}
             */
            var $element = this.renderCheckbox({
                name: text,
                text: text.humanize(),
                checked: checked,
                value: checked,
                disabled: false,
                visible: true,
                monitor: {
                    events: ['click.width'],
                    callback: this.toggleSlider.bind(this)
                }
            });

            return $('<li />').
                addClass([
                    ['workspace', text.humanize().toClassName(), 'prefs'].join('-'),
                    'checkbox'
                ].join(' ')).
                append($element);
        },

        /**
         * Enable/Disable slider
         * @member SitePrefsPreferences
         * @param e
         */
        toggleSlider: function toggleSlider(e) {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.view.controller.getWorkspace(),
                $workspace = workspace.view.elements.$workspace;

            var $input = $(e.target),
                $slider = $('.ui-slider', $input.parents('ul')),
                width = $slider.slider('value'),
                checked = $input.prop('checked');

            if (checked) {

                $workspace.updateWidth(width || 0);
                $slider.slider('enable');

            } else {

                $workspace.unsetWidth();
                $slider.slider('disable');
            }
        },


        /**
         * Render width slider
         * @member SitePrefsPreferences
         * @param {Array} map
         * @returns {*|jQuery}
         */
        siteWidthSlider: function siteWidthSlider(map) {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.view.controller.getWorkspace(),
                $workspace = workspace.view.elements.$workspace,
                preferences = workspace.model.getConfig('preferences');

            /**
             * Define title
             * @type {string}
             */
            var cname = 'Global Preferences',
                uuid = this.base.lib.generator.UUID() + '-slider',
                $ul = $('<ul />').addClass('site-width-slider'),
                $slider = $('<div />');

            /**
             * Get site slider value
             * @type {number}
             */
            var sliderValue = preferences.siteWidthSlider;

            /**
             * Render slider input
             * @type {*[]}
             */
            var $textfield = this.renderTextField({
                name: 'siteWidthSlider',
                disabled: false,
                visible: false,
                value: sliderValue
            });

            this.renderSlider($slider, {

                value: sliderValue || 1,
                min: 0,
                max: map.length - 1,
                labels: map,
                disabled: !preferences.staticWidth,

                slide: function (event, ui) {

                    $textfield[1].val(ui.value);
                    $workspace.updateWidth(ui.value);

                }.bind(this)
            });

            return $('<li />').append(
                $('<fieldset />').append(
                    $('<legend />').addClass('open').text(cname).
                        on('click.toggle', this.toggleFieldset.bind(this)).attr({
                            title: cname
                        }),

                    $ul.append(
                        this.siteStaticWidth()
                    ),

                    $ul.append(
                        $('<li class="workspace-site-width-prefs slider" />').append(
                            this.renderLabel(uuid, 'Site Width', 'slider', true),
                            $slider,
                            $textfield
                        )
                    )
                )
            );
        }

    }, BasePreferences.prototype);
});

