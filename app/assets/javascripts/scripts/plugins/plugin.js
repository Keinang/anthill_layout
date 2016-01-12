/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 10:28 PM
 */
define([
    'config/anthill',
    'modules/Controller'
], function definePluginControllerBase(AntHill, BaseController) {

    /**
     * Define Plugin controller
     * @class PluginController
     * @extends AntHill
     * @extends BaseController
     * @constructor
     */
    var PluginController = function PluginController() {
    };

    PluginController.extend('PluginController', {

        /**
         * Get page data
         * @memberOf PluginController
         * @returns {Panel}
         */
        getAuthorPanel: function getAuthorPanel() {
            return this.root().panels.author;
        },

        /**
         * Get module by name
         * @memberOf PluginController
         * @returns {*}
         */
        getModuleByName: function getModuleByName(name) {

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getAuthorPanel();

            return panel.model.getModule(
                panel.model.getModuleIndex(name)
            ).module;
        },

        /**
         * Get package by name
         * @memberOf PluginController
         * @returns {*}
         */
        getPackageByName: function getPackageByName(name) {

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getAuthorPanel();

            return panel.model.getPackage(
                panel.model.getPackageIndex(name)
            );
        },

        /**
         * Get widget rules
         * @memberOf PluginController
         * @returns {WidgetRules}
         */
        getWidgetRules: function getWidgetRules() {

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getAuthorPanel();

            return panel.model.getModule(
                panel.model.getModuleIndex('widget-rules')
            ).module;
        },

        /**
         * Get gallery module
         * @memberOf PluginController
         * @return {Gallery}
         */
        getGalleryModule: function getGalleryModule() {

            /**
             * Get panel
             * @type {Panel}
             */
            var panel = this.getAuthorPanel();

            /**
             * Get gallery
             * @type {Gallery}
             */
            var gallery = (panel.model.getModule(
                panel.model.getModuleIndex('gallery')
            ) || {}).module;

            if (!gallery) {
                this.logger.warn('Unable to locate gallery module');
            }

            return gallery;
        },

        /**
         * Check if data was existing
         * @memberOf PluginController
         * @returns {boolean}
         */
        isDataNotExist: function isDataNotExist() {
            return this.base.lib.hash.isHashEmpty(
                this.scope.view.elements.items
            );
        },

        /**
         * Update translations
         * @memberOf PluginController
         * @param {string} i18nPath
         * @param {Function|_successRenderedCallback} callback
         */
        updateTranslations: function updateTranslations(i18nPath, callback) {

            /**
             * Define this reference
             * @type {*}
             */
            var plugin = this;

            require([i18nPath], function defineEnUs(EnUs) {

                plugin.i18n.updateData(EnUs);

                if (_.isFunction(callback)) {
                    callback();
                }
            });
        },

        /**
         * Load module content
         * @memberOf PluginController
         * @param {boolean} opened
         * @param {boolean} [force]
         */
        loadModuleContent: function loadModuleContent(opened, force) {

            if (opened) {
                this.view.renderContent(
                    this.controller.getModuleData(),
                    force
                );
            }
        },

        /**
         * Locate element
         * @param $element
         * @param {*} e
         * @returns {boolean}
         */
        locateElement: function locateElement($element, e) {

            /**
             * Hide border on locate element
             * @private
             */
            function _hideBorder() {
                $element.$.removeClass('select');
            }

            $element.$.parent().children().removeClass('select');
            $element.$.addClass('select');

            if (e.type === 'mouseleave' || e.type === 'click') {
                setTimeout(_hideBorder, 300);
            }
        },

        /**
         * Define content referrer
         * @memberOf PluginController
         * @param {Widget} widget
         */
        defineContentReferrer: function defineContentReferrer(widget) {

            /**
             * Define content
             * @type {*}
             */
            var content = widget.controller.getContent();

            if (!content) {
                widget.logger.warn('Undefined content');
                return false;
            }

            content.observer.publish(
                content.eventmanager.eventList.defineReferrer,
                this.scope
            );
        },

        /**
         * Get resource class name
         * @memberOf PluginController
         * @param {string} resource
         */
        getResourceClassName: function getResourceClassName(resource) {
            return resource.replace(/\./g, '-');
        }

    }, AntHill.prototype, BaseController.prototype);

    /**
     * Copy successRendered
     * @type {Function}
     */
    var successRenderedSuper = PluginController.prototype.successRendered.clone();

    /**
     * Overwrite success rendered
     * @memberOf PluginController
     * @param {function} [callback]
     */
    PluginController.prototype.successRendered = function successRendered(callback) {

        /**
         * Define callback
         * @returns {boolean}
         * @param {PluginController} plugin
         * @private
         */
        function _successRenderedCallback(plugin) {

            if (_.isFunction(callback)) {

                var html = plugin.model.getConfig('html');

                if (_.isUndefined(html.selector)) {

                    plugin.logger.warn('Configuration of render: false', html);
                    return false;
                }

                callback();

            } else {

                plugin.logger.warn('Callback should be function type', callback);
            }
        }

        successRenderedSuper.bind(this)();

        /**
         * Define isWidget
         * @type {*|boolean}
         */
        var isWidget = this.controller.isWidgetContent();

        if (isWidget) {

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = this.controller.getContainment();

            widget.controller.prepareRenderingContent(this, _successRenderedCallback);

        } else {

            _successRenderedCallback(this);
        }
    };

    return PluginController;
});