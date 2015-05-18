
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

    "click .menu": function () {
        $(".menuBack").slideToggle(1000);
    },

    "click #s1": function (event) {
        Router.go("/friends");
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
}


Template.home.rendered = function() {
    var ctx = document.getElementById("genre-chart").getContext("2d");
    window.myPie = new Chart(ctx).Pie(pieData, pieOptions);
};


Template.home.helpers({
    chartGenre: function() {
        if(Meteor.user()) {
            var obj = Session.get("genresStats");
            console.log(obj);
            if(obj) {

                var total = 0;
                var top = [];
                var counter = 0;
                for(var item in obj) {
                    if(counter < 5) {
                        top[item] = obj[item];
                        top[item].value = Math.round(top[item].value * 100);
                        total += top[item].value;
                        console.log(total);

                    }
                    else
                        break;
                    counter++;
                }
                top.push({name:'other', value: (1.0 - total/100 ) * 100})
                console.log(top);

                pieData = [
                    {
                        value: top[0].value,
                        color:"#edda2f"
                    },
                    {
                        value : top[1].value,
                        color : "#ffec00"
                    },
                    {
                        value : top[2].value,
                        color : "#a8941a"
                    },
                    {
                        value : top[3].value,
                        color : "#fff803"
                    },
                    {
                        value : top[4].value,
                        color : "#efde97"
                    },
                    {
                        value : top[5].value,
                        color : "#e2c73d"
                    }
                ];



                //console.log(document.getElementById("genre-chart"));
                //var ctx = document.getElementById("genre-chart").getContext("2d");
                //window.myPie = new Chart(ctx).Pie(pieData, pieOptions);

                return top;
            }
        }
        else {
            return null;
        }
    },

    getChartGenre: function() {
        if(Meteor.user()) {
            console.log("Session: " + Session.get("genresStats"));
            var stats = /*undefined;*/Session.get("genresStats");
            if(stats === undefined) {
                Meteor.call('getStatsGenres', Meteor.user().profile.username, function(err, result) {

                    Session.setPersistent("genresStats", result);
                    console.log("Session now: " + Session.get("genresStats"));
                });
            }
            else
            {
                //console.log(stats);
            }
        }
    }
});