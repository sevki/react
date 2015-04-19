Package.describe({
    name: 'sevki:react',
    summary: 'client and server side rendering/routing powered by React',
    version: '0.13.1',
    git: 'https://github.com/sevki/react.git'
});

Npm.depends({
    'connect': '2.13.0',
    'connect-route': '0.1.4'
});

Package.registerBuildPlugin({
    name: 'compileJSX',
    use: [],
    sources: [
        'plugin/compile-jsx.js'
    ],
    npmDependencies: {
        'react-tools': '0.13.2'
    }
});

Package.onUse(function(api) {
    api.versionsFrom('METEOR@1.0.4.1');

    api.use(['tracker', 'tmeasday:page-js-ie-support@1.3.5'], 'client');
    api.use('tmeasday:html5-history-api@4.1.2', 'client', {
        weak: true
    });
    api.use('webapp', 'server');
    api.use('meteorhacks:fast-render@2.3.2', ['client', 'server']);
    api.use('iron:dynamic-template@1.0.7', 'client');

    api.addFiles('react-with-addons-0.13.2.js', ['client', 'server']);

    api.addFiles('routecore-common.js', ['client', 'server']);
    api.addFiles('context-client.js', 'client');
    api.addFiles('context-server.js', 'server');
    api.addFiles('routecore-client.js', 'client');
    api.addFiles('routecore-server.js', 'server');

    api.addFiles('blaze-component.js', ['client', 'server']);
    api.addFiles('reactivity.js', ['client', 'server']);

    api.addFiles('body.html', ['client']);

    // fast-render needs to be visible to the app, as the
    // inline javascript which fast-render pushes to the client
    // needs to interact with an exported value.
    api.imply('meteorhacks:fast-render@2.3.1', ['client', 'server']);
    api.export('RouteCore', ['client', 'server']);
    // api.export('React'); -- unnecessary (react mutates global obj)
});
