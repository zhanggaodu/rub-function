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
 * 72
 */


</script>
