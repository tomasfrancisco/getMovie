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
    animateScale : true,


}


Template.home.rendered = function() {
    var ctx = document.getElementById("genre-chart").getContext("2d");
    window.myPie = new Chart(ctx).Pie(pieData, pieOptions);
};


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
        Router.go("/testes");
    },

    "click #s2": function (event) {
        Router.go("/movies");
    },


    "click #s3": function (event) {
        Router.go("/recommendations");
    },

    "click #s4": function (event) {
        Router.go("/movies");
    },

    "click #s5": function (event) {
        Router.go("/recommendations");
    }
});

Template.home.helpers({
    userInfo: function() {
        if(Meteor.user())
            return Meteor.user().profile;
        else
            return null;
    }
});