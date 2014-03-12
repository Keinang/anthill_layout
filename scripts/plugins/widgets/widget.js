/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/27/14
 * Time: 11:46 PM
 */

define([

], function defineWidgetControllerBase() {

    /**
     * Define Base Widget controller
     * @class WidgetController
     * @constructor
     */
    var WidgetController = function WidgetController() {

    };

    return WidgetController.extend({

        /**
         * Init widget
         */
        initWidget: function initWidget() {

            this.observer.publish(
                this.eventmanager.eventList.loadPreferences
            );

            this.observer.publish(
                this.eventmanager.eventList.successCreated
            );

            this.observer.publish(
                this.eventmanager.eventList.defineContainer
            );

            this.observer.publish(
                this.eventmanager.eventList.updateTranslations, [
                    'plugins/widgets/',
                    this.constructor.name.toLowerCase(),
                    '/translations/en-us'
                ].join('')
            );

            this.view.render();
        },

        /**
         * Define container
         */
        defineContainer: function defineContainer() {

            /**
             * Define widget
             * @type {*}
             */
            var widget = this.controller.getContainment();

            /**
             * Define $container
             * @type {modules.view.elements.$content|*|element.page.page.element}
             */
            this.view.elements.$container =
                widget.view.elements.$content;
        },

        /**
         * Get preferences
         * @returns {{}}
         */
        getPreferences: function getPreferences() {

            return this.model.preferences;
        },

        /**
         * Update prefs
         * @param $input
         */
        updatePreferences: function updatePreferences($modal) {

            var $inputs = $('input', $modal.$),
                scope = this.scope;

            $inputs.each(function each(index, input) {

                /**
                 * Transform input name
                 * @type {string|jQuery}
                 */
                var name = input.name.toCamel().capitalize();

                /**
                 * Define method name
                 * @type {string}
                 */
                var setter = 'set' + name,
                    value;

                if (typeof(this.model[setter]) === 'function') {

                    /**
                     * Define input value
                     * @type {*|jQuery}
                     */
                    value = input.value;

                    this.model[setter](value);

                    scope.observer.publish(
                        scope.eventmanager.eventList.transferPreferences,
                        [input.name, value]
                    );

                } else {

                    scope.logger.error('Undefined setter', [name, setter]);
                }

            }.bind(this));

            scope.view['render' + scope.constructor.name]();

            $modal.selfDestroy();

            this.store();
        },

        /**
         * Load prefs
         */
        loadPreferences: function loadPreferences() {

            /**
             * Load prefs
             * @type {*}
             */
            var widget = this.controller.getContainment(),
                prefs = widget.model.getConfig('preferences');

            $.each(prefs, function each(index, value) {

                /**
                 * Define method name
                 * @type {string}
                 */
                var setter = 'set' + index.toCamel().capitalize();

                if (typeof(this.model[setter]) === 'function') {

                    this.model[setter](value);

                } else {

                    this.logger.debug('Skip', setter);
                }

            }.bind(this));
        },

        /**
         * Transfer preferences to containment
         * @param index
         * @param value
         */
        transferPreferences: function transferPreferences(index, value) {

            /**
             * Define widget
             * @type {*}
             */
            var widget = this.controller.getContainment();

            /**
             * Define prefs
             * @type {{}}
             */
            var prefs = {};

            prefs[index] = value;
            widget.model.updatePreferences(prefs);
        },

        /**
         * Get DOM
         * @param type
         * @returns {*}
         */
        getDOMPreferences: function getDOMPreferences(type) {

            /**
             * Define widget
             * @type {*}
             */
            var widget = this.scope.controller.getContainment();

            return (widget.model.getDOM() || {})[type];
        }

    });

});