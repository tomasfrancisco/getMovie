/**
 * Created by tfrancisco on 21/03/15.
 */
Template.auth.events({
    'click #logoLogin' : function(event) {

    }
});

Template.auth.helpers({
    isLogged: function() {
        console.log(Meteor.user());
    }
})