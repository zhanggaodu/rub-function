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





</script>
