<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div class="container" :class="selected ? 'selected' : ''">
    <span class="is-checked">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 64 64" xml:space="preserve" focusable="false" style="fill: currentColor; width: 1em; height: 1em; display: inline-block; user-select: none;" class="eg-icon"><path fill-rule="nonzero" d="M26.667 56c-.77 0-1.501-.332-2.008-.91L6.076 33.84a2.667 2.667 0 114.015-3.513l16.422 18.78L56.62 9.145a2.667 2.667 0 114.26 3.21L28.797 54.938A2.667 2.667 0 0126.764 56h-.097z" /></svg>
    </span>
    <div class="title">
      {{ label }}
    </div>
    <div class="image">
      <img :src="url">
    </div>
  </div>
</template>

<style lang="less" scoped>
.container{
  position: relative;
  height: 150px;
  width: 150px;
  border-radius: 5px;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .is-checked{
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border: 12px solid #1a73e8;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-top-left-radius: 5px;
    svg{
      position: absolute;
      color: #fff;
      line-height: 0;
      top: -.8em;
      left: -.8em;
    }
  }
  .title{
    margin-bottom: 5px;
  }
  .image{
    height: 90px;
    width: 130px;
    img{
      height: 100%;
      width: 100%;
    }
  }
  cursor: pointer;
}
.container:hover{
  color: #1a73e8;
  border: 1px solid #1a73e8;
}
.selected{
  .is-checked{
    display: block;
  }
  color: #1a73e8;
  border: 1px solid #1a73e8;
}
</style>
