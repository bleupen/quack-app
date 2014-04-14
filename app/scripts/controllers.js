'use strict';

angular.module('quack')
    .controller('AppCtrl', function(me, $rootScope) {
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
;