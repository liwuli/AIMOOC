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
    			<AJposition></AJposition>
    			<div class="optline">
    				<div class="mrightcreate" @click="jumpadd('add')">{{basicinfo.createbtnN}}</div>
    				<div class="mrightcreate" @click="jumpadd('edit')">{{basicinfo.editbtnN}}</div>
    				<div class="mrightcreate" @click="jumpadd('del')">{{basicinfo.delbtnN}}</div>
    			</div>
    			<div class="evaluatelist" :style="'min-height:' + Mlefthei + 'px;'">
    				<div class="list" v-for="(item, ind) in list" :style="bgarr[ind]" @click='selected(item, ind)'>
    					{{item.name}}
    					<span class="iconarr iconfont " :class="selectedarr[ind]"></span>
    				</div>
    				<!--<div class="showtotal">{{totaltxt}}:现在分/总分</div>-->
    			</div>
    			<div class="evaluaterightlist" :style="'min-height:' + (Mlefthei - 40) + 'px;'">
    				<div class="optline">
	    				<div class="mrightcreate" v-show="list.length > 0" @click="jumpadd('addcontent')">{{basicinfo.createcontentbtnN}}</div>
	    				<div class="mrightcreate gray" v-show="list.length <= 0" >{{basicinfo.createcontentbtnN}}</div>
	    			</div>
	    			<div class="evaluatelists">
	    				<div class="evaluatehead" >
		    				<span class="item" v-for="(item, ind) in listheadsub" :class="percentnfosub[ind]">{{item}}</span>
		    			</div>
	    				<div class="list" v-for="(item, ind) in listsub">
	    					<div  v-for="(items, itemsind) in columssub">
	    						<span class="text hides"  v-if="items !== 'opt'"  :class="percentnfosub[itemsind]" :title="item[items]">{{item[items]}}</span>
		    					<span class="opts hides"  v-if="items === 'opt'"  :class="percentnfosub[itemsind]">
		    						<span :class="items" v-for="(items, itemsind) in opteventsubAll" @click="listoptenevent(items,item, ind)"></span>
		    					</span>
	    					</div>
	    				</div>
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
import {basicinfo, opteventsubAll, listurl, columssub, listheadsub, percentnfosub, pathinfo} from '@/module/admin/config/labelinfo'
export default {
  name: 'AJlabel',
  data () {
    return {
      basicinfo: basicinfo,
      opteventsubAll: opteventsubAll,
      listheadsub: listheadsub,
      columssub: columssub,
      percentnfosub: percentnfosub,
      Mlefthei: window.innerHeight - 65 - 50 - 124,
      pathinfo: pathinfo,
      list: [],
      listsub: [],
      ind: 0,
      parentitem: '',
      selectedarr: ['icon-youjiantou'],
      bgarr: ['background:#d3e8fd;'],
      id: ''
    }
  },
  created () {
    this.getparent()
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Linklist
  },
  methods: {
    getparent () {
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        params: {
          params: {
            parentId: 0
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.result
        for (let item = 0; item < objs.length; item++) {
          temp.push({id: objs[item]['labelGroupId'], name: objs[item]['labelGroupName'], labels: objs[item]['labels']})
        }
        that.list = temp
        if (temp.length > that.ind) {
          that.parentitem = temp[that.ind]
          that.id = temp[that.ind].id
          that.listsub = temp[that.ind].labels
        } else if (temp.length > 0) {
          that.parentitem = temp[0]
          that.id = temp[0].id
          that.listsub = temp[0].labels
        } else {
          that.listsub = []
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getsublist () {
      this.listsub = this.list[this.ind].labels
    },
    jumpadd (type, item) {
      switch (type) {
        case 'add':
          this.$router.push({'name': this.pathinfo.prex + 'add', params: {add: 'add'}})
          break
        case 'edit':
          this.$router.push({'name': this.pathinfo.prex + 'edit', params: {edit: 'edit', item: this.parentitem, ind: this.ind}})
          break
        case 'del':
          this.$router.push({'name': this.pathinfo.prex + 'del', params: {del: 'del', item: this.parentitem, ind: this.ind}})
          break
        case 'addcontent':
          this.$router.push({'name': this.pathinfo.prex + 'contentadd', params: {contentadd: 'contentadd', item: this.parentitem, ind: this.ind}})
          break
      }
    },
    listoptenevent (classes, item) {
      switch (classes.split(' ')[0]) {
        case 'edit':
          this.$router.push({'name': this.pathinfo.prex + 'contentedit', params: {contentedit: 'contentedit', item: item, parentitem: this.parentitem, ind: this.ind}})
          break
        case 'del':
          this.$router.push({'name': this.pathinfo.prex + 'contentdel', params: {contentdel: 'contentdel', item: item, parentitem: this.parentitem, ind: this.ind}})
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
      if (to.name === 'AJlabel') {
        if (to.params.id) {
          this.ind = to.params.ind
          this.getparent()
        } else if (to.params.name) {
          this.list[to.params.ind].name = to.params.name
        } else if (!to.params.name) {
          this.getparent()
        }
      }
    }
  }
}
</script>


