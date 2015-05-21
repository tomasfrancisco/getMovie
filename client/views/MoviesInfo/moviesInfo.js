Template.moviesInfo.helpers({
    movie: function() {
        if(Meteor.user()) {
            var movieToShow = Session.get("movie-to-show");
            var movieInfo = Session.get("movie-id-" + movieToShow);

            if(movieInfo) {
                return movieInfo;
            }
            else {
                Meteor.call('getMovie', movieToShow, function (err, result) {
                    Session.setPersistent("movie-id-" + movieToShow, result);
                    return Session.get("movie-id-" + movieToShow);
                });
            }


        }
    }

});

Template.moviesInfo.events({

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