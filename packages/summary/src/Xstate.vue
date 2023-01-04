<script setup>
import { ref, computed } from 'vue'
import { createMachine } from 'xstate'
const state = createMachine ({
  id: 'userState', // 状态机标识
  initial: 'visitor', // 初始状态
  context: { // 整个状态机的本地context
    elapsed: 0,
    direction: 'ee'
  },
  states: { // 状态机的定义
    visitor: {
      tags: '1', // 单标签
      on: {
        // CLICK: 'vipPerson'
      },
      meta: { // 状态的相关静态数据
        message: 'Loading...'
      },
      after: {
        // 3000: { target: 'failure.timeout' }
      },
    },
    vipPerson: {
      tags: ['1', '2'], // 多标签
    },
    vipCompany: {
      
    },
    blackList: { 
      type: 'final' // atomic 没有子节点  computed 包含子节点
    }
  }, on:[
    { event: "PERSON", target: "vipPerson" },
    { event: "COMPANY", target: "vipCompany" },
    { event: "BLACK", target: "blackList" },
   ]
  }
  , {
    actions: {
      alertRed: (context, event) => {
        console.log('green');
      }
    },
    delays: {

    },
    guards: {

    },
    services: {

    }
  })

// state.withConfig({}) 扩展state
/**
 * 
 * 可以通过json.stringfy把state持久化---存到localStorage里
 * 瞬时状态节点 状态机不会停留 根据条件判断状态机应该去哪个状态
 */

// const noAlertLightMachine = state.withConfig({
//   actions: { // action 不会被覆盖  context会被覆盖 可以使用...获取之前state的context 
//     alertGreen: (context, event) => {
//       console.log('green');
//     }
//   }
// })
// console.log(state.initialState);
// state.value = {vipPerson: 'vipPerson'}
// console.log(state.initial) // 获取状态机 默认的状态
// console.log(state.initialState.value) // 获取状态机 当前的值
// console.log(state.initialState.matches('visitor')) // matches(parent) 确定当前state是否是parent的子集   报错-->必须要加initialState
// console.log(state.initialState.nextEvents)
// console.log(state.children)
// console.log(state.can('TOGGLE'))  // 能不能进行某种操作
// console.log(state.initialState.done) // 是否到了最终值 之后不能再更改状态

const { initialState } = state

initialState.value = localStorage.getItem('userstate') || initialState.value

const changeState = (status) => {
  let nextState = {}
  if (status === 'vipp') {
    nextState = state.transition(initialState, 'PERSON')
  } else if (status === 'vipc') {
    nextState = state.transition(initialState, 'COMPANY');
  } else if (status === 'black') {
    nextState = state.transition(initialState, 'BLACK');
  } else {
    return
  }
  localStorage.setItem('userstate',nextState.value)
}

</script>

<template>
  <div>
    <div>用户当前的状态：{{ initialState.value }}</div>
    <p>45</p>
    <div @click="changeState('vipp')">更改用户状态to vipPerson</div>
    <div @click="changeState('vipc')">更改用户状态to vipCompany</div>
    <div @click="changeState('black')">更改用户状态to blackList</div>
  </div>

</template>

<style lang="scss" scoped>

</style>