/*
define(['async!http://maps.google.com/maps/api/js?v=3&sensor=false&client=gme-nsp&channel=new-homes-app'], function () {
return google.maps;
});
*/
//define(['goog!visualization,1,packages:[corechart,geochart]', 'goog!search,1', 'json!http://ip.jsontest.com/', 'jquery'], function(ip, $) {
//define(['async!http://maps.google.com/maps/api/js?sensor=false', 'json!http://ip.jsontest.com/', 'jquery'], function(google, ip, $) {

/*
http://blog.pixelingene.com/2011/10/using-jquery-dot-deferred-and-requirejs-to-lazy-load-google-maps-api/
https://github.com/GoogleWebComponents/google-map
*/

define(['./map'], function(google) {
    var defaultOptions = {
        searchTitle: 'Google',
        lattitude: 37.4258855,
        longitude: -122.1383291,
        zoom: 17,
        mapType: google.maps.MapTypeId.ROADMAP
    };

    //console.log(require);
    /*
    require(['async!http://maps.google.com/maps/api/js?sensor=false'], function() {
        console.log(window.google);
    });
    */

    return {
        //templates: ['map'],
        initialize: function() {
            console.log(this.options);
            _.defaults(this.options, defaultOptions);
            console.log(this.options);


            this.addresses = [];
            this.addAddress(37.425514, -122.138615);
            this.addAddress(50.95763, 3.11101);
            this.render();
        },
        loaded: function() {
            //alert('loaded');
        },
        addAddress: function(lattitude, longitude) {
            var address = new google.maps.LatLng(lattitude, longitude);
            //console.log('address', address);
            this.addresses.push(address);
        },
        setCenter: function() {},
        render: function() {
            //console.log('addresses', this.addresses);
            var mapOptions = {
                zoom: this.options.zoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: this.addresses[0]
            };
            this.html('<div style="width:100%;height:600px;background-color:#ccc;" id="googleMaps"></div>');

            //this.addresses.forEeach(function(address) {
            for (var i = 0; i < this.addresses.length; i++) {
                var address = this.addresses[i];

                var marker = new google.maps.Marker({
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: address
                });
            }
            var map = new google.maps.Map(document.getElementById('googleMaps'), mapOptions);

            //this.html(this.renderTemplate('map', opts));
        }
    };
});