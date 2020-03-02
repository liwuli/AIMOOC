<template>
	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="G_search">
			 	<div class="part"  style="margin: 20px 0 0 20px;">
			 	  <span class="txt" style="line-height: 30px;">{{eduType ? teaminfo.dept : teaminfo.grade}}:</span>
			 	  <div id='select83' ></div>
			 	</div>
			 	<div class="part"   style="margin: 20px 0 0 20px;">
			 	  <input type="text" v-model="code" :placeholder="teaminfo.placeholder"/>
			 	</div>
			 	<div class="btn"  @click="search" style="margin: 20px 0 0 20px;">{{searchN}}</div>
			</div>
        	<List  :totalnum="totalnum" :pagesize="pagesize" :pageval="pageval" @checkevent="checkevent" :styles="styles" :bingos="bingos" :selectedarr = "selectedarr" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
        	<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{sureN}}</div>
 			</div>
		</div>
	</div>
</template>

<script>
import List from '@/components/extend/listchecknoopt'
import * as types from '@/store/win-types'
import {teamdeparturl, teamteacherurl, teamgradeurl, pageval, teamaddurl, bingo, searchN, cancelN, sureN, listheadrel, listheadrelB, opteventteamadd, infoval, percentinforel, percentinforelB, products, columsrel, columsrelB, pathinfo, pagesize, teaminfo} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManageteamadd',
  data () {
    return {
      msg: teaminfo.teamteacherbtnN,
      searchN: searchN,
      sureN: sureN,
      cancelN: cancelN,
      filename: '',
      wininfo: {
        widhei: ['800px', '560px'],
        btncancelleft: '345px',
        contenthei: '413px'
      },
      styles: 'width:760px;height:370px;padding:20px',
      products: products,
      infoval: infoval,
      percentinfo: this.$store.state.educationType ? percentinforel : percentinforelB,
      colums: this.$store.state.educationType ? columsrel : columsrelB,
      listhead: this.$store.state.educationType ? listheadrel : listheadrelB,
      optevent: opteventteamadd,
      teaminfo: teaminfo,
      pathinfo: pathinfo,
      bingos: bingo,
      searchinput: 'width:150px;margin-left:790px',
      rooms: [],
      selectedarr: {},
      deviceId: '',
      pageval: pageval,
      courseId: '',
      checkres: [],
      dep: '',
      code: '',
      eduType: this.$store.state.educationType,
      totalnum: 0,
      pagesize: pagesize,
      checkoneflag: false
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
    this.pagepost({page: 1})
    this.eduType ? this.getdepartment() : this.getgrades()
  },
  components: {
    List
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
    checkevent (obj) {
      this.checkres = []
      for (let i in obj.checkid) {
        this.checkres.push(obj.checkid[i])
      }
    },
    getdepartment () {
      let that = this
      let champterinfo = []
      this.axios({
        method: 'post',
        url: teamdeparturl
      })
      .then(function (res) {
//      console.log(res, 'res teamdeparturl')
        champterinfo.push({txt: '全部', value: ''})
        let obj = res.data
        for (let item = 0; item < obj.length; item++) {
          champterinfo.push({txt: obj[item].collegeName, value: obj[item].id})
        }
      })
      .then(function () {
        that.$Select({ // 初始化菜单
          'data': champterinfo,
          'selectId': 'select83',
          'callback': function (obj) {
            that.dep = obj.value
          },
          'cleartxt': '全部'
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getgrades () {
      let that = this
      let champterinfo = []
      this.axios({
        method: 'post',
        url: teamgradeurl
      })
        .then(function (res) {
//      console.log(res, 'res teamdeparturl')
          champterinfo.push({txt: '全部', value: ''})
          let obj = res.data.data
          for (let item = 0; item < obj.length; item++) {
            champterinfo.push({txt: obj[item].name, value: obj[item].id})
          }
        })
        .then(function () {
          that.$Select({ // 初始化菜单
            'data': champterinfo,
            'selectId': 'select83',
            'callback': function (obj) {
              that.dep = obj.value
            },
            'cleartxt': '全部'
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    savedata () {
      let that = this
      let temp = []
      for (let item = 0; item < this.checkres.length; item++) {
        temp.push({courseRole: '', userId: this.checkres[item], courseId: this.courseId})
      }
      this.axios({
        method: 'post',
        url: teamaddurl,
        data: {
          courseUserList: temp
        }
      })
      .then(function (res) {
//      console.log(res, 'res from save team teacher')
        if (res.data.code !== 200) {
          that.win(res.data.message, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: pathinfo.prex + 'team', query: {courseId: this.courseId}})
    },
    pagepost (infos) {
      let that = this
      this.pageval = infos.page
      this.axios({
        method: 'post',
        url: teamteacherurl,
        data: {
          courseId: that.courseId,
          collegeId: that.dep,
          code: that.code
        }
      })
      .then(function (res) {
//      console.log(res, 'res from  team teacher')
        let temp = []
        let objs = res.data.result
        that.pageinfo = Math.ceil(objs.length / pagesize)
        that.totalnum = objs.length
        let selectobj = []
        that.checkres = []
        if (!that.checkoneflag) {
          that.checkres = []
          that.checkoneflag = true
        }
        let start = (that.pageval - 1) * pagesize
        for (let item = start; item < objs.length; item++) {
          if (item < (that.pageval * pagesize < objs.length ? that.pageval * pagesize : objs.length)) {
            temp[item - start] = {}
            temp[item - start]['id'] = objs[item].id
            temp[item - start]['dept'] = objs[item].organization
            temp[item - start]['num'] = objs[item].code
            temp[item - start]['name'] = objs[item].realName
            temp[item - start].selected = false
          }
        }
        let tempse = {}
        for (let item = 0; item < objs.length; item++) {
          for (let items = 0; items < selectobj.length; items++) {
            if (objs[item].id === selectobj[items]) {
              tempse[item] = objs[item].id
              break
            }
          }
        }
        that.selectedarr = tempse
        that.products = temp
        that.bingos = []
        that.bingos[that.pageval - 1] = 'selected'
      })
      .catch(function (error) {
        console.log(error)
      })
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
    },
    search () {
      this.pagepost({page: 1})
    }
  },
  mounted () {
  }
}
</script>
