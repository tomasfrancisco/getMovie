/**
 * Created by tfrancisco on 21/03/15.
 */
Template.auth.helpers({
    // Redirect user to homepage if is logged in, else redirect to auth page
    displayLogin: function() {
        if(Meteor.user()) {
            Router.go('/home');
            return false;
        }
        return true;
    }
})