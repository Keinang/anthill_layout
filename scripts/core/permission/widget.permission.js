/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/permission'
], function defineWidgetPermission(Base, BasePermission) {
    /**
     * Define Permissions
     * @param scope
     * @constructor
     */
    var Permission = function Permission() {

    };

    return Permission.extend({

    }, Base, BasePermission.prototype);
});