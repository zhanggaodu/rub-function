export default class LuckDraw {
  // 1. 一开始没有结果值 delay和数据请求一起执行
  // 先升速循环两圈 匀速一圈 再降速
  // 2. 升速和降速的时长 : 不是按时长 是按个数
  // 3. prizeList的数据太复杂 : 抽不干净
  // 4. 1-6 再写一版:开始不给抽奖的id : ing
  constructor(DataArr, RotateDir, cycleNumber, minSpeed) {
    this.DataArr = JSON.parse(JSON.stringify(DataArr))
    this.maxSpeed = 5 // 最大速度
    this.cycleNumber = cycleNumber || 2 // 全速
    this.myReq
    this.defaultSpeed = minSpeed || 15
    this.addSpeed = 0
    this.allCount = 0 // 总需要循环的奖品个数
    this.reduceSpeed = this.allCount - (this.defaultSpeed - this.maxSpeed) + 2
    this.counter = 0 // 计数器
    this.current = 0 // 当前

    for (var i = 0; i < DataArr.length; i++) {
      let { index, next } = RotateDir[i]
      if (typeof this.DataArr[index].next !== "undefined") {
        console.error(`RotateDir is error`)
        return
      }
      this.DataArr[index].next = this.DataArr[next]
    }
  }
  slow (id, startIndex, running, runend) {
    this.counter = startIndex // 计数器
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
      tem = tem.next  // tem.id = 抽奖id
      n++ 
      console.log('tem ----',tem)
      console.log('n ---',n)
    }
    // 循环DataArr就是为了求n 等降速之后再求n并赋值给allCount
    // 分成两个阶段 1. 升速 匀速 2. 降速 减速
    this.allCount = this.cycleNumber * this.DataArr.length + n
    // 走过的所有index = 圈数 * 奖品列表的长度 + 抽中的奖品id   30
    this.addSpeed = this.defaultSpeed - this.maxSpeed // 加速区间 4
    this.reduceSpeed = this.allCount - (this.defaultSpeed - this.maxSpeed) + 2// 减速区间 26
    this.running = running
    this.runend = runend
    var _this = this
    this.running(currentObj)
    this.myReq = requestAnimationFrame(step)
    function step() { // 这里在循环返回index
      // 匀速环节
      if (_this.counter >= _this.addSpeed && _this.counter < _this.reduceSpeed) {
        console.log('---匀速循环开始----', _this.counter, _this.current, _this.addSpeed, _this.reduceSpeed, _this.allCount)
        if (_this.current < _this.maxSpeed) {
          _this.current++
        } else {
          _this.current = 0  // 计数清零
          _this.counter++  // 往前移动一个
          currentObj = currentObj.next
          _this.running(currentObj)
        }
      }
      // 减速环节
      if (_this.counter >= _this.reduceSpeed && _this.counter < _this.allCount) {
        console.log('---减速循环开始----', _this.counter, _this.current, _this.addSpeed, _this.reduceSpeed, _this.allCount)
        if (Math.sqrt(_this.current) <= (_this.defaultSpeed - (_this.allCount - _this.counter))) {
          _this.current = _this.current + 2
        } else {
          _this.current = 0
          _this.counter++
          currentObj = currentObj.next
          _this.running(currentObj)
        }
      }
      // 停止
      if (_this.counter >= _this.allCount) {
        console.log('---停----', _this.counter, _this.current, _this.addSpeed, _this.reduceSpeed, _this.allCount)
        _this.runend(currentObj)
        cancelAnimationFrame(_this.myReq)
        return
      }
      _this.myReq = requestAnimationFrame(step)
    }
  }
  run (startIndex, running) {
    this.counter = startIndex // 计数器
    var currentObj = this.DataArr[startIndex]
    // 循环DataArr就是为了求n 等降速之后再求n并赋值给allCount
    // 分成两个阶段 1. 升速 匀速 2. 降速 减速
    // 走过的所有index = 圈数 * 奖品列表的长度 + 抽中的奖品id   30
    this.addSpeed = this.defaultSpeed - this.maxSpeed // 加速区间 4
    this.running = running
    var _this = this
    this.running(currentObj)
    this.myReq = requestAnimationFrame(step)
    function step() { // 这里在循环返回index
      // 加速环节
      if (_this.counter < _this.addSpeed) {
        console.log('---加速循环开始----', _this.counter, _this.current, _this.addSpeed, _this.reduceSpeed, _this.allCount)
        if (_this.current < Math.pow(_this.defaultSpeed - _this.counter, 2)) { // 为啥是平方
          _this.current = _this.current + _this.defaultSpeed / 2 // 4
        } else {
          _this.current = 0
          _this.counter++
          currentObj = currentObj.next
          _this.running(currentObj)
        }
      }
      _this.myReq = requestAnimationFrame(step)
    }
  }
}
