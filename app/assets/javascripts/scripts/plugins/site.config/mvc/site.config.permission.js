/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineSiteConfigPermission(BasePermission) {

    /**
     * Define Permissions
     * @class SiteConfigPermission
     * @constructor
     * @extends BasePermission
     */
    var SiteConfigPermission = function SiteConfigPermission() {

    };

    return SiteConfigPermission.extend('SiteConfigPermission', {

    }, BasePermission.prototype);
});