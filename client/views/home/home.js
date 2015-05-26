
Template.home.events({

    "mouseover #s1": function () {
        $("#grafo").animate({"opacity": "0.3"}, 200);
        $("#grafo").css({"cursor": "pointer"});
        $("#seeMore1").animate({"opacity": "1"}, 200);
    },

    "mouseover #s2": function () {
        $("#seeMore2").animate({"opacity": "1"}, 200);
    },

    "mouseover #s3": function () {
        $("#seeMore3").animate({"opacity": "1"}, 200);
    },

    "mouseover #s4": function () {
        $("#seeMore4").animate({"opacity": "1"}, 200);

    },

    "mouseover #s5": function () {
        $("#seeMore5").animate({"opacity": "1"}, 200);

    },

    "mouseleave #s1": function () {
        $("#grafo").animate({"opacity": "1"}, 200);
        $("#seeMore1").animate({"opacity": "0"}, 200);
    },

    "mouseleave #s2": function () {
        $("#seeMore2").animate({"opacity": "0"}, 200);
    },

    "mouseleave #s3": function () {
        $("#seeMore3").animate({"opacity": "0"}, 200);
    },

    "mouseleave #s4": function () {
        $("#seeMore4").animate({"opacity": "0"}, 200);

    },

    "mouseleave #s5": function () {
        $("#seeMore5").animate({"opacity": "0"}, 200);
    },

    "click #s1": function (event) {
        Router.go("/friends");
    },

    "click #s2": function (event) {
        Router.go("/shows");
    },

    "click #s3": function (event) {
        Router.go("/showsRecommendations");
    },

    "click #s4": function (event) {
        Router.go("/movies");
    },

    "click #s5": function (event) {
        Router.go("/recommendations");
    }
});

var pieData = [
    {
        value: 30,
        color:"#edda2f"
    },
    {
        value : 25,
        color : "#ffec00"
    },
    {
        value : 20,
        color : "#a8941a"
    },
    {
        value : 15,
        color : "#fff803"
    },
    {
        value : 10,
        color : "#efde97"
    },
    {
        value : 5,
        color : "#e2c73d"
    }
];

var pieOptions = {
    segmentShowStroke : false,
    animateScale : true
};

Template.home.rendered = function() {
    var self = this;
    self.reactiveData = Deps.autorun(function () {
        var ctx = document.getElementById("genre-chart").getContext("2d");
        window.myPie = new Chart(ctx).Pie(Session.get("pieData"), pieOptions);
    });
};

Template.home.helpers({
    chartGenre: function() {
        if(Meteor.user()) {
            var obj = Session.get("genresStats");
            console.log(obj);
            if(obj) {


                Session.setPersistent("watchedMovies", obj.watched);
                obj = obj.stats;

                var total = 0;
                var top = [];
                var counter = 0;
                for(var item in obj) {
                    if(counter < 5) {
                        top[item] = obj[item];
                        top[item].value = Math.round(top[item].value * 100);
                        total += top[item].value;
                        //console.log(total);

                    }
                    else
                        break;
                    counter++;
                }
                top.push({name:'other', value: Math.round((1.0 - total/100 ) * 100)});
                //console.log(top);

                Session.setPersistent("myTop", top);


                var pieData = [
                    {
                        value: top[0].value,
                        color:"#edda2f",
                        label: obj[0].name
                    },
                    {
                        value : top[1].value,
                        color : "#ffec00",
                        label: obj[1].name
                    },
                    {
                        value : top[2].value,
                        color : "#a8941a",
                        label: obj[2].name
                    },
                    {
                        value : top[3].value,
                        color : "#fff803",
                        label: obj[3].name
                    },
                    {
                        value : top[4].value,
                        color : "#efde97",
                        label: obj[4].name
                    },
                    {
                        value : top[5].value,
                        color : "#e2c73d",
                        label: "other"
                    }
                ];

                Session.set("pieData", pieData);


                return top;
            }
        }
        else {
            return null;
        }
    },

    getChartGenre: function() {
        if(Meteor.user()) {
            var stats = Session.get("genresStats");
            if(stats === undefined) {
                Meteor.call('getStatsGenres', Meteor.user().profile.username, function(err, result) {
                    Session.setPersistent("genresStats", result);
                });
            }
        }
    },
    stats: function() {
        if(Meteor.user()) {
            var stats = Session.get("stats");
            if(stats) {
                console.log(stats);
                return stats;
            }
        }
    },
    getStats: function(){
        if(Meteor.user()) {
            var stats = Session.get("stats");
            if(stats === undefined) {
                Meteor.call('getStats', Meteor.user().profile.username, function (err, result) {
                    Session.setPersistent("stats", result);
                });
            }
        }
    },
    /*FAZER SEARCH DE UM FILME/SHOW fazer isto dentro de um POST de um TEXT FIELD*/

    getTextQueryResults: function() {
        if(Meteor.user()) {

            Meteor.call('getTextQueryResults', Meteor.user().profile.accessToken, function (err, result) {
                Session.setPersistent("getTextQueryResults", result);
            });
        }
    },
    /*GET POPULAR MOVIES PARA MOSTRAR IMAGEM*/

    popularMovies: function() {
        if(Meteor.user()) {
            var popularMovies = Session.get("popularMovies");
            if(popularMovies) {
                return popularMovies;
            }
        }
    },
    getPopularMovies: function() {
        if(Meteor.user()) {
            var popularMovies = Session.get("popularMovies");
            if(popularMovies === undefined) {
                Meteor.call('getPopularMovies', Meteor.user().profile.accessToken, function (err, result) {
                    Session.setPersistent("popularMovies", result);
                });
            }
        }
    },
    getPopularShows: function() {
        if(Meteor.user()) {
            var popularShows = Session.get("popularShows");
            if(popularShows === undefined) {
                Meteor.call('getPopularShows', Meteor.user().profile.accessToken, function (err, result) {
                    Session.setPersistent("popularShows", result);
                });
            }
        }
    },
    popularShows: function() {
        if(Meteor.user()) {
            var popularShows = Session.get("popularShows");
            if(popularShows) {
                return popularShows;
            }
        }
    },
    getTrendingMovies: function() {
        if(Meteor.user()) {
            var trendingMovies = Session.get("trendingMovies");
            if(trendingMovies === undefined) {
                Meteor.call('getTrendingMovies', Meteor.user().profile.accessToken, function (err, result) {
                    Session.setPersistent("trendingMovies", result);
                });
            }
        }
    },
    trendingMovies: function() {
        if(Meteor.user()) {
            var trendingMovies = Session.get("trendingMovies");
            if(trendingMovies) {
                console.log(trendingMovies);
                return trendingMovies;
            }
        }
    },

    getTrendingShows: function() {
        if(Meteor.user()) {
            var trendingShows = Session.get("trendingShows");
            if(trendingShows === undefined) {
                Meteor.call('getTrendingShows', Meteor.user().profile.accessToken, function (err, result) {
                    Session.setPersistent("trendingShows", result);
                });
            }
        }
    },
    trendingShows: function() {
        if(Meteor.user()) {
            var trendingShows = Session.get("trendingShows");
            if(trendingShows) {
                console.log(trendingShows);
                return trendingShows;
            }
        }
    }
});