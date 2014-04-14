'use strict';

angular.module('quack')
    .factory('inbox', function () {
        return [
            { sender: { name: 'Hank Leupen' }, time: new Date(), body: 'Oh wassairp!'}
        ];
    })

    .factory('me', function ($q, $http) {
        var deferred = $q.defer();
        chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
            $http.get('https://www.googleapis.com/plus/v1/people/me', {headers: {'Authorization': 'Bearer ' + token}}).success(function (profile) {
                deferred.resolve(profile);
            });

        });
        return deferred.promise;
    })

    .factory('imageCache', ['$cacheFactory', function ($cacheFactory) {
        return $cacheFactory('images');
    }])
;