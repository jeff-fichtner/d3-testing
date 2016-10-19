var interval;
var N = 10,  // Number of circles in each rope
    M = 2,  // Number of ropes
    r = 0.07; // Circle radius
    d = 2.2;        // Distance between circle centers
// Create demo application
var app = new p2.WebGLRenderer({
    setup: function(){
        // Create a world with island splitting enabled.
        // The island splitting will cut the scene into independent islands and treat them as separate simulations. This can improve performance.
        var world = new p2.World({
            gravity : [0,-10],
            islandSplit : true
        });
        this.setWorld(world);
        world.solver.tolerance = 0.1;
        world.solver.iterations = N;
        // Create circle ropes
        for(var j=0; j<M; j++){
            var lastBody;
            for(var i=N; i>=0; i--){
                var x = (j+0.5-M/2)*r*8;
                var y = (N/2-i)*r*2.1;
                var p = new p2.Body({
                    mass: i==0 ? 0 : 1,
                    position: [x +1, y + 1]
                });
                p.addShape(new p2.Circle({ radius: r }));
                world.addBody(p);
                if(lastBody){
                    // Connect the current body to the previous one
                    var dist = Math.abs(p.position[1]-lastBody.position[1]);
                    var constraint = new p2.DistanceConstraint(p,lastBody, {
                        distance: dist
                    });
                    world.addConstraint(constraint);
                } else {
                    p.velocity[0] = 1*i;
                }
                lastBody = p;
            }
            lastBody = null;
        }


        var xmin = (-N/2 * r*d),
            xmax = ( N/2 * r*d),
            ymin = (-M/2 * r*d),
            ymax = ( M/2 * r*d);

        // Create bottom plane
        var plane = new p2.Body({
            position : [0,-5],
        });
        plane.addShape(new p2.Plane());
        world.addBody(plane);
        // Left plane
        var planeLeft = new p2.Body({
            angle: -Math.PI/2,
            position: [-5, 0]
        });
        planeLeft.addShape(new p2.Plane());
        world.addBody(planeLeft);
        // Right plane
        var planeRight = new p2.Body({
            angle: Math.PI/2,
            position: [5, 0]
        });
        planeRight.addShape(new p2.Plane());
        world.addBody(planeRight);

        // Print the number of independent islands to console repeatedly.
        // This will output 10 if the ropes don't touch.
        // interval = setInterval(function(){
        //     var numIslands = world.unionFind.count;
        //     console.log("Number of islands:",numIslands);
        // },1000);
    },
    teardown: function(){
        clearInterval(interval);
    }
});
