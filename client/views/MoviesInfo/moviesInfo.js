Template.moviesInfo.helpers({
    movie: function() {
        if(Meteor.user()) {
            var movieToShow = Session.get("movie-to-show");
            console.log(movieToShow);
            if (movieToShow) {
                var movie = Session.get("movie-id-" + movieToShow);
                console.log(movie);

                return movie;
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