<style type="text/css">
@import url("/static/css/default/Global.css");
@import url("/static/iconfont/iconfont.css");
</style>
<template>
  <div class="G_404">
  	<img :src="img"/>
  	<span class="txt">{{txt}}</span>
  	<a href="/index.html">
  		<div class="backtohome">
  			<span class="iconfont icon-finger finger"></span>
  			<span class="back">{{back}}</span>
  		</div>
  	</a>
  </div>
</template>

<script>
export default {
  name: 'Nothing',
  data () {
    return {
      img: '/static/images/lost.png',
      txt: '这个页面找不到了，可能已经被删除或者地址错误',
      back: '返回首页'
    }
  }
}
</script>

