import { dialogueData, scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";

k.loadSprite("player-down", "./player-down.png");
k.loadSprite("player-up", "./player-up.png");
k.loadSprite("player-left", "./player-left.png");
k.loadSprite("player-right", "./player-right.png");

k.loadSprite("map", "./map.png");

k.setBackground(k.Color.fromHex("#af8676"));

k.scene("main", async () => {
  const mapData = await (await fetch("./map.json")).json();
  
  // Extract object groups from JSON
  const objectGroups = mapData.layers.filter(layer => 
    layer.type === "objectgroup"
  ).map(group => ({
    name: group.name,
    objects: group.objects || []
  }));

  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);
  
  // Center the map on screen
  const mapWidth = 1024 * scaleFactor;
  const mapHeight = 1024 * scaleFactor;
  const screenWidth = k.width();
  const screenHeight = k.height();
  
  map.pos = k.vec2(
    (screenWidth - mapWidth) / 2,
    (screenHeight - mapHeight) / 2
  );

  const player = k.make([
    k.sprite("player-down"), // Start with down-facing sprite
    k.area({
      shape: new k.Rect(k.vec2(0, 3), 20, 20),
    }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor * 0.3), // Make avatar much smaller
    {
      speed: 80, // Much slower movement for better control
      direction: "down",
      isInDialogue: false,
    },
    "player",
  ]);

  // Process object groups (walls, boundaries, and spawnpoints)
  for (const group of objectGroups) {
    if (group.name === "walls") {
      // Add wall colliders
      for (const wall of group.objects) {
        const wallObj = k.add([
          k.area({
            shape: new k.Rect(k.vec2(0), wall.width * scaleFactor, wall.height * scaleFactor),
          }),
          k.body({ isStatic: true }),
          k.pos(
            map.pos.x + wall.x * scaleFactor,
            map.pos.y + wall.y * scaleFactor
          ),
          "wall",
        ]);
      }
    }

    if (group.name === "boundaries") {
      for (const boundary of group.objects) {
        const boundaryObj = k.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width * scaleFactor, boundary.height * scaleFactor),
          }),
          k.body({ isStatic: true }),
          k.pos(
            map.pos.x + boundary.x * scaleFactor,
            map.pos.y + boundary.y * scaleFactor
          ),
          boundary.name,
        ]);

        if (boundary.name) {
          console.log(`Created boundary: ${boundary.name} at (${boundary.x * scaleFactor}, ${boundary.y * scaleFactor}) with size (${boundary.width * scaleFactor}, ${boundary.height * scaleFactor})`);
          player.onCollide(boundary.name, () => {
            console.log(`Collision detected with: ${boundary.name}`);
            console.log(`Dialogue data available:`, dialogueData[boundary.name] ? 'Yes' : 'No');
            player.isInDialogue = true;
            displayDialogue(
              dialogueData[boundary.name],
              () => (player.isInDialogue = false),
              boundary.name === "desktop"
            );
          });
        }
      }
    }

    if (group.name === "spawnpoints") {
      for (const entity of group.objects) {
        if (entity.name === "start") {
          player.pos = k.vec2(
            map.pos.x + entity.x * scaleFactor,
            map.pos.y + entity.y * scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }
  }

  // Add collision detection with walls to prevent walking through them
  player.onCollide("wall", () => {
    // Stop player movement when hitting walls
    player.stop();
  });

  // Add collision detection with boundaries
  player.onCollide("boundary", () => {
    // This will be handled by individual boundary names
  });

  // Add map boundary constraints to prevent avatar from leaving the map
  k.onUpdate(() => {
    // Keep camera centered on the map
    k.camPos(map.pos.x + mapWidth / 2, map.pos.y + mapHeight / 2);
    
    // Constrain player position to map boundaries
    const playerRadius = 10 * scaleFactor * 0.3; // Account for player size and scale
    const minX = map.pos.x + playerRadius;
    const maxX = map.pos.x + mapWidth - playerRadius;
    const minY = map.pos.y + playerRadius;
    const maxY = map.pos.y + mapHeight - playerRadius;
    
    // Clamp player position to map boundaries
    player.pos.x = Math.max(minX, Math.min(maxX, player.pos.x));
    player.pos.y = Math.max(minY, Math.min(maxY, player.pos.y));
  });

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onMouseDown((mouseBtn) => {
    if (mouseBtn !== "left" || player.isInDialogue) return;

    const worldMousePos = k.toWorld(k.mousePos());
    
    // Check if the target position is valid (not inside a wall)
    const targetPos = worldMousePos;
    
    // Use moveTo with collision detection
    player.moveTo(targetPos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);

    const lowerBound = 50;
    const upperBound = 125;

    if (
      mouseAngle > lowerBound &&
      mouseAngle < upperBound &&
      player.direction !== "up"
    ) {
      player.use(k.sprite("player-up"));
      player.direction = "up";
      return;
    }

    if (
      mouseAngle < -lowerBound &&
      mouseAngle > -upperBound &&
      player.direction !== "down"
    ) {
      player.use(k.sprite("player-down"));
      player.direction = "down";
      return;
    }

    if (Math.abs(mouseAngle) > upperBound) {
      player.flipX = false;
      if (player.direction !== "right") player.use(k.sprite("player-right"));
      player.direction = "right";
      return;
    }

    if (Math.abs(mouseAngle) < lowerBound) {
      player.flipX = false;
      if (player.direction !== "left") player.use(k.sprite("player-left"));
      player.direction = "left";
      return;
    }
  });

  function stopAnims() {
    if (player.direction === "down") {
      player.use(k.sprite("player-down"));
      return;
    }
    if (player.direction === "up") {
      player.use(k.sprite("player-up"));
      return;
    }
    if (player.direction === "left") {
      player.use(k.sprite("player-left"));
      return;
    }
    if (player.direction === "right") {
      player.use(k.sprite("player-right"));
      return;
    }
  }

  k.onMouseRelease(stopAnims);

  k.onKeyRelease(() => {
    stopAnims();
  });
  k.onKeyDown((key) => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("down"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 1) return;

    if (player.isInDialogue) return;
    
    // Store current position to check for collisions
    const currentPos = player.pos.clone();
    
    if (keyMap[0]) {
      player.flipX = false;
      player.use(k.sprite("player-right"));
      player.direction = "right";
      player.move(player.speed, 0);
      return;
    }

    if (keyMap[1]) {
      player.flipX = false;
      player.use(k.sprite("player-left"));
      player.direction = "left";
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap[2]) {
      player.use(k.sprite("player-up"));
      player.direction = "up";
      player.move(0, -player.speed);
      return;
    }

    if (keyMap[3]) {
      player.use(k.sprite("player-down"));
      player.direction = "down";
      player.move(0, player.speed);
    }
  });
});

k.go("main");
