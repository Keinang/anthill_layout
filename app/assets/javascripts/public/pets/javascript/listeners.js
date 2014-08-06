/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'config/application',
        'config/workspace',
        'config/page',
        'config/layout',
        'config/widget'
    ],

    /**
     * @param {App} Application
     * @param {Workspace} Workspace
     * @param {Page} Page
     * @param {Layout} Layout
     * @param {Widget} Widget
     */
        function defineListeners(Application, Workspace, Page, Layout, Widget) {

        /**
         * Load listeners
         */
        Application.prototype.globalListeners = Application.prototype.globalListeners || {};
        Workspace.prototype.globalListeners = Workspace.prototype.globalListeners || {};
        Page.prototype.globalListeners = Page.prototype.globalListeners || {};
        Layout.prototype.globalListeners = Layout.prototype.globalListeners || {};
        Widget.prototype.globalListeners = Widget.prototype.globalListeners || {};

        /**
         * Define Application Global listeners
         * @memberOf App
         * @type {{successRendered: {name: string, callback: function}}}
         * @type {{createAuthorPanel: {name: string, callback: function}}}
         */
        Application.prototype.globalListeners = {

            successRendered: {
                name: "success.rendered",
                callback: function successRenderedCallback() {

                    this.permission.check({
                        capability: 'createAuthorPanel',
                        callback: function () {

                            this.observer.publish(
                                this.eventmanager.eventList.createAuthorPanel
                            );

                        }.bind(this)
                    });
                }
            },

            createAuthorPanel: {
                name: 'create.author.panel',
                callback: function createAuthorPanelCallback() {

                    /**
                     * Define app
                     * @type {*}
                     */
                    var app = this;

                    require([
                        'plugins/panel/panel',
                        'plugins/bar/bar',
                        'plugins/gallery/gallery',
                        'plugins/page.data/page.data',
                        'plugins/workspace.data/workspace.data',
                        'plugins/widget.rules/widget.rules'
                    ], function definePanel(Panel, Bar, Gallery, PageData, WorkspaceData, WidgetRules) {

                        /**
                         * Init panel plugin
                         * @type {Panel}
                         */
                        app.panels.author = new Panel({
                            config: {renderAt: 'right'},
                            modules: [Gallery, PageData, WorkspaceData, WidgetRules],
                            packages: [Bar]
                        }, app);

                        app.panels.author.view.render();
                    });
                }
            }
        };

        /**
         * Define Workspace Global listeners
         * @memberOf Workspace
         * @type {{}}
         */
        Workspace.prototype.globalListeners = {

        };

        /**
         * Define Page Global listeners
         * @memberOf Page
         * @type {{}}
         */
        Page.prototype.globalListeners = {

        };

        /**
         * Define Widget Global listeners
         * @memberOf Widget
         * @type {{}}
         */
        Widget.prototype.globalListeners = {

        };

    }
);