function depthFirstSearch(beginning, target){
  console.log("running DFS")
  /*
  beginning : TileObj
  target : TileObj
  Standalone function that should return the list of visited nodes when given start & end.
  */
  var visited = []
  var stack = [beginning]

  while (stack != []) {
    var currentConnection = stack.pop() 
    currentConnection.visited = true 
    visited.push(currentConnection)
    FRAMES.push( {event: "visited", node:currentConnection } )
    if (currentConnection.id == target.id) {
      return true
    }

    for (x = 0; x < graph[currentConnection.id].length; x++) {
      if ((graph[currentConnection.id][x].visited == false) && !(visited.includes(graph[currentConnection.id][x]) ) ){
        graph[currentConnection.id][x].parent = currentConnection
        stack.push(graph[currentConnection.id][x])
        FRAMES.push({event: "queue", node: graph[currentConnection.id][x]}) 
      }
    }
  }
  return false
}




function breathFirstSearch(beginning, target) {
  /**
   * beginning : Tile/ Node Obj
   * target : Tile / Node Obj
   */
  console.log("running BFS!")
  var visited = []
  var queue = [beginning]


  while (queue != []) {
    var currentConnection = queue.shift() // use shift


    visited.push(currentConnection)
    FRAMES.push({event: "visited", node: currentConnection})
    currentConnection.visited = true 

    if (currentConnection == target) {
      return true
    }

    for (i = 0; i < graph[currentConnection.id].length; i++) {
      if (graph[currentConnection.id][i].visited == false) {
        queue.push(graph[currentConnection.id][i])
        graph[currentConnection.id][i].parent = currentConnection
        graph[currentConnection.id][i].visited = true
        FRAMES.push({event: "queue", node: graph[currentConnection.id][i]})
        // console.log("adding:",graph[currentConnection.id][i])
      }
    }
  }
  return false
}



function getShortest(heap) {
  var smallestValue = [99999, ""]
  var index = null
  for (j = 0; j < heap.length; j++) {
    if (smallestValue[0] > heap[j][0]) {
      smallestValue = [heap[j][0], heap[j][1]] 
      index = j
    }
  }

  if (index != null){
    console.log("smallest:",smallestValue, "at index:", index)
    return [smallestValue, index] 
  }
  throw new Error('Cant find smallest or MinHeap is empty');
}



function dijkAlgorithmSolver(beginning, target) {
  /**
   * beginning : Tile obj
   * target: : Tile obj
   */
  console.log("running dijkstra")
  console.log("begin:",beginning, "target:",target)
  var shortest = {} //track vsited

  var myminHeap = new Heap()

  let n = [beginning.cost , beginning]
  myminHeap.push(n)

  var cur_cost = null
  var cur = null


  while (myminHeap.data.length > 1) {

// [ [ cost (integer), Tileobj ] ,  index ]
    [cur_cost, cur] = myminHeap.pop()   

    console.log("visiting:", cur, ",cost:",cur_cost) // cur index is the index of node in minheap
    FRAMES.push({event: "visited", node: cur})
    // console.log("heap before removal:", JSON.parse(JSON.stringify(myminHeap)))
    if (cur.id == target.id){
      return true
    }

    if (cur.id in shortest) { //if we've visited this node then go to next one
      continue
    }

    shortest[cur.id] = cur_cost // 

    for (i = 0; i < graph[cur.id].length; i++) {
      if ((graph[cur.id][i].id in shortest) != true) {
        var neighbor_cost = graph[cur.id][i].cost
        var neighbor = graph[cur.id][i]
        neighbor.parent = cur 
        myminHeap.push([cur_cost + neighbor_cost, neighbor])

        FRAMES.push({event: "queue", node: cur})
      }
    }
  }

  return false
}


function aStarAlgorithmSolver(beginning, target) {
  /**
   * beginning : Tile obj
   * target: : Tile obj
   */

  console.log("running aStar")
  console.log("begin:", beginning, "target:",target)
  var shortest = {} //doubles a the visitied list
  var myminHeap = new Heap()
  let n = [beginning.cost , beginning]
  myminHeap.push(n)

  var cur_cost = null
  var cur = null


  beginning.dist2start = 0
  beginning.dist2end = Math.abs(target.x-beginning.x) + Math.abs(target.y - beginning.y)

  while (myminHeap.data.length > 1) {
    [cur_cost, cur] = myminHeap.pop()    // [ [ cost (integer), Tileobj ] ,  index ]
    // define a function to retrieve smallest cost from []

    console.log("visiting:", cur, ",cost:",cur_cost) // cur index is the index of node in minheap
    FRAMES.push({event: "visited", node: cur})
    // console.log("heap before removal:", JSON.parse(JSON.stringify(myminHeap)))
    if (cur.id == target.id){
      return true
    }

    if (cur.id in shortest) { //if we've visited this node then go to next one
      continue
    }

    shortest[cur.id] = cur_cost 

    for (i = 0; i < graph[cur.id].length; i++) {
      if ((graph[cur.id][i].id in shortest) != true) {
        var neighbor = graph[cur.id][i] // neighbor is an tile obj
        neighbor.dist2start = cur.dist2start + 1
        neighbor.dist2end = Math.abs(target.x - neighbor.x) + Math.abs(target.y - neighbor.y)
        neighbor.parent = cur 
        myminHeap.push([neighbor.dist2start + neighbor.dist2end + neighbor.cost, neighbor])

        FRAMES.push({event: "queue", node: cur})
      }
    }

  }

  return false
}
