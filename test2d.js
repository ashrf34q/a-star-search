let grid = [
  [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0], // source is here [0, 3]
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 11], // Goal state is here [3, 11]
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

console.log(grid[0][3]);

console.log(grid[3][11]);

let list = new Map();
list.set(0, [8, 2]);

let p = list.entries().next().value;

// console.log(p);

/*
*********** REDUSABLE CODE ********
 // If the destination cell is the same as source cell
  if (isDestination(src[0], src[1], dest) == true) {
    console.log("We are already at the destination\n");
    return;
  }




*/
