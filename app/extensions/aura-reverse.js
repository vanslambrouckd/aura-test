define({
    initialize: function(app) {
        app.sandbox.reverse = function(str) {
            return str.split('').reverse().join('');
        };


        var status = app.core.data.deferred();
        status.resolve('gelukt');
        return status.promise();
    }
});