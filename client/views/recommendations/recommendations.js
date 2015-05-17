/**
 * Created by goncaloneves on 24/04/15.
 */



Template.recommendations.helpers({

    moviesRecommendation: function() {
        if(Meteor.user()) {
            if (Session.get("moviesRecommendation")) {
                console.log(Session.get("moviesRecommendation"));
                return Session.get("moviesRecommendation");
            }
        }
    },

    getMoviesRecommendation: function() {
        if(Meteor.user()) {

            Meteor.call('getMoviesRecommendation', Meteor.user().profile.accessToken, function (err, result) {
                Session.setPersistent("moviesRecommendation", result);
            });
        }
    }
});