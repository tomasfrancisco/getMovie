/**
 * Created by tfrancisco on 23/04/15.
 */

Template.movies.helpers({
    watched: function() {

        //if(Session.get("watchedListed") === undefined || Session.get("watchedListed") === false) {
            //console.log("updated");
            if(Meteor.user()) {
                if(Session.get("watched")) {
                    console.log("update");
                    //Session.set("watchedListed", true);
                    //console.log(Session.get("watched"))
                    return Session.get("watched");
                }
            }
        //}
    },

    getWatched: function() {
        if(Meteor.user()) {
            Meteor.call('getWatched', Meteor.user().profile.accessToken, Meteor.user().profile.username, "movies", function (err, result) {

                Session.set("watched", result);
                //return result;
            });
        }
    }
});

