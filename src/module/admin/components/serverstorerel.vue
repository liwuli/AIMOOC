<template>
	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
        	<List :totalnum="totalnum" :pagesize="pagesize" :bingos="bingos" :pageval="pageval" @checkevent="checkevent" :selectedarr = "selectedarr" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
        	<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{basicinfo.relN}}</div>
 			</div>
		</div>
	</div>
</template>

<script>
import List from '@/components/extend/listchecknoopt'
import * as types from '@/store/win-types'
import {basicinfo, pathinfo, storelistheadrel, storecolums, storepercentinfo, relstoreurl, relsavestoreurl} from '@/module/admin/config/serverinfo'
let pagesize = 10
export default {
  name: 'AJserverstorerel',
  data () {
    return {
      pageval: '',
      pageinfo: '',
      pathinfo: pathinfo,
      msg: basicinfo.msgrelstoreN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['800px', '470px'],
        btncancelleft: '345px',
        contenthei: '353px'
      },
      products: [],
      infoval: [],
      pagesize: pagesize,
      percentinfo: storepercentinfo,
      colums: storecolums,
      listhead: storelistheadrel,
      optevent: [],
      bingos: [],
      searchinput: 'width:150px;margin-left:790px',
      selectedarr: {},
      deviceId: '',
      checkres: [],
      totalnum: 0,
      checkoneflag: false
    }
  },
  components: {
    List
  },
  methods: {
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
        url: relsavestoreurl,
        params: {
          par: {
            stoAreaIds: that.checkres,
            deviceId: that.deviceId
          }
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.go(-1);
    },
    pagepost (infos) {
      let that = this
      this.pageval = infos.page
      this.axios({
        method: 'post',
        url: relstoreurl,
        params: {
          par: {
            pageSize: infos.pagesize ? infos.pagesize : 10,
            pageIndex: infos.page,
            deviceId: that.deviceId
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.classRoomList
        that.pageinfo = Math.ceil(res.data.total / pagesize)
        that.totalnum = res.data.total
        let selectobj = res.data.HasTheseClassroomIsSelected
        if (!that.checkoneflag) {
          that.checkres = res.data.HasTheseClassroomIsSelected
          that.checkoneflag = true
        }
        let start = (that.pageval - 1) * pagesize
        for (let item = start; item < objs.length; item++) {
          if (item < (that.pageval * pagesize < objs.length ? that.pageval * pagesize : objs.length)) {
            temp[item - start] = {}
            temp[item - start]['id'] = objs[item].stoid
            temp[item - start]['name'] = objs[item].stoname
            temp[item - start]['local'] = objs[item].stolocalpath
            temp[item - start]['net'] = objs[item].stopath
            temp[item - start]['total'] = objs[item].totalcontent
            temp[item - start]['use'] = objs[item].hasusedcontent
            temp[item - start].selected = false
          }
        }
        let tempse = {}
        for (let item = 0; item < objs.length; item++) {
          for (let items = 0; items < selectobj.length; items++) {
            if (objs[item].stoid === selectobj[items]) {
              tempse[item] = objs[item].stoid
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
    }
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.deviceId = obj.id
      let param = {page: 1, id: obj.id, pagesize: 10}
      this.pagepost(param)
    }
  }
}
</script>
