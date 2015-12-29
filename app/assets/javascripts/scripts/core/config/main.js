requirejs.config({

    baseUrl: '../../assets/scripts/core',

    waitSeconds: 200,

    paths: {
        // Define public application path
        'public': '../../public',

        config: 'config',

        api: 'api',

        controller: 'controller',
        model: 'model',
        view: 'view',

        event: 'event',
        permission: 'permission',

        'extends': 'lib/extends',

        modules: 'lib/modules',
        plugins: '../plugins',
        target: '../../target',

        'xhook': 'lib/packages/xhook.min',

        tinyMCE: 'lib/packages/tinymce/tinymce.min',
        pluralize: 'lib/packages/pluralize',
        //totally: 'lib/packages/tota11y.min',
        moment: 'lib/packages/moment',

        modernizr: 'lib/modernizr',

        bootstrap: 'lib/packages/bootstrap/bootstrap.min',
        _: 'lib/_/underscore-min',

        html2canvas: 'lib/packages/html2canvas',

        'lz-string': 'lib/lz-string',
        jquery: 'lib/jquery/jquery-2.1.4.min',
        'jquery.ujs': 'lib/jquery/jquery_ujs',
        'jquery.timeago': 'lib/jquery/jquery.timeago',
        'jquery.ui': 'lib/jquery/jquery-ui.min',
        'jquery.resizestop': 'lib/jquery/jquery.resizestop',
        'jquery.pseudo': 'lib/jquery/jquery.pseudo',
        'jquery.zoomooz': 'lib/jquery/jquery.zoomooz.min',

        'jquery.metismenu': 'lib/jquery/metisMenu.min',
        'jquery.slimscroll': 'lib/jquery/jquery.slimscroll.min',

        // create alias to plugins (not needed if plugins are on the baseUrl)
        // https://github.com/millermedeiros/requirejs-plugins
        // https://github.com/SBoudrias/require.replace
        // https://github.com/SlexAxton/require-handlebars-plugin
        defer: 'lib/require/defer',
        async: 'lib/require/async',
        cache: 'lib/require/cache',
        font: 'lib/require/font',
        goog: 'lib/require/goog',
        image: 'lib/require/image',
        json: 'lib/require/json',
        noext: 'lib/require/noext',
        mdown: 'lib/require/mdown',
        text: 'lib/require/text',
        replace: 'lib/require/replace',
        hbs: 'lib/require/hbs',
        propertyParser: 'lib/require/propertyParser',
        markdownConverter: 'lib/require/Markdown.Converter'
    },

    shim: {
        tinyMCE: {
            exports: 'tinyMCE',
            init: function () {
                this.tinyMCE.DOM.events.domLoaded = true;
                return this.tinyMCE;
            }
        },
        jquery: {
            exports: '$'
        },
        'jquery.ujs': {deps: ['jquery']},
        'jquery.ui': {deps: ['jquery']},
        'jquery.resizestop': {deps: ['jquery']},
        'jquery.pseudo': {deps: ['jquery']},
        'jquery.metismenu': {deps: ['jquery']},
        'jquery.slimscroll': {deps: ['jquery']},
        'jquery.zoomooz': {deps: ['jquery']},
        'extends/function': {deps: ['jquery']},
        'extends/string': {deps: ['jquery']},
        'extends/array': {deps: ['jquery']},
        'lib/jquery/jquery.knob': {deps: ['jquery']},

        'lib/jquery/jquery.nicescroll': {deps: ['jquery']},

        'lib/modules/MVC': {
            deps: [
                'extends/function',
                'extends/string',
                'extends/array'
            ]
        },

        bootstrap: {deps: ["jquery"]},

        'config/listeners': {deps: ['extends/function']},
        'config/permissions': {deps: ['extends/function']},
        'config/anthill': {deps: ['extends/function']},
        'config/routes': {deps: ['extends/function']},

        'controller/behavior/behavior.error.handler': {deps: ['extends/function']},

        'controller/layout/layout.empty.rows': {deps: ['extends/function']},
        'controller/layout/layout.empty.columns': {deps: ['extends/function']},
        'controller/layout/layout.intersect': {deps: ['extends/function']},
        'controller/layout/layout.expand': {deps: ['extends/function']},

        'controller/widget/widget.maximize': {deps: ['extends/function']},
        'controller/widget/widget.stretch': {deps: ['extends/function']},
        'controller/widget/widget.stick': {deps: ['extends/function']},
        'controller/widget/widget.layer': {deps: ['extends/function']},
        'controller/widget/widget.expand': {deps: ['extends/function']},
        'controller/widget/widget.scroll': {deps: ['extends/function']},
        'controller/widget/widget.comment': {deps: ['extends/function']},

        'controller/page/page.layer': {deps: ['extends/function']},
        'controller/page/page.layout': {deps: ['extends/function']},
        'controller/page/page.widget': {deps: ['extends/function']},
        'controller/page/page.maximize': {deps: ['extends/function']},

        'controller/workspace/workspace.page': {deps: ['extends/function']},
        'controller/workspace/workspace.seo': {deps: ['extends/function']},

        'controller/behavior/behavior.crud': {deps: ['extends/function']},
        'controller/behavior/behavior.window.resize': {deps: ['extends/function']},

        'controller/widget/widget.map': {deps: ['extends/function']},
        'controller/widget/widget.wireframe': {deps: ['extends/function']},

        'view/application.view': {deps: ['modules/i18n']},

        'modules/API': {deps: ['extends/function']},
        'modules/Observer': {deps: ['extends/function']},
        'modules/Logger': {deps: ['extends/function']},
        'modules/Setting': {deps: ['extends/function', 'lz-string']},
        'modules/Event': {deps: ['extends/function']},
        'modules/Permission': {deps: ['extends/function']},
        'modules/Page': {deps: ['extends/function']},
        'modules/CRUD': {deps: ['extends/function']},
        'modules/Interactions': {deps: ['extends/function']},
        'modules/Element': {deps: ['extends/function']},
        'modules/Preferences': {deps: ['extends/function']},
        'modules/Router': {deps: ['extends/function']}
    }
});