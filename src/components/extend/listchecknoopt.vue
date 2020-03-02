<template>
	<div style="float: left;width: 100%;" :style="styles">
		<div class='AA_listhead' >
			<div v-if="item == 'check'"   class='item' :class="percentinfo[ind]" v-for='(item, ind) in head'>
				<span class="check" id="checkallcheck"><div class="icon"></div></span>
			</div>
			<div v-if="item != 'check'"  class='item' :class="percentinfo[ind]" v-for='(item, ind) in head'>
				{{item}}
			</div>
		</div>
		<div class='BB_list' >
			<div class="lists"  v-for='(item, itemind) in info'>
				<div  v-if="items == 'check'" :id="item.id" class="item hides" :class="percentinfo[ind]"  v-for='(items, ind) in colums'>
					<span class="check">
						<div class="icon"></div>
						<input type="checkbox" :value="itemind + pagesize * (pageindex - 1)"/>{{item[items] }}</span>
				</div>
				<div  v-if="items != 'opt' && items != 'check'" :title="item[items]" class="item hides" :class="percentinfo[ind]"  v-for='(items, ind) in colums'>
					{{item[items] }}
				</div>
				<div  v-if="items == 'opt' && items != 'check'" class="item hides" :class="percentinfo[ind]"  v-for='(items, ind) in colums'>
					<div class="opt" @click="listevent(optevent[indopt], item, info)" :ind="item.ind"  :class="optevent[indopt]" v-for="(itemopt, indopt) in item[items]">{{itemopt}}</div>
				</div>
			</div>
		</div>
		<page  :totalnum="totalnum"  :bingo="bingo" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page>
	</div>
</template>
<script type='text/javascript'>
import page from '@/components/extend/page'
export default {
  created () {
  },
  data () {
    return {
      msg: 'list',
      bingo: [],
      pageindex: 1,
      totalpage: 0,
      str: '',
      checkallflag: false,
      idobj: {}
    }
  },
  props: ['styles', 'totalnum', 'pageval', 'pagesize', 'selectedarr', 'bingos', 'pageinfo', 'info', 'percentinfo', 'colums', 'head', 'optevent'],
  methods: {
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
      }
    },
    addlist (item, info) {
      this.$router.push({'name': this.pathinfo.prex + 'add', params: {add: 'add', info: info}})
    },
    editlist (item, info) {
      this.$router.push({'name': this.pathinfo.prex + 'edit', params: {edit: 'edit', 'item': item, info: info}})
    },
    dellist (item, info) {
      let temp = []
      temp.push(item.id)
      this.$router.push({'name': this.pathinfo.prex + 'del', params: {del: 'del', 'item': temp, info: info}})
    },
    rela (item, info) {
      this.$router.push({'name': this.pathinfo.prex + 'rel', params: {rel: 'rel', 'item': item, info: info}})
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
      this.$emit('checkevent', {checkid: this.idobj})
      this.$emit('pagepost', {page: page})
    },
    updatefn (arr) {
      let that = this
      if (JSON.stringify(this.idobj) === '{}') {
        this.idobj = Object.assign({}, this.selectedarr, {})
      }
      let temp = []
      for (let k in this.idobj) {
        if ((k * 1 - (this.pageindex - 1) * this.pagesize >= 0) && (k * 1 - (this.pageindex - 1) * this.pagesize < this.pagesize)) {
          temp.push(k * 1 - (this.pageindex - 1) * this.pagesize)
        }
      }
      let checkallbs = 0
      for (let subitem = 0; subitem < that.info.length; subitem++) {
        if (that.idobj[(that.pageindex - 1) * that.pagesize + subitem] === that.info[subitem].id) {
          checkallbs++
        }
      }
      if (checkallbs === this.info.length && checkallbs !== 0) {
        this.checkallflag = true
      } else {
        this.checkallflag = false
      }
      this.str = this.$Check({
        'father': '.BB_list .lists span',
        'multline': {
          'flag': true,
          'classname': '.BB_list .lists',
          'index': temp
        },
        'checktop': 'BB_list',
        'checkall': 'checkallcheck',
        'getindex': true,
        'checkallflag': that.checkallflag,
        'inputflag': true
      }, function (id, inputval, str) {
        let start = (that.pageindex - 1) * that.pagesize
        if (typeof id !== 'object') {
          for (let subitem = 0; subitem < that.info.length; subitem++) {
            if (!str[start + subitem]) { // 返回值里面没有该值，从全部对象里面删除
              if (that.idobj[start + subitem]) {
                delete that.idobj[start + subitem]
              }
            } else {
              if (!that.idobj[start + subitem]) { // 如果返回值里面包含该值，但是全部对象里面没有，则添加进来
                that.idobj[start + subitem] = str[start + subitem]
              }
            }
          }
          that.$emit('checkevent', {checkid: that.idobj})
        } else {
          if (JSON.stringify(id) === '{}') {
            for (let subitem = 0; subitem < that.info.length; subitem++) {
              if (that.idobj[start + subitem]) {
                delete that.idobj[start + subitem]
              }
            }
          } else {
            for (let subitem = 0; subitem < that.info.length; subitem++) {
              if (!that.idobj[start + subitem]) {
                that.idobj[start + subitem] = that.info[subitem].id
              }
            }
          }
          that.$emit('checkevent', {checkid: that.idobj})
        }
      })
    },
    delall (info) {
      let temp = []
      for (let i in this.str.cfg.str) {
        temp.push(i)
      }
      this.$router.push({'name': this.pathinfo.prex + 'del', params: {del: 'del', 'item': temp, info: info}})
    }
  },
  components: {
    page
  },
  mounted () {
    this.updatefn()
  },
  updated () {
    this.updatefn()
  },
  beforeUpdate () {
    this.totalpage = this.pageinfo
    this.bingo = this.bingos
    this.pageindex = this.pageval
  }
}
</script>
