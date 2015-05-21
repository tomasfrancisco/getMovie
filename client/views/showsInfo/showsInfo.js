Template.showsInfo.events({


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

Template.showsInfo.helpers({
    show: function() {
        if(Meteor.user()) {
            var showToShow = Session.get("show-to-show");
            var showInfo = Session.get("show-id-" + showToShow);
            console.log(showInfo);

            if(showInfo) {
                return showInfo;
            }
            else {
                Meteor.call('getShow', showToShow, function (err, result) {
                    Session.setPersistent("show-id-" + showToShow, result);
                    return Session.get("show-id-" + showToShow);
                });
            }


        }
    }


});