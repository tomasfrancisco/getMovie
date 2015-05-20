/**
 * Created by goncaloneves on 22/04/15.
 */


Template.movies.events({


    "click .menu": function () {
        $(".menuBack").slideToggle(1000);
    },

    /*"click #f1": function (event) {
        Router.go("/moviesInfo");
    },*/

    'click #f1':function(e,t){
        //console.log(this.movie.title);

        Session.setPersistent("movie-to-show", this.movie.ids.trakt);
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
    },

    getMovie: function () {
        if(Meteor.user()) {
            var watched = Session.get("watched");
            var watchedLength = watched.data.length;

            /*Meteor.call('getMovie', watched.data[0].movie.ids.trakt, function (err, result) {
                Session.setPersistent("movie-id-" + watched.data[0].movie.ids.trakt, result);
            });*/

            for(var i = 0; i < watchedLength; i++){
                Meteor.call('getMovie', watched.data[i].movie.ids.trakt, function (err, result) {
                    Session.setPersistent("movie-id-" + watched.data[i].movie.ids.trakt, result);
                });
            }


        }
    },

    movieImages: function() {
        if(Meteor.user()) {
            if (Session.get("movieImages")) {
                Session.set("movieImagesListed", true);
                console.log(Session.get("movieImages"));
                return Session.get("movieImages");
            }
        }
    },

    getMovieImages: function () {
        if(Meteor.user()) {
            var watched = Session.get("watched");
            var watchedLength = watched.data.length;

            console.log(watchedLength);
            /*Meteor.call('getMovieImages', watched.data[0].movie.ids.trakt, function (err, result) {
                Session.setPersistent("movieImages-id-" + watched.data[0].movie.ids.trakt, result);
            });*/

            for(var i = 0; i < watchedLength; i++){
                console.log(i);
                console.log(watched);
                Meteor.call('getMovieImages', watched.data[i].movie.ids.trakt, function (err, result) {
                    Session.setPersistent("movieImages-id-" + watched.data[i].movie.ids.trakt, result);
                });
            }


        }
    }
});





/*
 "mouseover #f1": function () {
 $("#seeMore1").animate({"opacity": "1"}, 200);
 },

 "mouseover #f2": function () {
 $("#seeMore2").animate({"opacity": "1"}, 200);
 },

 "mouseover #f3": function () {
 $("#seeMore3").animate({"opacity": "1"}, 200);
 },

 "mouseover #f4": function () {
 $("#seeMore4").animate({"opacity": "1"}, 200);
 },

 "mouseover #f5": function () {
 $("#seeMore5").animate({"opacity": "1"}, 200);
 },

 "mouseover #f6": function () {
 $("#seeMore6").animate({"opacity": "1"}, 200);
 },

 "mouseleave #f1": function () {

 $("#seeMore1").animate({"opacity": "0"}, 200);
 },

 "mouseleave #f2": function () {
 $("#seeMore2").animate({"opacity": "0"}, 200);
 },

 "mouseleave #f3": function () {
 $("#seeMore3").animate({"opacity": "0"}, 200);
 },

 "mouseleave #f4": function () {
 $("#seeMore4").animate({"opacity": "0"}, 200);
 },

 "mouseleave #f5": function () {
 $("#seeMore5").animate({"opacity": "0"}, 200);
 },
 "mouseleave #f6": function () {
 $("#seeMore6").animate({"opacity": "0"}, 200);
 },
 */