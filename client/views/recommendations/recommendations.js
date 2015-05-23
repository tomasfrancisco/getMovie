Template.recommendations.events({

    'click #refuse':function(e,t) {
        //console.log(this.movie.title);
        Meteor.call("hideMovieRecommendation", Meteor.user().profile.accessToken, this.ids.trakt);
        //var movies = Session.get("moviesRecommendation");

        Meteor.call('getMoviesRecommendation', Meteor.user().profile.accessToken, function (err, result) {
            Session.setPersistent("moviesRecommendation", result);
            //console.log("Get Movies Recommendations");
        });
    }
});

Template.recommendations.helpers({
    moviesRecommendation: function() {
        if(Meteor.user()) {
            var movieRec = Session.get("moviesRecommendation");
            if (movieRec) {
                console.log(movieRec);
                return movieRec;
            }
        }
    },
    getMoviesRecommendation: function() {
        if(Meteor.user()) {
            var movieRec = Session.get("moviesRecommendation");
            if(movieRec === undefined) {
                Meteor.call('getMoviesRecommendation', Meteor.user().profile.accessToken, function (err, result) {
                    Session.setPersistent("moviesRecommendation", result);
                });
            }
        }
    }
});