<template>

  <div class="box"><span>wwww</span></div>
</template>

<style lang="scss" scoped>
/**
 1. 引入文件
 @use @forward 引入sass文件 
 @forward可以用来扩展 @use
 @import 可以引入sass css文件 If the same stylesheet is imported more than once, it will be evaluated again each time.

 2. re-use css  mixin  extend

 3. 计算 min max var if else for each while

 4. 扔出错误 error warn debug


* */
// @forward "media/public" as public-*; // 必须在最上边  可使用hide 多个之间用，分割
// 这个需要在另外一个页面  @use引入才能通过@include使用
// @include public.reset;

// @use 'media/public' with ($text: red); // 需要default

// @forward "media/public" with (
//   $text: red !default, // 可以更改默认值
// );

// @extend .error; // 是全局的 没有匹配项会报错  如果有不使用的可以加!optional to the end.
// Extends and mixins are both ways of encapsulating and re-using styles in Sass,
// mixin可以传参

// @error 确保在传参时候 参数的类型跟需要的一致
// @warn

// @supports 是否支持样式
@supports (display: flex) {
  .flex-container > * {
    text-shadow: 0 0 2px blue;
    float: none;
  }
  .flex-container {
    display: flex;
  }
}

@mixin text-color ($color-key,$color-value: white) {
  // @if $color-key != left and $color-key != right {
  //   @error "Property #{$color-key} must be either left or right.";
  // }
  #{$color-key}: $color-value;
}

@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px;
}

@function sum($numbers...) {
  $sum: 0;
  @each $number in $numbers {
    $sum: $sum + $number;
  }
  @return $sum;
}

.micro {
  width: sum(50px, 30px, 100px);
}

.box {
  $text-color: red;
 --text-color: blue;
 --max-width: 200px;
  @include text-color(color, var(--text-color));
  @debug var(--max-width);
  width: calc(sum(22,55) * 1px);
  // #{$--} 插值 类似于var(--)   #{$text-color} === var(--text-color)
}

</style>