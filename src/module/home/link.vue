<template>
  <div>
  	<transition name="fade">
    	<router-view></router-view>
    </transition>
   	 <div class="center centerline">
   	 	<div class="centers1100">
   	 		<div class="Fnav">
   	 			<router-link  @click.native="leave" class="a" :id="items.id" :to="{path: items.name}" v-for="(items, index) in links" :key="index">{{items.title}}</router-link>
   	 		</div>
   	 	</div>
   	 </div>
  </div>
</template>

<script>
// import {linkinfolist} from '@/module/home/config/linkinfo'
// import {navurl} from '@/module/home/config/index'
export default {
  name: 'link',
  data () {
    return {
      links: []
    }
  },
  created () {
    this.links = this.$store.state.Flinks
  },
  methods: {
    leave () {
//    console.log('执行一次退出房间操作')
      // this.$socket.emit('leave')
    }
  }
}
</script>
