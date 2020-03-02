<style type='text/css'>
	.closeopen{
		color:#fff;
		cursor: pointer;
	}

</style>
<template>
	<div style="float: left;width: 100%;">
		<div class="optline" >
			<div class="addall" :style='addstyle' @click="listevent('addroomlist', 'null', info)">{{addallN}}</div>
		</div>
		<div class='AA_listhead'   v-for="(headitems, headind) in info">
			<div class="AA_listheadlist">
				<div v-if="item == 'check'"   class='item' :class="percentinfo[ind]" v-for='(item, ind) in head'>
					<span class="check" :id="headitems.id"><div class="icon"></div></span>
					<div class="closeopen" @click="closeopen($event)">{{closeopenN}}</div>
				</div> 
				<div v-if="item != 'check'" class='item' :class="percentinfo[ind]" v-for='(item, ind) in head'>
					{{headitems.des}}
				</div>
			</div>
			<div class='AA_list' :id="'AA_list_' + headind" >
				<div class="lists"  v-for='(room, roomind) in headitems.list'>
					<div  v-if="items == 'check'" class="item" :id="room.id + '_' + roomind" :class="percentinfo1[ind]"  v-for='(items, ind) in head1'>
						<span class="check"><div class="icon"></div></span>
					</div>
					<div  v-if="items != 'opt' & items != 'check'" class="item" :class="percentinfo1[ind]"  v-for='(items, ind) in head1'>
						{{room.name }}
					</div>
					<div  v-if="items == 'opt' && items != 'check'" class="item" :class="percentinfo1[ind]"  v-for='(items, ind) in head1'>
						<div class="opt" @click="listevent(optevent[indopt], room, headitems)" :class="optevent[indopt]" v-for="(itemopt, indopt) in room.opt">{{itemopt}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type='text/javascript'>
import {addallN, closeopenN, delalltemplateN} from '@/components/config/listinfo'
export default {
  data () {
    return {
      delallN: delalltemplateN,
      addallN: addallN,
      closeopenN: closeopenN,
      strarr: [],
      checkallflag: []
    }
  },
  props: ['addstyle', 'selectarr', 'pathinfo', 'info', 'percentinfo', 'percentinfo1', 'head', 'head1', 'optevent'],
  methods: {
    pagepost (page) { // page 页码
      this.strarr = [] // 分页后需要重置选中状态
      this.$emit('pagepost')
    },
    listevent (type, item, info) {
      switch (type) {
        case 'editlist':
          this.editlist(item, info)
          break
        case 'addroomlist':
          this.addroomlist(item, info)
          break
      }
    },
    addroomlist (item, info) { // 通道编辑
      this.$router.push({'name': this.pathinfo.prex + 'roomadd', params: {roomadd: 'roomadd', item: item, info: info, selectlist: this.selectarr}})
    },
    editlist (item, info) { // 编辑节次模板
      this.$router.push({'name': this.pathinfo.prex + 'edit', params: {edit: 'edit', item: item, info: info}})
    },
    updatefn () { // 更新操作，重新实例化checkbox及选中值
      let that = this
      for (let i = 0; i < this.info.length; i++) {
        this.strarr[i] = this.$Check({
          'father': '#AA_list_' + i + ' .lists span',
          'multline': {
            'flag': true,
            'classname': '#AA_list_' + i + ' .lists',
            'index': []
          },
          'checktop': 'AA_list',
          'checkall': that.info[i].id,
          'inputflag': false
        }, function (id, val, str) {
        })
      }
    },
    closeopen (ev) { // 打开关闭
      let flag = ev.currentTarget.parentElement.parentElement.parentElement
      if (!flag.getAttribute('style')) {
        flag.setAttribute('style', 'height:auto')
      } else {
        flag.removeAttribute('style')
      }
    }
  },
  updated () {
    this.updatefn()
  }
}
</script>
