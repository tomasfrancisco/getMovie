/**
 * Created by goncaloneves on 22/04/15.
 */


Template.movies.events({

    'click #f1':function(e,t){
        //console.log(this.movie.title);

        Session.setPersistent("movie-to-show", this.movie.ids.trakt);
        Session.setPersistent("movieImdb-to-show", this.movie.ids.imdb);
        Router.go("/moviesInfo");
    },

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


Template.movies.helpers({

    watched: function() {
        if(Meteor.user()) {
            if (Session.get("watched")) {
                console.log("update");
                Session.set("watchedListed", true);
                console.log(Session.get("watched"));
                return Session.get("watched");
            }
        }
    },

    getWatched: function() {
        if(Meteor.user()) {
            Meteor.call('getWatched', Meteor.user().profile.username, "movies", function (err, result) {
                Session.setPersistent("watched", result);
            });
        }
    },

    movie: function() {
        if(Meteor.user()) {
            if (Session.get("movie")) {
                Session.set("movieListed", true);
                console.log(Session.get("movie"));
                return Session.get("movie");
            }
        }
    }

});


