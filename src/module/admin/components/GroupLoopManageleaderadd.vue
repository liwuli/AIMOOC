<template>
	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'width: ' + wininfo.contentwid + ';height:' + wininfo.contenthei">
	 			<div class="G_search" >
					<div class="part" >
				 	  <span class="txt" style="line-height: 30px;">{{loopclassgroupinfo.collegeN}}:</span>
				 	  <div id='select885' class="Select" style="width: 130px;"></div>
				 </div>
				 	<div class="part" >
				 	  <input type="text"  v-model="name" :placeholder="loopclassgroupinfo.assistantadduserplaceholder"/>
				 	</div>
					 <div class="btn" @click="search">{{loopclassgroupinfo.searchN}}</div>
				</div>
	        	<List  :totalnum="totalnum" :pagesize="pagesize" :pageval="pageval" @checkevent="checkevent" :bingos="bingos" :selectedarr = "selectedarr" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products'  :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
	        </div>
        	<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{loopclassgroupinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{loopclassgroupinfo.sureN}}</div>
 			</div>
		</div>
	</div>
</template>

<script>
import List from '@/components/extend/listchecknoopt'
import * as types from '@/store/win-types'
import {assistantaddmemberurl, getcollegeurl, othermemeberurl, loopclassgroupinfo, relleaderpathinfo, pageval, relassistantcolumsadd, relassistantpercentinfoadd, relassistantlistheadadd, pagesize} from '@/module/admin/config/GroupLoopManageinfo'
export default {
  name: 'AJGroupLoopManagerelleaderadd',
  data () {
    return {
      msg: loopclassgroupinfo.adduser,
      loopclassgroupinfo: loopclassgroupinfo,
      wininfo: {
        widhei: ['800px', '470px'],
        btncancelleft: '345px',
        contenthei: '353px',
        contentwid: '780px'
      },
      products: [],
      infoval: [],
      percentinfo: relassistantpercentinfoadd,
      colums: relassistantcolumsadd,
      listhead: relassistantlistheadadd,
      optevent: [],
      pathinfo: relleaderpathinfo,
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
      college: '',
      loopClassGroupId: '',
      grouptype: '',
      checkoneflag: false
    }
  },
  created () {
    this.loopClassGroupId = this.geturlparam('ClassGroupId', location.hash)
    this.grouptype = this.geturlparam('groupType', location.hash)
    this.getcollege({page: 1})
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
    getcollege (obj) {
      let that = this
      this.axios({
        method: 'post',
        url: getcollegeurl,
        params: {
          'par': {
            collegeOrOrganization: 0,
            pageSize: 10000,
            pageIndex: obj.page
          }
        }
      })
      .then(function (res) {
        let temp = []
        temp.push({value: '', txt: '全部'})
        let objs = res.data.data
        for (let item = 0; item < objs.length; item++) {
          temp.push({value: objs[item].id, txt: objs[item].collegeName})
        }
        that.$Select({
          'data': temp,
          'selectId': 'select885',
          'callback': function (obj) {
            that.college = obj.value
          }
        })
      })
      .catch(function (error) {
        console.log(error)
      })
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
        url: assistantaddmemberurl,
        data: {
          loopClassGroupId: that.loopClassGroupId,
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
      this.$router.push({name: relleaderpathinfo.prex, query: {ClassGroupId: this.loopClassGroupId, groupType: this.grouptype}})
    },
    pagepost (obj) {
      let that = this
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageval = obj.page
      this.axios({
        method: 'post',
        url: othermemeberurl,
        data: {
          loopClassGroupId: that.loopClassGroupId,
          collegeId: that.college,
          keywords: that.name,
          page: {
            pageSize: pagesize,
            pageIndex: that.pageval
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.unselectedMembersList
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
            temp[item - start]['duty'] = objs[item].postName
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
