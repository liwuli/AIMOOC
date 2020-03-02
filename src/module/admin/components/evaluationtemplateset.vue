<template>
  <div class="app">
  	<Ghead></Ghead>
  	
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<Linklist></Linklist>
    		<div class="GAA_right"  :style="'min-height:' + Mlefthei + 'px;'">
    			<!--<AJposition :pathobj = "pathobj"></AJposition>-->
    			<div class="G_positon">
    				<div class="item">
    					<a href="#/evaluateTemplate" class="active">{{evaluationtempletsetinfo.one}}</a>
    					<span class="separator">&gt;</span>
    				</div> 
    				<div class="item">
    					{{evaluationtempletsetinfo.two}}
    				</div>
    			</div>
    			<div class="templatename">{{evaluationtempletsetinfo.templatename}}{{templatename}}</div>
    			<div class="optline" v-show="publish">
    				<div class="mrightcreate" @click="jumpadd('add')">{{createbtnN}}</div>
    				<div class="mrightcreate" @click="jumpadd('edit')">{{editbtnN}}</div>
    				<div class="mrightcreate" @click="jumpadd('del')">{{delbtnN}}</div>
    			</div>
    			<div class="evaluatelist" :style="'min-height:' + Mlefthei + 'px;'">
    				<div class="list" :id="item.id" v-for="(item, ind) in list" :style="bgarr[ind]" @click='selected(item, ind)'>
    					<span class="name hides">{{item.name}}</span>
    					<span class="scole hides">{{evaluationtempletsetinfo.scole}}:<span class="highlight">{{item.nowscole}}</span>/{{item.scole}}</span>
    					<span class="iconarr iconfont " :class="selectedarr[ind]"></span>
    				</div>
    				<div class="showtotal">{{totaltxt}}:<span class="highlight">{{nowscole}}</span>/{{parenttotalpoint}}</div>
    			</div>
    			<div class="evaluaterightlist" :style="'min-height:' + (Mlefthei - 40) + 'px;'">
    				<div class="optline"  v-show="publish">
	    				<div class="mrightcreate" @click="jumpadd('addcontent')">{{createcontentbtnN}}</div>
	    			</div>
	    			<div class="evaluatelists">
	    				<div class="evaluatehead" >
		    				<span class="item" v-for="(item, ind) in listheadsub" :class="percentnfosub[ind]">{{item}}</span>
		    			</div>
	    				<div class="list" v-for="(item, ind) in listsub">
	    					<div  v-for="(items, itemsind) in columssub">
	    						<span class="text hides"  v-if="items !== 'opt'"  :class="percentnfosub[itemsind]" :title="item[items]">{{item[items]}}</span>
		    					<span class="opts hides"  v-if="items === 'opt'"  :class="percentnfosub[itemsind]">
		    						<span :class="items" v-show="publish" v-for="(items, itemsind) in opteventsubAll" @click="listoptenevent(items,item, ind)"></span>
		    					</span>
	    					</div>
	    				</div>
	    				<div class="showtotal" style="margin-left: 0;">{{totaltxt}}:<span class="highlight">{{subnowscole}}</span>/{{parentitem.scole}}</div>
	    			</div>
    			</div>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {totaltxt, evaluationtempletsetinfo, opteventsubAll, listurl, findChildrenurl, columssub, listheadsub, percentnfosub, createbtnN, createcontentbtnN, editbtnN, delbtnN, pathinfo, FirsttitleN} from '@/module/admin/config/evaluationtemplatesetinfo'
export default {
  name: 'AJevaluateTemplatesettemplate',
  data () {
    return {
      createbtnN: createbtnN,
      opteventsubAll: opteventsubAll,
      evaluationtempletsetinfo: evaluationtempletsetinfo,
      listheadsub: listheadsub,
      columssub: columssub,
      percentnfosub: percentnfosub,
      editbtnN: editbtnN,
      delbtnN: delbtnN,
      FirsttitleN: FirsttitleN,
      totaltxt: totaltxt,
      createcontentbtnN: createcontentbtnN,
      Mlefthei: window.innerHeight - 65 - 50,
      pathinfo: pathinfo,
      list: [],
      listsub: [],
      ind: 0,
      parentitem: '',
      selectedarr: ['icon-youjiantou'],
      bgarr: ['background:#d3e8fd;'],
      evaluateTemplateId: '',
      id: '',
      nowscole: 0,
      templatename: '',
      parenttotalpoint: 0,
      subnowscole: 0,
      publish: true,
      publishval: ''
    }
  },
  created () {
    this.evaluateTemplateId = this.geturlparam('templateid', location.hash)
    this.templatename = decodeURIComponent(this.geturlparam('name', location.hash))
    this.publishval = decodeURIComponent(this.geturlparam('publish', location.hash))
    if (this.publishval === 1 || this.publishval === '1') {
      this.publish = false
    }
    this.getparent()
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Linklist
  },
  methods: {
    geturlparam (name, url) {
      let urls = url.split('?')[1].split('&')
      let val = ''
      for (let item = 0; item < urls.length; item++) {
        if (name === urls[item].split('=')[0]) {
          val = urls[item].split('=')[1]
          break
        }
      }
      return val
    },
    getparent () {
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        params: {
          par: {
            parentId: '0',
            evaluateTemplateId: that.evaluateTemplateId
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.data
        that.parenttotalpoint = 0
        for (let item = 0; item < objs.length; item++) {
          temp.push({id: objs[item]['evaluateDetailId'], name: objs[item]['evaluateDetailName'], nowscole: objs[item]['currentTotalPointsOfParentEvaluateDetail'], scole: objs[item]['totalPoints']})
          that.parenttotalpoint += objs[item]['totalPoints']
          if (that.id === objs[item]['evaluateDetailId']) {
          	that.parentitem = temp[item]
          	that.ind = item
            that.selectedarr = []
            that.bgarr = []
            that.selectedarr[item] = 'icon-youjiantou'
            that.bgarr[item] = 'background:#d3e8fd;box-shadow: 0 0 0 1px #9cb4d0;color:#3197fc;'
            that.getsublist()
          }
        }
        that.nowscole = res.data.currentAllParentEvaluateDetailPoint
        that.list = temp
        if (temp.length > 0 && that.id === '') {
          that.parentitem = temp[0]
          that.id = temp[0].id
          that.ind = 0
          that.getsublist()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getsublist () {
      let that = this
      this.axios({
        method: 'post',
        url: findChildrenurl,
        params: {
          par: {
            parentEvaluateDetailId: that.id
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.data
        for (let item = 0; item < objs.length; item++) {
          temp.push({
            id: objs[item]['evaluateDetailId'],
            name: objs[item]['evaluateDetailName'],
            scole: objs[item]['totalPoints']
          })
        }
        that.subnowscole = res.data.total
        that.listsub = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jumpadd (type, item) {
      switch (type) {
        case 'add':
          this.$router.push({'name': this.pathinfo.prex + 'settemplateadd', params: {settemplateadd: 'settemplateadd'}, query: {templateid: this.evaluateTemplateId, name: this.templatename, totalscole: this.parenttotalpoint}})
          break
        case 'edit':
          this.$router.push({'name': this.pathinfo.prex + 'settemplateedit', params: {settemplateedit: 'settemplateedit', item: this.parentitem, ind: this.ind}, query: {templateid: this.evaluateTemplateId, name: this.templatename, totalscole: this.parenttotalpoint}})
          break
        case 'del':
          this.$router.push({'name': this.pathinfo.prex + 'settemplatedel', params: {settemplatedel: 'settemplatedel', item: this.parentitem, ind: this.ind}, query: {templateid: this.evaluateTemplateId, name: this.templatename, totalscole: this.parenttotalpoint}})
          break
        case 'addcontent':
          this.$router.push({'name': this.pathinfo.prex + 'settemplatecontentadd', params: {settemplatecontentadd: 'settemplatecontentadd', item: this.parentitem}, query: {templateid: this.evaluateTemplateId, name: this.templatename, totalscole: this.parenttotalpoint, subnowscole: this.subnowscole, nowscole: this.list[this.ind].scole}})
          break
      }
    },
    listoptenevent (classes, item) {
      switch (classes.split(' ')[0]) {
        case 'edit':
          this.$router.push({'name': this.pathinfo.prex + 'settemplatecontentedit', params: {settemplatecontentedit: 'settemplatecontentedit', item: item, parentitem: this.parentitem}, query: {templateid: this.evaluateTemplateId, name: this.templatename, totalscole: this.parenttotalpoint, nowscole: item.scole}})
          break
        case 'del':
          this.$router.push({'name': this.pathinfo.prex + 'settemplatecontentdel', params: {settemplatecontentdel: 'settemplatecontentdel', item: item, parentitem: this.parentitem}, query: {templateid: this.evaluateTemplateId, name: this.templatename, totalscole: this.parenttotalpoint, nowscole: item.scole}})
          break
      }
    },
    selected (item, ind) {
      this.selectedarr = []
      this.bgarr = []
      this.selectedarr[ind] = 'icon-youjiantou'
      this.bgarr[ind] = 'background:#d3e8fd;box-shadow: 0 0 0 1px #9cb4d0;color:#3197fc;'
      this.id = item.id
      this.parentitem = item
      this.ind = ind
      // 点击之后，根据id,请求数据
      this.getsublist()
    },
    cancelfn () {
      this.$router.go(-1);
    },
    win (content, backfn, flag) {
      if (flag === undefined) {
        flag = true
      }
      this.$Win({
        'title': types.title,
        'type': 'txt',
        'content': content,
        'timeout': types.Timeout3,
        'cancel': function (obj) {
          obj.remove(obj.getid)
        },
        'closeshow': flag,
        'timefn': function () {
          if (backfn) {
            backfn()
          }
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJevaluateTemplatesettemplate') {
        if (to.params.id) {
          this.id = to.params.id
          this.getparent()
          this.getsublist()
        } else if (to.params.ind >= 0 && to.params.name) {
          this.list[to.params.ind].name = to.params.name
          this.list[to.params.ind].scole = to.params.scole
          this.getparent()
          this.getsublist()
        } else if (to.params.ind >= 0 && !to.params.name) {
          this.getparent()
          this.getsublist()
        } else if (to.params.del) {
          this.id = ''
          this.getparent()
          this.getsublist()
        }
      }
    }
  }
}
</script>

  	
