/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'modules/View',
        'plugins/preferences/preferences',
        'element/header.element',
        'element/footer.element',
        'plugins/workspace.data/element/workspace.data.content.element',
        'plugins/workspace.data/element/workspace.data.preferences.element',
        'plugins/workspace.data/element/workspace.data.add.page.element',
        'plugins/workspace.data/element/workspace.data.element'
    ],

    /**
     * Define WorkspaceDataView
     * @param {BaseView} BaseView
     * @param {BasePreferences} BasePreferences
     * @param {BaseView} Header
     * @param {BaseView} Footer
     * @param {WorkspaceDataContentElement} WorkspaceDataContentElement
     * @param {WorkspaceDataPreferencesElement} WorkspaceDataPreferencesElement
     * @param {WorkspaceDataAddPageElement} WorkspaceDataAddPageElement
     * @param {WorkspaceDataElement} WorkspaceDataElement
     * @returns {*}
     */
        function defineWorkspaceDataView(BaseView, BasePreferences, Header, Footer, WorkspaceDataContentElement, WorkspaceDataPreferencesElement, WorkspaceDataAddPageElement, WorkspaceDataElement) {

        /**
         * Define view
         * @class WorkspaceDataView
         * @extends BaseView
         * @constructor
         */
        var WorkspaceDataView = function WorkspaceDataView() {
        };

        return WorkspaceDataView.extend('WorkspaceDataView', {

            /**
             * Render WorkspaceData
             * @member WorkspaceDataView
             * @returns {boolean}
             */
            renderWorkspaceData: function renderWorkspaceData() {

                if (this.isCached('$workspacedata', WorkspaceDataElement)) {
                    return false;
                }

                this.header(Header, this.elements.$container).setText(
                    'Workspace Pages'
                );

                /**
                 * Define WorkspaceData element
                 * @type {WorkspaceDataElement}
                 */
                this.elements.$workspacedata = new WorkspaceDataElement(this, {
                    id: this.createUUID(),
                    $container: this.elements.$container.$
                });

                this.footer(Footer, this.elements.$container).setHtml(
                    this.elements.$workspacedata.getFooter()
                );
            },

            /**
             * Render workspace.data content
             * @member WorkspaceDataView
             * @param data
             * @returns {boolean}
             */
            renderContent: function renderContent(data) {

                /**
                 * Define content
                 * @type {{}}
                 */
                this.elements.items = {};

                this.elements.$workspacedata.empty();
                this.renderCreatePage();

                var index, counter = 1;

                for (index in data) {

                    if (data.hasOwnProperty(index)) {

                        /**
                         * Render item
                         * @type {WorkspaceDataContentElement}
                         */
                        var $item = new WorkspaceDataContentElement(this, {
                            style: 'content',
                            id: [
                                data[index].model.getConfig('uuid'),
                                'workspace-data-view'
                            ].join('-'),
                            $container: this.elements.$workspacedata.$,
                            data: data[index],
                            counter: counter
                        });

                        counter += 1;

                        this.elements.items[$item.id] = $item;
                    }
                }

                this.elements.$workspacedata.scrollCover(
                    this.elements.$container.$
                );

                this.footer(Footer, this.elements.$container).setHtml(
                    this.elements.$workspacedata.getFooter()
                );
            },

            /**
             * Render create new page
             * @member WorkspaceDataView
             */
            renderCreatePage: function renderCreatePage() {

                /**
                 * Render add new pages
                 * @type {WorkspaceDataAddPageElement}
                 */
                this.$addPage = new WorkspaceDataAddPageElement(this, {
                    style: 'add-page',
                    $container: this.elements.$workspacedata.$,
                    events: {
                        click: ['createPage']
                    }
                });
            },

            /**
             * Show preferences
             * @member WorkspaceDataView
             * @param config
             */
            showPreferences: function showPreferences(config) {

                /**
                 * Define scope
                 * @type {WorkspaceData}
                 */
                var scope = this.scope;

                scope.observer.publish(
                    scope.eventmanager.eventList.setActiveContent,
                    config.uuid
                );

                this.openPreferences({
                    config: config,
                    $html: this.controller.definePreferences(config.uuid).$,
                    style: 'workspace-data-prefs preferences',
                    title: 'Page preferences',
                    buttons: {
                        destroyPageWidgets: {
                            text: 'Destroy widgets',
                            events: {
                                click: 'destroyPageWidgets'
                            }
                        }
                    }
                });
            },

            /**
             * Render Prefs
             * @member WorkspaceDataView
             * @param {Page} page
             * @returns {WorkspaceDataPreferencesElement}
             */
            renderPreferences: function renderPreferences(page) {

                /**
                 * Define WorkspaceData Preferences Element
                 * @type {WorkspaceDataPreferencesElement}
                 */
                this.elements.$preferences = new WorkspaceDataPreferencesElement(this, {
                    data: page.model.getConfig('preferences'),
                    page: page
                });

                return this.elements.$preferences;
            },

            /**
             * Render workspace.data
             * @member WorkspaceDataView
             */
            render: function render() {

                this.scope.observer.publish(
                    this.scope.eventmanager.eventList.successRendered,
                    this.renderWorkspaceData.bind(this)
                );
            }

        }, BaseView.prototype, BasePreferences.prototype)
    }
);