/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/swf/element/swf.element',
    'plugins/widgets/swf/element/swf.preferences.element',
    'plugins/widgets/swf/element/swf.rules.element'
], function defineSwfView(BaseView, Header, Footer, SwfElement, SwfPreferencesElement, SwfRulesElement) {

    /**
     * Define view
     * @class SwfView
     * @extends BaseView
     * @constructor
     */
    var SwfView = function SwfView() {
    };

    return SwfView.extend('SwfView', {

        /**
         * Render swf element
         * @member SwfView
         */
        renderSwf: function renderSwf() {

            this.header(Header, this.elements.$container);

            /**
             * Define $swf
             * @type {SwfElement}
             */
            this.elements.$swf = new SwfElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member SwfView
         * @returns {SwfPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Swf Preferences Element
             * @type {SwfPreferencesElement}
             */
            this.elements.$preferences = new SwfPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member SwfView
         * @param widgetRules
         * @param contentRules
         * @returns {SwfRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Swf Rules Element
             * @type {SwfRulesElement}
             */
            this.elements.$rules = new SwfRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render swf
         * @member SwfView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSwf.bind(this)
            );
        }

    }, BaseView.prototype)

});