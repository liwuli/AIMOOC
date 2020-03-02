<template>
	<div style="float: left;width: 100%;">
		<div class='AA_listhead' >
			<div class='item' :class="percentinfo[ind]" v-for='(item, ind) in head'>
				{{item}}
			</div>
		</div>
		<div class='AA_list' >
			<div class="lists"  v-for='(item, itemind) in info'>
				<div  v-if="items != 'opt'" :style="item.style" class="item hides" :class="percentinfo[ind]"   v-for='(items, ind) in colums'>
					<div  v-if="items.indexOf('-html') >= 0" v-html="item[items]"></div>
					<div  v-if="items.indexOf('-html') < 0" :title="item[items]">{{item[items]}}</div>
				</div>
				<div  v-if="items == 'opt'" :style="item.style" class="item hides" :class="percentinfo[ind]"  v-for='(items, ind) in colums'>
					<div class="opt iconfont" v-if="item.show && item.optevent" :style="'display:' + item.show[indopt]" @click="listevent(item.optevent[indopt], item, info, itemind)" :class="item.optevent[indopt]" v-for="(itemopt, indopt) in item.optevent">{{item.opt[indopt]}}</div>
					<div class="opt iconfont" v-if="item.show && !item.optevent" :style="'display:' + item.show[indopt]" @click="listevent(optevent[indopt], item, info, itemind)" :class="optevent[indopt]" v-for="(itemopt, indopt) in item[items]">{{itemopt}}</div>
					<div class="opt iconfont" v-if="!item.show && item.optevent" @click="listevent(item.optevent[indopt], item, info, itemind)" :class="item.optevent[indopt]" v-for="(itemopt, indopt) in item.optevent">{{item.opt[indopt]}}</div>
					<div class="opt iconfont" v-if="!item.show && !item.optevent" @click="listevent(optevent[indopt], item, info, itemind)" :class="optevent[indopt]" v-for="(itemopt, indopt) in item[items]">{{itemopt}}</div>
				</div>
			</div>
		</div>
		<page :pagestyles="pagestyles" :totalnum="totalnum2" :bingo="bingo" @pagepost="pagepost" :pagesize="pagesize2" :pageindex="pageindex2" :totalpage="totalpage"></page>
	</div>
</template>
<script type='text/javascript'>
import page from '@/components/extend/page'
export default {
  created () {
  },
  data () {
		// 注释了3个 变量  在props里添加了pageindex

    return {
      msg: 'list',
      bingo: [],
      pagesize2: 10,
      pageindex2: 1,
      totalpage: 0,
      totalnum2: 0
    }
  },
  props: ['bingos', 'totalnum', 'pageinfo', 'pageval', 'pagesize', 'pageindex','pagestyles', 'pathinfo', 'jumpinfo', 'info', 'percentinfo', 'colums', 'head', 'optevent'],
  methods: {
    listevent (type, item, info, ind) {
      switch (type) {
        case 'addlist':
          this.addlist(item)
          break
        case 'editlist':
        case 'editlist mt10':
          this.editlist(item)
          break
        case 'dellist':
        case 'dellist mt10':
          this.dellist(item)
          break
        case 'jumplist':
          this.jumplist(item)
          break
        case 'publish':
        case 'publish mt10':
          this.publish(item)
          break
        case 'unpublish':
        case 'unpublish mt10':
          this.unpublish(item)
          break
        case 'movetop':
          this.movetop(item, info, ind)
          break
        case 'movedown':
          this.movedown(item, info, ind)
          break
        case 'start':
          this.start(item, info, ind)
          break
        case 'settemplate': // 设置课程模板
          this.settemplate(item, info)
          break
        case 'close':
          this.close(item, info, ind)
          break
        case 'channeladdlist':
          this.channeladdlist(item, info)
          break
        case 'channeleditlist':
          this.channeleditlist(item, info)
          break
        case 'channelsetlist':
          this.channelsetlist(item, info)
          break
        case 'channeldellist':
          this.channeldellist(item, info)
          break
        case 'rel':
          this.rel(item, info)
          break
      }
    },
    rel (item, info) {
      switch (item.casetype) {
        case 'relassistant':
          this.$router.push({'name': this.pathinfo.prex + item.casetype, query: item.Query, params: {rel: 'relassistant', 'item': item, info: info}})
          break
        case 'relleader':
          this.$router.push({'name': this.pathinfo.prex + item.casetype, query: item.Query, params: {rel: 'relleader', 'item': item, info: info}})
          break
        case 'relother':
          this.$router.push({'name': this.pathinfo.prex + item.casetype, query: item.Query, params: {rel: 'relother', 'item': item, info: info}})
          break
      }
    },
    settemplate (item, info) {
      if (item.isOpenval) {
        let routeData = this.$router.resolve({name: 'AJevaluateTemplateloopsettemplateresee', query: item.Query})
        window.open(routeData.href, '_blank')
      } else {
        this.$router.push({'name': this.pathinfo.prex + 'settemplate', params: {settemplate: 'settemplate', 'item': item, info: info}, query: item.Query})
      }
    },
    publish (item, info) { // 发布
      this.$router.push({'name': this.pathinfo.prex + 'publish', params: {publish: 'publish', item: item, info: info}})
    },
    unpublish (item, info) { // 取消发布
      this.$router.push({'name': this.pathinfo.prex + 'unpublish', params: {unpublish: 'unpublish', item: item, info: info}})
    },
    channeleditlist (item, info) { // 通道编辑
      this.$router.push({'name': this.pathinfo.prex + 'editchannel', params: {editchannel: 'editchannel', item: item, info: info}})
    },
    channelsetlist (item, info) { // 通道标定
      this.$router.push({'name': this.pathinfo.prex + 'setchannel', params: {setchannel: 'setchannel', item: item, info: info}})
    },
    channeldellist (item, info) { // 通道删除
      this.$router.push({'name': this.pathinfo.prex + 'delchannel', params: {delchannel: 'delchannel', item: item, info: info}})
    },
    channeladdlist (item, info) { // 设备添加
      this.$router.push({'name': this.pathinfo.prex + 'addchannel', params: {add: 'add', item: item, info: info}})
    },
    movetop (item, info, ind) {
      this.$emit('movetop', {item: item, info: info, ind: ind})
    },
    movedown (item, info, ind) {
      this.$emit('movedown', {item: item, info: info, ind: ind})
    },
    start (item, info, ind) {
      this.$emit('start', {item: item, info: info, ind: ind})
    },
    close (item, info, ind) {
      this.$emit('close', {item: item, info: info, ind: ind})
    },
    addlist (item) {
      this.$router.push({'name': this.pathinfo.prex + 'add', params: {add: 'add', item: item}})
    },
    editlist (item) {
      this.$router.push({'name': this.pathinfo.prex + 'edit', params: {edit: 'edit', item: item}})
    },
    dellist (item) {
      this.$router.push({'name': this.pathinfo.prex + 'del', params: {del: 'del', item: item}})
    },
    jumplist (item) {
      this.$router.push({'name': this.jumpinfo.prex + 'jump', params: {jump: 'jump', item: item}})
    },
    pagedeal () {
      this.bingo = []
      for (let i = 0; i < this.totalpage; i++) {
        if (this.pageindex - 1 === i) {
          this.bingo.push('selected')
        } else {
          this.bingo.push('')
        }
      }
    },
    pagepost (page) {
      this.$emit('pagepost', {page: page})
    }
  },
  components: {
    page
  },
  mounted () {
  },
  beforeUpdate () {
    this.totalpage = this.pageinfo
    this.totalnum2 = this.totalnum
    this.bingo = this.bingos
    this.pageindex2 = this.pageval
  }
}
</script>
