<template>
  <div class="app">
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
            <span class="span" style="font-size: 18px;" @click="tabSwitch(item, ind)" :class="evaluateselected[ind]" v-for="(item, ind) in evaluatetab">{{item.name}}</span>
            <!--<button type="button" class="button" @click="jumptousermatch">{{btnN}}</button>-->
          </div>
          <keep-alive>
            <component :is="currentTabComponent"></component>
          </keep-alive>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Linklist from './linklist'
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import AJposition from '@/components/extend/position'
import Teacher from '@/module/admin/components/userteacher'
import Student from '@/module/admin/components/userstudent'
import Userdept from '@/module/admin/components/userdept' // 机构人员(暂时不用)
import {evaluatetab, btnN} from '@/module/admin/config/userinfo'

export default {
  name: 'user',
  components: {
    Linklist,
    Ghead,
    Gfoot,
    AJposition,
    Teacher,
    Student,
    Userdept
  },
  data () {
    return {
      btnN: btnN,
      evaluatetab: evaluatetab,
      evaluateselected: ['selected'],
      currentTabComponent: 'Teacher'
    }
  },
  methods: {
    tabSwitch (item, ind) {
      this.evaluateselected = []
      this.evaluateselected[ind] = 'selected'
      this.currentTabComponent = item.value
    },
    jumptousermatch () {
      this.$router.push({name: 'AJusermatch'})
    }
  }
}
</script>
