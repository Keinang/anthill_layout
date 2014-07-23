/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineSiteConfigModel(BaseModel) {

    /**
     * Define SiteConfig model
     * @extends BaseModel
     * @class SiteConfigModel
     * @constructor
     */
    var SiteConfigModel = function SiteConfigModel() {

        /**
         * Define site preferences data
         * @member SiteConfigModel
         * @type {{preferences: {title: string, description: string}}}
         */
        this.data = {
            preferences: {
                title: 'Preferences',
                description: 'Preferences are the user options for browsing, editing, searching, notifications, and more'
            }
        };

        /**
         * Define site width values
         * @member SiteConfigModel
         * @type {number[]}
         */
        this.map = [960, 1024, 1040, 1140, 1280, 1920];
    };

    return SiteConfigModel.extend('SiteConfigModel', {

        /**
         * Get data
         * @member SiteConfigModel
         * @returns {{preferences: {title: string, description: string}}}
         */
        getData: function getData() {
            return this.data;
        }

    }, BaseModel.prototype);
});