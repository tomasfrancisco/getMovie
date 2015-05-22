Template.friends.helpers({
    friends: function() {


    },

    getFriends: function() {
        if(Meteor.user()) {
            if(Session.get("friends") === undefined) {
                Meteor.call('getStatsGenresFriends', Meteor.user().profile.username, function (err, result) {
                    console.log("getStatsGenresFriends");
                    console.log(result);

                    Session.setPersistent("friends", result);
                });
            }
        }
    }
});

/**
 * Created by goncaloneves on 24/04/15.
 */
Template.friends.rendered = function() {
    if(Meteor.user()) {
        if(Session.get("friends")) {
            var friendsList = Session.get("friends");



            var friends = {"nodes": [], "links":[]};
            friends.nodes.push({"name": "tomasfrancisco", "genre": 0, "avatar": Meteor.user().profile.picture});

            var genresColor = [];
            var i = 0;
            friendsList.me.forEach(function(value) {
                genresColor.push({"name": value.name, "color": i});
                i++;
            });

            console.log("GenresColor");
            console.log(genresColor);

            console.log("FriendsList");
            console.log(friendsList);

            console.log(Meteor.user().profile.username + " top: " + friendsList.me[0].name + " color: " + genresColor[0].color);

            i = 1;
            friendsList.data.forEach(function(value) {
                console.log("Friend");
                console.log(value);
                var color = 5;
                var size = 1;

                for(var j = 0; j < genresColor.length; j++) {
                    if(value.genres[0].name == genresColor[j].name) {
                        if(j == 0) {
                            size = 1;
                        } else {
                            size = 0;
                        }
                        console.log(value.user.username + " top: " + value.genres[0].name + " color: " + genresColor[j].color);
                        color = genresColor[j].color;
                    }
                }

                friends.nodes.push({"name": value.user.username, "genre": color, "avatar": value.user.images.avatar.full, "size": size});
                friends.links.push({"source": 0, "target": i, "value": 10});
                i++;
            });


            console.log("Friends:");
            console.log(friends);

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
                .attr("width", function(d) {
                    if(d.size) {
                        return 80;
                    } else {
                        return 50;
                    }
                })
                .attr("height", function(d) {
                    if(d.size) {
                        return 80;
                    } else {
                        return 50;
                    }
                })
                .attr("xlink:href", function(d) { return d.avatar; })
                .attr("x", function(d) {
                    if(d.size) {
                        return -40;
                    } else {
                        return -25;
                    }
                })
                .attr("y", function(d) {
                    if(d.size) {
                        return -40;
                    } else {
                        return -25;
                    }
                });

            node.append("rect")
                .attr("class", "circle")
                .attr("width", function(d) {
                                    if(d.size) {
                                        return 80;
                                    } else {
                                        return 50;
                                    }
                                })
                .attr("height", function(d) {
                                    if(d.size) {
                                        return 80;
                                    } else {
                                        return 50;
                                    }
                                })
                .attr("x", function(d) {
                    if(d.size) {
                        return -40;
                    } else {
                        return -25;
                    }
                })
                .attr("y", function(d) {
                    if(d.size) {
                        return -40;
                    } else {
                        return -25;
                    }
                })
                .style("stroke", function(d) { return color(d.genre); })
                .style("fill", "transparent");

            force.on("tick", function() {
                link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            });
        }
    }

}

Template.friends.events({

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