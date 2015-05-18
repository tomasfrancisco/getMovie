/**
 * Created by goncaloneves on 22/04/15.
 */


Template.moviesInfo.helpers({
    movie: function() {
        if(Meteor.user()) {
            var movieToShow = Session.get("movie-to-show");
            console.log(movieToShow);
            if (movieToShow) {
                var movie = Session.get("movie-id-" + movieToShow);
                console.log(movie);

                return movie;
            }
        }
    },

    movieImages: function() {
        if(Meteor.user()) {
            var movieImagesToShow = Session.get("movie-to-show");
            console.log(movieImagesToShow);
            if (movieImagesToShow) {

                console.log(movieImagesToShow);

                var movieImages = Session.get("movieImages-id-" + movieImagesToShow);
                console.log(movieImages);

                return movieImages;
            }
        }
    }

});