/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery',
    'config/anthill',
    'element/modal.element',
    'element/header.element',
    'element/footer.element',
    'element/filter.element'
], function defineBaseView($, AntHill, ModalElement, Header, Footer, Filter) {

    /**
     * Define base view
     * @class BaseView
     * @extends AntHill
     * @constructor
     */
    var BaseView = function BaseView() {

        /**
         * Define elements
         * @property BaseView
         * @type {Object}
         */
        this.elements = {};

        /**
         * Define scope
         * @property BaseView
         * @type {*}
         */
        this.scope = undefined;
    };

    return BaseView.extend('BaseView', {

        /**
         * Get config HTML
         * @memberOf BaseView
         * @param {string} [key]
         * @returns {*}
         */
        getConfigHTML: function getConfigHTML(key) {

            /**
             * Define model
             * @type {BaseModel}
             */
            var model = this.scope.model;

            return key ? model.getConfig('html/' + key) :
                model.getConfig('html');
        },

        /**
         * Get item.$
         * @memberOf BaseView
         * @returns {BaseElement}
         */
        get$item: function get$item() {
            return this.elements['$' + this.scope.name.toLowerCase()];
        },

        /**
         * Get item DOM Element
         * @memberOf BaseView
         * @returns {BaseElement}
         */
        getDomElement: function getDomElement() {
            return this.get$item().$[0];
        },

        /**
         * Get item DOM info
         * @memberOf BaseView
         * @returns {ClientRect}
         */
        getDomData: function getDomData() {
            return this.getDomElement().getBoundingClientRect();
        },

        /**
         * Create style
         * @memberOf BaseView
         * @returns {string}
         */
        createStyle: function createStyle() {
            return [
                this.getContainerClassName(),
                this.getConfigHTML('style')
            ].join(' ');
        },

        /**
         * Create UUID
         * @memberOf BaseView
         * @returns {string}
         */
        createUUID: function createUUID() {
            return [
                this.scope.model.getUUID(),
                this.getContainerClassName()
            ].join('-');
        },

        /**
         * Render UUID
         * @memberOf BaseView
         * @param id
         * @returns {*|string}
         */
        renderUUID: function renderUUID(id) {
            return id || [
                    this.base.lib.generator.UUID(),
                    this.name.toDash()
                ].join('-');
        },

        /**
         * Define $container
         * @memberOf BaseView
         * @param $container
         */
        defineContainer: function defineContainer($container) {

            /**
             * Define container
             * @property BaseView.elements
             */
            this.elements.$container = $container;
        },

        /**
         * Get container class name
         * @memberOf BaseView
         * @returns {string}
         */
        getContainerClassName: function getContainerClassName() {
            return this.getConfigHTML().selector;
        },

        /**
         * Get container selector
         * @memberOf BaseView
         * @returns {*|jQuery}
         */
        getContainerSelector: function getContainerSelector() {
            var containment = this.scope.controller.getContainment();
            return containment.view.get$item().getElementContainer(
                containment.model.getItemNameSpace()
            );
        },

        /**§§§
         * Check if element cached
         * @memberOf BaseView
         * @param $element
         * @param Constructor
         * @returns {boolean}
         */
        isCached: function isCached($element, Constructor) {

            /**
             * Define cached element
             * @type {boolean}
             */
            var cached = this.elements[$element] instanceof Constructor;

            if (cached) {

                this.scope.logger.debug(
                    this.i18n.t('element.already.rendered').
                        replace(/\{0}/, Constructor.name)
                );
            }

            return cached;
        },

        /**
         * Check if render force
         * @memberOf BaseView
         * @returns {boolean}
         */
        isCachedItems: function isCachedItems() {

            return this.base.lib.hash.hashLength(
                    this.elements.items || {}
                ) > 0;
        },

        /**
         * Render Header
         * @memberOf BaseView
         * @param {HeaderElement} HeaderElement
         * @param $container
         * @returns {HeaderElement}
         */
        header: function header(HeaderElement, $container) {

            /**
             * Define $header
             * @property BaseView.elements
             * @type {HeaderElement}
             */
            this.elements.$header = new HeaderElement(this, {
                style: [
                    this.scope.name.toDash(),
                    'header'
                ].join('-'),
                $container: $container.$,
                append: false
            });

            /**
             * Define scope
             * @type {{}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.successRenderHeader, [
                    this.elements.$header,
                    this.getConfigHTML('header')
                ]
            );

            return this.elements.$header;
        },

        /**
         * Render Footer
         * @memberOf BaseView
         * @param {FooterElement} FooterElement
         * @param $container
         * @returns {FooterElement}
         */
        footer: function footer(FooterElement, $container) {

            /**
             * Define $footer
             * @property BaseView.elements
             * @type {FooterElement}
             */
            this.elements.$footer = new FooterElement(this, {
                style: [
                    this.scope.name.toDash(),
                    'footer panel-footer'
                ].join('-'),
                $container: $container.$
            });

            /**
             * Define scope
             * @type {{}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.successRenderFooter, [
                    this.elements.$footer,
                    this.getConfigHTML('footer')
                ]
            );

            return this.elements.$footer;
        },

        /**
         * Render Header
         * @memberOf BaseView
         * @param {HeaderElement} Header
         * @param {string} title
         */
        renderHeader: function renderHeader(Header, title) {
            this.header(Header, this.elements.$container).setText(title);
        },

        /**
         * Render Footer
         * @memberOf BaseView
         * @param {FooterElement} Footer
         * @param {object} $element
         */
        renderFooter: function renderFooter(Footer, $element) {
            this.footer(Footer, this.elements.$container).setHtml(
                $element.getFooter()
            );
        },

        /**
         * Render filter
         * @memberOf BaseView
         * @param {function} [callback]
         * @param {boolean} [enter]
         */
        renderFilter: function renderFilter(callback, enter) {

            /**
             * Define Search element
             * @property BaseView.elements
             * @type {FilterElement}
             */
            this.elements.$filter = new Filter(this, {
                $container: this.elements.$container.$,
                style: [this.scope.name.toDash(), 'filter'].join(' '),
                callback: callback,
                enter: enter
            });
        },

        /**
         * Generic modal dialog window
         * @memberOf BaseView
         * @param {{
         *      [style]: String,
         *      $container,
         *      [cover]: Boolean,
         *      [coverOpacity]: Number,
         *      [autoclose]: Boolean,
         *      [closeX]: Boolean,
         *      [css],
         *      [opacityOff]: Number,
         *      [opacityOn]: Number,
         *      [title]: String,
         *      [type]: String ('info', 'success', 'warning', 'danger'),
         *      [html]: *,
         *      [text]: String,
         *      [draggable]: Boolean,
         *      [items],
         *      [position]: String ('tl/tc/tr', 'cl/cc/cr'. 'bl/bc/br'),
         *      [buttons]
         * }} opts
         */
        modalDialog: function modalDialog(opts) {

            /**
             * Define $modal
             * @property BaseView.elements
             * @type {ModalElement}
             */
            this.elements.$modal = new ModalElement(this, {
                style: opts.style,
                $container: opts.$container,
                cover: opts.cover,
                coverOpacity: opts.coverOpacity,
                autoclose: opts.autoclose,
                closeX: opts.closeX,
                css: opts.css,
                opacityOff: opts.opacityOff,
                opacityOn: opts.opacityOn,
                title: opts.title,
                type: opts.type,
                html: opts.html,
                text: opts.text,
                draggable: opts.draggable,
                items: opts.items,
                position: opts.position,
                buttons: opts.buttons
            });
        },

        /**
         * Get $modal element
         * @memberOf BaseView
         * @returns {ModalElement}
         */
        get$modal: function get$modal() {
            return this.elements.$modal;
        },

        /**
         * Generic button
         * @memberOf BaseView
         * @param {Function|ButtonElement} ButtonElement
         * @param {$container, [$htmlElement], style, text, disabled, events} opts
         * @param {*} store
         */
        button: function button(ButtonElement, opts, store) {

            /**
             * Get BaseView
             * @type {BaseView}
             */
            var view = this;

            $.each(
                view.base.define(opts, {}, true),
                function _eachButton(i, button) {

                    /**
                     * Define button
                     * @type {ButtonElement}
                     */
                    store[i] = new ButtonElement(view, {
                        $container: button.$container,
                        $htmlElement: button.$htmlElement,
                        style: i.toDash(),
                        text: button.text,
                        disabled: button.disabled,
                        events: button.events
                    });

                    $.each(button.events || {}, function _eachEvent(key, event) {
                        store[i].$.on(
                            key + '.afterCallback',
                            store[i].afterEventsCallback.bind(store[i])
                        );
                    });

                    view.scope.logger.debug(
                        'Button created', store[i]
                    );
                }
            );
        },

        /**
         * Define cover
         * @memberOf BaseView
         * @param CoverElement
         * @param opts
         * @returns {CoverElement}
         */
        cover: function cover(CoverElement, opts) {
            return new CoverElement(this, {
                $container: opts.$container,
                style: opts.style,
                opacity: opts.opacity,
                events: opts.events
            });
        },

        /**
         * Locate DOM element in array
         * @memberOf BaseView
         * @param {Array} source
         * @param {string} type
         * @returns {*}
         */
        locateElement: function locateElement(source, type) {
            for (var i = 0, l = source.length; i < l; i++) {
                if ((source[i].tagName + '').toLowerCase() === type) {
                    return source[i];
                }
            }
            return {};
        }

    }, AntHill.prototype);
});