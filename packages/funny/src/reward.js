class LuckDraw {
  constructor(DataArr, RotateDir, cycleNumber, minSpeed) {
    this.DataArr = JSON.parse(JSON.stringify(DataArr));
    // 最大速度
    this.maxSpeed = 4;
    // 全速
    this.cycleNumber = cycleNumber || 2;
    this.myReq;
    // 最小速度
    this.defaultSpeed = minSpeed || 15;

    for (var i = 0; i < RotateDir.length; i++) {
      let { index, next } = RotateDir[i];
      if (typeof this.DataArr[index].next !== "undefined") {
        console.error(`RotateDir is error`);
        return;
      }
      this.DataArr[index].next = this.DataArr[next]
    }
  }

  run(id, running, runend) {
    var counter = 0; // 计数器
    var current = 0; // 当前数字值
    var n = 0;
    var currentObj = this.DataArr[0];
    var tem = this.DataArr[0];
    while (true) {
      if (n > this.DataArr.length) {
        console.error(`${id}不存在`);
        return;
      }
      if (tem.id == id) {
        break;
      }
      tem = tem.next;
      n++;
    }
    var allCount = this.cycleNumber * this.DataArr.length + n;
    // 加速区间
    var addSpeed = this.defaultSpeed - this.maxSpeed;
    // 减速区间
    var reduceSpeed = allCount - (this.defaultSpeed - this.maxSpeed);
    this.running = running;
    this.runend = runend;
    var _this = this;
    this.running(currentObj);
    this.myReq = requestAnimationFrame(step);
    function step() {
      // current++;
      // 加速环节
      if (counter < addSpeed) {
        if (current < Math.pow(_this.defaultSpeed - counter, 2)) {
          current = current + _this.defaultSpeed / 2;
        } else {
          current = 0;
          // 往前移动一个；
          counter++;
          currentObj = currentObj.next;
          _this.running(currentObj);
        }
      }
      // 匀速环节
      if (counter >= addSpeed && counter < reduceSpeed) {
        if (current < _this.maxSpeed) {
          current++;
        } else {
          // 计数清零
          current = 0;
          // 往前移动一个；
          counter++;
          currentObj = currentObj.next;
          _this.running(currentObj);
        }
      }
      // 减速环节
      if (counter >= reduceSpeed && counter < allCount) {
        if (Math.sqrt(current) <= (_this.defaultSpeed - (allCount - counter))) {
          current = current + 2;
        } else {
          // 计数清零
          current = 0;
          // 往前移动一个；
          counter++;
          currentObj = currentObj.next;
          _this.running(currentObj);
        }
      }
      // 停止
      if (counter >= allCount) {
        _this.runend(currentObj);
        cancelAnimationFrame(_this.myReq);
        return;
      }
      _this.myReq = requestAnimationFrame(step);
    }
  }
}
// 使用方式：
// 服务端返回的奖品信息列表
const prizeList = [
{ id: 1 },
{ id: 2 },
{ id: 3 },
{ id: 4 },
{ id: 5 },
{ id: 6 },
{ id: 7 },
{ id: 8 },
];

// 旋转规则数组 
const rotateDir = [
{ index: 0, next: 1 },
{ index: 1, next: 2 },
{ index: 2, next: 3 },
{ index: 3, next: 4 },
{ index: 4, next: 5 },
{ index: 5, next: 6 },
{ index: 6, next: 7 },
{ index: 7, next: 0 },
]

// 初始化抽奖, 3代表圈数， 8代表速度，也代表时间片的个数
const luckDrawFn = LuckDraw(prizeList, rotateDir, 3, 8);

// 中奖id，请求服务端接口拿到
const id = 7;

luckDrawFn.run(
id, //中奖id
params => { // 停留在当前格子的回调函数
  // 拿到当前 active 状态的 id
  this.rewardId = params.id;
},
params => { // 最终停止的回调函数
  //最后转盘停止的地方，可以弹出奖励弹框或其他操作
  this.rewardId = params.id;
})