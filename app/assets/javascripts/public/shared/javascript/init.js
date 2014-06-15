require([

    '../../../scripts/core/config/main'

], function loadConfig() {

    require([
        'public/pets/javascript/listeners',
        'public/pets/javascript/permission'
    ], function loadCustomConfig() {

        require([
            'config/debugger'
        ], function initDebug() {

            require([
                'config/application'
            ], function initDemo(Application) {

                /**
                 * Define shared application
                 * @type {*}
                 */
                window.shared = new Application({
                    config: {
                        html: {
                            container: 'body'
                        },
                        appName: 'shared',
                        mode: 'development'
                    }
                });

                window.shared.view.render();

                if (!window.shared.model.loadData()) {

                    var workspace1 = window.shared.api.createWorkspace([], true),
                        page1 = workspace1.api.createPage([], true);
                }
            });
        });
    });
});