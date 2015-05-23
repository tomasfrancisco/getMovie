
Template.moviesInfo.helpers({
    movie: function() {
        if(Meteor.user()) {
            var movieToShow = Session.get("movie-to-show");
            var movieInfo = Session.get("movie-id-" + movieToShow);

            if(movieInfo) {

                console.log(movieInfo);
                return movieInfo;
            }
        }
    },

    getMovieInfo: function() {
        var movieToShow = Session.get("movie-to-show");
        var movieInfo = Session.get("movie-id-" + movieToShow);

        if(!movieInfo) {
            var imdbID = Session.get("movieImdb-to-show");


            Meteor.call('getMovie', movieToShow, imdbID, function (err, result) {

                result.data.trailer = result.data.trailer.replace('watch?v=', 'embed/');
                result.data.trailer = result.data.trailer.replace('https', 'http');

                Session.setPersistent("movie-id-" + movieToShow, result);

                return result;
            });
        }
    }

});

function blurElement(element, size){
    var filterVal = 'blur('+size+'px)';
    $(element)
        .css('filter',filterVal)
        .css('webkitFilter',filterVal)
        .css('mozFilter',filterVal)
        .css('oFilter',filterVal)
        .css('msFilter',filterVal);
}

Template.moviesInfo.events({



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
    },




    "click #seeTrailerPopup": function (event) {

        $("#popUp").css( "display", "inline");
        blurElement(".sectionMovieInfo", 8);
    },

    "click #closePopup": function (event) {

        $("#popUp").css( "display", "none");
        blurElement(".sectionMovieInfo", 0);
    }
});