<template>
  <div class="app">
  	<Ghead></Ghead>
    <div class="center centerbottom50">
    	<div class="centers">
    		<Linklist></Linklist>
    		<div class="AA_right">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Linklist from '@/module/admin/components/linklist'
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'

export default {
  name: 'index',
  components: {
    Linklist,
    Ghead,
    Gfoot
  }
}
</script>
