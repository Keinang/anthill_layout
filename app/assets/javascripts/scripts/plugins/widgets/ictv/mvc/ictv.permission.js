/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineIctvPermission(BasePermission) {

    /**
     * Define Permissions
     * @class IctvPermission
     * @constructor
     * @extends BasePermission
     */
    var IctvPermission = function IctvPermission() {

    };

    return IctvPermission.extend('IctvPermission', {

    }, BasePermission.prototype);
});
