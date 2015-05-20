/**
 * Created by goncaloneves on 20/05/15.
 */
/**
 * Created by goncaloneves on 22/04/15.
 */


Template.shows.events({

    "click .menu": function () {
        $(".menuBack").slideToggle(1000);
    },

    /*"click #f1": function (event) {
     Router.go("/moviesInfo");
     },*/

    'click #show1':function(e,t){
        //console.log(this.movie.title);

        Session.setPersistent("movie-to-show", this.show.ids.trakt);
        Router.go("/showsInfo");



    }

});


Template.shows.helpers({

    watched: function() {
        if(Meteor.user()) {
            if (Session.get("watched")) {
                Session.set("watchedListed", true);
                console.log(Session.get("watched"));
                return Session.get("watched");
            }
        }
    },

    getWatched: function() {
        if(Meteor.user()) {
            Meteor.call('getWatched', Meteor.user().profile.username, "shows", function (err, result) {
                Session.setPersistent("watched", result);
            });
        }
    },



    show: function() {
        if(Meteor.user()) {
            if (Session.get("show")) {
                Session.set("showsListed", true);
                console.log(Session.get("show"));
                return Session.get("show");
            }
        }
    },

    getShow: function () {
        if(Meteor.user()) {
            var watched = Session.get("show");
                Meteor.call('getShow', watched.data[1].show.ids.trakt, function (err, result) {
                    Session.setPersistent("movie-id-" + watched.data[1].show.ids.trakt, result);
                })


        }
    }
});



