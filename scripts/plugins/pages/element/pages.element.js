/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePagesElement(BaseElement) {

    /**
     * Define Pages Element
     * @param view
     * @param opts
     * @returns {PagesElement}
     * @constructor
     * @class PagesElement
     * @extends BaseElement
     */
    var PagesElement = function PagesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.addCSS('pages');

        return this;
    };

    return PagesElement.extend({

    }, BaseElement.prototype);

});