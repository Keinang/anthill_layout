define([
    'modules/base'
], function defineSetting(Base) {

    var Setting = function Setting(mode) {
        this.mode = mode;
        this.storage = {
            development: window.localStorage
        };
    };

    return Setting.extend({
        getStorage: function getStorage() {
            return this.storage[this.mode];
        },
        save: function save(namespace, opts) {
            this.getStorage().setItem(
                namespace,
                this.base.define(opts, {}, true)
            );
        },
        load: function load(namespace) {
            this.getStorage().getItem(namespace);
        }
    }, Base)
});