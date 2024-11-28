/*The goal of this program is to determine the shortest path for a knight to travel from one spot to another on a chess board:

Given a knight node:
  1. Compare that node's coordinates to the destination coordinates
  2. If the coordinates match, a path has been found, and the program should return the coordinates which have been visited
  3. If the coordinates don't match, determine the next possible moves
  4. Use each possible move to generate a new node, and assign each node as a child of the given knight node
  5. For each child node, perform steps 1 - 4
  6. Steps should be processed through a queue so that the breadth of one level of the tree is traversed before descending to the next level
*/

// Move needs to be valid, within the confines of the chessBoard arr
// Cannot visit the same space again on a knightMoves call
// Can only traverse in a L shape

function knightMoves(start, end) {
  const boardSize = 8;
  const possibleMoves = [ // harcoded arr of potential moves for knight piece
    [2, 1],
    [1, 2],
    [-2, 1],
    [-1, 2],
    [2, -1],
    [1, -2],
    [-2, -1],
    [-1, -2],
  ];
  const queue = [[start]];
  const visited = [[...start]];
  // Graph structure breadth-first search traversal
  while (queue.length > 0) {
    const path = queue.shift(); // pops off first el in queue and sends to path arr
    const currentPosition = path[path.length - 1];
    // if start matches target, return path array
    if (currentPosition[0] === end[0] && currentPosition[1] === end[1]) {
      return path;
    }

    for (const move of possibleMoves) {
      const nextPosition = [
        currentPosition[0] + move[0], 
        currentPosition[1] + move[1],
      ];
      const isVisited = visited.some((arr) => { // check if any value in arr returns true to isVisited arg
        return (
          Array.isArray(arr) && // Initiates new array
          arr.every((item, index) => item === nextPosition[index]) // conditional arg => item equates to index of nextPosition, added to visited arr if true
        );
      });
      if (
        nextPosition[0] >= 0 &&
        nextPosition[0] < boardSize &&
        nextPosition[1] >= 0 &&
        nextPosition[1] < boardSize &&
        !isVisited
      ) {
        queue.push([...path, nextPosition]); // adds all path coords to queue list
        visited.push(nextPosition); // adds to visited arr
      }
    }
  }
  return null;
}

function knightsTravails(pathArr) {
  console.log(
    `You made it in ${pathArr.length - 1} moves!  Here's your path:`
  );
  for (let i = 0; i < pathArr.length; i++) {
    console.log(pathArr[i]);
  }
}

knightsTravails(knightMoves([1, 5], [7, 1]));

// "=> You made it in 4 moves!  Here's your path:"
/*
[1,5]
[3,4]
[5,5]
[6,3]
[7,1]
*/
