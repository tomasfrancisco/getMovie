/**
 * Created by goncaloneves on 21/04/15.
 */

Template.profile.events({
    "click .menu": function(){
        $(".menuBack").slideToggle(1000);
    }



});

Template.profile.helpers({
    profile: function() {

        //if(Session.get("watchedListed") === undefined || Session.get("watchedListed") === false) {
        //console.log("updated");
        if(Meteor.user()) {
            if(Session.get("profile")) {
                console.log("update");
                //Session.set("watchedListed", true);
                console.log(Session.get("profile"));
                return Session.get("profile");
            }
        }
        //}
    },

    getProfile: function() {
        if(Meteor.user()) {
            Meteor.call('getSettings', Meteor.user().profile.accessToken, function (err, result) {

                Session.set("profile", result);
                //return result;
            });
        }
    }
});
