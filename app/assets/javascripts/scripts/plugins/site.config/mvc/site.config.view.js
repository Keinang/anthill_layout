/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/View',
    'plugins/rules/rules',
    'element/header.element',
    'element/footer.element',
    'plugins/site.config/element/site.config.content.element',
    'plugins/site.config/element/site.config.element'
], function defineSiteConfigView(AntHill, BaseView, BaseRules, Header, Footer, SiteConfigContentElement, SiteConfigElement) {

    /**
     * Define view
     * @class SiteConfigView
     * @constructor
     * @extends BaseView
     * @extends BaseRules
     */
    var SiteConfigView = function SiteConfigView() {
    };

    return SiteConfigView.extend('SiteConfigView', {

        /**
         * Render SiteConfig
         * @member SiteConfigView
         * @returns {boolean}
         */
        renderSiteConfig: function renderSiteConfig() {

            this.header(Header, this.elements.$container).setText(
                'Site Preferences'
            );

            /**
             * Define SiteConfig element
             * @type {SiteConfigElement}
             */
            this.elements.$siteconfig = new SiteConfigElement(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$siteconfig.getFooter()
            );
        },

        /**
         * Render site.config content
         * @member SiteConfigView
         * @param data
         * @returns {boolean}
         */
        renderContent: function renderContent(data) {

            /**
             * Define content
             * @type {{}}
             */
            this.elements.items = {};
            this.elements.$siteconfig.empty();

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Render item
                     * @type {SiteConfigContentElement}
                     */
                    var $item = new SiteConfigContentElement(this, {
                        style: [
                            'content',
                            data[index].title.toDash()
                        ].join(' '),
                        $container: this.elements.$siteconfig.$,
                        data: data[index]
                    });

                    this.elements.items[$item.id] = $item;
                }
            }

            this.elements.$siteconfig.scrollCover(
                this.elements.$container.$
            );

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$siteconfig.getFooter()
            );
        },

        /**
         * Show Preferences
         * @member SiteConfigView
         * @param opts
         * @param {Array} map
         */
        showPreferences: function showPreferences(opts, map) {

            /**
             * Define $html
             * @type {string}
             */
            var $html = this.elements.$siteconfig.getPreferencesHtml(map);

            /**
             * Define buttons
             * @type {*}
             */
            var buttons = {
                approve: {
                    text: 'OK',
                    events: {
                        click: 'approveUpdatePreferences'
                    }
                },
                reject: {
                    text: 'Cancel',
                    events: {
                        click: ['revertSiteConfig', 'rejectModalEvent']
                    }
                }
            };

            /**
             * Define page
             * @type {Page}
             */
            var page = this.controller.getPage();

            /**
             * Get Workspace
             * @type {Workspace}
             */
            var workspace = this.controller.getWorkspace();

            this.modalDialog({
                style: [
                    opts.title.toDash(), 'preferences'
                ].join(' '),
                $container: page.view.get$item().$,
                type: 'info',
                title: opts.title,
                text: workspace.model.getUUID(),
                html: $html,
                cover: true,
                buttons: buttons
            });
        },

        /**
         * Render site.config
         * @member SiteConfigView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSiteConfig.bind(this)
            );
        }

    }, AntHill.prototype, BaseView.prototype, BaseRules.prototype)

});