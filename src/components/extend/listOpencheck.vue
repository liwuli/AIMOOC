<template>
	<div style="float: left;width: 100%;">
		<div class="optline" >
      <slot name="bulkimport"></slot>
			<div class="delallforbid" id="delall" :style="delbtn" @click="delall(info, $event)">{{delallN}}</div>
			<div class="addall" :style="addbtn" @click="listevent('addlist', 'null', info)">{{addallN}}</div>
		</div>
		<div class='AA_listhead' v-for="(headitems, headind) in headname">
			<div class="AA_listheadlist">
				<div @click="closeopen($event, headitems, headind)" v-if="item == 'check'" class='item' :class="percentinfo[ind]" v-for='(item, ind) in head'>
					<span class="check" :style="firstheadshow" :id="headitems[0]"><div class="icon"></div></span>
					<div :id="getid(headind)" class="closeopen" ></div>
				</div>
				<div @click="closeopen($event, headitems, headind)" v-if="item != 'check' && item != 'opt'" :title="headitems[ind]" class='item hides' :class="percentinfo[ind]" v-for='(item, ind) in head'>
					{{headitems[ind]}}
					<!--<span class="showarea">{{headitems[ind]}}</span>-->
				</div>
				<div v-if="item === 'opt' && !selfheadarr" class='item' :class="percentinfo[ind]" v-for='(item, ind) in head'>
					<span class="headopt" @click="headoptevent(listheadopt.opt[optind], headitems)" v-for="(opt, optind) in listheadopt.name">{{opt}}</span>
				</div>
				<div v-if="item === 'opt' && selfheadarr" class='item' :class="percentinfo[ind]" v-for='(item, ind) in head'>
					<span class="headopt" @click="headoptevent(selfheadarr[headind].opt[optind], headitems)" v-for="(opt, optind) in selfheadarr[headind].name">{{opt}}</span>
				</div>
			</div>
			<div class='AA_list' :id="'AA_list_' + headind" >
				<div class="lists" v-for='(item, infoind) in info[headind]'>
					<div v-if="items == 'check'" class="item" :id="item.id + '_' + infoind" :class="percentinfo[ind]" v-for='(items, ind) in colums'>
						<span class="check"><div class="icon"></div><input type="checkbox" value="0"/>{{item[items] }}</span>
					</div>
					<div v-if="items != 'opt' & items != 'check'" :title="item[items]" class="item hides" :class="percentinfo[ind]" v-for='(items, ind) in colums'>
						{{item[items] }}
					</div>
					<div v-if="items == 'opt' && items != 'check' && item.optevent" class="item hides" :class="percentinfo[ind]" v-for='(items, ind) in colums'>
						<div class="opt" @click="listevent(item.optevent[indopt], item, info)" :ind="item.ind" :class="item.optevent[indopt]" v-for="(itemopt, indopt) in item[items]">{{itemopt}}</div>
					</div>
					<div v-if="items == 'opt' && items != 'check' && !item.optevent" class="item" :class="percentinfo[ind]" v-for='(items, ind) in colums'>
						<div class="opt" @click="listevent(optevent[indopt], item, headname)" :class="optevent[indopt]" v-for="(itemopt, indopt) in item[items]">{{itemopt}}</div>
					</div>
				</div>
			</div>
		</div>
		<page :totalnum="totalnum" :bingo="bingo" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page>
	</div>
</template>
<script type='text/javascript'>
import page from '@/components/extend/page'
import {addallN, delalltemplateN} from '@/components/config/listinfo'
export default {
  data () {
    return {
      delallN: delalltemplateN,
      addallN: addallN,
      // pagesize: 10,
      pageindex: 1,
      totalpage: 0,
      bingo: [],
      strarr: [],
      checkallflag: [],
      // totalnum: 0
    }
  },
  
  components: {
    page
  },
  props: ['delallpath', 'firstheadshow', 'totalnum', 'headopenpost', 'selfheadarr', 'pageval', 'pagesize', 'delbtn', 'addbtn', 'headname', 'listheadopt', 'bingos', 'pagetotal', 'pathinfo', 'info', 'percentinfo', 'colums', 'head', 'optevent'],
  methods: {
		
		getid(e){
			return 'item'+e
		},
		
    pagepost (page) { // page 页码
      this.strarr = [] // 分页后需要重置选中状态
      this.$emit('pagepost', {page: page})
    },
    listevent (type, item, info) {
      switch (type) {
        case 'addlist':
          this.addlist(item, info)
          break
        case 'editlist':
          this.editlist(item, info)
          break
        case 'dellist':
          this.dellist(item, info)
          break
        case 'rela':
          this.rela(item, info)
          break
        case 'see':
          this.see(item, info)
          break
      }
    },
    headoptevent (type, info) { // 模板头部操作类型和信息传递
      switch (type) {
        case 'headoptadd':
          this.headoptadd(info)
          break
        case 'headoptedit':
          this.headoptedit(info)
          break
        case 'headoptdel':
          this.headoptdel(info)
          break
        case 'headoptdefault':
          this.headoptdefault(info)
          break
        case 'Mlist':
          this.Mlist(info)
          break
      }
    },
    headoptdefault (info) { // 添加默认节次模板
      this.$router.push({'name': this.pathinfo.prex + 'default', params: {default: 'default', info: info}})
    },
    Mlist (info) { // 添加模板
      let urls = ''
      if (location.href.indexOf('courseOnline') < 0) {
        localStorage.setItem('coursemanagetype', 'course')
      } else {
        localStorage.setItem('coursemanagetype', 'courseOnline')
      }
      urls = location.protocol + '//' + location.host + '/index.html#/' + this.pathinfo.prex + 'Manage' + '?courseId=' + info[0]
     // console.log(urls)
      window.open(urls, '_blank')
//    this.$router.push({'name': this.pathinfo.prex + 'Manage', params: {Manage: 'Manage', info: info}, query: {courseId: info[0]}})
    },
    addlist (item, info) { // 添加模板
      this.$router.push({'name': this.pathinfo.prex + 'add', params: {add: 'add', info: info}})
    },
    editlist (item, info) { // 编辑节次模板
      this.$router.push({'name': this.pathinfo.prex + 'editdetail', params: {editdetail: 'editdetail', item: item, info: info}})
    },
    dellist (item, info) { // 删除节次模板
      this.$router.push({'name': this.pathinfo.prex + 'deldetail', params: {deldetail: 'deldetail', item: item, info: info}})
    },
    see (item, info) { // 删除节次模板
      this.$router.push({'name': this.pathinfo.prex + 'see', params: {see: 'see', item: item, info: info}})
    },
    headoptadd (info) { // 添加节次模板
      this.$router.push({'name': this.pathinfo.prex + 'adddetail', params: {adddetail: 'adddetail', info: info}})
    },
    headoptedit (info) { // 编辑模板
      this.$router.push({'name': this.pathinfo.prex + 'edit', params: {edit: 'edit', info: info}})
    },
    headoptdel (info) { // 删除模板
      let item = [info[0]]
      this.$router.push({'name': this.pathinfo.prex + 'del', params: {del: 'del', item: item, info: info, room: item}})
    },
    delall (info, ev) { // 批量删除模板
      if (ev.currentTarget.className.indexOf('delallforbid') >= 0) {
        return false
      }
      let temp = []
      let rooms = []
      let roomss = [] // 教室专用
      for (let i = 0; i < this.strarr.length; i++) {
        if (this.strarr[i].cfg && this.strarr[i].cfg.checkallflag) {
          temp.push(this.strarr[i].cfg.checkall)
        }
        if (this.strarr[i].cfg && this.strarr[i].cfg.str) {
          for (let item in this.strarr[i].cfg.str) {
            rooms.push(item.split('_')[0])
          }
        }
        if (this.strarr[i].cfg && this.strarr[i].cfg.str && !this.strarr[i].cfg.checkallflag) {
          for (let item in this.strarr[i].cfg.str) {
            roomss.push(item.split('_')[0])
          }
        }
      }
      if (this.delallpath) {
        this.$router.push({'name': this.pathinfo.prex + this.delallpath, params: {del: 'del', 'item': temp, rooms: roomss, room: rooms, info: info, 'delall': 'delall'}})
      } else {
        this.$router.push({'name': this.pathinfo.prex + 'del', params: {del: 'del', 'item': temp, rooms: roomss, room: rooms, info: info, 'delall': 'delall'}})
      }
    },
    updatefn (obj) { // 更新操作，重新实例化checkbox及选中值
      let that = this
      let temp = []
      for (let i = 0; i < this.headname.length; i++) {
        if (this.strarr.length === this.headname.length) {
          let arr = []
          for (let k in this.strarr[i].cfg.str) {
            arr.push(k.split('_')[1])
          }
          this.checkallflag[i] = this.strarr[i].cfg.checkallflag
          temp[i] = arr
        }
        if (obj) {
          this.checkallflag[i] = false
        }
        this.strarr[i] = this.$Check({
          'father': '#AA_list_' + i + ' .lists span',
          'multline': {
            'flag': true,
            'classname': '#AA_list_' + i + ' .lists',
            'index': temp[i]
          },
          'checktop': 'AA_listhead',
          'checkall': that.headname[i][0],
          'inputflag': true,
          'checkallflag': that.checkallflag[i]
        }, function (id, val, str) {
          let j = []
          let obj = document.getElementById('delall')
          if (!that.strarr[i].cfg.checkallflag) {
            for (let item = 0; item < that.strarr.length; item++) {
              for (let ks in that.strarr[item].cfg.str) {
                j.push(ks.split('_')[1])
              }
            }
            if (j.length > 0) {
              obj.className = 'delall'
            } else {
              obj.className = 'delallforbid'
            }
          } else {
            obj.className = 'delall'
          }
        })
      }
    },
    closeopen (ev, headitems, ind) { // 打开关闭    
       var flag1 = document.getElementById('item'+ind);
			 var flag =$(flag1)[0].parentElement.parentElement.parentElement;
			 if (!flag.getAttribute('style')) {
			   flag.setAttribute('style', 'height:auto;box-shadow:0 0 0 1px #98b4d9;')
			   flag1.setAttribute('style', 'transform: rotate(90deg);')
			 } else {
			   flag.removeAttribute('style')
			   flag1.removeAttribute('style')
			 }
			 
			// let flag = ev.currentTarget.parentElement.parentElement.parentElement
      // if (!flag.getAttribute('style')) {
      //   flag.setAttribute('style', 'height:auto;box-shadow:0 0 0 1px #98b4d9;')
      //   ev.currentTarget.setAttribute('style', 'transform: rotate(90deg);')
      // } else {
      //   flag.removeAttribute('style')
      //   ev.currentTarget.removeAttribute('style')
      // }
      if (this.headopenpost) {
        this.$emit('headopenpostfn', {item: headitems, ind: ind})
      }
    }
  },
  beforeUpdate () {
    this.totalpage = this.pagetotal
    this.pageindex = this.pageval
    this.bingo = this.bingos
  },
  updated () {
    /*if (this.totalpage !== this.pagetotal || !this.bingo[this.pageval - 1]) {
      this.updatefn(true)
    } else {
      this.updatefn()
    }*/
    this.updatefn()
  }
}
</script>
