Template.friends.helpers({
    friends: function() {
        if(Meteor.user()) {
            if(Session.get("friends")) {
                console.log(Session.get("friends"));
                return Session.get("friends");
            }
        }

    },

    getFriends: function() {
        console.log(Meteor.user().profile.username);
        if(Meteor.user()) {
            Meteor.call('getFriends', Meteor.user().profile.username, function (err, result) {
                console.log(result);
                Session.setPersistent("friends", result);
            });
        }
    }
});

/**
 * Created by goncaloneves on 24/04/15.
 */
Template.friends.rendered = function() {

    // d3 code
    var friends = {
        "nodes":[
            {"name":"Gonçalo","group":0},
            {"name":"Tomás","group":1},
            {"name":"Zé","group":2},
            {"name":"Diogo","group":3},
            {"name":"Ana","group":4},
            {"name":"Sónia","group":5},
            {"name":"Diana","group":2},
            {"name":"Maria","group":1}
        ],

        "links":[

            {"source":0,"target":1,"value":1},
            {"source":0,"target":2,"value":1},
            {"source":0,"target":3,"value":2},
            {"source":0,"target":4,"value":3},
            {"source":0,"target":5,"value":4},
            {"source":0,"target":6,"value":5},
            {"source":0,"target":7,"value":0}
        ]
    }


    var width = 1200,
        height = 900;

    var svg = d3.select("#grafo").append("svg")
        .attr("width", width)
        .attr("height", height);


    var color = d3.scale.ordinal()
        .range(["#edda2f", "#ffec00", "#a8941a", "#fff803", "#efde97", "#e2c73d", "#e2c73d"]);


    var force = d3.layout.force()
        .charge(-800)
        .linkDistance(200)
        .linkStrength(0.1)
        .friction(0.9)
        .gravity(0.05)

        .size([width, height]);


    force
        .nodes(friends.nodes)
        .links(friends.links)
        .start();

    var link = svg.selectAll(".link")
        .data(friends.links)
        .enter().append("line")
        .attr("class", "link");

    var node = svg.selectAll(".node")
        .data(friends.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    var raio = 45;

    node.append("svg:image")
        .attr("class", "circle")
        .attr("width", 75)
        .attr("height", 75)
        .attr("xlink:href", "img/g.jpg")
        .attr("x", -50)
        .attr("y", -50);

    node.append("rect")
        .attr("class", "circle")
        .attr("width", 75)
        .attr("height", 75)
        .attr("x", -50)
        .attr("y", -50)
        .style("stroke", function(d) { return color(d.group); })
        .style("fill", "transparent");

    node.append("text")
        .attr("x", -63)
        .attr("y", 40)
        .attr("dx", 12)
        .attr("dy", "0.35em")
        .text(function(d) { return d.name })
        .style("font-family", "Quicksand")
        .style("font-size", "1em")
        .style("text-align", "center")
        .style("fill", "red");


    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
}