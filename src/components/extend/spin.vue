<style>
    .demo-spin-icon-load{
    	background: none;
    	border-radius: 50%;
    	border-style: dashed;
    	border-width: 4px ;
    	border-color: #0082C0 #4e4e4e;
    	height: 20px;
    	width: 20px;
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
<template>
    <div v-if="spinshow" :style="styles">
        <div  class="demo-spin-icon-load" ></div>
        <div>Loading</div>
    </div>
</template>
<script>
  // 部分样式代码冗长，未作展示
  export default {
    data () {
      return {
        styles: 'margin:auto;background-color:none;width:20px;'
      }
    },
    props: ['spinshow'],
    components: {
    }
  }
</script>
