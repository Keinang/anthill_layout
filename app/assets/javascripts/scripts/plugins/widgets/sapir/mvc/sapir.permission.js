/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineSapirPermission(BasePermission) {

    /**
     * Define Permissions
     * @class SapirPermission
     * @constructor
     * @extends BasePermission
     */
    var SapirPermission = function SapirPermission() {
    };

    return SapirPermission.extend(
        'SapirPermission', {}, 
        BasePermission.prototype
    );
});
