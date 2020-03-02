<template>
  <div class="app" :style="appstyle">
  	<Ghead></Ghead>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<Linklist></Linklist>
    		<div class="AA_right">
    			<AJposition></AJposition>
    			<div class="evalueatetab">
    				<span class="span" style="font-size: 18px;" @click="jumptourl(item, ind)" :class="evaluateselected[ind]" v-for="(item, ind) in attab">{{item.name}}</span>
    			</div>
          <keep-alive>
            <component :is="currentComponent"></component>
          </keep-alive>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import AdministrativeclassHigh from '@/module/admin/components/administrativeclassHigh'
import AdministrativeclassCommon from '@/module/admin/components/administrativeclassCommon'
import {attab} from '@/module/admin/config/administrativeclassinfo'
export default {
  name: 'AJadministrativeclass',
  data () {
    return {
      appstyle: 'min-height:' + window.innerHeight + 'px',
      currentComponent: '',
      eduType: this.$store.state.educationType,
      attab: attab,
      evaluateselected: ['selected']
    }
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Linklist,
    AdministrativeclassHigh,
    AdministrativeclassCommon
  },
  methods: {
    jumptourl (item, ind) {
      if (ind !== 0) {
        this.$router.push({name: item.pathname})
      }
    }
  },
  created () {
    if (this.eduType) {
      this.currentComponent = 'AdministrativeclassHigh'
    } else {
      this.currentComponent = 'AdministrativeclassCommon'
      this.attab.splice(1)
    }
  },
  mounted () {
    document.getElementById('nav').querySelector('a[href="#/classmanage"]').className = 'a hides active'
  }
}
</script>
