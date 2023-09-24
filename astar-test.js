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

  size() {
    return this.items.length;
  }
}

/* **************************************** */

let ROW = 11;
let COL = 12;

// A structure to hold the necessary parameters
class cell {
  // Row and Column index of its parent
  // Note that 0 <= i <= ROW-1 & 0 <= j <= COL-1
  constructor() {
    this.parent_i = 0;
    this.parent_j = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }
}

// A Utility Function to check whether given cell (row, col)
// is a valid cell or not.
function isValid(row, col) {
  // Returns true if row number and column number
  // is in range
  return row >= 0 && row < ROW && col >= 0 && col < COL;
}

// A Utility Function to check whether the given cell is
// blocked or not
function isUnBlocked(grid, row, col) {
  //   Returns true if the cell is not blocked else falses
  if (grid[row][col] == 1) return true;
  else return false;
}

// A Utility Function to check whether destination cell has
// been reached or not
function isDestination(row, col, dest) {
  if (row == dest[0] && col == dest[1]) return true;
  else return false;
}

// A Utility Function to calculate the 'h' heuristics.
function calculateHValue(row, col, dest) {
  // Return using the distance formula
  // return Math.sqrt(
  //   (row - dest[0]) * (row - dest[0]) + (col - dest[1]) * (col - dest[1])
  // );
  const vertical = Math.abs(
    row - dest[0] > 0 ? (row - dest[0]) * 3 : row - dest[0]
  );
  const horizontal = Math.abs((col - dest[1]) * 2);

  return vertical + horizontal;
}

function printFinalGrid(cellDetails) {
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (grid[i][j] === 0) process.stdout.write("##".padEnd(4, "  "));
      else process.stdout.write(cellDetails[i][j].label.padEnd(4, "  "));
    }
    console.log();
  }
}

// A Utility Function to trace the path from the source
// to destination
function tracePath(cellDetails, dest) {
  console.log("The Path is ");
  let row = dest[0];
  let col = dest[1];

  // stack<Pair> Path;
  let Path = [];

  while (
    !(
      cellDetails[row][col].parent_i == row &&
      cellDetails[row][col].parent_j == col
    )
  ) {
    Path.push([row, col]);
    let temp_row = cellDetails[row][col].parent_i;
    let temp_col = cellDetails[row][col].parent_j;
    row = temp_row;
    col = temp_col;
  }

  Path.push([row, col]);
  while (Path.length > 0) {
    let p = Path[0];
    Path.shift();

    if (p[0] == 2 || p[0] == 1) {
      console.log("-> (" + p[0] + ", " + (p[1] - 1) + ")");
    } else console.log("-> (" + p[0] + ", " + p[1] + ")");
  }

  return;
}

//* A Function to find the shortest path between
//* a given source cell to a destination cell according
//* to A* Search Algorithm
function aStarSearch(grid, src, dest) {
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

  // Either the source or the destination is blocked
  if (
    isUnBlocked(grid, src[0], src[1]) == false ||
    isUnBlocked(grid, dest[0], dest[1]) == false
  ) {
    console.log("Source or the destination is blocked\n");
    return;
  }

  // If the destination cell is the same as source cell
  if (isDestination(src[0], src[1], dest) == true) {
    console.log("We are already at the destination\n");
    return;
  }

  // Create a closed list and initialise it to false which
  // means that no cell has been included yet. This closed
  // list is implemented as a boolean 2D array

  let closedList = new Array(ROW);
  for (let i = 0; i < ROW; i++) {
    closedList[i] = new Array(COL).fill(false);
  }

  // Declare a 2D array of structure to hold the details
  // of that cell
  let cellDetails = new Array(ROW);
  for (let i = 0; i < ROW; i++) {
    cellDetails[i] = new Array(COL);
  }

  let i, j;

  // Initialize all nodes in the maze the same f,g and h values.
  // It's best to have all the cells initialized before we start searching
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

  /*
	Create an open list having information as-
	<f, <i, j>>
	where f = g + h,
	and i, j are the row and column index of that cell
	Note that 0 <= i <= ROW-1 & 0 <= j <= COL-1
	This open list is implemented as a set of pair of
	pair.*/

  // It's basically the same structure <f, <i,j>>. Except the priority queue is going to sort the elements as we enqueue
  let openList = new Priority_Queue();

  // Put the starting cell on the open list and set its
  // 'f' as 0
  // openList.set(0, [i, j]);
  openList.enqueue([i, j], 0);

  // We set this boolean value as false as initially
  // the destination is not reached.
  let foundDest = false;

  // Search starts here, We keep searching until we run out of nodes from the open list (The list in which the expanded nodes are added)
  while (openList.size() > 0) {
    // This will remove the vertex from the openList (priority queue)
    let p = openList.dequeue();

    // Add this vertex to the closed list
    i = p.element[0];
    j = p.element[1];

    closedList[i][j] = true;

    /*
		Generating all the 4 successors of this cell

		(i, j) represent the index 
		N --> North	 (i-1, j)
		S --> South	 (i+1, j)
		E --> East	 (i, j+1)
		W --> West		 (i, j-1)*/

    // To store the generated 'g', 'h' and 'f' of the successors
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
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
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
        console.log("Left node");
        // cost to go west is 2
        gNew = cellDetails[i][j].g + 2;
        hNew = calculateHValue(i, j - 1, dest);
        fNew = gNew + hNew;

        // If it isn’t on the open list, add it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //			 OR
        // If it is on the open list already, check
        // to see if this path to that square is
        // better, using 'f' cost as the measure.
        if (
          cellDetails[i][j - 1].f == 2147483647 ||
          cellDetails[i][j - 1].f > fNew
        ) {
          // openList.set(fNew, [i, j - 1]);
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
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
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
        console.log("North node");

        // Cost to go north is 3
        gNew = cellDetails[i][j].g + 3;
        hNew = calculateHValue(i - 1, j, dest);
        fNew = gNew + hNew;

        // If it isn’t on the open list, add it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //			 OR
        // If it is on the open list already, check
        // to see if this path to that square is
        // better, using 'f' cost as the measure.
        if (
          cellDetails[i - 1][j].f == 2147483647 ||
          cellDetails[i - 1][j].f > fNew
        ) {
          // openList.set(fNew, [i - 1, j]);
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
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
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
        console.log("Right node");

        // Cost to go east is 2
        gNew = cellDetails[i][j].g + 2;
        hNew = calculateHValue(i, j + 1, dest);
        fNew = gNew + hNew;

        // If it isn’t on the open list, add it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //			 OR
        // If it is on the open list already, check
        // to see if this path to that square is
        // better, using 'f' cost as the measure.
        if (
          cellDetails[i][j + 1].f == 2147483647 ||
          cellDetails[i][j + 1].f > fNew
        ) {
          // openList.set(fNew, [i, j + 1]);
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
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
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
        console.log("South node");

        // Cost to go south is 1
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i + 1, j, dest);
        fNew = gNew + hNew;

        // If it isn’t on the open list, add it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //			 OR
        // If it is on the open list already, check
        // to see if this path to that square is
        // better, using 'f' cost as the measure.
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

  // When the destination cell is not found and the open
  // list is empty, then we conclude that we failed to
  // reach the destination cell. This may happen when the
  // there is no way to destination cell (due to
  // blockages)
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

// Source or entrance square
let src = [0, 3];

// Goal or exit square
let dest = [3, 11];

aStarSearch(grid, src, dest);
