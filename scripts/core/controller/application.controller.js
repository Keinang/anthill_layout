/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
define(['application'], function defineApplicationController() {
    var Controller = function Controller() {
    };

    return Controller.extend({
        addWorkspace: function addWorkspace() {
            this.model.createWorkspace();
        }
    });

});