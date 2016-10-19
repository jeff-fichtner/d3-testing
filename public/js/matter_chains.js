
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Body = Matter.Body;
    Composite = Matter.Composite;
    Composites = Matter.Composites;
    Constraint = Matter.Constraint;
    // Mouse = Matter.Mouse;
    MouseConstraint = Matter.MouseConstraint;

    // console.log(Render);

// create an engine
var engine = Engine.create();
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;
var mouseConstraint = MouseConstraint.create(engine);

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
    }
});

// create two boxes and a ground
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

var group = Body.nextGroup(true);

var rope1 = Composites.stack(300, 100, 5, 2, 10, 10, function(x, y) {
            return Bodies.circle(x, y, 20, { collisionFilter: { group: group } });
        });
        Composites.chain(rope1, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2 });
        Composite.add(rope1, Constraint.create({
            bodyB: rope1.bodies[0],
            pointB: { x: -20, y: 0 },
            pointA: { x: 500, y: 100 },
            stiffness: 0.2
        }));

var rope2 = Composites.stack(100, 100, 5, 2, 10, 10, function(x, y) {
            return Bodies.circle(x, y, 20, { collisionFilter: { group: group } });
        });
        Composites.chain(rope2, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2 });
        Composite.add(rope2, Constraint.create({
            // bodyB: rope.bodies[0],
            pointB: { x: -20, y: 0 },
            pointA: { x: 500, y: 100 },
            stiffness: 0.9
        }));

// var rope3 = Composites.stack(500, 100, 5, 2, 10, 10, function(x, y) {
//             return Bodies.circle(x, y, 20, { collisionFilter: { group: group } });
//         });

//         Composites.chain(rope3, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2 });
//         Composite.add(rope3, Constraint.create({
//             // bodyB: rope.bodies[0],
//             pointB: { x: -20, y: 0 },
//             pointA: { x: 500, y: 100 },
//             stiffness: 0.9
//         }));

// add all of the bodies to the world
World.add(engine.world, [ground, mouseConstraint, rope1, rope2]);

// run the engine
(function run() {
    window.requestAnimationFrame(run);
    Engine.update(engine, 1000 / 30);
})();

// run the renderer
Render.run(render);
