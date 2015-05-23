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



});

Template.showsRecommendations.helpers({
    showsRecommendation: function() {
        if(Meteor.user()) {
            var showRec = Session.get("showsRecommendation");
            if (showRec) {
                console.log(showRec);
                return showRec;
            }
        }
    },
    getShowsRecommendation: function() {
        if(Meteor.user()) {
            var showRec = Session.get("showsRecommendation");
            if(showRec === undefined) {
                Meteor.call('getShowsRecommendation', Meteor.user().profile.accessToken, function (err, result) {
                    Session.setPersistent("showsRecommendation", result);
                });
            }
        }
    }
});