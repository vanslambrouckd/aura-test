require.config({
    paths: {
        //create alias to plugins (not needed if plugins are on the baseUrl)
        goog: 'bower_components/requirejs-plugins/src/goog',
        async: 'bower_components/requirejs-plugins/src/async',
        json: 'bower_components/requirejs-plugins/src/json',
        noext: 'bower_components/requirejs-plugins/src/noext',
        mdown: 'bower_components/requirejs-plugins/src/mdown',
        propertyParser: 'bower_components/requirejs-plugins/src/propertyParser',
        markdownConverter: 'lib/Markdown.Converter'
    }
});


require(['bower_components/aura/lib/aura'], function(Aura) {
    Aura({
        debug: {
            enable: true
        }
    }).use('extensions/aura-backbones')
        .use('extensions/aura-templates')
        .use('extensions/aura-reverse')
        .use('extensions/util')
        .start()
});