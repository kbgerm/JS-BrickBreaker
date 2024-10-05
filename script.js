const config = {
    squares: [
      {
        position: '0, 25',
        size: '60, 25',
        color: 'rgb(180, 180, 180)',
        hardness: undefined,
      },
      {
        position: '60, 25',
        size: '60, 25',
        color: 'rgb(238, 130, 238)',
        hardness: 1,
      },
      {
        position: '120, 25',
        size: '60, 25',
        color: 'rgb(0, 0, 255)',
        hardness: 2,
      }, 
      {
        position: '120, 25',
        size: '60, 25',
        color: 'rgb(255, 165, 0)',
        hardness: 3,
      }
    ],
    ball : {
      position: '60, 300',
      size: '10, 10',
      color: 'rgb(106, 90, 205)',
    },
    platform: {
      position: '145, 350',
      size: '60, 10',
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

  // квадратики строка первая
  // серый
  ctx.fillStyle = "rgba(180, 180, 180)";
  ctx.fillRect(0, 25, 60, 25);

  // розовый
  ctx.fillStyle = "rgba(238, 130, 238)";
  ctx.fillRect(60, 25, 60, 25);

  // синий
  ctx.fillStyle = "rgba(0, 0, 255)";
  ctx.fillRect(120, 25, 60, 25);

  ctx.fillStyle = "rgba(255, 165, 0)";
  ctx.fillRect(180, 25, 60, 25);


  // шарик
  ctx.fillStyle = "rgba(106, 90, 205)";
  ctx.fillRect(60, 280, 10, 10);

  // платформа
  ctx.fillStyle = "rgba(60, 60, 60)";
  ctx.fillRect(145, 350, 60, 10);
}