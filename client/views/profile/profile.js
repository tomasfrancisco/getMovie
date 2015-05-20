
Template.profile.events({
    "click .menu": function(){
        $(".menuBack").slideToggle(1000);
    }



});


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
            if(Session.get("stats")) {
                console.log(Session.get("stats"))
                return Session.get("stats");
            }
        }
    },

    getStats: function(){
        if(Meteor.user()) {
            Meteor.call('getStats', Meteor.user().profile.username, function (err, result) {
                Session.setPersistent("stats", result);
            });
        }
    }
});