Template.navbar.helpers({
    // If user is logged in go to homepage, else go back to auth page
    navbarHeader: function() {
        if(Meteor.user()) {
            //console.log(Meteor.user());
            return Meteor.user().profile;
        }
        else {
            Router.go('/');
            return null;
        }
    }
});

Template.navbar.events({
    // Logout user, clear session, remove user from db and go back to auth page
    'click #logout': function() {
        Session.clear();
        Meteor.users.remove({_id: Meteor.user()._id});
        Router.go("/");
    },

    "click #logoHome": function () {
        Router.go("/home");
    },

    "click .menu": function () {
        $(".menuBack").slideToggle(1000);
    },

    "click #profilePage": function (event) {
        Router.go("/profile");
    },

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