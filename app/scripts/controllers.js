'use strict';

angular.module('quack')
    .controller('AppCtrl', function(me, $rootScope, socket) {
        socket.on('me', function (data) {
            console.log(data);
        });
        me.then(function (profile) {
            $rootScope.me = profile;
        });
    })
    .controller('ConvoCtrl', function(me, inbox) {
        this.me = me;
        this.messages = inbox;
        this.send = function() {
            inbox.push({
                sender: me,
                time: new Date(),
                body: this.message
            });

            this.message = '';
        };
        this.keypress = function($event) {
            if ($event.keyCode === 13) {
                this.send();
            }
        };
    })

    .controller('FriendsCtrl', function(friends, $http, friendsSearch) {
        this.friends = friends;
        var self = this;
        this.search = function() {
            friendsSearch(this.searchString).then(function(people) {
                self.searchResults = people;
            })
        };
    })
;