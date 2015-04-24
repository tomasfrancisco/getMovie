/**
 * Created by goncaloneves on 24/03/15.
 */

Template.friends.events({
    "click .menu": function(){
        $(".menuBack").slideToggle(1000);
    },

    "click .asd": function(event) {
        Router.go("/profile");
    },

    "click img": function(event) {
        Router.go("/profile");
    }


});