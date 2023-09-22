let grid = [
  [1, 0, 3, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [7, 8, 9, 0, 0, 0, 1, 0, 0, 1],
];

console.log(grid[0][2]);

let list = new Map();
list.set(0, [8, 2]);

let p = list.entries().next().value;

console.log(p);

/*
*********** REDUSABLE CODE ********
 // If the destination cell is the same as source cell
  if (isDestination(src[0], src[1], dest) == true) {
    console.log("We are already at the destination\n");
    return;
  }


// A Utility Function to check whether destination cell has
// been reached or not
function isDestination(row, col, dest) {
  if (row == dest[0] && col == dest[1]) return true;
  else return false;
}
*/
