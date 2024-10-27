/*
NOTES:

Learn about Javascript ( just the basics, for loop,list & dictionary (objects), while loop, variables, if statement & functions )
- https://www.w3schools.com/js/


// this function will be called upon 
// after the page loads

*/


/**

 When the user draws on the canvas by dragging or clicking their mouse.
 How will the computer store or represent this maze?

  maze = [ 
      [0,0,0,0,1 ... ],
      [0,0,1,0,1 ]
  ]

  0 : red walls 
  1 : while walkable
  2 : start
  3 : end 

 */

var SQUARE_WIDTH = 40
var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 800
var ROWS =  CANVAS_WIDTH / SQUARE_WIDTH
var COLS = CANVAS_HEIGHT / SQUARE_WIDTH
var maze = []
var FILL_COLOR 
var PENCOLOR = 1
var DRAWING = []

// create a 2D array to capture the maze's info
function createMaze() {
  maze = []
  for (let i = 0; i < ROWS; i ++ ){
    let temp_row = []
    for (let j = 0; j < COLS; j++){
      temp_row.push(0)
    }
    maze.push(temp_row)
  }
}

function reset() {
  //set the 2darray back to zero 
  for (let i = 0; i < ROWS; i++){
    for (let j = 0; j < COLS; j++){
      maze[i][j] = 0
    }
  }
  goldBtn.disabled = false
  blueBtn.disabled = false
  clearInterval(coloringAnimation)
  visited = null
  FRAMES = []
  m = 0 //counters for animation
  n = 0 //counters for animation
}


function setup(){
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, document.getElementById("myCanvas"))
  createMaze()

}

function draw(){
  for (let i = 0; i < ROWS; i ++ ) {
    for (let j = 0; j < COLS; j++) {
      if (maze[i][j] == 1) {
        FILL_COLOR	= color(255, 255, 255) //white
      }
      else if (maze[i][j] == 2) {
        FILL_COLOR	= color(245, 218, 86) //start
      }
      else if (maze[i][j] == 3) { //visited blue
        FILL_COLOR	= color(45, 21, 186)
      }
      else if (maze[i][j] == 5) { //queued purple 
        FILL_COLOR	= color(191, 130, 232)
      }
      else if (maze[i][j] == 4) { //end
        FILL_COLOR	= color(87, 158, 212)
      }
      else if (maze[i][j] == 0) {
        FILL_COLOR	= color(247, 92, 92) //red 
      }
      else if (maze[i][j] == 8) {
        FILL_COLOR	= color(235, 209, 150) //sand
      }
      else if (maze[i][j] == 9) {
        FILL_COLOR	= color(224, 222, 218) //snow
      }
      else if (maze[i][j] == 10) {
        FILL_COLOR	= color(34, 130, 69) //forest
      }
      else if (maze[i][j] == 11) {
        FILL_COLOR	= color(180, 174, 242) //final path
      }

      fill(FILL_COLOR) //fillcolor
      stroke(192,192,192) //pencolor
      strokeWeight(2) // penwidth
      square(SQUARE_WIDTH * j, SQUARE_WIDTH * i, SQUARE_WIDTH)
    }
  } 
}


function mouseDragged(){
  if (mouseX < 0 || mouseX > CANVAS_WIDTH || mouseY < 0 || mouseY > CANVAS_HEIGHT ){
    return
  }
  startAndEnd()

  let positionRow = Math.floor(mouseY / SQUARE_WIDTH)
  let positionColumn = Math.floor(mouseX / SQUARE_WIDTH)
  maze[positionRow][positionColumn] = PENCOLOR
}

function doubleClicked(){
  if (mouseX < 0 || mouseX > CANVAS_WIDTH || mouseY < 0 || mouseY > CANVAS_HEIGHT ){
    return
  }

  startAndEnd()

  let positionRow = Math.floor(mouseY / SQUARE_WIDTH)
  let positionColumn = Math.floor(mouseX / SQUARE_WIDTH)
  maze[positionRow][positionColumn] = PENCOLOR
}

function startAndEnd(){
  if (PENCOLOR == 2 || PENCOLOR == 4) {
    for (let i = 0; i < ROWS; i ++ ){
      for (let j = 0; j < COLS; j++){
        if (maze[i][j] == PENCOLOR) {
          maze[i][j] = 1
        }
      }
    }
  }
}