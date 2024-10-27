var FRAMES = []
var solveButton = document.getElementById("solve")
var algorithm = document.getElementById("algo")

solveButton.addEventListener("click", solveMaze)



var graph = {}
var nodesObj = {}
var start 
var end
var workingPath

class Tile{
  constructor(id, value, cost){
    this.id = id
    this.value = value
    this.parent = null
    this.visited = false
    this.cost = cost
    this.dist2start = null //for A* G(n)
    this.dist2end = null   //for A* H(n)
    this.x = Math.floor(id / ROWS)
    this.y = id % ROWS
  }
}

var tileCost = {
  0: 999,			//wall
  1: 1,				//empty - white
  2: 0,				//start
  //3: 1, 			//visited
  4: 1, 			//end
  //5: 1, 			//going to visit
  8: 10, 			//sand
  9: 15, 			//snow
  10: 5			//forest
}

function createTiles(){
  //parents & visited attribute will be marked during graph taversal
  for(i = 0; i < ROWS; i++){
    for(j = 0; j < COLS; j++){ 
      let id = i * ROWS + j
      nodesObj[id] = new Tile (id, maze[i][j],  tileCost[maze[i][j]])
    }
  }
}

function createGraph(){
  for(i = 0; i < ROWS; i++){
    for(j = 0; j < COLS; j++) {
      var value = maze[i][j]
      var id = i * ROWS + j
      if (value != 0) {
        graph[id] = []

        //find starting & ending tile 
        if (value == 2) {
          start = id // 0 
        }
        else if (value == 4){
          end = id
        }

        //find neighbors of id ( up,down left, right)
        if (i > 0 && maze[i-1][j] != 0){ // top
          graph[id].push(nodesObj[(i - 1) * ROWS + j])
        }

        if (i < ROWS - 1 && maze[i+1][j] != 0){ // bottom
          graph[id].push(nodesObj[(i + 1) * ROWS + j])
        }

        if (j > 0 && maze[i][j - 1] != 0){ // left
          graph[id].push(nodesObj[i * ROWS + (j - 1)])
        }

        if (j < COLS - 1 && maze[i][j + 1] != 0){ // right
          graph[id].push(nodesObj[i * ROWS + (j + 1)])
        }

      }
    }
  }
}


var m = 0 //frame counter for search animation
var coloringAnimation 
function coloring(visited){

  if (m < visited.length){
    var frame = visited[m] // {event: "visited", node: nodeobj }
    var currentSquare = frame.node.id 
    var event = frame.event
    var row = Math.floor( currentSquare / ROWS)
    var col = currentSquare % COLS

    if (event == "queue"){
      maze[row][col] = 5
    }
    else if (event == "visited"){
      maze[row][col] = 3
    }
    m++
  }


  else{
    console.log("clearing interval!")
    clearInterval(coloringAnimation)
    coloringAnimation = setInterval(coloringPath, 100, workingPath )
  }
}

var n = 0 // framecounter for path animation
function coloringPath(visited){

  if (n < visited.length){
    var frame = visited[n] // {event: "path", node: nodeobj }
    var currentSquare = frame.node.id 
    var event = frame.event
    var row = Math.floor( currentSquare / ROWS)
    var col = currentSquare % COLS

    if (event == "path"){
      maze[row][col] = 11
    }

    n++
  }

  else{
    console.log("clearing path animation interval!")
    clearInterval(coloringAnimation)
    resetBtn.disabled = false		
  }
}


function getPath(endNode) {
  var path = [] // [  {event: "visited", node: nodeobj } ] 
  var currentNode = endNode
  while (currentNode.parent != null) {
    console.log(currentNode.id)
    path.push(   {event:"path", node:currentNode}   )
    currentNode = currentNode.parent
  }
  return path.reverse()
}


const algo = {
  "DFS": depthFirstSearch,
  "BFS": breathFirstSearch,
  "DIJ": dijkAlgorithmSolver,
  "ASTAR": aStarAlgorithmSolver
}


function solveMaze(){
  goldBtn.disabled = true
  blueBtn.disabled = true
  resetBtn.disabled = true
  createTiles()
  createGraph()

  if (algo[algorithm.options[algorithm.selectedIndex].value](nodesObj[start], nodesObj[end])) {
    console.log("theres a path!")
    workingPath = getPath(nodesObj[end])
  }

  coloringAnimation = setInterval(coloring, 100, FRAMES)
}


