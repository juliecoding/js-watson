angular.module('watsonApp', [])
    .filter('percentage', function() {
        return function(input) {
            for (var prop in input) {
                return prop.map(function(el) {
                    Math.round(el * 100);
                })
                return input;
            };
        }
    })