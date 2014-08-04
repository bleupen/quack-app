'use strict';

/**
 * A library for augmenting promises with chained business methods
 * @constructor
 */
function Proxifier($q) {
    // this property can be directly accessed for adding business methods
    this.proxyMethods = {};

    /**
     * Decorates a promise object with proxy methods
     * @param {{}} promise the promise to decorate
     * @returns {{}} the decorated promise
     */
    this.newProxy = function(promise) {
        angular.forEach(this.proxyMethods, function (method, name) {
            promise[name] = method;
        });
        return promise;
    };


    /**
     * Adds one or more delegate methods to the proxifier
     * @Param({String*} zero or more methods to delegate to.
     * @returns {Proxifier}
     */
    this.delegate = function () {
        var proxifier = this;
        angular.forEach(arguments, function (methodName) {
            proxifier.proxyMethods[methodName] = function() {
                var args = arguments;

                // must wrap the result in another proxy
                return proxifier.newProxy(this.then(function (entity) {
                    // let null pointer exceptions bubble up naturally
                    return entity[methodName] ? entity[methodName].apply(entity, args) : $q.reject('Invalid method name: ' + methodName );
                }));
            };
        });
        return this;
    };
}

angular.module('quack')
    .factory('proxifier', function ($q) {
        return function(delegates) {
            var p = new Proxifier($q);
            p.delegate.apply(p, arguments);
            return p;
        };
    });