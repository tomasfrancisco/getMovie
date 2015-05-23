/**
 * Created by goncaloneves on 20/05/15.
 */
/**
 * Created by goncaloneves on 22/04/15.
 */


Template.shows.events({


    'click #show1':function(e,t) {
        //console.log(this.movie.title);

        Session.setPersistent("show-to-show", this);
        Router.go("/showsInfo");
    }
});


Template.shows.helpers({
    watched: function() {
        if(Meteor.user()) {
            var watched = Session.get("watchedShows");
            console.log(watched);
            if (watched) {
                console.log(watched);
                return watched;
            }
        }
    },
    getWatched: function() {
        if(Meteor.user()) {
            var watched = Session.get("watchedShows");
            if(watched === undefined) {
                Meteor.call('getWatched', Meteor.user().profile.username, "shows", function (err, result) {
                    Session.setPersistent("watchedShows", result);
                });
            }
        }
    }
});



