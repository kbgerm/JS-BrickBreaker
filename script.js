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
  ],
  ball: {
    position: [150, 300],
    size: [10, 10],
    direction: [-1, -1],
    color: 'rgb(106, 90, 205)',
  },
  platform: {
    position: [145, 370],
    size: [60, 10],
    color: 'rgb(60, 60, 60)',
  },
  wall: {
    right: [350, 0, 350, 400],
    left: [0, 0, 0, 400],
    top: [0, 0, 350, 0],
    bottom: [0, 400, 350, 400],
  },
};

const canvas = document.querySelector('#canvas');

document.addEventListener('DOMContentLoaded', draw);
function draw() {
  const ctx = canvas.getContext("2d");

  // скорбар
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(0, 0, 350, 25);

  // let x = [...config.squares[0].position,...config.squares[0].size];
  // console.log(x);


  // отрисовка квадратов
  for (let i = 0; i < config.squares.length; i++) {
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

// function pointOnCircle(center, radius, angle) {
//   // return [
//   //   center[0] + Math.floor(radius*Math.cos(angle)),
//   //   center[1] + Math.floor(radius*Math.sin(angle)),
//   // ];
// }

function moveBall() {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(...config.ball.position, ...config.ball.size);

  const ball = config.ball;
  ball.position[0] += ball.direction[0];
  ball.position[1] += ball.direction[1];

  const wall = config.wall;
  if (ball.position[0] < wall.left[0]) {
    ball.direction[0] = -ball.direction[0];
  }

  if (ball.position[1] < wall.top[1]) {
    ball.direction[1] = -ball.direction[1];
  }

  if ((ball.position[0] + ball.size[0]) > wall.right[0]) {
    ball.direction[0] = -ball.direction[0];
  }

  if ((ball.position[1] + ball.size[1]) > wall.bottom[1]) {
    ball.direction[1] = -ball.direction[1];
  }

  const platform = config.platform;
  if ((ball.position[1] + ball.size[1]) > platform.position[1] 
  && ball.position[0] + ball.size[0] > platform.position[0] 
  && ball.position[0] + ball.size[0] < platform.position[0] + platform.size[0]) {
    ball.direction[1] = -ball.direction[1];
  }

  ctx.fillStyle = config.ball.color;
  ctx.fillRect(...config.ball.position, ...config.ball.size);

  requestAnimationFrame(draw);
}

setInterval(moveBall, 1)

// остановка около стены(любой)
//       145   205
// +++++++-----+++++++
