/*
creating an aura extension
*/
define({
    require: {
        paths: {
            facebook: 'http://connect.facebook.net/en_US/all'
        },
        shim: {
            facebook: {
                export: 'FB'
            }
        }
    },

    initialize: function(app) {
        var status = app.core.data.deferred();
        app.sandbox.auth = {
            login: FB.login,
            logout: FB.logout
        };
        FB.init(app.config.facebook);

        FB.getLoginStatus(function(res) {
            app.sandbox.auth.loginStatus = res;
            status.resolve(res);
        }, true);

        return status.promise();
    },

    afterAppStart: function(app) {
        console.warn('The app is started and I am: ', app.sandbox.auth.loginStatus);
    }
});