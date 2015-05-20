Template.showsInfo.events({


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

Template.showsInfo.helpers({
    show: function() {
        if(Meteor.user()) {
            var movieToShow = Session.get("movie-to-show");
            console.log(Session.get("show"));
            if (movieToShow) {
                var show = Session.get("movie-id-" + movieToShow);
                console.log(movieToShow);
                return show;
            }
        }
    }


});