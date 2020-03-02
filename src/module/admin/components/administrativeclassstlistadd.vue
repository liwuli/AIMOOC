<template>
	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{administrativeclassinfo.stlist}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'width:780px;height:' + wininfo.contenthei">
	 			<div class="G_search" >
					<div class="part" >
				 	  <span class="txt" style="line-height: 30px;">{{administrativeclassinfo.collegeN}}:</span>
				 	  <span class="txt hides" style="line-height: 30px;max-width: 200px;" :title="CollegeName">{{CollegeName}}</span>
				 	</div>
				 	<div class="part" >
				 	  <span class="txt" style="line-height: 30px;">{{administrativeclassinfo.majorN}}:</span>
				 	  <span class="txt hides" style="line-height: 30px;max-width: 200px;" :title="MajorName">{{MajorName}}</span>
				 	</div>
				 	<div class="part" >
				 	  <input type="text"  v-model="name" :placeholder="administrativeclassinfo.assistantadduserplaceholder"/>
				 	</div>
					 <div class="btn" @click="search">{{administrativeclassinfo.searchN}}</div>
				</div>
	        	<List  :totalnum="totalnum" :pagesize="pagesize" :pageval="pageval" @checkevent="checkevent" :bingos="bingos" :selectedarr = "selectedarr" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products'  :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
        	</div>
        	<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{administrativeclassinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{administrativeclassinfo.sureN}}</div>
 			</div>
		</div>
	</div>
</template>

<script>
import List from '@/components/extend/listchecknoopt'
import * as types from '@/store/win-types'
import {stsetaddurl, stgetaddlisturl, administrativeclassinfo, stpathinfo, pageval, stcolumsaddcopy, stpercentinfoaddcopy, stlistheadaddcopy, pagesize} from '@/module/admin/config/administrativeclassinfo'
export default {
  name: 'AJadministrativeclassstlistadd',
  data () {
    return {
      administrativeclassinfo: administrativeclassinfo,
      wininfo: {
        widhei: ['800px', '510px'],
        btncancelleft: '345px',
        contenthei: '393px'
      },
      products: [],
      infoval: [],
      percentinfo: stpercentinfoaddcopy,
      colums: stcolumsaddcopy,
      listhead: stlistheadaddcopy,
      optevent: [],
      pathinfo: stpathinfo,
      bingos: [],
      searchinput: 'width:150px;margin-left:790px',
      rooms: [],
      pagesize: pagesize,
      selectedarr: {},
      deviceId: '',
      pageval: pageval,
      checkres: [],
      totalnum: 0,
      name: '',
      CollegeId: '',
      CollegeName: '',
      MajorName: '',
      MajorId: '',
      classid: '',
      Query: {},
      checkoneflag: false
    }
  },
  created () {
    this.classid = this.geturlparam('ClassGroupId', location.hash)
    this.classname = decodeURIComponent(this.geturlparam('name', location.hash))
    this.CollegeId = this.geturlparam('CollegeId', location.hash)
    this.MajorId = this.geturlparam('MajorId', location.hash)
    this.CollegeName = decodeURIComponent(this.geturlparam('CollegeName', location.hash))
    this.MajorName = decodeURIComponent(this.geturlparam('MajorName', location.hash))
    this.Query = {name: this.classname, CollegeName: this.CollegeName, MajorName: this.MajorName, CollegeId: this.CollegeId, MajorId: this.MajorId, ClassGroupId: this.classid}
    this.pagepost({page: 1})
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
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: stsetaddurl,
        data: {
          classesId: that.classid,
          userIds: that.checkres
        }
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: stpathinfo.prex, query: this.Query})
    },
    pagepost (obj) {
      let that = this
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageval = obj.page
      this.axios({
        method: 'post',
        url: stgetaddlisturl,
        data: {
          classesId: that.classid,
          majorId: that.MajorId,
          keywords: that.name,
          page: {
            pageSize: pagesize,
            pageIndex: that.pageval
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.usersList
        that.pageinfo = Math.ceil(res.data.total / pagesize)
        that.totalnum = res.data.total
        let selectobj = []
        if (!that.checkoneflag) {
          that.checkres = []
          that.checkoneflag = true
        }
        let start = (that.pageval - 1) * pagesize
        for (let item = start; item < objs.length; item++) {
          if (item < (that.pageval * pagesize < objs.length ? that.pageval * pagesize : objs.length)) {
            temp[item - start] = {}
            temp[item - start]['id'] = objs[item].userId
            temp[item - start]['name'] = objs[item].realName
            temp[item - start]['college'] = objs[item].collegeName
            temp[item - start]['duty'] = objs[item].majorName
            temp[item - start]['code'] = objs[item].code
            temp[item - start].selected = false
          }
        }
        let tempse = {}
        for (let item = 0; item < objs.length; item++) {
          for (let items = 0; items < selectobj.length; items++) {
            if (objs[item].classroomId === selectobj[items]) {
              tempse[item] = objs[item].userId
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
    search () {
      this.pagepost({page: 1})
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
  }
}
</script>
