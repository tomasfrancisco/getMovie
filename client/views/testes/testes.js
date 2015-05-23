/**
 * Created by tfrancisco on 22/04/15.
 */


Template.testes.rendered = function() {

    Meteor.call("getMoviePlus", function(err, result) {
        console.log(result);
    });
};
