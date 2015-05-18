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
                console.log("update");
                Session.set("movieListed", true);
                console.log(Session.get("movie"));
                return Session.get("movie");
            }
        }
    },

    getMovie: function () {
        console.log("1");
        if(Meteor.user()) {
            var watched = Session.get("watched");
            Meteor.call('getMovie', watched.data[1].movie.ids.trakt, function (err, result) {
                Session.setPersistent("movie-id-" + watched.data[1].movie.ids.trakt, result);
            });
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