define([], function() {
    return {
        initialize: function(app) {
            app.core.util.load = function(url, data, dataType) {
                //zie https://github.com/massiveart/husky
                var deferred = new app.sandbox.data.deferred(),
                    settings = {
                        url: url,
                        data: data || null,
                        dataType: 'json',

                        success: function(data, textStatus) {
                            deferred.resolve(data, textStatus);
                        }.bind(this),

                        error: function(jqXHR, textStatus, error) {
                            deferred.reject(textStatus, error);
                            alert('error');
                        }
                    };

                if (typeof (dataType) !== 'undefined') {
                    settings.dataType = dataType;
                }

                console.log(settings);

                //app.sandbox.util.ajax(settings);
                $.ajax(settings);

                app.sandbox.emit('husky.util.load.data');

                return deferred.promise();
            };
        }
    };
});