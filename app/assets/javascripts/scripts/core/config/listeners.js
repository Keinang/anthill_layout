/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'require',
    'modules/Logger'
], function defineListeners(require, Logger) {

    require(
        [
            './listeners/application.listeners',
            './listeners/workspace.listeners',
            './listeners/page.listeners',
            './listeners/layout.listeners',
            './listeners/widget.listeners'
        ],

        /**
         * Define listeners
         * @param {Application} Application
         * @param {Workspace} Workspace
         * @param {Page} Page
         * @param {Layout} Layout
         * @param {Widget} Widget
         */
        function defineRequiredModules(Application, Workspace, Page, Layout, Widget) {

            /**
             * Define logger instance
             * @type {Logger}
             */
            var logger = new Logger({
                config: {
                    logger: {
                        show: true,
                        namespaces: false,
                        type: {
                            debug: false,
                            log: false,
                            info: false,
                            error: true,
                            warn: true
                        }
                    }
                }
            });

            logger.puts.bind(logger, 'debug')(
                'Define local listeners', [
                    Application.prototype.localListeners,
                    Workspace.prototype.localListeners,
                    Page.prototype.localListeners,
                    Layout.prototype.localListeners,
                    Widget.prototype.localListeners
                ]
            );
        }
    );
});