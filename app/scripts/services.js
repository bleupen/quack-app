'use strict';

angular.module('quack')
    .factory('inbox', function () {
        return [
            { sender: { name: 'Hank Leupen' }, time: new Date(), body: 'Oh wassairp!'}
        ];
    })

    .factory('token', function ($q) {
        var deferred = $q.defer();
        chrome.identity.getAuthToken({ interactive: true}, function (token) {
            deferred.resolve(token);
        });
        return deferred.promise;
    })


    .factory('me', function ($http, token) {
        return token.then(function (value) {
            return $http.get('https://www.googleapis.com/plus/v1/people/me', {headers: {'Authorization': 'Bearer ' + value}}).success(function (profile) {
                return profile;
            });
        });
    })

    .factory('friendsSearch', function ($http, token) {
        return function (searchString) {
            return token
                .then(function (value) {
                    return $http.get('https://www.googleapis.com/plus/v1/people?query=' + searchString, {headers: {'Authorization': 'Bearer ' + value}})
                })
                .then(function (response) {
                    return response.data;
                })
        };
    })

    .factory('imageCache', ['$cacheFactory', function ($cacheFactory) {
        return $cacheFactory('images');
    }])

    .factory('io', function ($window, token) {
        return $window.io;
    })

    .factory('socket', function (io, token, proxifier) {
        var promise = token.then(function (value) {
            var socket = io.connect('http://localhost:4000', {
                query: 'token=' + value
            });

            socket.on('connect', function () {
                console.log('authenticated');
            }).on('disconnect', function () {
                console.log('disconnected');
            });

            return socket;
        });

        return proxifier('on', 'emit').newProxy(promise);
    })

    .factory('friends', function ($q, $rootScope, socket) {
        var deferred = $q.defer();
        socket.emit('friends', function (friends) {
            deferred.resolve(friends);
        });
        return deferred.promise;
    })
;