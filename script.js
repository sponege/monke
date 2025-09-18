let grid = [
  [0, 0, 0, 0, 0, 0, 2, 0],
  [0, 0, 9, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 7, 0, 4],
  [1, 0, 0, 0, 8, 0, 6, 0],
  [5, 0, 0, 3, 0, 0, 0, 0],
];


/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let container,
  cur,
  game = 0;

async function startGame() {
  game++;
  cur = 1;

  container.innerHTML = '';
  for (let i = 0; i < 40; i++) {
    let e = document.createElement("div");
    e.classList.add("box");
    // if (i % 2 == 1 || 1) e.innerHTML = i;
    container.appendChild(e);
  }

  if (game > 1) {
    grid = [];
    for (let y = 0; y < 5; y++) {
        grid.push([0, 0, 0, 0, 0, 0, 0, 0]);
    }
    for (let v = 0; v < 10; v++) {
        while (1) {
            let x = getRandomInt(0, 7);
            let y = getRandomInt(0, 4);
            if (grid[y][x] != 0) continue;
            grid[y][x] = v;
            break;
        }
    }
  }

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 5; y++) {
      let i = x + y * 8;
      let v = grid[y][x];
      container.childNodes[i].innerHTML = "";
      container.childNodes[i].classList.remove("hidden");
      if (v > 0) {
        container.childNodes[i].innerHTML = v;
      }
    }
  }

  await sleep(1000);

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 5; y++) {
      let i = x + y * 8;
      let v = grid[y][x];
      if (v > 0) {
        container.childNodes[i].classList.add("hidden");
        let handleClick = async () => {
          //   alert(`wow! you clicked ${v}!`);
          if (cur == v) {
            cur++;
            container.childNodes[i].classList.remove("hidden");
            if (cur == 10) {
              await sleep(1000);
              await startGame();
            }
          } else {
            for (let i = 0; i < 40; i++) {
              container.childNodes[i].classList.remove("hidden");
            }
            await sleep(1000);
            await startGame();
          }
        };
        container.childNodes[i].addEventListener("click", handleClick);
      }
    }
  }
}

window.addEventListener("load", async () => {
  container = document.querySelector(".grid-container");
  await startGame();
});
