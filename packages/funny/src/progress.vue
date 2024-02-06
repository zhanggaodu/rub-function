<script setup lang="ts">
import placeholderImage from '@/assets/images/copy.jpeg'
export interface Progress {
  placeholder?: string
  src: string
  class: string
}

const props = withDefaults(defineProps<Progress>(), {
  placeholder: placeholderImage,
  src: '',
  class: 'image'
})

const progressive = ref()
const createImage = () => {
  let image = new Image()
  image.src = props.placeholder
  progressive.value.append(image)
  image.onload = function() {
    image.src = props.src
  }
}
onMounted(() => {
  createImage()
})


</script>
<template>
  <div ref="progressive">

  </div>
</template>