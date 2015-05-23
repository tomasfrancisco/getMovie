
Template.moviesInfo.helpers({
    movie: function() {
        if(Meteor.user()) {
            var movieToShow = Session.get("movie-to-show");
            console.log(movieToShow);

            if(movieToShow) {

                movieToShow.movie.trailer = movieToShow.movie.trailer.replace('watch?v=', 'embed/');


                console.log(movieToShow);

                return movieToShow;
            }
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

    "click #seeTrailerPopup": function (event) {

        $("#popUp").css( "display", "inline");
        blurElement(".sectionMovieInfo", 8);
    },

    "click #closePopup": function (event) {

        $("#popUp").css( "display", "none");
        blurElement(".sectionMovieInfo", 0);
    }
});