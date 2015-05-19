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


/*
*
* TESTE REPLACE URL
var movieRec = Session.get("moviesRecommendation");

for(var i = 0; i < movieRec.data.length; i++){

    //var url = movieRec.data[i].trailer;
    //console.log(url);
    movieRec.data[i].trailer = movieRec.data[i].trailer.replace('watch?v=', 'embed/');
    //embedURL =
    //console.log(embedURL);

}
console.dir(movieRec);*/