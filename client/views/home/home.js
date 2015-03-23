/**
 * Created by goncaloneves on 23/03/15.
 */
/*
$(function(){


    $("#doughnutChart").drawDoughnutChart([
        { title: "Tokyo",         value: 10,  color: "#ffec00" },
        { title: "San Francisco", value:  10,   color: "#efd725" },
        { title: "New York",      value:  10,   color: "#efde97" },
        { title: "London",        value : 10,   color: "#e2c73d" },
        { title: "Sydney",        value : 10,   color: "#efde65" },
        { title: "Berlin",        value : 30,   color: "#edda2f" }
    ]);
});

/*!
 * jquery.drawDoughnutChart.js
 * Version: 0.4.1(Beta)
 * Inspired by Chart.js(http://www.chartjs.org/)
 *
 * Copyright 2014 hiro
 * https://github.com/githiro/drawDoughnutChart
 * Released under the MIT license.
 *
 */

/*
;(function($, undefined) {
    $.fn.drawDoughnutChart = function(data, options) {
        var $this = this,
            W = $this.width(),
            H = $this.height(),
            centerX = W/2,
            centerY = H/2,
            cos = Math.cos,
            sin = Math.sin,
            PI = Math.PI,
            settings = $.extend({


                edgeOffset : 10,//offset from edge of $this
                percentageInnerCutout : 0,
                animation : true,
                animationSteps : 90,
                animationEasing : "easeInOutExpo",
                animateRotate : true,


                beforeDraw: function() {  },
                afterDrawed : function() {  },
                onPathEnter : function(e,data) {  },
                onPathLeave : function(e,data) {  }
            }, options),
            animationOptions = {
                linear : function (t) {
                    return t;
                },
                easeInOutExpo: function (t) {
                    var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
                    return (v>1) ? 1 : v;
                }
            },
            requestAnimFrame = function() {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            }();

        settings.beforeDraw.call($this);

        var $svg = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this),
            $paths = [],
            easingFunction = animationOptions[settings.animationEasing],
            doughnutRadius = Min([H / 2,W / 2]) - settings.edgeOffset,
            cutoutRadius = doughnutRadius * (settings.percentageInnerCutout / 100),
            segmentTotal = 0;

        //Draw base doughnut
        var baseDoughnutRadius = doughnutRadius + settings.baseOffset,
            baseCutoutRadius = cutoutRadius - settings.baseOffset;
        $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
            .attr({
                "d": getHollowCirclePath(baseDoughnutRadius, baseCutoutRadius),
                "fill": settings.baseColor
            })
            .appendTo($svg);

        //Set up pie segments wrapper
        var $pathGroup = $(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
        $pathGroup.attr({opacity: 0}).appendTo($svg);

        //Set up tooltip
        var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
            tipW = $tip.width(),
            tipH = $tip.height();

        //Set up center text area
        var summarySize = (cutoutRadius - (doughnutRadius - cutoutRadius)) * 2,
            $summary = $('<div class="' + settings.summaryClass + '" />')
                .appendTo($this)
                .css({
                    width: summarySize + "px",
                    height: summarySize + "px",
                    "margin-left": -(summarySize / 2) + "px",
                    "margin-top": -(summarySize / 2) + "px"
                });

        var $summaryNumber = $('<p class="' + settings.summaryNumberClass + '"></p>').appendTo($summary).css({opacity: 0});

        for (var i = 0, len = data.length; i < len; i++) {
            segmentTotal += data[i].value;
            $paths[i] = $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
                .attr({
                    "stroke-width": settings.segmentStrokeWidth,
                    "stroke": settings.segmentStrokeColor,
                    "fill": data[i].color,
                    "data-order": i
                })
                .appendTo($pathGroup)
                .on("mouseenter", pathMouseEnter)
                .on("mouseleave", pathMouseLeave)
                .on("mousemove", pathMouseMove);
        }

        //Animation start
        animationLoop(drawPieSegments);

        //Functions
        function getHollowCirclePath(doughnutRadius, cutoutRadius) {
            //Calculate values for the path.
            //We needn't calculate startRadius, segmentAngle and endRadius, because base doughnut doesn't animate.
            var startRadius = -1.570,// -Math.PI/2
                segmentAngle = 6.2831,// 1 * ((99.9999/100) * (PI*2)),
                endRadius = 4.7131,// startRadius + segmentAngle
                startX = centerX + cos(startRadius) * doughnutRadius,
                startY = centerY + sin(startRadius) * doughnutRadius,
                endX2 = centerX + cos(startRadius) * cutoutRadius,
                endY2 = centerY + sin(startRadius) * cutoutRadius,
                endX = centerX + cos(endRadius) * doughnutRadius,
                endY = centerY + sin(endRadius) * doughnutRadius,
                startX2 = centerX + cos(endRadius) * cutoutRadius,
                startY2 = centerY + sin(endRadius) * cutoutRadius;
            var cmd = [
                'M', startX, startY,
                'A', doughnutRadius, doughnutRadius, 0, 1, 1, endX, endY,//Draw outer circle
                'Z',//Close path
                'M', startX2, startY2,//Move pointer
                'A', cutoutRadius, cutoutRadius, 0, 1, 0, endX2, endY2,//Draw inner circle
                'Z'
            ];
            cmd = cmd.join(' ');
            return cmd;
        };
        function pathMouseEnter(e) {
            var order = $(this).data().order;

            settings.onPathEnter.apply($(this),[e,data]);
        }
        function pathMouseLeave(e) {
            $tip.hide();
            settings.onPathLeave.apply($(this),[e,data]);
        }
        function pathMouseMove(e) {
            $tip.css({
                top: e.pageY + settings.tipOffsetY,
                left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
            });
        }
        function drawPieSegments (animationDecimal) {
            var startRadius = -PI / 2,//-90 degree
                rotateAnimation = 1;
            if (settings.animation && settings.animateRotate) rotateAnimation = animationDecimal;//count up between0~1

            drawDoughnutText(animationDecimal, segmentTotal);

            $pathGroup.attr("opacity", animationDecimal);

            //If data have only one value, we draw hollow circle(#1).
            if (data.length === 1 && (4.7122 < (rotateAnimation * ((data[0].value / segmentTotal) * (PI * 2)) + startRadius))) {
                $paths[0].attr("d", getHollowCirclePath(doughnutRadius, cutoutRadius));
                return;
            }
            for (var i = 0, len = data.length; i < len; i++) {
                var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (PI * 2)),
                    endRadius = startRadius + segmentAngle,
                    largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
                    startX = centerX + cos(startRadius) * doughnutRadius,
                    startY = centerY + sin(startRadius) * doughnutRadius,
                    endX2 = centerX + cos(startRadius) * cutoutRadius,
                    endY2 = centerY + sin(startRadius) * cutoutRadius,
                    endX = centerX + cos(endRadius) * doughnutRadius,
                    endY = centerY + sin(endRadius) * doughnutRadius,
                    startX2 = centerX + cos(endRadius) * cutoutRadius,
                    startY2 = centerY + sin(endRadius) * cutoutRadius;
                var cmd = [
                    'M', startX, startY,//Move pointer
                    'A', doughnutRadius, doughnutRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
                    'L', startX2, startY2,//Draw line path(this line connects outer and innner arc paths)
                    'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2,//Draw inner arc path
                    'Z'//Cloth path
                ];
                $paths[i].attr("d", cmd.join(' '));
                startRadius += segmentAngle;
            }
        }
        function drawDoughnutText(animationDecimal, segmentTotal) {
            $summaryNumber

        }
        function animateFrame(cnt, drawData) {
            var easeAdjustedAnimationPercent =(settings.animation)? CapValue(easingFunction(cnt), null, 0) : 1;
            drawData(easeAdjustedAnimationPercent);
        }
        function animationLoop(drawData) {
            var animFrameAmount = (settings.animation)? 1 / CapValue(settings.animationSteps, Number.MAX_VALUE, 1) : 1,
                cnt =(settings.animation)? 0 : 1;
            requestAnimFrame(function() {
                cnt += animFrameAmount;
                animateFrame(cnt, drawData);
                if (cnt <= 1) {
                    requestAnimFrame(arguments.callee);
                } else {
                    settings.afterDrawed.call($this);
                }
            });
        }
        function Max(arr) {
            return Math.max.apply(null, arr);
        }
        function Min(arr) {
            return Math.min.apply(null, arr);
        }
        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        function CapValue(valueToCap, maxValue, minValue) {
            if (isNumber(maxValue) && valueToCap > maxValue) return maxValue;
            if (isNumber(minValue) && valueToCap < minValue) return minValue;
            return valueToCap;
        }
        return $this;
    };
})(jQuery);

*/




Template.home.events({
    "mouseover #s1": function() {
        $("#grafo").animate({"opacity" : "0.3"},200);
        $("#grafo").css({"cursor":"pointer"});

        $("#seeMore1").animate({"opacity" : "1"},200);
    }


});



$(function(){

    $("#logoL").click(function(){
        document.location = "home.html";

    })

    $(".logout").click(function(){
        document.location = "index.html";

    })





    $("#s1").mouseenter(function() {
        $("#grafo").animate({"opacity" : "0.3"},200);
        $("#grafo").css({"cursor":"pointer"});

        $("#seeMore1").animate({"opacity" : "1"},200);
    });


    $("#s2").mouseenter(function() {
        $("#seeMore2").animate({"opacity" : "1"},200);
    });

    $("#s3").mouseenter(function() {
        $("#seeMore3").animate({"opacity" : "1"},200);
    });

    $("#s4").mouseenter(function() {
        $("#seeMore4").animate({"opacity" : "1"},200);
    });

    $("#s5").mouseenter(function() {
        $("#seeMore5").animate({"opacity" : "1"},200);
    });




    $("#s1").mouseleave(function() {
        $("#grafo").animate({"opacity": "1"},200);
        $("#seeMore1").animate({"opacity" : "0"},200);
    });

    $("#s2").mouseleave(function() {
        $("#seeMore2").animate({"opacity" : "0"},200);
    });

    $("#s3").mouseleave(function() {
        $("#seeMore3").animate({"opacity" : "0"},200);
    });

    $("#s4").mouseleave(function() {
        $("#seeMore4").animate({"opacity" : "0"},200);
    });

    $("#s5").mouseleave(function() {
        $("#seeMore5").animate({"opacity" : "0"},200);
    });




    $( "#s1" ).click(function() {
        document.location = "friends.html";
    });



    $( ".menu" ).click(function() {
        $(".menuBack").slideToggle(200);
    });








});




/*
 $("#logoL").mouseenter(function() {
 alert("cao"):
 var Request = new XMLHttpRequest();
 var client_id = df0203fde4bb77e9392463f74d2ae53c415852d09711b7e7103b86afdd9ed3df;
 var redirect_uri = "https://www.google.com";

 Request.open('GET', 'https://api-v2launch.trakt.tv/oauth/authorize?response_type=code&client_id='+client_id+'&redirect_uri='+redirect_uri);

 Request.setRequestHeader('Content-Type', 'application/json');

 Request.onreadystatechange = function () {
 if (this.readyState === 4) {
 console.log('Status:', this.status);
 console.log('Headers:', this.getAllResponseHeaders());
 console.log('Body:', this.responseText);
 }
 };

 Request.send(JSON.stringify(body));
 });*/

