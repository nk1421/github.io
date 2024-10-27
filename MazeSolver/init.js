//color palette
var redBtn = document.getElementById('red')
var goldBtn = document.getElementById('gold')
var whiteBtn = document.getElementById('white')
var blueBtn = document.getElementById('blue')
var sandBtn = document.getElementById('sand')
var snowBtn = document.getElementById('snow')
var forestBtn = document.getElementById('forest')

//buttons
var resetBtn = document.getElementById('reset')
var cellSizeInput = document.getElementById("cellsize")
var update = document.getElementById("update")


redBtn.addEventListener("click", ()=>{
  console.log("red clicked!")
  PENCOLOR = 0 
})


blueBtn.addEventListener("click", ()=>{
  console.log("blue clicked!")
  PENCOLOR = 4
})

goldBtn.addEventListener("click", ()=>{
  console.log("gold clicked!")
  PENCOLOR = 2 
})

whiteBtn.addEventListener("click", ()=>{
  console.log("white clicked!")
  PENCOLOR = 1
})

sandBtn.addEventListener("click", ()=>{
  console.log("sand clicked!")
  PENCOLOR = 8
})

snowBtn.addEventListener("click", ()=>{
  console.log("snow clicked!")
  PENCOLOR = 9
})

forestBtn.addEventListener("click", ()=>{
  console.log("forest clicked!")
  PENCOLOR = 10
})

resetBtn.addEventListener("click", ()=>{
  console.log("reseting")
  reset() 
})

update.addEventListener("click", ()=>{
  console.log("updating cell size to: ", cellSizeInput.value)
  SQUARE_WIDTH = cellSizeInput.value

  //update cellsize and recreate the 2D maze array
  ROWS =  CANVAS_WIDTH / SQUARE_WIDTH
  COLS = CANVAS_HEIGHT / SQUARE_WIDTH
  createMaze()
  reset() 
})

/*

WOOPS THIS IS THE CORRECT LINK WITH COOL CSS TUTORIAL
  https://www.youtube.com/@Hyperplexed

1. program the reset button, whichs turns the maze array to default 0 value

2. try programming the update button to change the SQUARE_WIDTH variable upon press,
   - reset Maze array upon cellsize update as well
   - you can access input element's value by doing sizeInput.value.
*/