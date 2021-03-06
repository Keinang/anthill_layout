/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/Renderer'
], function defineBaseElement(AntHill, Renderer) {

    /**
     * Define Base element
     * @class BaseElement
     * @constructor
     * @extends AntHill
     */
    var BaseElement = function BaseElement() {
    };

    return BaseElement.extend('BaseElement', {

        /**
         * Define plugin path
         * @memberOf BaseElement
         */
        pluginPath: '../../assets/scripts/plugins',

        /**
         * Element config before build
         * @memberOf BaseElement
         * @param {BaseView} view
         * @param {{[style]: string, [uuid], [id]: boolean, [css], [events], [opacity], [id]: boolean, [disabled]: boolean}} opts
         * @param $html
         * @returns {*}
         * @protected
         */
        _config: function _config(view, opts, $html) {

            opts = opts || {};

            /**
             * Define view
             * @property BaseElement
             * @type {BaseView}
             */
            this.view = view;

            /**
             * Define style
             * @property BaseElement
             * @type {String}
             */
            this.style = opts.style || view.createStyle();

            /**
             * Define id
             * @property BaseElement
             * @type {String}
             */
            this.id = view.renderUUID(opts.uuid);

            /**
             * Define disabled
             * @property BaseElement
             * @type {boolean}
             */
            this.disabled = this.base.defineBoolean(
                opts.disabled, false, true
            );

            /**
             * Define events
             * @property BaseElement
             * @type {*}
             */
            this.events = opts.events;

            /**
             * Define opacity
             * @memberOf BaseElement
             * @type {*|number}
             */
            this.opacity = opts.opacity || 1.0;

            /**
             * Define CSS
             * @property BaseElement
             * @type {*}
             */
            this.css = this.base.define(opts.css, {}, true);

            /**
             * Define jQuery element
             * @property BaseElement
             */
            this.$ = $html.addClass(this.style).css(this.css);

            if (opts.id) {
                this.$.attr({id: this.id});
            }

            this.view.controller.updateCache(this.id, this);

            // Get scope
            var scope = this.view.scope;
            scope.observer.publish(
                scope.eventmanager.eventList.successCreateElement,
                this
            );

            return this;
        },

        /**
         * Get $element by uuid
         * @param {string} uuid
         * @returns {*}
         */
        getElementByUuid: function getElementByUuid(uuid) {
            return this.view.controller.getCache(uuid);
        },

        /**
         * Bind element events
         * @memberOf BaseElement
         */
        bindEvents: function bindEvents() {

            var scope = this.view.scope,
                $element = this.$;

            $.each(
                this.base.define(this.events, [], true),
                function each(index, event) {
                    scope.eventmanager.onEvent.bind({
                        scope: scope,
                        $: $element
                    })(event, index);
                }
            );
        },

        /**
         * Get element container
         * @memberOf BaseElement
         * @param {string} title
         * @returns {*}
         */
        getElementContainer: function getElementContainer(title) {
            return this.$.find('.' + title + 's');
        },

        /**
         * Get text metrics
         * @memberOf BaseElement
         * @param $element
         * @return {Object}
         */
        textMetrics: function textMetrics($element) {

            // Define new div
            var $div = $('<div />').appendTo('body');

            $div.css({
                position: 'absolute',
                left: -1000,
                top: -1000,
                display: 'none'
            });

            $div.html($element.html());

            var styles = [
                'font-size',
                'font-style',
                'font-weight',
                'font-family',
                'line-height',
                'text-transform',
                'letter-spacing'
            ];

            $(styles).each(function textMetricsLoop() {
                var s = this.toString();
                $div.css({
                    s: $element.css(s)
                });
            });

            /**
             * Set metrics
             * @type {{height: (*|jQuery), width: (*|jQuery)}}
             */
            var metrics = {
                height: $div.outerHeight(true),
                width: $div.outerWidth(true)
            };

            $div.remove();

            return metrics;
        },

        /**
         * Centralize element into container
         * @memberOf BaseElement
         * @param {{$container, $item, css, position: String}} opts
         * Position options:
         *      ['tl' 'tc' 'tr']
         *      ['cl' 'cc' 'cr']
         *      ['bl' 'bc' 'br']
         * @returns {opts.$item}
         */
        setPosition: function setPosition(opts) {

            var rectC = opts.$container[0].getBoundingClientRect(),
                cWidth = rectC.width,
                cHeight = rectC.height,

                $item = opts.$item,
                rectI = $item[0].getBoundingClientRect(),
                eWidth = rectI.width,
                eHeight = rectI.height;

            var offsetLeft = 0,
                offsetTop = 0;

            if ($item.css('position') === 'fixed') {
                offsetLeft = rectC.left;
                offsetTop = rectC.top;
            }

            var top = 'auto',
                left = 'auto',
                mw = cWidth - eWidth,
                cw = offsetLeft + (mw / 2),
                mh = cHeight - eHeight,
                ch = offsetTop + (mh / 2);

            if (opts.position == 'tl') {
            } else if (opts.position == 'tc') {
                left = cw;
            } else if (opts.position == 'tr') {
                left = mw;
            } else if (opts.position == 'cl') {
                top = ch;
            } else if (opts.position == 'cc') {
                top = ch;
                left = cw;
            } else if (opts.position == 'cr') {
                top = ch;
                left = mw;
            } else if (opts.position == 'bl') {
                top = mh;
            } else if (opts.position == 'bc') {
                top = mh;
                left = cw;
            } else if (opts.position == 'br') {
                top = mh;
                left = mw;
            }

            /**
             * Define css
             */
            var css = $.extend({
                left: left,
                top: top
            }, opts.css || {});

            return $item.css(css);
        },

        /**
         * Destroy element before create
         * @memberOf BaseElement
         * @param {Boolean} destroy
         */
        destroyB4Create: function destroyB4Create(destroy) {

            if (this.base.defineBoolean(destroy, false, true)) {

                // Get scope
                var scope = this.view.scope;
                scope.observer.publish(
                    scope.eventmanager.eventList.successDestroyElement,
                    this
                );

                $('.' + this.$.attr('class').replace(/ /g, '.'), this.$container).remove();
            }
        },

        /**
         * Build element
         * @memberOf BaseElement
         * @param {{$container, [append]: boolean, [destroy]: boolean, [callback]}} opts
         * @returns {*}
         */
        build: function build(opts) {

            opts = this.base.define(opts, {}, true);

            /**
             * Define append/prepend
             */
            var append = this.base.defineBoolean(opts.append, true, true);

            if (this.$) {

                /**
                 * Define $container
                 * @property BaseElement
                 * @type {*|jQuery|HTMLElement}
                 */
                this.$container = $(opts.$container);

                this.destroyB4Create(!!opts.destroy);

                this.$[append ? 'appendTo' : 'prependTo'](opts.$container);

                if (_.isFunction(opts.callback)) {
                    opts.callback();
                }
            }

            this.bindEvents();

            // Get scope
            var scope = this.view.scope;
            scope.observer.publish(
                scope.eventmanager.eventList.successBuildElement,
                this
            );

            return this;
        },

        /**
         * Dynamic CSS
         * @memberOf BaseElement
         * @param {String} type
         * @param {{
         *      [type]: string,
         *      [rel]: string,
         *      [media]: string,
         *      [resource]: string
         * }} [opts]
         */
        addCSS: function addCSS(type, opts) {

            // Get link name
            var linkName = type + 'LinkCSS',
                scope = this.view.scope;

            if (this[linkName]) {
                scope.logger.debug('CSS already loaded');
                return false;
            }

            opts = this.base.define(opts, {}, true);
            opts.resource = this.base.define(opts.resource, '', true);

            /**
             * Get widget
             * @type {Widget|*}
             */
            var item = scope.controller.getContainment();

            /**
             * Create url
             * @type {string}
             */
            var url = this.pluginPath + opts.resource + ('/' + type).repeat(2) + '.css';

            if (item.controller.isWidget() && item.controller.isExternalContent()) {
                url = item.controller.fetchExternalResource() + type + '.css';
            }

            // Get cache
            var cache = item.controller.root().cache;

            if (cache.css && cache.css[url]) {
                item.logger.debug('CSS already loaded', cache.css[url]);
                cache.css[url].push(this);

                this[type + 'LinkCSS'] = {
                    path: url,
                    link: ''
                };

                return false;
            }

            /**
             * Define css link instance
             * @type {*|jQuery|HTMLElement}
             */
            this[type + 'LinkCSS'] = {
                path: url,
                link: this.createLinkCss({
                    href: url,
                    type: opts.type,
                    rel: opts.rel,
                    media: opts.media
                })
            };

            item.controller.updateCacheCss(url, [this]);
        },

        /**
         * Define create script
         * @param opts
         * @param {HTMLElement} [container]
         * @param {string} [code]
         */
        createScript: function createScript(opts, container, code) {

            opts = opts || {};

            // Create script node
            var s = document.createElement('script');

            s.setAttribute('type', 'text/javascript');

            for (var index in opts) {
                if (opts.hasOwnProperty(index)) {
                    s.setAttribute(index, opts[index]);
                }
            }

            if (typeof(code) !== 'undefined') {
                try {
                    s.appendChild(document.createTextNode(code));
                } catch (e) {
                    s.text = code;
                }
            }

            (container || document.body).appendChild(s);
        },

        /**
         * Create link css
         * @memberOf BaseElement
         * @param opts
         * @returns {HTMLElement|boolean} link
         */
        createLinkCss: function createLinkCss(opts) {

            /**
             * Define defaults
             * @type {{type: string, rel: string, media: string}}
             */
            var defaults = {
                type: 'text/css',
                rel: 'stylesheet',
                media: 'all'
            };

            /**
             * Init Link
             * @type {HTMLElement|{
             *      type: string,
             *      rel: string,
             *      media: string,
             *      href: string,
             *      id: string
             * }}
             */
            var link = document.createElement("link");

            link.type = opts.type || defaults.type;
            link.rel = opts.rel || defaults.rel;
            link.media = opts.media || defaults.media;
            link.href = opts.href;

            if ($('link[href="' + link.href + '"]').length) {

                this.view.scope.logger.warn('Link already exist');
                return link;
            }

            document.getElementsByTagName("head")[0].appendChild(link);

            return link;
        },

        /**
         * Destroy element
         * @memberOf BaseElement
         * @returns {*}
         */
        destroy: function destroy() {

            // Get scope
            var element = this;

            if (!element.view) {
                return false;
            }

            var scope = element.view.scope;

            if (element.$) {
                scope.logger.debug('Destroy element', element);
                element.$.off().remove();
            }

            // Get cache
            var cache = scope.controller.root().cache,
                css = cache.css || {},
                item, link;

            // Remove css
            for (var index in element) {
                if (element.hasOwnProperty(index) && index.match(/LinkCSS/)) {
                    item = element[index];
                    link = css[item.path] || [];
                    if (link.length === 1) {
                        scope.logger.debug('Destroy element CSS', item.link);
                        item.link.parentNode.removeChild(item.link);
                        delete css[item.path];
                    }
                    if (link.length > 1) {
                        css[item.path] = _.reject(link, function (css) {
                            return element.id === css.id;
                        });
                    }
                }
            }

            // Remove cache
            delete cache[element.id];

            // Delete element
            _.each(element.view.elements, function (val, key) {
                if (val === element) {
                    delete element.view.elements[key];
                }
            });
        },

        /**
         * Hide element
         * @memberOf BaseElement
         * @returns {*}
         */
        hide: function hide() {
            this.view.scope.logger.debug('Hide element');
            return this.$.hide();
        },

        /**
         * Clear element internal HTML
         * @memberOf BaseElement
         * @returns {*|Boolean}
         */
        empty: function empty() {
            this.view.scope.logger.debug('Clear inner html of the element');
            return this.$.empty();
        },

        /**
         * Fade in effect
         * @memberOf BaseElement
         * @returns {*}
         */
        fadeIn: function fadeIn() {
            return this.$.stop(true, true).fadeIn();
        },

        /**
         * Fade out effect
         * @memberOf BaseElement
         * @returns {*}
         */
        fadeOut: function fadeOut() {
            return this.$.stop(true, true).fadeOut();
        },

        /**
         * Show element
         * @memberOf BaseElement
         * @returns {*}
         */
        show: function show() {
            return this.$.show();
        },

        /**
         * Remove element inline style
         * @memberOf BaseElement
         */
        removeStyle: function removeStyle() {
            this.$.removeAttr('style');
        },

        /**
         * Get root container
         * @memberOf BaseElement
         * @returns {*|HTMLElement}
         */
        getRootContainer: function getRootContainer() {
            return $(this.view.scope.controller.root().config.html.container);
        },

        /**
         * Set element opacity
         * @memberOf BaseElement
         * @param {Number} opacity
         */
        setOpacity: function setOpacity(opacity) {
            this.$.css({
                opacity: opacity
            });
        },

        /**
         * Get position
         * @memberOf BaseElement
         * @returns {{top, left}}
         */
        getPosition: function getPosition() {
            return this.$.position();
        },
        /**
         * Get offset
         * @memberOf BaseElement
         * @returns {{top, left}}
         */
        getOffset: function getOffset() {
            return this.$.offset();
        },

        /**
         * Get element width
         * @memberOf BaseElement
         * @returns {*}
         */
        getWidth: function getWidth() {
            return this.$.outerWidth(true);
        },

        /**
         * Set element width
         * @memberOf BaseElement
         * @param {String|Number} width
         * @returns {Number}
         */
        setWidth: function setWidth(width) {
            this.$.css({
                width: width
            });

            return this.getWidth();
        },

        /**
         * Get element height
         * @memberOf BaseElement
         * @returns {*}
         */
        getHeight: function getHeight() {
            return this.$.outerHeight(true);
        },

        /**
         * Set element height
         * @memberOf BaseElement
         * @param {String|Number} height
         * @returns {Number}
         */
        setHeight: function setHeight(height) {
            this.$.css({
                height: height
            });

            return this.getHeight();
        },

        /**
         * Get CSS attribute
         * @memberOf BaseElement
         * @param {String} value
         * @returns {Number}
         */
        getCSS: function getCSS(value) {
            return this.base.lib.number.str2float(
                this.$.css(value)
            );
        },

        /**
         * Get z-index
         * @memberOf BaseElement
         * @returns {Number}
         */
        getZIndex: function getZIndex() {
            return this.getCSS('z-index') || 0;
        },

        /**
         * Get padding right
         * @memberOf BaseElement
         * @returns {Number}
         */
        getPaddingRight: function getPaddingRight() {
            return this.getCSS('paddingRight');
        },

        /**
         * Get padding left
         * @memberOf BaseElement
         * @returns {Number}
         */
        getPaddingLeft: function getPaddingLeft() {
            return this.getCSS('paddingLeft');
        },

        /**
         * Get pudding top
         * @memberOf BaseElement
         * @returns {Number}
         */
        getPaddingTop: function getPaddingTop() {
            return this.getCSS('paddingTop');
        },

        /**
         * Get padding bottom
         * @memberOf BaseElement
         * @returns {Number}
         */
        getPaddingBottom: function getPaddingBottom() {
            return this.getCSS('paddingBottom');
        },

        /**
         * Get margin right
         * @memberOf BaseElement
         * @returns {Number}
         */
        getMarginRight: function getMarginRight() {
            return this.getCSS('marginRight');
        },

        /**
         * Get margin left
         * @memberOf BaseElement
         * @returns {Number}
         */
        getMarginLeft: function getMarginLeft() {
            return this.getCSS('marginLeft');
        },

        /**
         * Get margin top
         * @memberOf BaseElement
         * @returns {Number}
         */
        getMarginTop: function getMarginTop() {
            return this.getCSS('marginTop');
        },

        /**
         * Get margin bottom
         * @memberOf BaseElement
         * @returns {Number}
         */
        getMarginBottom: function getMarginBottom() {
            return this.getCSS('marginBottom');
        },

        /**
         * Get left delta
         * @memberOf BaseElement
         * @returns {Number}
         */
        getLeftDelta: function getLeftDelta() {
            return this.getPaddingLeft() + this.getMarginLeft();
        },

        /**
         * Get top delta
         * @memberOf BaseElement
         * @returns {Number}
         */
        getTopDelta: function getTopDelta() {
            return this.getPaddingTop() + this.getMarginTop();
        },

        /**
         * Get $items
         * @memberOf BaseElement
         * @returns {*|jQuery|HTMLElement}
         */
        get$items: function get$items() {

            /**
             * Define scope;
             */
            var scope = this.view.scope;

            /**
             * Get item
             * @type {*}
             */
            var item = scope.model.getCurrentItem();

            /**
             * Get item constructor name
             * @type {string}
             */
            var cname = item.name.toLowerCase();

            return $('.' + cname, this.$);
        },

        /**
         * Set html
         * @memberOf BaseElement
         * @param html
         * @param [$container]
         * @returns {boolean}
         */
        setHtml: function setHtml(html, $container) {

            if (!(this.$ && html)) {
                return false;
            }

            $container ? $container.append(html) : this.addContent(html);
        },

        /**
         * Set text
         * @memberOf BaseElement
         * @param {string} text
         * @param [$container]
         * @returns {boolean}
         */
        setText: function setText(text, $container) {

            if (!(this.$ && text)) {
                return false;
            }

            // Define text holder
            var $text = $('<span />').text(text);
            
            $container ? $container.html($text) : this.addContent($text);
        },

        /**
         * Set title
         * @memberOf BaseElement
         * @param {string} title
         */
        setTitle: function setTitle(title) {

            if (!this.$) {
                return false;
            }

            this.$.attr({
                title: title
            });
        },

        /**
         * Unbind element
         * @memberOf BaseElement
         * @returns {BaseElement}
         */
        unbindElement: function unbindElement() {

            if (this.$) {
                this.$.find('*').off();
                this.$.off();
            }

            return this;
        },

        /**
         * Add scroll cover
         * @memberOf BaseElement
         * @param $container
         */
        scrollCover: function scrollCover($container) {

            if ($('.scroll-cover', $container).length === 0) {

                $('<div class="scroll-cover" />').appendTo($container).append(
                    this.$,
                    '<div class="clear" />'
                );
            }
        },

        /**
         * Adopt modal dialog position on content config
         * @memberOf BaseElement
         */
        adoptModalDialogPosition: function adoptModalDialogPosition() {

            var scope = this.view.scope,
                referrer = scope.referrer,
                $modal;

            /**
             * Get modal dialog
             * @type {ModalElement}
             */
            $modal = referrer ?
                referrer.view.elements.$modal :
                scope.view.elements.$modal;

            if ($modal) {

                $modal.setPosition({
                    $container: $modal.$container,
                    $item: $modal.$,
                    position: $modal.position
                });
            }
        },

        /**
         * Remove loading class after loading items
         * @memberOf BaseElement
         */
        hideLoader: function hideLoader() {

            /**
             * Get $root
             * @type {ApplicationElement}
             */
            var $root = this.view.controller.root().view.get$item();

            $root.$container.removeClass('loading');
        },

        /**
         * Add loading class before loading items
         * @memberOf BaseElement
         */
        showLoader: function showLoader() {

            /**
             * Get $root
             * @type {ApplicationElement}
             */
            var $root = this.view.controller.root().view.get$item();

            $root.$container.addClass('loading');
        },

        /**
         * Render items list
         * @memberOf BaseElement
         * @param {Array} items
         * @returns {string}
         */
        getItemsList: function getItemsList(items) {

            return [
                '<ul class="remove">',
                $.map(items, function map(item, i) {
                    return [
                        '<li rel="', item.model.getUUID(), '">',
                        item.model.getItemTitle(),
                        '</li>'
                    ].join('');
                }).join(''),
                '</ul>'
            ].join('');
        },

        /**
         * Get site description
         * @memberOf BaseElement
         * @returns {string}
         */
        getSiteDescription: function getSiteDescription() {
            return $('meta[name="description"]').attr('content');
        },

        /**
         * Set site description
         * @memberOf BaseElement
         * @param {string} description
         */
        setSiteDescription: function setSiteDescription(description) {
            $('meta[name="description"]').attr('content', description);
        },

        /**
         * Get site description
         * @memberOf BaseElement
         * @returns {string}
         */
        getSiteKeywords: function getSiteKeywords() {
            return $('meta[name="keywords"]').attr('content');
        },

        /**
         * Set site description
         * @memberOf BaseElement
         * @param {string} keywords
         */
        setSiteKeywords: function setSiteKeywords(keywords) {
            $('meta[name="keywords"]').attr('content', keywords);
        },

        /**
         * Get footer html
         * @memberOf BaseElement
         * @returns {*|jQuery}
         */
        getFooter: function getFooter() {

            var counter = Object.keys(this.view.elements.items || {}).length.toString(),
                $template = '<p class="text-center"><span class="badge" title="{0}">{0}</span>{1}</p>';

            return $template.replace(/\{0}/g, counter).replace(
                /\{1}/g, this.i18n.t('panel.items')
            );
        },

        /**
         * Check if content has iframe
         * @memberOf BaseElement
         * @returns {number}
         */
        hasIframe: function hasIframe() {
            return $('iframe', this.$).length;
        },

        /**
         * Check if content has flash
         * @memberOf BaseElement
         * @returns {number}
         */
        hasFlash: function hasFlash() {
            return $('object', this.$).length ||
                $('embed', this.$).length;
        },

        /**
         * Define sort asc/desc
         * @memberOf BaseElement
         * @param $element
         * @returns {boolean}
         */
        defineSorted: function defineSorted($element) {
            var sortBy = $element.attr('sorted') === 'asc' ? 'desc' : 'asc';
            $element.attr('sorted', sortBy);
            return $element.attr('sorted') === 'asc';
        },

        /**
         * Define sort text @element
         * @memberOf BaseElement
         * @param {Event} event
         */
        sortTextElements: function sortTextElements(event) {

            var $container = this.$container,
                $element = this.$element,
                on = this.which,
                selector = this.selector;

            /**
             * Get sorted value
             * @type {*|boolean}
             */
            var sorted = $element.defineSorted($(event.target));

            $(on, $container).sort(function (a, b) {

                var t1, t2;
                if (selector) {
                    t1 = $(selector, a).text();
                    t2 = $(selector, b).text();
                } else {
                    t1 = $(a).text();
                    t2 = $(b).text();
                }
                if (t1 < t2) return sorted ? -1 : 1;
                if (t1 > t2) return sorted ? 1 : -1;
                return 0;

            }).appendTo($container);
        },

        /**
         * Locate element
         * @memberOf BaseElement
         * @param {BaseElement} [$element]
         * @param {Event} event
         * @returns {boolean}
         */
        locate$element: function locate$element(event, $element) {

            if (!$element) {
                $element = this;
            }

            /**
             * Hide border on locate element
             * @private
             */
            function _hideBorder() {
                $element.$.removeClass('select');
            }

            $element.$.parent().children().removeClass('select');
            $element.$.addClass('select');

            if (event.type === 'mouseleave' || event.type === 'click') {
                setTimeout(_hideBorder, 300);
            }
        },

        /**
         * isModal element
         * @memberOf BaseElement
         * @returns {boolean}
         */
        isModal: function isModal() {
            return this.name === 'ModalElement';
        },

        /**
         * Check if metamorphic element
         * @memberOf BaseElement
         * @returns {boolean}
         */
        isMetamorphicElement: function isMetamorphicElement() {
            return this.$.hasClass('metamorphic');
        },

        /**
         * Define add content if defined
         * @memberOf BaseElement
         */
        addContent: function addContent(embed) {

            if (!embed) {
                this.$.empty();
                return false;
            }

            this.$.append(embed);

            return this;
        }

    }, AntHill.prototype, Renderer.prototype);
});