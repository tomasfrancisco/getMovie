/**
 * Created by tfrancisco on 21/03/15.
 */
Template.auth.events({
    'click #auth-btn': function(event) {
        console.log("clicked");
        Meteor.call('authTrakt', function(err, result) {
            window.location.href = result;
        });
    }
});