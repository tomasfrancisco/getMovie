Template.showsRecommendations.events({

    'click #refuse':function(e,t) {
        //console.log(this.movie.title);
        Meteor.call("hideShowsRecommendation", Meteor.user().profile.accessToken, this.ids.trakt);
        var shows = Session.get("showsRecommendation");

        Meteor.call('getShowsRecommendation', Meteor.user().profile.accessToken, function (err, result) {
            Session.setPersistent("showsRecommendation", result);
            console.log("Get Shows Recommendations");
        });

        console.log("Deleted");
    },


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