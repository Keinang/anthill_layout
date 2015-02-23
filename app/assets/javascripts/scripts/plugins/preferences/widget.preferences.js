/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([
    'plugins/preferences/preferences'
], function defineWidgetPreferences(BasePreferences) {

    /**
     * Define prefs
     * @class WidgetPreferences
     * @extends Renderer
     * @extends BasePreferences
     * @constructor
     */
    var WidgetPreferences = function WidgetPreferences() {

    };

    return WidgetPreferences.extend('WidgetPreferences', {

        /**
         * Render prefs data
         * @member WidgetPreferences
         * @param data
         */
        renderBasePrefsData: function renderBasePrefsData(data) {

            /**
             * Define widget default prefs
             * @type {{
             *      title: {type: string, disabled: boolean, value},
             *      description: {type: string, disabled: boolean, value},
             *      widgetUrl: {type: string, disabled: boolean, value},
             *      onClickOpenUrl: {type: string, disabled: boolean, value},
             *      overlapping: {type: string, disabled: boolean, checked: boolean},
             *      alwaysOnTop: {type: string, disabled: boolean, checked: boolean},
             *      statistics: {type: string, disabled: boolean, checked: boolean},
             *      setLayerUp: {type: string, disabled: boolean, group: string, events: array},
             *      setLayerDown: {type: string, disabled: boolean, group: string, events: array},
             *      stretchWidth: {type: string, disabled: boolean, group: string, events: array},
             *      stretchHeight: {type: string, disabled: boolean, group: string, events: array},
             *      stickToCenterLeft: {type: string, disabled: boolean, group: string, events: array},
             *      stickToCenterTop: {type: string, disabled: boolean, group: string, events: array},
             *      stickToCenter: {type: string, disabled: boolean, group: string, events: array},
             *      stickToCenterBottom: {type: string, disabled: boolean, group: string, events: array},
             *      stickToCenterRight: {type: string, disabled: boolean, group: string, events: array},
             *      stickToTopLeft: {type: string, disabled: boolean, group: string, events: array},
             *      stickToBottomLeft: {type: string, disabled: boolean, group: string, events: array},
             *      stickToTopRight: {type: string, disabled: boolean, group: string, events: array},
             *      stickToBottomRight: {type: string, disabled: boolean, group: string, events: array}
             * }}
             */
            var defaultPrefs = {
                title: {
                    type: 'text',
                    disabled: false,
                    value: undefined,
                    visible: true
                },
                description: {
                    type: 'textarea',
                    disabled: false,
                    value: undefined,
                    visible: true
                },
                widgetUrl: {
                    type: 'textarea',
                    disabled: true,
                    value: undefined,
                    visible: true
                },
                onClickOpenUrl: {
                    type: 'textarea',
                    disabled: false,
                    value: undefined,
                    visible: true
                },
                overlapping: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                statistics: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                alwaysOnTop: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                setLayerUp: {
                    type: 'event',
                    disabled: false,
                    group: 'layer',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setLayerDown: {
                    type: 'event',
                    disabled: false,
                    group: 'layer',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                stretchWidth: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                stretchHeight: {
                    type: 'checkbox',
                    disabled: false,
                    checked: false,
                    visible: true
                },
                unsetStick: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: true,
                    visible: true
                },
                setStickToCenterLeft: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToCenterTop: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToCenter: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToCenterBottom: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToCenterRight: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToTopLeft: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToBottomLeft: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToTopRight: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                },
                setStickToBottomRight: {
                    type: 'event',
                    disabled: false,
                    group: 'stick',
                    events: ['click'],
                    checked: false,
                    visible: true
                }
            };

            /**
             * Render form element
             * @param {{}} hash
             * @param {string} title
             * @private
             * @return {Array}
             */
            function _renderForm(hash, title) {

                /**
                 * Define dom nodes
                 * @type {Array}
                 */
                var nodes = [];

                for (var index in hash) {

                    if (hash.hasOwnProperty(index)) {

                        // Define node
                        var node = hash[index];

                        /**
                         * Define text
                         * @type {string}
                         */
                        var text = index.replace(
                            title.replace(/ /g, '').toLowerCase(), ''
                        ).toPoint().humanize();

                        nodes.push(
                            $('<li />').
                                addClass([
                                    title.humanize().toClassName() + '-prefs',
                                    node.type,
                                    node.visible ? '' : 'hidden'
                                ].join(' ')).append(
                                this.getNodeRenderer(node, text, index)
                            )
                        );
                    }
                }

                return nodes;
            }

            /**
             * Render node
             * @param type
             * @param prefs
             * @param {string} title
             * @param {boolean} [isOpened]
             * @returns {*|jQuery}
             * @private
             */
            function _renderNode(type, prefs, title, isOpened) {

                return $('<li />').append(
                    this.renderFieldSet(
                        title,
                        $('<ul />').addClass(type).append(
                            _renderForm.bind(this)(prefs, title)
                        ),
                        isOpened
                    )
                ).addClass('auto');
            }

            /**
             * Merge prefs
             * @param defaults
             * @param prefs
             * @returns {{}}
             * @private
             */
            function _mergePrefs(defaults, prefs) {

                for (var index in prefs) {

                    if (prefs.hasOwnProperty(index)) {

                        if (defaults.hasOwnProperty(index)) {

                            defaults[index].value = prefs[index];

                        } else {

                            // Reset checked
                            for (var key in defaults) {

                                if (defaults.hasOwnProperty(key)) {

                                    if (defaults[key].group === index) {

                                        defaults[key].checked = false;
                                    }
                                }
                            }

                            if (defaults.hasOwnProperty(prefs[index])) {

                                // check input-radio
                                defaults[prefs[index]].checked = true;
                            }
                        }
                    }
                }

                return defaults;
            }

            this.$.append(
                this.renderInteractions([
                    _renderNode.bind(this)(
                        'default',
                        _mergePrefs(
                            defaultPrefs,
                            this.view.scope.controller.getContainment().config.preferences
                        ),
                        'Widget'
                    ),
                    _renderNode.bind(this)(
                        'content', data,
                        this.view.scope.constructor.prototype.name.humanize(), true
                    )
                ])
            );
        },

        /**
         * Render Interactions
         * @member WidgetPreferences
         * @param {Array} nodes
         * @returns {*}
         */
        renderInteractions: function renderInteractions(nodes) {

            /**
             * Define controller
             * @type {*}
             */
            var controller = this.view.controller;

            /**
             * Define interactions container
             * @type {*|jQuery}
             */
            var $ul = $('<ul />').addClass('interactions');

            /**
             * Define dom prefs
             */
            var column = controller.getDOMPreferences('column'),
                row = controller.getDOMPreferences('row'),
                width = controller.getDOMPreferences('relWidth'),
                height = controller.getDOMPreferences('relHeight');

            nodes.push(
                $('<li />').append(
                    this.renderFieldSet(
                        'Interactions',
                        $ul.append([
                            this.renderPrefs('Column', column),
                            this.renderPrefs('Width', width),
                            this.renderPrefs('Row', row),
                            this.renderPrefs('Height', height)
                        ])
                    )
                ).addClass('auto')
            );

            return nodes;
        },

        /**
         * Render move
         * @member WidgetPreferences
         * @param {string} side
         * @param value
         * @returns {*|jQuery}
         */
        renderPrefs: function renderPrefs(side, value) {

            /**
             * Define move
             * @type {*[]}
             */
            var $move = this.renderTextField({
                name: side.toLowerCase(),
                text: side,
                placeholder: side,
                value: value,
                disabled: true,
                visible: true
            });

            return $('<li />').append($move);
        }

    }, BasePreferences.prototype);
});