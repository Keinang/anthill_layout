/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function defineVimeoPermission(BasePermission) {

    /**
     * Define Permissions
     * @class VimeoPermission
     * @constructor
     * @extends BasePermission
     */
    var VimeoPermission = function VimeoPermission() {

    };

    return VimeoPermission.extend('VimeoPermission', {

    }, BasePermission.prototype);
});