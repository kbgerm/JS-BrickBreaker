const config = {
  squares: [
    {
      position: [0, 25],
      size: [60, 25],
      color: 'rgb(180, 180, 180)',
      hardness: undefined,
    },
    {
      position: [60, 25],
      size: [60, 25],
      color: 'rgb(238, 130, 238)',
      hardness: 1,
    },
    {
      position: [120, 25],
      size: [60, 25],
      color: 'rgb(0, 0, 255)',
      hardness: 2,
    },
    {
      position: [180, 25],
      size: [60, 25],
      color: 'rgb(255, 165, 0)',
      hardness: 3,
    },
    {
      position: [240, 25],
      size: [60, 25],
      color: 'rgb(238, 130, 238)',
      hardness: 3,
    },
    {
      position: [300, 25],
      size: [60, 25],
      color: 'rgb(255, 165, 0)',
      hardness: 3,
    },
    {
      position: [5, 200],
      size: [60, 25],
      color: 'rgb(255, 165, 0)',
      hardness: 3,
    },
  ],
  ball: {
    position: [100, 300],
    size: [10, 10],
    direction: [1, 1],
    color: 'rgb(106, 90, 205)',
  },
  platform: {
    position: [145, 370],
    size: [60, 10],
    color: 'rgb(60, 60, 60)',
  },
  wall: {
    left: {
      name: 'left',
      position: [0, 0],
      size: [0, 400],
    },
    right: {
      name: 'right',
      position: [350, 0],
      size: [0, 400],
    },
    top: {
      name: 'top',
      position: [0, 25],
      size: [350, 0],
    },
    bottom: {
      name: 'bottom',
      position: [0, 400],
      size: [350, 0],
    },
  }
};

const canvas = document.querySelector('#canvas');

document.addEventListener('DOMContentLoaded', draw);
function draw() {
  const ctx = canvas.getContext("2d");

  // скорбар
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(0, 0, 350, 25);

  // отрисовка квадратов
  for (let i = 0; i < config.squares.length; i++) {
    if (!config.squares[i]) {
      continue;
    }
    ctx.fillStyle = config.squares[i].color;
    ctx.fillRect(...config.squares[i].position, ...config.squares[i].size);
  }

  // шарик
  ctx.fillStyle = config.ball.color;
  ctx.fillRect(...config.ball.position, ...config.ball.size);

  // платформа
  ctx.fillStyle = config.platform.color;
  ctx.fillRect(...config.platform.position, ...config.platform.size);
}

function moveBall() {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(...config.ball.position, ...config.ball.size);

  const ball = config.ball;
  ball.position[0] += ball.direction[0];
  ball.position[1] += ball.direction[1];

  const wall = config.wall;

  const walls = [
    wall.left, wall.right, wall.top, wall.bottom
  ];

  walls.forEach(w => {
    if (isColliding(ball, w)) {
      const side = whichSideColliding(ball, w);
      if (!side) {
        return;
      }
      console.log(side);
      if (side === 'left' || side === 'right') {
        ball.direction[0] = -ball.direction[0]
      } else {
        ball.direction[1] = -ball.direction[1]
      }
    }
  })

  const blocks = config.squares;

  blocks.forEach(block => {
    if (isColliding(ball, block)) {
      const side = whichSideColliding(ball, block);
      if (!side) {
        return;
      }
      console.log(side);
      if (side === 'left' || side === 'right') {
        ball.direction[0] = -ball.direction[0]
      } else {
        ball.direction[1] = -ball.direction[1]
      }
    }
  })

  const platform = config.platform;

  if (isColliding(ball, platform)) {
    const side = whichSideColliding(ball, platform);
    if (!side) {
      return;
    }
    console.log(side);
    if (side === 'left' || side === 'right') {
      ball.direction[0] = -ball.direction[0]
    } else {
      ball.direction[1] = -ball.direction[1]
    }
  }
  // if (isColliding(ball, wall.left) || isColliding(ball, wall.right)) {
  //   ball.direction[0] = -ball.direction[0];
  // }
  // if (ball.position[0] + ball.size[0] < 0) {
  //   ball.direction = [0,0];
  //   clearInterval(int);
  // }

  // if (isColliding(ball, wall.top) || isColliding(ball, wall.bottom)) {
  //   ball.direction[1] = -ball.direction[1]
  // }

  // if (isColliding(ball, config.platform)) {
  //   ball.direction[1] = -ball.direction[1];
  // }
  // for (const [idx, block] of config.squares.entries()) {
  //   if (block && isColliding(ball, block)) {
  //     ball.direction[1] = -ball.direction[1];
  //     config.squares[idx] = null;
  //     ctx.clearRect(...block.position, ...block.size);
  //   }
  // }



  // const platform = config.platform;
  // if ((ball.position[1] + ball.size[1]) > platform.position[1]
  //   && ball.position[0] + ball.size[0] > platform.position[0]
  //   && ball.position[0] + ball.size[0] < platform.position[0] + platform.size[0]) {
  //   ball.direction[1] = -ball.direction[1];
  // }

  ctx.fillStyle = config.ball.color;
  ctx.fillRect(...config.ball.position, ...config.ball.size);

  requestAnimationFrame(draw);
}

let int = setInterval(moveBall, 15)

function isColliding(ball, object) {

  const collisions =
    ball.position[0] <= (object.position[0] + object.size[0])
    && ball.position[1] <= (object.position[1] + object.size[1])
    && (ball.position[0] + ball.size[0]) >= object.position[0]
    && (ball.position[1] + ball.size[1]) >= object.position[1];
  return collisions;
}

function whichSideColliding(ball, object) {

  if (ball.position[0] + ball.size[0] > object.position[0] + object.size[0]) {
    return 'left';
  } else if (ball.position[1] + ball.size[1] > object.position[1] + object.size[1]) {
    return 'top'
  } else if (ball.position[0] < object.position[0]) {
    return 'right'
  } else if (ball.position[1] < object.position[1]) {
    return 'bottom'
  } else {
    return null;
  }
}
