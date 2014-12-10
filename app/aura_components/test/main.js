define([], function() {
    return {
        initialize: function() {
            this.render();
        },
        render: function() {
            var val = this.$el.html();
            this.html(this.sandbox.reverse(val));
        }
    };
});