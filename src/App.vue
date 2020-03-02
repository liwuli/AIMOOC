<template>
  <div id="app" :style="style">
    <!--<transition name="fade">-->
    	<router-view></router-view>
    <!--</transition>-->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      style: 'min-height:' + window.innerHeight + 'px'
    }
  }
}
</script>

