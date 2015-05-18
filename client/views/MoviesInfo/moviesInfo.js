/**
 * Created by goncaloneves on 22/04/15.
 */


Template.moviesInfo.helpers({
    movie: function() {
        if(Meteor.user()) {
            var movieToShow = Session.get("movie-to-show");
            if (movieToShow) {

                console.log(movieToShow);

                var movie = Session.get("movie-id-" + movieToShow);
                console.log(movie);

                return movie;
            }
        }
    }

});