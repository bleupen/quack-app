angular.module('quack')
    .filter('avatar', function () {
        return function(value) {
            return value;
        };
    })
    .filter('fromNow', function() {
        return function(date) {
            return moment(date).fromNow();
        };
    })
;