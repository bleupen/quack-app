'use strict';

angular.module('quack')
    .directive('qkAvatar', function () {
        return {
            scope: { qkAvatar: '=' },
            controller: function ($scope) {
                var name = angular.isString($scope.qkAvatar) ? $scope.qkAvatar : $scope.qkAvatar.name || 'unknown';
                var names = name.split(' ');
                $scope.initials = names.length > 1 ? names[0].charAt(0) + names[1].charAt(0) : names[0].charAt(0);
            },
            template: '<i class="red circular icon">{{initials}}</i>'
        };
    })

    .directive('qkScrollto', function () {
        return function (scope, element) {
            element[0].scrollIntoView();
        }
    })


/**
 * Download and cache an image url
 */
    .directive('corsSrc', ['imageCache', '$http', function (imageCache, $http) {
        return {
            restrict: 'A',
            scope: {src: '@corsSrc'},
            link: function (scope, element) {
                scope.$watch('src', function (newValue) {
                    if (newValue) {
                        // check if we have already processed this image
                        var objUrl = imageCache.get(scope.src);
                        if (objUrl) {
                            element[0].src = objUrl;
                        } else {
                            // no? then get it via http
                            $http({url: scope.src, method: 'GET', responseType: 'blob', cache: true})
                                .then(function (response) {
                                    var objectUrl = window.webkitURL.createObjectURL(response.data);
                                    element[0].src = objectUrl;
                                    imageCache.put(scope.src, objectUrl)
                                });
                        }
                    }
                }, true);
            }
        };
    }])
;