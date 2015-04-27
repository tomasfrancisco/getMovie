/**
 * Created by tfrancisco on 21/03/15.
 */
Template.auth.events({
    'click #logoLogin' : function(event) {

    }
});

Template.auth.helpers({
    displayLogin: function() {
        if(Meteor.user()) {
            Router.go('/home');
            return false;
        }
        else {
            return true;
        }
    }
})