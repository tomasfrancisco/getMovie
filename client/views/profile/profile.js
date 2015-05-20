
Template.profile.events({

    /*MENU LINKS E HIPERLIGAÇÕES*/

    "click .hlink": function (event) {
        Router.go("/home");
    },

    "click .flink": function (event) {
        Router.go("/friends");
    },

    "click .mlink": function (event) {
        Router.go("/movies");
    },

    "click .rmlink": function (event) {
        Router.go("/recommendations");
    },

    "click .slink": function (event) {
        Router.go("/shows");
    },

    "click .rslink": function (event) {
        Router.go("/showsRecommendations");
    },

    'click .olink': function() {
        Session.clear();
        Meteor.users.remove({_id: Meteor.user()._id});
        Router.go("/");
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