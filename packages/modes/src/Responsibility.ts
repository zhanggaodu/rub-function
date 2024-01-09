/**
 * 责任链模式
 * 一份数据需要经过多个方法顺序处理
 * 缺点：需要顺序声明方法  方法如何接受上一个方法处理过的数据
 * constructor里的方法为什么会执行两遍
 */
class First {
  private handler
  // public data
  constructor(handler: string) {//, data: string
    this.handler = handler
    this.todo()
  }
  todo() {
    console.log('FIRST')
  }
}
class Second {
  private handler
  constructor(handler: string) {
    this.handler = handler
    this.todo()
  }
  todo() {
    console.log('SECOND')
  }
}
class Third {
  private handler
  constructor(handler: string) {
    this.handler = handler
    this.todo()
  }
  todo() {
    console.log('third')
  }
}
type HandlerObj = {
  name: string,
  nextHandler: string
}
class Need {
  constructor(){
    for (let i = 0; i < this.methodsList.length; i++) {
      if(this.methodsList[i].nextHandler) {
       this.doHandler(this.methodsList[i].nextHandler)
      }
    }
  }
  // 需要执行的方法数组
  private methodsList: HandlerObj[] =  [{name: 'first', nextHandler: 'first'},{name: 'second', nextHandler: 'second'} ,{name: 'third', nextHandler: ''}]
  // 获取nextHandler
  public getHandler() {
    this.methodsList.map((method) => {
      if(method.nextHandler !== null) {
       return this.doHandler(method.nextHandler)
      } else {
        return null
      }
    })
  }
  // 执行handler
  public doHandler(hadler: string) {
    let first = new First(hadler)
    let second = new Second(hadler)
    let third = new Third(hadler)
  }

}



