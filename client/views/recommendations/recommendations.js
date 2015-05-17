/**
 * Created by goncaloneves on 24/04/15.
 */
Template.movies.helpers({
    watched: function() {
        if(Meteor.user()) {
            if (Session.get("watched")) {
                console.log("update");

                return Session.get("watched");
            }
        }
    },
    getWatched: function() {
        if(Meteor.user()) {
            Meteor.call('getWatched', Meteor.user().profile.accessToken, Meteor.user().profile.username, "movies", function (err, result) {
                Session.setPersistent("watched", result);
            });
        }
    }
});