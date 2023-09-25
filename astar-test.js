"use strict";

class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}
//   Priority Queue
class Priority_Queue {
  constructor() {
    this.items = [];
  }

  //   Add the element to its corresponding spot in the priority queue based on its priority
  enqueue(element, priority) {
    let queueElement = new QueueElement(element, priority);
    let lowestPr = true;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > queueElement.priority) {
        // Correct location found, so enqueue
        this.items.splice(i, 0, queueElement);
        lowestPr = false;
        break;
      }
    }

    // lowest priority, so just push it to the end
    if (lowestPr) {
      this.items.push(queueElement);
    }
  }

  isEmpty() {
    return this.items.length === 0;
  }

  //   removes and returns the highest priority element
  dequeue() {
    if (this.isEmpty()) throw new Error("Underflow");
    return this.items.shift();
  }

  size() {
    return this.items.length;
  }

  //   returns highest priority element without removing it from the queue
  front() {
    if (this.isEmpty()) throw new Error("Queue is empty");
    return this.items[0];
  }

  printPriorityQueue() {
    for (let i = 0; i < this.items.length; i++) {
      console.log(this.items[i].element + " ");
    }
  }
}

/* **************************************** */

let ROW = 11;
let COL = 12;

// A structure to hold the necessary parameters
class cell {
  // Note that the following indexes 0 <= i <= ROW-1 && 0 <= j <= COL-1
  constructor() {
    this.parent_i = 0;
    this.parent_j = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }
}

/* ******* HELPER FUNCTIONS **************/

// A helper function to check whether the given cell is
// blocked or not
function isUnBlocked(grid, row, col) {
  //   Returns true if the cell is not blocked else falses
  if (grid[row][col] == 1) return true;
  else return false;
}

// A helper function to check whether the given cell (row, col)
// is a valid cell or not.
function isValid(row, col) {
  // Returns true if row number and column number
  // is in range
  return row >= 0 && row < ROW && col >= 0 && col < COL;
}

// A helper Function to check whether destination cell has
// been reached or not
function isDestination(row, col, dest) {
  if (row == dest[0] && col == dest[1]) return true;
  else return false;
}

// A helper Function to calculate the 'h' heuristic
function calculateHValue(row, col, dest) {
  // Return using the modified manhattan distance formula
  const vertical = Math.abs(
    row - dest[0] > 0 ? (row - dest[0]) * 3 : row - dest[0]
  );
  const horizontal = Math.abs((col - dest[1]) * 2);

  return vertical + horizontal;
}

// A helper function to print the final grid once we're done searching
function printFinalGrid(cellDetails) {
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (grid[i][j] === 0) process.stdout.write("##".padEnd(4, "  "));
      else process.stdout.write(cellDetails[i][j].label.padEnd(4, "  "));
    }
    console.log();
  }
}

//* This is our A* algorithm, this is where the search happens
function aStarSearch(grid, src, dest) {
  // A state variable that keeps track of the label count
  let labelState = 0;

  // If the source is out of range
  if (isValid(src[0], src[1]) == false) {
    console.log("Source is invalid\n");
    return;
  }

  // If the destination is out of range
  if (isValid(dest[0], dest[1]) == false) {
    console.log("Destination is invalid\n");
    return;
  }

  // Either the source or the destination cell is blocked
  if (
    isUnBlocked(grid, src[0], src[1]) == false ||
    isUnBlocked(grid, dest[0], dest[1]) == false
  ) {
    console.log("Source or the destination is blocked\n");
    return;
  }

  // If the destination cell is the same as source cell, return right away
  if (isDestination(src[0], src[1], dest) == true) {
    console.log("We are already at the destination\n");
    return;
  }

  // Create a closed list, which is a 2d array and initialise it to false which
  // means that no cell has been included yet on this list
  // The closed list just helps us keep track of visited nodes. If a cell at a given position is true, it's visited. False, it's not visited.
  let closedList = new Array(ROW);
  for (let i = 0; i < ROW; i++) {
    closedList[i] = new Array(COL).fill(false);
  }

  // Another 2D array that holds the cell details like the f, g and h values and the label for every cell
  let cellDetails = new Array(ROW);
  for (let i = 0; i < ROW; i++) {
    cellDetails[i] = new Array(COL);
  }

  let i, j;

  // Initialize all nodes in the maze the same f,g and h values.
  for (i = 0; i < ROW; i++) {
    for (j = 0; j < COL; j++) {
      cellDetails[i][j] = new cell();
      cellDetails[i][j].f = 2147483647;
      cellDetails[i][j].g = 2147483647;
      cellDetails[i][j].h = 2147483647;
      cellDetails[i][j].parent_i = -1;
      cellDetails[i][j].parent_j = -1;
      cellDetails[i][j].label = "-1";
    }
  }

  // Initialising the parameters of the starting node
  (i = src[0]), (j = src[1]);
  cellDetails[i][j].f = 0;
  cellDetails[i][j].g = 0;
  cellDetails[i][j].h = 0;
  cellDetails[i][j].parent_i = i;
  cellDetails[i][j].parent_j = j;
  cellDetails[i][j].label = String(labelState);

  // We implement the open list as a structure <[i,j], f>. Where [i,j] are the indexes of the row and column of the cell respectively
  // And f is our "priority" measure. In this PQueue, the node with the least f will be at the front of the queue
  // This list is basically the list in which the expanded nodes are added
  let openList = new Priority_Queue();

  // Put the starting cell on the open list and set its 'f' value as 0
  openList.enqueue([i, j], 0);

  let foundDest = false;

  // Search starts here
  while (openList.size() > 0) {
    let p = openList.dequeue();

    // Get the node with the lowest f
    i = p.element[0];
    j = p.element[1];

    // Set its corresponding position on the closed list as true, which signifies that it's visited
    closedList[i][j] = true;

    /*
		Generating all the 4 successors of this cell

		In this order specifically
    W --> West		 (i, j-1)
		N --> North	 (i-1, j)
    E --> East	 (i, j+1)
		S --> South	 (i+1, j)
		*/

    // To store the generated 'g', 'h' and 'f' of the successors (expanded nodes)
    let gNew, hNew, fNew;

    //----------- 1st Successor (West) --------

    // Only process this cell if this is a valid one
    if (isValid(i, j - 1) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i, j - 1, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i][j - 1].parent_i = i;
        cellDetails[i][j - 1].parent_j = j;
        cellDetails[i][j - 1].label = String((labelState += 1)).padStart(
          2,
          "0"
        );

        // Once the destination is found, print that it's found, print the final grid and exit the loop
        console.log("The destination cell is found\n");
        console.log("\n*****************************\n");
        printFinalGrid(cellDetails);
        foundDest = true;
        return;
      }

      // If the successor is already on the closed
      // list or if it is blocked, then ignore it.
      // Else do the following
      else if (
        closedList[i][j - 1] == false &&
        isUnBlocked(grid, i, j - 1) == true
      ) {
        // cost to go west is 2
        gNew = cellDetails[i][j].g + 2;
        hNew = calculateHValue(i, j - 1, dest);
        fNew = gNew + hNew;

        // If f === 2147483647, it means that this successor isn't on the open list. Add it to
        // the open list and set its corresponding g, h and f values
        //			 OR
        // If it is on the open list already, check to see if this path to that specific successor is better, using 'f' as the cost measure.
        if (
          cellDetails[i][j - 1].f == 2147483647 ||
          cellDetails[i][j - 1].f > fNew
        ) {
          openList.enqueue([i, j - 1], fNew);

          // Update the details of this cell
          cellDetails[i][j - 1].f = fNew;
          cellDetails[i][j - 1].g = gNew;
          cellDetails[i][j - 1].h = hNew;
          cellDetails[i][j - 1].parent_i = i;
          cellDetails[i][j - 1].parent_j = j;

          // The label for the next cell is the current cell's label plus 1
          cellDetails[i][j - 1].label = String((labelState += 1)).padStart(
            2,
            "0"
          );
        }
      }
    }

    //----------- 2nd Successor (North) ------------

    // Only process this cell if this is a valid one
    if (isValid(i - 1, j) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i - 1, j, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i - 1][j].parent_i = i;
        cellDetails[i - 1][j].parent_j = j;
        cellDetails[i - 1][j].label = String((labelState += 1)).padStart(
          2,
          "0"
        );

        // Destination cell is found, print final grid and exit the loop
        console.log("The destination cell is found\n");
        console.log("\n*****************************\n");
        printFinalGrid(cellDetails);
        foundDest = true;
        return;
      }
      // If the successor is already on the closed
      // list or if it is blocked, then ignore it.
      // Else do the following
      else if (
        closedList[i - 1][j] == false &&
        isUnBlocked(grid, i - 1, j) == true
      ) {
        // Cost to go north is 3
        gNew = cellDetails[i][j].g + 3;
        hNew = calculateHValue(i - 1, j, dest);
        fNew = gNew + hNew;

        // Same as previous
        if (
          cellDetails[i - 1][j].f == 2147483647 ||
          cellDetails[i - 1][j].f > fNew
        ) {
          openList.enqueue([i - 1, j], fNew);

          // Update the details of this cell
          cellDetails[i - 1][j].f = fNew;
          cellDetails[i - 1][j].g = gNew;
          cellDetails[i - 1][j].h = hNew;
          cellDetails[i - 1][j].parent_i = i;
          cellDetails[i - 1][j].parent_j = j;

          cellDetails[i - 1][j].label = String((labelState += 1)).padStart(
            2,
            "0"
          );
        }
      }
    }

    //----------- 3rd Successor (East) ------------

    // Only process this cell if this is a valid one
    if (isValid(i, j + 1) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i, j + 1, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i][j + 1].parent_i = i;
        cellDetails[i][j + 1].parent_j = j;
        cellDetails[i][j + 1].label = String((labelState += 1)).padStart(
          2,
          "0"
        );

        // Destination cell is found, print final grid and exit the loop
        console.log("The destination cell is found\n");
        console.log("\n*****************************\n");
        printFinalGrid(cellDetails);
        foundDest = true;
        return;
      }

      // If the successor is already on the closed
      // list or if it is blocked, then ignore it.
      // Else do the following
      else if (
        closedList[i][j + 1] == false &&
        isUnBlocked(grid, i, j + 1) == true
      ) {
        // Cost to go East is 2
        gNew = cellDetails[i][j].g + 2;
        hNew = calculateHValue(i, j + 1, dest);
        fNew = gNew + hNew;

        // Same as previous ones
        if (
          cellDetails[i][j + 1].f == 2147483647 ||
          cellDetails[i][j + 1].f > fNew
        ) {
          openList.enqueue([i, j + 1], fNew);

          // Update the details of this cell
          cellDetails[i][j + 1].f = fNew;
          cellDetails[i][j + 1].g = gNew;
          cellDetails[i][j + 1].h = hNew;
          cellDetails[i][j + 1].parent_i = i;
          cellDetails[i][j + 1].parent_j = j;

          cellDetails[i][j + 1].label = String((labelState += 1)).padStart(
            2,
            "0"
          );
        }
      }
    }

    //----------- 4th Successor (South) ------------

    // Only process this cell if this is a valid one
    if (isValid(i + 1, j) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i + 1, j, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i + 1][j].parent_i = i;
        cellDetails[i + 1][j].parent_j = j;
        cellDetails[i + 1][j].label = String((labelState += 1)).padStart(
          2,
          "0"
        );

        // Destination cell is found, print final grid and exit the loop
        console.log("The destination cell is found\n");
        console.log("\n*****************************\n");
        printFinalGrid(cellDetails);
        foundDest = true;
        return;
      }
      // If the successor is already on the closed
      // list or if it is blocked, then ignore it.
      // Else do the following
      else if (
        closedList[i + 1][j] == false &&
        isUnBlocked(grid, i + 1, j) == true
      ) {
        // Cost to go South is 1
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i + 1, j, dest);
        fNew = gNew + hNew;

        // Same as previous one
        if (
          cellDetails[i + 1][j].f == 2147483647 ||
          cellDetails[i + 1][j].f > fNew
        ) {
          // openList.set(fNew, [i + 1, j]);
          openList.enqueue([i + 1, j], fNew);

          // Update the details of this cell
          cellDetails[i + 1][j].f = fNew;
          cellDetails[i + 1][j].g = gNew;
          cellDetails[i + 1][j].h = hNew;
          cellDetails[i + 1][j].parent_i = i;
          cellDetails[i + 1][j].parent_j = j;

          cellDetails[i + 1][j].label = String((labelState += 1)).padStart(
            2,
            "0"
          );
        }
      }
    }
  } // End while loop

  // Open list is empty and still haven't found the destination?
  // Just return that the destination cell hasn't been found and exit
  if (foundDest == false) console.log("Failed to find the Destination Cell\n");

  return;
}

// Driver program to test above function
/* Description of the Grid-
1--> The cell is not blocked
0--> The cell is blocked */
let grid = [
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], // source is here [0, 3]
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1], // Goal state is here [3, 11]
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Source
let src = [0, 3];

// Goal or destination
let dest = [3, 11];

aStarSearch(grid, src, dest);
