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
    ],
    ball : {
      position: [60, 300],
      size: [10, 10],
      color: 'rgb(106, 90, 205)',
    },
    platform: {
      position: [145, 350],
      size: [60, 10],
      color: 'rgb(60, 60, 60)',
    }
  };

const canvas = document.querySelector('#canvas');

document.addEventListener('DOMContentLoaded', draw);
function draw () {
  const ctx = canvas.getContext("2d");

  // скорбар
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(0, 0, 350, 25);

  // let x = [...config.squares[0].position,...config.squares[0].size];
  // console.log(x);


  // отрисовка квадратов
  for (let i = 0; i < config.squares.length; i++) {
    ctx.fillStyle = config.squares[i].color;
    ctx.fillRect(...config.squares[i].position,...config.squares[i].size);
  }

  // шарик
  ctx.fillStyle = config.ball.color;
  ctx.fillRect(...config.ball.position,...config.ball.size);

  // платформа
  ctx.fillStyle = config.platform.color;
  ctx.fillRect(...config.platform.position,...config.platform.size);
}