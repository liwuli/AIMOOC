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
		      <List
            :totalnum="totalnum"
            :delallpath="delallpath"
            :headopenpost="headopenpostval"
            @headopenpostfn="headopenpostfn"
            :firstheadshow="firstheadshow"
            :delbtn="delbtn"
            :addbtn="addbtn"
            :pagesize="pagesize"
            :selfheadarr="selfheadarr"
            :pageval="pageval"
            :headname="headname"
            :listheadopt="listheadopt"
            :bingos="bingos"
            @pagepost="pagepost"
            :pagetotal="pagetotal"
            :pathinfo="pathinfo"
            :info='products'
            :head='listhead'
            :optevent='optevent'
            :colums="colums"
            :percentinfo='percentinfo'></List>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import List from '@/components/extend/listOpencheck'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {
  searchinput,
  listhead,
  OeN,
  OdN,
  OhDDN,
  OPhalist,
  OhaN,
  OhDN,
  OheN,
  OhdN,
  OPdlist,
  OPhDlist,
  OPhelist,
  OPelist,
  OPhdlist,
  opteventAll,
  optobjinfoAll,
  listheadoptinfoAllcopy,
  listheadoptoptAllcopy,
  listheadoptinfoAll,
  listheadoptoptAll,
  searchstyle,
  pageval,
  percentinfo,
  colums,
  pagesize,
  pathinfo,
  listurl
} from '@/module/admin/config/classnumberinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist'
let optobjinfo = [] // '编辑', '删除'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJclassnumber',
  data () {
    return {
      pagetotal: '',
      firstheadshow: 'display:none;',
      headopenpostval: true,
      delallpath: 'delalldetail',
      products: [],
      headname: [],
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      listheadopt: {
        name: [],
        opt: []
      },
      listheadoptinfo: [],
      listheadoptopt: [],
      optevent: optevent,
      optobjinfo: optobjinfo,
      pathinfo: pathinfo,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      addbtn: addbtn,
      delbtn: delbtn,
      bingos: [],
      searchinput: searchinput,
      searchstyle: searchstyle,
      pageval: pageval,
      pagesize: pagesize,
      add: 0,
      edit: 0,
      del: 0,
      hadd: 0,
      hedit: 0,
      hdel: 0,
      totalnum: 0,
      defaultval: 0,
      selfheadarr: [],
      subind: 0
    }
  },
  created () {
    this.pagepost({page: 1})
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    List,
    Linklist
  },
  methods: {
    headopenpostfn (item) {
      this.subind = item.ind
    },
    pagepost (obj) {
      this.listheadoptinfo = []
      this.listheadoptopt = []
      this.optevent = []
      this.optobjinfo = []
      this.add = 0
      this.edit = 0
      this.del = 0
      this.hadd = 0
      this.hedit = 0
      this.hdel = 0
      this.defaultval = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.addbtn = 'display:block'
        this.delbtn = 'display:block'
//      this.listheadoptinfo = this.listheadoptinfoAll
//      this.listheadoptopt = this.listheadoptoptAll
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
//      this.listheadopt = {
//        name: this.listheadoptinfo,
//        opt: this.listheadoptopt
//      }
      } else {
        let power = this.$store.state.powerinfo['classnumber']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'addlist':
                if (!this.add) {
                  this.addbtn = 'display:block'
                }
                this.add++
                break
              case 'headoptadd':
                if (!this.hadd) {
                  this.listheadoptinfo.push(OhaN)
                  this.listheadoptopt.push(OPhalist)
                }
                this.hadd++
                break
               case 'headoptedit':
                if (!this.hedit) {
                  this.listheadoptopt.push(OPhelist)
                  this.listheadoptinfo.push(OheN)
                }
                this.hedit++
                break
              case 'headoptdel':
                if (!this.hdel) {
                  this.listheadoptopt.push(OPhdlist)
                  this.listheadoptinfo.push(OhdN)
                }
                this.hdel++
                break
              case 'editlist':
                if (!this.edit) {
                  this.optevent.push(OPelist)
                  this.optobjinfo.push(OeN)
                }
                this.edit++
                break
              case 'dellist':
                if (!this.del) {
                  this.optevent.push(OPdlist)
                  this.optobjinfo.push(OdN)
                  this.delbtn = 'display:block'
                }
                this.del++
                break
              case 'headoptdefault':
                this.defaultval++
                break
            }
          }
        }
      }
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: {
          page: {
            pageSize: obj.pagesize ? obj.pagesize : pagesize,
            pageIndex: obj.page
          },
          keywords: obj.keys
        }
      })
      .then(function (res) {
        that.pagetotal = Math.ceil(res.data.total / pagesize)
        that.totalnum = res.data.total
        let temp = []
        let tempdetal = []
        let optobj = that.optobjinfo
        let objs = res.data.classNumberList
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = []
            tempdetal[item] = []
            temp[item][0] = objs[item].templateId
            temp[item][1] = objs[item].templateName
            temp[item][2] = objs[item].description
            temp[item][3] = objs[item].classList
            if (that.$store.state.userinfo.userName === 'admin') {
              if (objs[item].isDefault) { // 默认
                that.selfheadarr[item] = {
                  name: listheadoptinfoAllcopy,
                  opt: listheadoptoptAllcopy
                }
              } else { // 设为默认
                that.selfheadarr[item] = {
                  name: listheadoptinfoAll,
                  opt: listheadoptoptAll
                }
              }
            } else {
              let tempheadinfo = [].concat(that.listheadoptinfo)
              let tempheadoptinfo = [].concat(that.listheadoptopt)
              that.selfheadarr[item] = {}
              that.selfheadarr[item].name = tempheadinfo
              that.selfheadarr[item].opt = tempheadoptinfo
              if (that.defaultval) {
                if (objs[item].isDefault) { // 默认
                  that.selfheadarr[item].name.unshift(OhDDN)
                  that.selfheadarr[item].opt.unshift(null)
                } else { // 设为默认
                  that.selfheadarr[item].name.unshift(OhDN)
                  that.selfheadarr[item].opt.unshift(OPhDlist)
                }
              }
            }
            let objdetail = temp[item][3]
            for (let j = 0; j < objdetail.length; j++) {
              tempdetal[item][j] = {}
              tempdetal[item][j]['ids'] = temp[item][0]
              tempdetal[item][j]['classNo'] = objdetail[j].className.replace(/[^\d+]/gi, '')
              tempdetal[item][j]['id'] = objdetail[j].classId
              tempdetal[item][j]['name'] = objdetail[j].className
              tempdetal[item][j]['des'] = objdetail[j].startTime.split(' ')[1].substr(0, 5) + '--' + objdetail[j].endTime.split(' ')[1].substr(0, 5)
              tempdetal[item][j]['sdate'] = objdetail[j].startTime
              tempdetal[item][j]['edate'] = objdetail[j].endTime
              tempdetal[item][j].opt = optobj
              tempdetal[item][j].selected = false
            }
          }
        }
        // 模板信息
        that.headname = temp
        // 节次模板信息
        that.products = tempdetal
        // 分页选中操作
        that.bingos = []
        that.bingos[obj.page - 1] = 'selected'
      })
      .then(function () {
        that.$store.dispatch({
          type: 'bodyheight',
          bodyheight: document.querySelector('.AA_right').clientHeight
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  watch: {
		// 对页面进行操作页面会刷新问题解决 注释下面
		
    '$route' (to, from) {
      if (to.name === 'AJclassnumber') {
//      let that = this
        this.pagepost({page: this.pageval})
        let closeopenobj = document.querySelectorAll('.closeopen')
        // if (closeopenobj.length > 0) {
        //   Array.prototype.slice.call(closeopenobj).forEach(function (item, ind) {
        //     if (item.getAttribute('style')) {
        //       item.removeAttribute('style')
        //       item.parentElement.parentElement.parentElement.removeAttribute('style')
        //     }
        //   })
        // }
      }
    }
  }
}
</script>
