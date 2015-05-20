
Template.recommendations.events({


    /*MENU LINKS E HIPERLIGAÇÕES*/

    "click .hlink": function (event) {
        Router.go("/home");
    },

    "click .flink": function (event) {
        Router.go("/friends");
    },

    "click .mlink": function (event) {
        Router.go("/movies");
    },

    "click .rmlink": function (event) {
        Router.go("/recommendations");
    },

    "click .slink": function (event) {
        Router.go("/shows");
    },

    "click .rslink": function (event) {
        Router.go("/showsRecommendations");
    },

    'click .olink': function() {
        Session.clear();
        Meteor.users.remove({_id: Meteor.user()._id});
        Router.go("/");
    }
});



Template.recommendations.helpers({


    moviesRecommendation: function() {
        if(Meteor.user()) {

            if (Session.get("moviesRecommendation")) {
                var movieRec = Session.get("moviesRecommendation");

                for(var i = 0; i < movieRec.data.length; i++){

                    //var url = movieRec.data[i].trailer;
                    //console.log(url);
                    movieRec.data[i].trailer = movieRec.data[i].trailer.replace('watch?v=', 'embed/');
                    //embedURL =
                    //console.log(embedURL);

                }
                console.dir(movieRec);

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