/**
 * Created by tfrancisco on 24/04/15.
 */

Template.navbar.helpers({
    // If user is logged in go to homepage, else go back to auth page
    navbarHeader: function() {
        if(Meteor.user()) {
            console.log(Meteor.user());
            return Meteor.user().profile;
        }
        else {
            Router.go('/');
            return null;
        }
    }
});

Template.navbar.events({
    // Logout user, clear session, remove user from db and go back to auth page
    'click #logout': function() {
        Session.clear();
        Meteor.users.remove({_id: Meteor.user()._id});
        Router.go("/");
    }
});