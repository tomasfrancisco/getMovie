/**
 * Created by goncaloneves on 20/05/15.
 */
/**
 * Created by goncaloneves on 22/04/15.
 */


Template.showsInfo.helpers({
    show: function() {
        if(Meteor.user()) {
            var movieToShow = Session.get("movie-to-show");
            console.log(Session.get("show"));
            if (movieToShow) {
                var show = Session.get("movie-id-" + movieToShow);
                console.log(movieToShow);
                return show;
            }
        }
    }


});