class Heap{
  constructor(){
    this.data = ["x"] // x is null
    // left = index * 2
    // right = index * 2 + 1
    // parent = index // 2 or Math.floor(index/2)
  }

  push(data_point ) {
    console.log("pushing:", data_point)

    this.data.push(data_point) // data_point = [cost,obj]
    var index = this.data.length - 1

    //while index not at the root and node has a parent that's greater 
    while (index > 1 && this.data[index][0] < this.data[Math.floor(index/2)][0]) {
      var oldValue = this.data[index]
      this.data[index] = this.data[Math.floor(index/2)]
      this.data[Math.floor(index/2)] = oldValue
      index = Math.floor(index/2)
    }
    console.log("data",JSON.stringify(this.data))
  }

  pop() {
    if (this.data.length == 1) {
      return null
    }
    if (this.data.length == 2) {

      let t = this.data.pop()
      return t
    }

    var root = this.data[1]  // root = [id,obj]
    this.data[1] = this.data.pop()
    var index = 1
    //while we have a left child
    while ((index * 2) < this.data.length) {

      if ((index * 2 + 1) < this.data.length && this.data[index * 2 + 1][0] <= this.data[index * 2][0]) {
        var target = index * 2 + 1
      }
      else {
        var target = index * 2
      }

      if (this.data[index][0] > this.data[target][0]) {
        var oldValue = this.data[index]
        this.data[index] = this.data[target]
        this.data[target] = oldValue
        index = target

      }
      else {
        break 
      }

    }

    return root 
  }

}

var heap = new Heap()

//,[ 21, "B"], [13,"C"], [30,"D"], [26,"E"]

// CHECK POP NEXT TIME 

// heap.push([ 14,"a"])
// heap.push([ 21,"b"])
// heap.push([ 13,"c"])
// heap.push([ 30,"e"])
// heap.push([ 26,"d"])
// heap.push([1,"g"])


// console.log(JSON.stringify(heap.data))
// heap.pop()
// console.log(JSON.stringify(heap.data))
// heap.pop()
// console.log(JSON.stringify(heap.data))
