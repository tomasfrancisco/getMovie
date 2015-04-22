var pieData = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    },
    {
        value: 40,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Grey"
    },
    {
        value: 120,
        color: "#4D5360",
        highlight: "#616774",
        label: "Dark Grey"
    }

];

Template.home.rendered = function() {
    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myPie = new Chart(ctx).Pie(pieData);
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
        Router.go("/friends");
    }


});





