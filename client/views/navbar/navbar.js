/**
 * Created by goncaloneves on 27/04/15.
 */
/**
 * Created by tfrancisco on 24/04/15.
 */

Template.navbar.helpers({
    navbarHeader: function() {
        if(Meteor.user()) {
            return Meteor.user().profile;
        }
        else {
            //Router.go('/');
            return null;
        }
    }
});