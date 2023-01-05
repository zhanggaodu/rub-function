export default class LuckDraw {
  constructor(DataArr, RotateDir, cycleNumber, minSpeed) {
    this.DataArr = JSON.parse(JSON.stringify(DataArr))
    this.maxSpeed = 5 // 最大速度
    this.cycleNumber = cycleNumber || 2 // 全速
    this.myReq // 最小速度
    this.defaultSpeed = minSpeed || 15

    for (var i = 0; i < RotateDir.length; i++) {
      let { index, next } = RotateDir[i]
      if (typeof this.DataArr[index].next !== "undefined") {
        console.error(`RotateDir is error`)
        return
      }
      this.DataArr[index].next = this.DataArr[next]
    }
    console.log('prizeList add next',this.DataArr)
  }

  run(id, startIndex, running, runend) {
    var counter = startIndex // 计数器
    var current = 0 // 当前数字值
    var n = 0
    var currentObj = this.DataArr[startIndex]
    var tem = this.DataArr[0]
    while (true) {
      if (n > this.DataArr.length) {
        console.error(`${id}不存在`)
        return
      }
      if (tem.id == id) {
        break
      }
      tem = tem.next
      n++ 
      console.log('tem ----',tem)
      console.log('n ---',n)
    }
    // tem.id = 抽奖id  
    var allCount = this.cycleNumber * this.DataArr.length + n
    // 走过的所有index = 圈数 * 奖品列表的长度 + 抽中的奖品index 3*7
    var addSpeed = this.defaultSpeed - this.maxSpeed // 加速区间 8-4=4
    var reduceSpeed = allCount - (this.defaultSpeed - this.maxSpeed) // 减速区间 21+2-(8-4)
    this.running = running
    this.runend = runend
    var _this = this
    this.running(currentObj)
    this.myReq = requestAnimationFrame(step)
    function step() { // 这里在循环返回index
      // 加速环节
      if (counter < addSpeed) {
        console.log('---加速循环开始----', counter, current, addSpeed, reduceSpeed, allCount)
        if (current < Math.pow(_this.defaultSpeed - counter, 2)) { // 为啥是平方
          current = current + _this.defaultSpeed / 2 // 4
        } else {
          current = 0
          counter++
          currentObj = currentObj.next
          _this.running(currentObj)
        }
      }
      // 匀速环节
      if (counter >= addSpeed && counter < reduceSpeed) {
        console.log('---匀速循环开始----', counter, current, addSpeed, reduceSpeed, allCount)
        if (current < _this.maxSpeed) {
          current++
        } else {
          current = 0  // 计数清零
          counter++  // 往前移动一个
          currentObj = currentObj.next
          _this.running(currentObj)
        }
      }
      // 减速环节
      if (counter >= reduceSpeed && counter < allCount) {
        console.log('---减速循环开始----', counter, current, addSpeed, reduceSpeed, allCount)
        if (Math.sqrt(current) <= (_this.defaultSpeed - (allCount - counter))) {
          current = current + 2
        } else {
          current = 0
          counter++
          currentObj = currentObj.next
          _this.running(currentObj)
        }
      }
      // 停止
      if (counter >= allCount) {
        console.log('---停----', counter, current, addSpeed, reduceSpeed, allCount)
        _this.runend(currentObj)
        cancelAnimationFrame(_this.myReq)
        return
      }
      _this.myReq = requestAnimationFrame(step)
    }
  }
}
