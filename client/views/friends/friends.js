// d3.tip
// Copyright (c) 2013 Justin Palmer
//
// Tooltips for d3.js SVG visualizations

// Public - contructs a new tooltip
//
// Returns a tip
d3.tip = function() {
    var direction = d3_tip_direction,
        offset    = d3_tip_offset,
        html      = d3_tip_html,
        node      = initNode(),
        svg       = null,
        point     = null,
        target    = null

    function tip(vis) {
        svg = getSVGNode(vis)
        point = svg.createSVGPoint()
        document.body.appendChild(node)
    }

    // Public - show the tooltip on the screen
    //
    // Returns a tip
    tip.show = function() {
        var args = Array.prototype.slice.call(arguments)
        if(args[args.length - 1] instanceof SVGElement) target = args.pop()

        var content = html.apply(this, args),
            poffset = offset.apply(this, args),
            dir     = direction.apply(this, args),
            nodel   = d3.select(node), i = 0,
            coords

        nodel.html(content)
            .style({ opacity: 1, 'pointer-events': 'all' })

        while(i--) nodel.classed(directions[i], false)
        coords = direction_callbacks.get(dir).apply(this)
        nodel.classed(dir, true).style({
            top: (coords.top +  poffset[0]) + 'px',
            left: (coords.left + poffset[1]) + 'px'
        })

        return tip
    }

    // Public - hide the tooltip
    //
    // Returns a tip
    tip.hide = function() {
        nodel = d3.select(node)
        nodel.style({ opacity: 0, 'pointer-events': 'none' })
        return tip
    }

    // Public: Proxy attr calls to the d3 tip container.  Sets or gets attribute value.
    //
    // n - name of the attribute
    // v - value of the attribute
    //
    // Returns tip or attribute value
    tip.attr = function(n, v) {
        if (arguments.length < 2 && typeof n === 'string') {
            return d3.select(node).attr(n)
        } else {
            var args =  Array.prototype.slice.call(arguments)
            d3.selection.prototype.attr.apply(d3.select(node), args)
        }

        return tip
    }

    // Public: Proxy style calls to the d3 tip container.  Sets or gets a style value.
    //
    // n - name of the property
    // v - value of the property
    //
    // Returns tip or style property value
    tip.style = function(n, v) {
        if (arguments.length < 2 && typeof n === 'string') {
            return d3.select(node).style(n)
        } else {
            var args =  Array.prototype.slice.call(arguments)
            d3.selection.prototype.style.apply(d3.select(node), args)
        }

        return tip
    }

    // Public: Set or get the direction of the tooltip
    //
    // v - One of n(north), s(south), e(east), or w(west), nw(northwest),
    //     sw(southwest), ne(northeast) or se(southeast)
    //
    // Returns tip or direction
    tip.direction = function(v) {
        if (!arguments.length) return direction
        direction = v == null ? v : d3.functor(v)

        return tip
    }

    // Public: Sets or gets the offset of the tip
    //
    // v - Array of [x, y] offset
    //
    // Returns offset or
    tip.offset = function(v) {
        if (!arguments.length) return offset
        offset = v == null ? v : d3.functor(v)

        return tip
    }

    // Public: sets or gets the html value of the tooltip
    //
    // v - String value of the tip
    //
    // Returns html value or tip
    tip.html = function(v) {
        if (!arguments.length) return html
        html = v == null ? v : d3.functor(v)

        return tip
    }

    function d3_tip_direction() { return 'n' }
    function d3_tip_offset() { return [0, 0] }
    function d3_tip_html() { return ' ' }

    var direction_callbacks = d3.map({
            n:  direction_n,
            s:  direction_s,
            e:  direction_e,
            w:  direction_w,
            nw: direction_nw,
            ne: direction_ne,
            sw: direction_sw,
            se: direction_se
        }),

        directions = direction_callbacks.keys()

    function direction_n() {
        var bbox = getScreenBBox()
        return {
            top:  bbox.n.y - node.offsetHeight,
            left: bbox.n.x - node.offsetWidth / 2
        }
    }

    function direction_s() {
        var bbox = getScreenBBox()
        return {
            top:  bbox.s.y,
            left: bbox.s.x - node.offsetWidth / 2
        }
    }

    function direction_e() {
        var bbox = getScreenBBox()
        return {
            top:  bbox.e.y - node.offsetHeight / 2,
            left: bbox.e.x
        }
    }

    function direction_w() {
        var bbox = getScreenBBox()
        return {
            top:  bbox.w.y - node.offsetHeight / 2,
            left: bbox.w.x - node.offsetWidth
        }
    }

    function direction_nw() {
        var bbox = getScreenBBox()
        return {
            top:  bbox.nw.y - node.offsetHeight,
            left: bbox.nw.x - node.offsetWidth
        }
    }

    function direction_ne() {
        var bbox = getScreenBBox()
        return {
            top:  bbox.ne.y - node.offsetHeight,
            left: bbox.ne.x
        }
    }

    function direction_sw() {
        var bbox = getScreenBBox()
        return {
            top:  bbox.sw.y,
            left: bbox.sw.x - node.offsetWidth
        }
    }

    function direction_se() {
        var bbox = getScreenBBox()
        return {
            top:  bbox.se.y,
            left: bbox.e.x
        }
    }

    function initNode() {
        var node = d3.select(document.createElement('div'))
        node.style({
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            boxSizing: 'border-box'
        })

        return node.node()
    }

    function getSVGNode(el) {
        el = el.node()
        if(el.tagName.toLowerCase() == 'svg')
            return el

        return el.ownerSVGElement
    }

    // Private - gets the screen coordinates of a shape
    //
    // Given a shape on the screen, will return an SVGPoint for the directions
    // n(north), s(south), e(east), w(west), ne(northeast), se(southeast), nw(northwest),
    // sw(southwest).
    //
    //    +-+-+
    //    |   |
    //    +   +
    //    |   |
    //    +-+-+
    //
    // Returns an Object {n, s, e, w, nw, sw, ne, se}
    function getScreenBBox() {
        var targetel   = target || d3.event.target,
            bbox       = {},
            matrix     = targetel.getScreenCTM(),
            tbbox      = targetel.getBBox(),
            width      = tbbox.width,
            height     = tbbox.height,
            x          = tbbox.x,
            y          = tbbox.y,
            scrollTop  = document.documentElement.scrollTop || document.body.scrollTop,
            scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft


        point.x = x + scrollLeft
        point.y = y + scrollTop
        bbox.nw = point.matrixTransform(matrix)
        point.x += width
        bbox.ne = point.matrixTransform(matrix)
        point.y += height
        bbox.se = point.matrixTransform(matrix)
        point.x -= width
        bbox.sw = point.matrixTransform(matrix)
        point.y -= height / 2
        bbox.w  = point.matrixTransform(matrix)
        point.x += width
        bbox.e = point.matrixTransform(matrix)
        point.x -= width / 2
        point.y -= height / 2
        bbox.n = point.matrixTransform(matrix)
        point.y += height
        bbox.s = point.matrixTransform(matrix)

        return bbox
    }

    return tip
};


Template.friends.helpers({
    friends: function() {

        if (Meteor.user()) {
            if (Session.get("friends")) {

                var friendsList = Session.get("friends");

                console.log(friendsList);


                var friends = {"nodes": [], "links": []};
                friends.nodes.push({"name": "tomasfrancisco", "genre": 0, "avatar": Meteor.user().profile.picture});

                var genresColor = [];
                var i = 0;
                friendsList.me.forEach(function (value) {
                    genresColor.push({"name": value.name, "color": i});
                    i++;
                });

                console.log("GenresColor");
                console.log(genresColor);

                console.log("FriendsList");
                console.log(friendsList);

                console.log(Meteor.user().profile.username + " top: " + friendsList.me[0].name + " color: " + genresColor[0].color);

                i = 1;
                friendsList.data.forEach(function (value) {
                    console.log("Friend");
                    console.log(value);
                    var color = 5;
                    var size = 1;

                    for (var j = 0; j < genresColor.length; j++) {
                        if (value.genres[0].name == genresColor[j].name) {
                            if (j == 0) {
                                size = 1;
                            } else {
                                size = 0;
                            }
                            console.log(value.user.username + " top: " + value.genres[0].name + " color: " + genresColor[j].color);
                            color = genresColor[j].color;
                        }
                    }

                    friends.nodes.push({
                        "name": value.user.username,
                        "genre": color,
                        "avatar": value.user.images.avatar.full,
                        "size": size
                    });
                    friends.links.push({"source": 0, "target": i, "value": 10});
                    i++;
                });


                console.log("Friends:");
                console.log(friends);
                Session.set("friendsGraph", friends);
            }
        }
    },

    getFriends: function() {
        if(Meteor.user()) {
            if(Session.get("friends") === undefined) {
                if(Session.get("myTop")) {
                    Meteor.call('getStatsGenresFriends', Meteor.user().profile.username, Session.get("myTop"), function (err, result) {
                        console.log("getStatsGenresFriends");
                        console.log(result);

                        Session.setPersistent("friends", result);
                    });
                }
            }
        }
    }
});

/**
 * Created by goncaloneves on 24/04/15.
 */
Template.friends.rendered = function() {

<<<<<<< HEAD
    var self = this;

    self.reactiveData = Deps.autorun(function () {

        console.log("REACTIVE");



        var friends = Session.get("friendsGraph");

        if(friends) {

            /*var width = 1200,
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
                .attr("width", function (d) {
                    if (d.size) {
                        return 80;
                    } else {
                        return 50;
                    }
                })
                .attr("height", function (d) {
                    if (d.size) {
                        return 80;
                    } else {
                        return 50;
                    }
                })
                .attr("xlink:href", function (d) {
                    return d.avatar;
                })
                .attr("x", function (d) {
                    if (d.size) {
                        return -40;
                    } else {
                        return -25;
                    }
                })
                .attr("y", function (d) {
                    if (d.size) {
                        return -40;
                    } else {
                        return -25;
                    }
                });

            node.append("rect")
                .attr("class", "circle")
                .attr("width", function (d) {
                    if (d.size) {
                        return 80;
                    } else {
                        return 50;
                    }
                })
                .attr("height", function (d) {
                    if (d.size) {
                        return 80;
                    } else {
                        return 50;
                    }
                })
                .attr("x", function (d) {
                    if (d.size) {
                        return -40;
                    } else {
                        return -25;
                    }
                })
                .attr("y", function (d) {
                    if (d.size) {
                        return -40;
                    } else {
                        return -25;
                    }
                })
                .style("stroke", function (d) {
                    return color(d.genre);
                })
                .style("fill", "transparent");

            force.on("tick", function () {
                link.attr("x1", function (d) {
                    return d.source.x;
                })
                    .attr("y1", function (d) {
                        return d.source.y;
                    })
                    .attr("x2", function (d) {
                        return d.target.x;
                    })
                    .attr("y2", function (d) {
                        return d.target.y;
                    });

                node.attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });
            });
        } */



        var width = 1200,
            height = 900;

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([0, 0])
            .html(function(d) {
                return "<span id ='hoverGraph'>" + d.name + "</span>";
            });

        var svg = d3.select("#grafo").append("svg")
            .attr("width", width)
            .attr("height", height);


        var color = d3.scale.ordinal()
            .range(["#edda2f", "#ffec00", "#a8941a", "#fff803", "#efde97", "#e2c73d", "#e2c73d"]);

        var valor = [120,80,40];

        var pos = [-80,-50,-20];



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
            .attr("width", function(d) { return valor[d.value];})
            .attr("height", function(d) { return valor[d.value];})
            .attr("xlink:href", "img/g.jpg")
            .attr("x", function(d) { return pos[d.value];})
            .attr("y", function(d) { return pos[d.value];})
            ;

        node.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dx", 12)
            .attr("dy", "0.35em")
            .text(function(d) { return d.name })
            .style("font-family", "Quicksand")
            .style("font-size", "1em")
            .style("text-align", "center")
            .style("fill", "red")
            .style("opacity", "0.0")
            ;



        node.call(tip);

        node.append("rect")
            .attr("class", "circle")
            .attr("width", function(d) { return valor[d.value];})
            .attr("height", function(d) { return valor[d.value];})
            .attr("x", function(d) { return pos[d.value];})
            .attr("y", function(d) { return pos[d.value];})
            .style("stroke", function(d) { return color(d.group); })
            .style("fill", "transparent")
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);







        force.on("tick", function() {
            link.attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        }
        }

    });
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