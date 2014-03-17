/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function definePagesModel(BaseModel) {

    /**
     * Define Pages model
     * @mixin BaseModel
     * @class PagesModel
     * @constructor
     * @extends BaseModel
     */
    var PagesModel = function PagesModel() {

    };

    return PagesModel.extend('PagesModel', {

        /**
         * Get data provider
         * @member PagesModel
         */
        getData: function getData(workspace) {
            return workspace.model.getItems();
        }

    }, BaseModel.prototype);
});