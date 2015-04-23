/**
 * Created by goncaloneves on 22/04/15.
 */
Template.movies.events({
    "mouseover #f1": function () {
        $("#seeMore1").animate({"opacity": "1"}, 200);
    },

    "mouseover #f2": function () {
        $("#seeMore2").animate({"opacity": "1"}, 200);
    },

    "mouseover #f3": function () {
        $("#seeMore3").animate({"opacity": "1"}, 200);
    },

    "mouseover #f4": function () {
        $("#seeMore4").animate({"opacity": "1"}, 200);
    },

    "mouseover #f5": function () {
        $("#seeMore5").animate({"opacity": "1"}, 200);
    },

    "mouseover #f6": function () {
        $("#seeMore6").animate({"opacity": "1"}, 200);
    },


    "mouseleave #f1": function () {

        $("#seeMore1").animate({"opacity": "0"}, 200);
    },

    "mouseleave #f2": function () {
        $("#seeMore2").animate({"opacity": "0"}, 200);
    },

    "mouseleave #f3": function () {
        $("#seeMore3").animate({"opacity": "0"}, 200);
    },

    "mouseleave #f4": function () {
        $("#seeMore4").animate({"opacity": "0"}, 200);
    },

    "mouseleave #f5": function () {
        $("#seeMore5").animate({"opacity": "0"}, 200);
    },
    "mouseleave #f6": function () {
        $("#seeMore6").animate({"opacity": "0"}, 200);
    },

    "click .menu": function () {
        $(".menuBack").slideToggle(1000);
    }




});