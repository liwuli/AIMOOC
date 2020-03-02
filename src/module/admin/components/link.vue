<template>
  <div>
  	<Ghead></Ghead>
  	<transition name="fade">
    	<router-view></router-view>
    </transition>
   	 <div class="center centerbottom50" style="margin-top: 30px;margin-bottom: 30px;">
   	 	<div class="centers">
   	 		<div class="Anav" :style="'min-height:' + minhei + 'px'">
   	 			<router-link @click.native="leave(items.ind)" :key="ind" class="a" :id="items.id" :to="{path: items.name}" v-for="(items, ind) in links">{{items.title}}</router-link>
   	 		</div>
   	 	</div>
   	 </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
// import {linkinfo, linkinfolist} from '@/module/admin/config/index'
export default {
  name: 'AJadmin',
  data () {
    return {
      links: this.$store.state.roleinfolink,
      minhei: window.innerHeight - 65 - 50 - 60
    }
  },
  components: {
    Ghead,
    Gfoot
  },
  methods: {
    leave (ind) {
      if (!localStorage.getItem('linkoclose')) {
        let obj = {}
        obj[ind] = ind
        localStorage.setItem('linkoclose', JSON.stringify(obj))
      }
    }
  }
}
</script>
