<template>
  <div class="app">
  	<Ghead></Ghead>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center row">
    	<div class="centers">
    		<Linklist></Linklist>
    		<div class="AA_right">
    			<AJposition></AJposition>
          <keep-alive>
                <List :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pagesize="pagesize" :checkshow="checkshow" :pageval="pageval" :headname="headname" :listheadopt="listheadopt" :bingos="bingos" @pagepost="pagepost" :pagetotal="pagetotal" :pathinfo="pathinfo" :info='products' :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'>
                  <div class="G_search" style="width: auto;" slot="bulkimport"><div class="btn" @click="bulkimport">批量导入</div></div>
                </List>
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
import List from '@/components/extend/listOpencheck'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {powerinfo, pageval, percentinfo, opteventAll, optobjinfoAll, listheadoptoptAll, listheadoptinfoAll, colums, pagesize, listhead, pathinfo, listurl} from '@/module/admin/config/buildinginfo'
// 权限处理
let listheadoptinfo = [] // '添加', '修改', '删除教学楼'
let listheadoptopt = [] // 'headoptadd', 'headoptedit', 'headoptdel'
let optevent = [] // 'editlist', 'dellist'
let optobjinfo = [] // '编辑', '删除'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJbuilding',
  data () {
    return {
      pagetotal: '',
      products: [],
      headname: [],
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      listheadoptinfo: listheadoptinfo,
      listheadoptopt: listheadoptopt,
      listheadopt: {
        name: listheadoptinfo,
        opt: listheadoptopt
      },
      checkshow: '',
      listheadoptinfoAll: listheadoptinfoAll,
      listheadoptoptAll: listheadoptoptAll,
      optevent: optevent,
      optobjinfo: optobjinfo,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      pathinfo: pathinfo,
      addbtn: addbtn,
      delbtn: delbtn,
      bingos: [],
      pageval: pageval,
      pagesize: pagesize,
      add: 0,
      edit: 0,
      del: 0,
      hadd: 0,
      hedit: 0,
      hdel: 0,
      totalnum: 0
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
    bulkimport () {
      this.$router.push({name: 'AJbuildingimport'})
    },
    pagepost (obj) {
      this.optevent = []
      this.optobjinfo = []
      this.listheadoptopt = []
      this.listheadoptinfo = []
      this.add = 0
      this.edit = 0
      this.del = 0
      this.hadd = 0
      this.hedit = 0
      this.hdel = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.delbtn = 'display:block'
        this.addbtn = 'display:block'
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
        this.listheadoptopt = this.listheadoptoptAll
        this.listheadoptinfo = this.listheadoptinfoAll
        this.listheadopt = {
          name: this.listheadoptinfo,
          opt: this.listheadoptopt
        }
      } else {
        let power = this.$store.state.powerinfo['building']
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
                  this.listheadoptopt.push(powerinfo.OPhalist)
                  this.listheadoptinfo.push(powerinfo.OaN)
                }
                this.hadd++
                break
              case 'editlist':
                if (!this.edit) {
                  this.optevent.push(powerinfo.OPelist)
                  this.optobjinfo.push(powerinfo.OeN)
                }
                this.edit++
                break
              case 'headoptedit':
                if (!this.hedit) {
                  this.listheadoptopt.push(powerinfo.OPhelist)
                  this.listheadoptinfo.push(powerinfo.OheN)
                }
                this.hedit++
                break
              case 'dellist':
                if (!this.del) {
                  this.optevent.push(powerinfo.OPdlist)
                  this.optobjinfo.push(powerinfo.OdN)
                  this.delbtn = 'display:block'
                }
                this.del++
                break
              case 'headoptdel':
                if (!this.hdel) {
                  this.listheadoptopt.push(powerinfo.OPhdlist)
                  this.listheadoptinfo.push(powerinfo.OhdN)
                }
                this.hdel++
                break
            }
          }
          this.listheadopt = {
            name: this.listheadoptinfo,
            opt: this.listheadoptopt
          }
        }
      }
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        params: {
          params: {
            pageSize: obj.pagesize ? obj.pagesize : pagesize,
            pageIndex: obj.page
          }
        }
      })
      .then(function (res) {
        that.pagetotal = Math.ceil(res.data.result.total / pagesize)
        that.totalnum = res.data.result.total
        let temp = []
        let tempdetal = []
        let optobj = that.optobjinfo
        let objs = res.data.result.data
        let start = pagesize * (that.pageval - 1)
        for (let item = start; item < objs.length; item++) {
          if (item < (that.pageval * pagesize < objs.length ? that.pageval * pagesize : objs.length)) {
            temp[item - start] = []
            tempdetal[item - start] = []
            temp[item - start][0] = objs[item].buildingId
            temp[item - start][1] = objs[item].buildingName
            temp[item - start][2] = objs[item].buildingDescription
            temp[item - start][3] = objs[item].classrooms
            temp[item - start][4] = item - start
            let objdetail = temp[item - start][3]
            for (let j = 0; j < objdetail.length; j++) {
              tempdetal[item - start][j] = {}
              tempdetal[item - start][j]['ids'] = temp[item - start][0]
              tempdetal[item - start][j]['id'] = objdetail[j].classroomId
              tempdetal[item - start][j]['name'] = objdetail[j].classroomName
              tempdetal[item - start][j]['isAnalysis'] = objdetail[j].isAnalysis
              tempdetal[item - start][j]['classType'] = that.classTypeFormat(objdetail[j].isAnalysis)
              tempdetal[item - start][j]['bookable'] = objdetail[j].bookable
              tempdetal[item - start][j]['address'] = objdetail[j].classroomAddress
              tempdetal[item - start][j]['roomip'] = objdetail[j].classroomIp
              tempdetal[item - start][j].opt = optobj
              tempdetal[item - start][j].selected = false
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
      .catch(function (error) {
        console.log(error)
      })
    },
    classTypeFormat (value) {
      if (value===0) {
        return '云录播教室'
      } else if (value === 1) {
        return '集中智慧教室'
      } else if(value === 2){
        return '单机智慧教室'
      }else if(value === 3){
        return '微格教室'
      }else{
        return '云录播教室'
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === pathinfo.prex) {
        this.pagepost({page: this.pageval})
        let closeopenobj = document.querySelectorAll('.closeopen')
        if (closeopenobj.length > 0) {
          Array.prototype.slice.call(closeopenobj).forEach(function (item, ind) {
            if (item.getAttribute('style')) {
              item.removeAttribute('style')
              item.parentElement.parentElement.parentElement.removeAttribute('style')
            }
          })
          if (to.params.ind !== undefined) {
            document.querySelectorAll('.closeopen')[to.params.ind].click()
          }
        }
      }
    }
  }
}
</script>
