Template.profile.helpers({
    profile: function() {
        if(Meteor.user()) {
            if(Session.get("profile")) {
                return Session.get("profile");
            }
        }
    },

    getProfile: function() {
        if(Meteor.user()) {
            Meteor.call('getSettings', Meteor.user().profile.accessToken, function (err, result) {
                Session.setPersistent("profile", result);
            });
        }
    },

    stats: function() {
        if(Meteor.user()) {
            var stats = Session.get("stats");
            if(stats) {
                console.log(stats);
                return stats;
            }
        }
    },
    getStats: function(){
        if(Meteor.user()) {
            var stats = Session.get("stats");
            if(stats) {
                Meteor.call('getStats', Meteor.user().profile.username, function (err, result) {
                    Session.setPersistent("stats", result);
                });
            }
        }
    }
});