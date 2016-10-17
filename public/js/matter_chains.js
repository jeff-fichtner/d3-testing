// function Start() {

//     var World = Matter.World,
//         Bodies = Matter.Bodies,
//         Body = Matter.Body,
//         Composite = Matter.Composite,
//         Composites = Matter.Composites,
//         Constraint = Matter.Constraint;

//     // Example.chains = function(demo) {
//     //     var engine = demo.engine,
//     //         world = engine.world,
//     //         group = Body.nextGroup(true);

//         var ropeA = Composites.stack(200, 100, 5, 2, 10, 10, function(x, y) {
//             return Bodies.rectangle(x, y, 50, 20, { collisionFilter: { group: group } });
//         });

//         Composites.chain(ropeA, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2 });
//         Composite.add(ropeA, Constraint.create({
//             bodyB: ropeA.bodies[0],
//             pointB: { x: -25, y: 0 },
//             pointA: { x: 200, y: 100 },
//             stiffness: 0.5
//         }));

//         World.add(world, ropeA);

//         group = Body.nextGroup(true);

//         var ropeB = Composites.stack(500, 100, 5, 2, 10, 10, function(x, y) {
//             return Bodies.circle(x, y, 20, { collisionFilter: { group: group } });
//         });

//         Composites.chain(ropeB, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2 });
//         Composite.add(ropeB, Constraint.create({
//             bodyB: ropeB.bodies[0],
//             pointB: { x: -20, y: 0 },
//             pointA: { x: 500, y: 100 },
//             stiffness: 0.5
//         }));

//         World.add(world, ropeB);
//     };

// };

function Start() {
    // create a Matter.js engine
    var engine = Engine.create(document.getElementById('canvas-container'));

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    World.add(engine.world, [boxA, boxB, ground]);

    // run the engine
    Engine.run(engine);
}
