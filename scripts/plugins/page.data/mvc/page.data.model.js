/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function definePageDataModel(BaseModel) {

    /**
     * Define PageData model
     * @extends BaseModel
     * @class PageDataModel
     * @constructor
     */
    var PageDataModel = function PageDataModel() {

    };

    return PageDataModel.extend('PageDataModel', {

        /**
         * Get items
         * @member PageDataModel
         * @param page
         * @returns {*}
         */
        getPageData: function getPageData(page) {
            return page.model.getItems();
        }

    }, BaseModel.prototype);
});