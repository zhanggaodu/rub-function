
<script setup>
import { defineProps } from 'vue';
  const props = defineProps({
    artList:{
      type:Array,
      default:[]
    }
  })
  const scale = window.innerWidth / 375
</script>

<template>
  <!--传参 两种状态 1.锁仓（图片点亮）  2. 未锁仓（置灰盖章）-->
  <template v-for="item in props.artList">
  <section >
      <div class="title text-center my-20">
        <span>{{item.title}}</span>
      </div>
      <div class="content flex flex-wrap mr-20">
        <template v-for="img in item.list">
          <div class="content-item ml-20">
            <div class="img"><img :class="[img.status === 1 ?'img-cover':'']" src="./images/wait.png" alt=""></div>
            <div class="name truncate text-12">{{img.name}}</div>
          </div>
        </template>
      </div>
    </section>
  </template>
</template>

<style scoped lang="scss">
.content{
  &-item{
    width: 90px;
    height: 100px;
    border: none;
  }
}
.img{
  width: 90px;
  height: 80px;

  &-cover{
    &::after{
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha:.5);
    }
  }
}
.name{
  height: 20px;
  line-height: 20px;
}

</style>

