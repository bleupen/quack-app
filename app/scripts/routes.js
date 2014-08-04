angular.module('quack')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/feed');

        $stateProvider.state('feed', {
            url: '/feed',
            templateUrl: '/views/convo-tpl.html',
            controller: 'ConvoCtrl as conversation'
        });

        $stateProvider.state('friends', {
            url: '/friends',
            templateUrl: '/views/friends-tpl.html',
            controller: 'FriendsCtrl as friends',
            resolve: {
                friends: 'friends'
            }
        });
    });