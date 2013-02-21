requirejs.config({
    baseUrl: 'scripts/core',
    paths: {
        config: 'config',
        jquery: 'lib/jquery/jquery-1.9.1.min',
        jqueryui: 'lib/jquery/jquery-ui-1.10.1.custom.min',
        application: 'application',
        controller: 'controller',
        model: 'model',
        event: 'event',
        view: 'view',
        permission: 'permission',
        test: 'test',
        extends: 'lib/extends',
        modules: 'lib/modules'
    }
});

define([
    'config/routes'
], function defineApp(Routes) {

    requirejs([
        'config/listeners',
        'config/permission',
        'test/create'
    ])
});