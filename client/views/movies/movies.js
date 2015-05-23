/**
 * Created by goncaloneves on 22/04/15.
 */


Template.movies.events({
    'click #f1':function(e,t){
        //console.log(this.movie.title);

        Session.setPersistent("movie-to-show", this);
        Router.go("/moviesInfo");
    }
});

Template.movies.helpers({
    watched: function() {
        if(Meteor.user()) {
            var watched = Session.get("watchedMovies");
            if (watched) {
                console.log("Watched Movies:");
                console.log(watched);
                return watched;
            }
        }
    },
    getWatched: function() {
        if(Meteor.user()) {
            var watched = Session.get("watchedMovies");
            if(watched === undefined) {
                Meteor.call('getWatched', Meteor.user().profile.username, "movies", function (err, result) {
                    Session.setPersistent("watchedMovies", result);
                });
            }
        }
    }
});


