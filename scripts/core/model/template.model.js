/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/model',
    'modules/base'
], function (BaseModel, Base) {
    var Model = function Model() {
    };

    return Model.extend({
    }, BaseModel.prototype, Base);

});