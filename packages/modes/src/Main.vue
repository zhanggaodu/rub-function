<template>
  <div>
    <router-link to="/">home</router-link>
    <router-link to="/responsibility">责任链模式</router-link>
  </div>
  <HelloVue :msg="12" :foo="123" />
  <HelloVue :msg="str" :foo="str" />
  <HelloVue msg="12" foo="123" />
  <HelloVue msg="str" foo="str" />
  <HelloVue :msg="123" foo="str" />
  <HelloVue msg="str" :foo="123" />
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import HelloVue from '@/Hello.vue'
const str = ''


/**
 * 静态类型语言 编译时已确认变量的类型，避免在程序运行时的一些错误
 * 动态类型语言 代码运行时，变量被赋予某个值才能确认，代码量少简洁，更专注与业务逻辑。
 * 如何利用多态结局问题
 * 封装数据由语法解析来实现，比如public private protected
 * 创建 结构 行为
 * 创建-原型模式 通过克隆来创建对象取决于语言有没有克隆对象的方法，ES5提供了oject.create
 * 原型变成的原则
 * 1. 所有的数据都是对象。根对象是null 
 * 2. 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
 * 3. 对象会记住它的原型。
 * 4. 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。
 * 设计模式是对语言不足的补充，如果要使用设计模式，不如去选择一门更好的语言。但语言也是在发展的，比如js就天然的支持了object.create
 * 通过 Object.create( null )可以创建出没有原型的对象。
 * js的this总指向一个对象，这个对象是由运行时的环境决定了，严格模式是undefined，当函数作为对象的方法被调用时，this 指向该对象，
 * 当函数作为普通函数调用时，this指向window
 * var obj = {
    myName: 'sven',
    getName: function() {
      return this.myName
    }
  }
    console.log( obj.getName() ) // 输出：'sven'
    var getName2 = obj.getName  undefined
    call是apply的语法糖，如果需要明确传入参数的次数可以使用call，一般情况下使用apply一次性传入所有的参数。
    闭包不会造成内存泄露，存放在闭包的变量和放在全局环境是一样的
 * currying 又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外
 一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。
 *var currying = function( fn ){
  var args = [];
  return function(){
    if ( arguments.length === 0 ){
      return fn.apply( this, args );
    } else{
      [].push.apply( args, arguments );
      return arguments.callee;
      }
    }
  };
  var cost = (function(){
    var money = 0;
    return function(){
      for ( var i = 0, l = arguments.length; i < l; i++ ){
      money += arguments[ i ];
    }
    return money;
    }
  })();
  var cost = currying( cost ); // 转化成 currying 函数
  cost( 100 ); // 未真正求值
  cost( 200 ); // 未真正求值
  cost( 300 ); // 未真正求值
  alert ( cost() ); // 求值并输出：600
 * 单例模式Singleton pattern：是确保只有一个实例，并提供全局访问。例如pinia、jQuery等
 惰性单例指的是在需要的时候才创建对象实例。
 Singleton.getInstance = (function(){
  var instance = null;
  return function( name ){
    if ( !instance ){
      instance = new Singleton( name );
    }
    return instance;
  }
})();
单一职责原则：有且仅有一个引起变化的原因

策略模式Strategy Pattern 运行时根据不同的情况选择算法
var strategies = {
  "S": function( salary ){
  return salary * 4;
  },
  "A": function( salary ){
  return salary * 3;
  }, 
 }
 function getSalary = (base, multiple) => {
  return strategies[multiple](base)
 }
 校验库 vaildator
 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句,
 策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的 strategy 中，使得它们易于切换，易于理解，易于扩展。
 使用策略模式会在程序中增加许多策略类或者策略对象，但实际上这比把它们负责的逻辑堆砌在 Context 中要好。

 代理模式 Proxy
 保护代理：过滤掉不必要的请求
 虚拟代理：避免过大的开销，最常用的方法，例如图片预加载（先放loading图）
 缓存代理：为一些开销大的请求提供暂时的存储
var myImage = (function(){
  var imgNode = document.createElement( 'img' );
  document.body.appendChild( imgNode );
    return {
      setSrc: function( src ){
      imgNode.src = src;
    }
  }
})();
var proxyImage = (function(){
  var img = new Image;
  img.onload = function(){
    myImage.setSrc( this.src );
  }
  return {
    setSrc: function( src ){
      myImage.setSrc( 'file:// /C:/Users/svenzeng/Desktop/loading.gif' );
      img.src = src;
    }
  }
})();
proxyImage.setSrc( 'http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' );
缓存代理
var proxyMult = (function(){
  var cache = {};
  return function(){
    var args = Array.prototype.join.call( arguments, ',' );
    if ( args in cache ){
      return cache[ args ];
    }
    return cache[ args ] = mult.apply( this, arguments );
  }
})(); 

开放封闭原则 TODO 
依赖倒置原则 TODO

迭代器模式
终止foreach的方法return false不生效 break 报错 改变循环的数组 √
迭代器相对简单，简单到不认为他是一种设计模式，很多语言都内置了迭代去

发布订阅模式 eventbus
和观察者模式（watch computed）的区别

 */


</script>
