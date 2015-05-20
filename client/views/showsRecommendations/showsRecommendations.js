/**
 * Created by goncaloneves on 20/05/15.
 */
/**
 * Created by goncaloneves on 24/04/15.
 */



Template.showsRecommendations.helpers({


    showsRecommendation: function() {
        if(Meteor.user()) {

            if (Session.get("showsRecommendation")) {
                /*var showRec = Session.get("showsRecommendation");

                for(var i = 0; i < showRec.data.length; i++){
                    //var url = movieRec.data[i].trailer;
                    //console.log(url);
                    showRec.data[i].trailer = showRec.data[i].trailer.replace('watch?v=', 'embed/');
                    //embedURL =
                    //console.log(embedURL);
                }

                console.dir(showRec);*/

                console.log(Session.get("showsRecommendation"));

                return Session.get("showsRecommendation");
            }
        }
    },

    getShowsRecommendation: function() {
        if(Meteor.user()) {

            Meteor.call('getShowsRecommendation', Meteor.user().profile.accessToken, function (err, result) {
                Session.setPersistent("showsRecommendation", result);
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