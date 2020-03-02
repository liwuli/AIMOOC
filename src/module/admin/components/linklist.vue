
<template>
  <div class="AA_left" :style="'min-height:' + minhei + 'px;height:' + lefthei + 'px'">
 		<nav id="nav">
 			<div class="rootmenu" v-for="(items, ind) in links">
 				<span class="navtitle" @click="titleopenclose('openclose_' + items.moduleCode, ind)">{{items.moduleName}}</span>
 				<span class="iconfont icon-jiantou oc" :id="'openclose_' + items.moduleCode"  @click="linkopenclose($event, ind)"></span>
 				<span class="iconfont icontitle" :class="'icon-' + items.moduleCode"></span>
 				<!--<router-link class="a hides"  :id="alink.moduleId"  :to="{path: alink.moduleCode}" v-for="(alink, alinkind) in items.childModules">{{alink.moduleName}}</router-link>-->
        <router-link :key="alink.moduleId" class="a hides" :id="alink.moduleId" :to="'/' + alink.moduleCode" :target="alink.moduleCode==='intelligentterminalmonitor'?'_blank':'_self'" v-for="alink in items.childModules">{{alink.moduleName}}</router-link>
         <!-- <a class="a hides" :id="alink.moduleId" :href="'#/' + alink.moduleCode" v-for="(alink, alinkind) in items.childModules">{{alink.moduleName}}</a> -->
 			</div>
 		</nav>
  </div>
</template>
<script>
// import {linkinfo} from '@/module/admin/config/index'
export default {
  name: 'AJlinklist',
  data () {
    return {
      links: this.$store.state.roleinfolinkMenu,
      minhei: window.innerHeight - 65 - 50,
      openclosearr: localStorage.getItem('linkoclose') ? JSON.parse(localStorage.getItem('linkoclose')) : {0: 0},
      navOpen: [],
      navInfo: {
        currentIndex: 0,
        maxLength: 2,
        showType: false
      }
    }
  },
  computed: {
    lefthei () {
      // return this.$store.getters.lefthei
    }
  },
  methods: {
    linkopenclose (ev, ind) {

      // if(this.navOpen.length == 0){
      //   this.navOpen.push({'ev':ev,'ind':ind});
      //   if(ind == this.navInfo.currentIndex){
      //     this.navInfo.showType = true;
      //   }
      // }else if(this.navOpen.length == 1){
      //   if(this.navInfo.showType){
      //     if(ind != this.navOpen[0].ind){
      //       this.navOpen.push({'ev':ev,'ind':ind});
      //     }else if(ind == this.navOpen[0].ind) {
      //       this.navOpen.splice(0,1);
      //       this.navInfo.showType = false;
      //     }
      //   }else {
      //     if(ind == this.navInfo.currentIndex){
      //       this.navOpen.unshift({'ev':ev,'ind':ind});
      //       this.navInfo.showType = true;
      //     }else if(ind == this.navOpen[0].ind){
      //       this.navOpen.splice(0,1);
      //     }else {
      //       this.openNav(this.navOpen[0].ev,this.navOpen[0].ind);
      //       this.navOpen.splice(0,1,{'ev':ev,'ind':ind});
      //     }
      //   }
      // }else {
      //   if(this.navInfo.currentIndex == ind){
      //     this.navOpen.splice(0,1);
      //     this.navInfo.showType = false;
      //   }else if(this.navOpen[1].ind == ind){
      //     this.navOpen.splice(1,1);
      //   }else {
      //     this.openNav(this.navOpen[1].ev,this.navOpen[1].ind);
      //     this.navOpen.splice(1,1,{'ev':ev,'ind':ind});
      //   }
      // }
      this.openNav(ev,ind);
    },
    openNav(ev, ind){

      let flag = ev.target.parentNode
      if (!flag.getAttribute('style')) {
        flag.setAttribute('style', 'height:auto;overflow: auto;')
        ev.target.setAttribute('style', 'transform: rotate(270deg);')
        this.openclosearr[ind] = ind
      } else {
        flag.removeAttribute('style')
        ev.target.removeAttribute('style')
         delete this.openclosearr[ind]
      }
      localStorage.setItem('linkoclose', JSON.stringify(this.openclosearr))
    },
    titleopenclose (id, ind) {

      document.getElementById(id).click()
    },
    selectmenu (sub) {

      let navObjs = document.querySelectorAll('.navtitle')
      if (!navObjs.length) {
        return
      }
      // for (let k in JSON.parse(localStorage.getItem('linkoclose'))) {
      //   if (!objs[k].parentNode.getAttribute('style')) {
      //     objs[k].click()
      //   }
      // }
      let str = location.hash.split('/')[1]
      for (let item = 0, j = 0; item < this.links.length; item++) {
        if (j) {
          break
        }
        for (let k = 0; k < this.links[item].childModules.length; k++) {
          if (str === this.links[item].childModules[k].moduleCode) {
            localStorage.setItem('localname', this.links[item].childModules[k].moduleCode)
            let objs = document.getElementById(this.links[item].childModules[k].moduleId)
            objs.className = 'a hides active'
            j++
            this.navInfo.currentIndex = item;
            navObjs[item].click();
            break
          }
        }
      }
    }
  },
  mounted () {
    if (!localStorage.getItem('linkoclose')) {
      localStorage.setItem('linkoclose', JSON.stringify(this.openclosearr))
    }
    this.selectmenu()
    document.onmousedown = function (evt) {
      let e = evt || window.event
      let target = e.target || e.srcElement
      let oDiv = target.parentNode
      if (target.className === 'title' && oDiv.className === 'win_content') {
        // 鼠标相对于事件源元素的x、y坐标
        var disX = e.offsetX
        var disY = e.offsetY
        // 鼠标移动事件
        document.onmousemove = function (evt) {
          oDiv.style.margin = '0'
          var e = evt || window.event
          var oHtml = document.documentElement
          var left = e.pageX - disX
          var top = e.pageY - disY
          // 控制#box不脱离浏览器边框
          if (left <= 0) {
            left = 0
          } else if (left >= oHtml.clientWidth - oDiv.offsetWidth) {
            left = oHtml.clientWidth - oDiv.offsetWidth
          }
          if (top <= 0) {
            top = 0
          } else if (top >= oHtml.clientHeight - oDiv.offsetHeight) {
            top = oHtml.clientHeight - oDiv.offsetHeight
          }
          oDiv.style.left = left + 'px'
          oDiv.style.top = top + 'px'
        }
        // 鼠标松开事件
        document.onmouseup = function () {
          document.onmousemove = null
        }
        // 禁止鼠标拖动
        document.ondragstart = function () {
          return false
        }
      }
    }
  },
  watch: {
    '$route' (to, from) {

      if (to.path.indexOf(localStorage.getItem('localname')) >= 0) {
        // this.selectmenu()
      }
    }
  },
  beforeDestroy () {
    document.onmousedown = null
  }
}
</script>

