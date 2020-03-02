<template>
	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
      <el-transfer
           v-model="selectedarr"
           filterable
           :titles="['可关联教室', '已关联教室']"
           :button-texts="['取消关联', '关联']"
           target-order="unshift"
           :data="products">
           <span :title="option.label" slot-scope="{ option }">{{ option.label }}</span>
          <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
           <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button> -->
         </el-transfer>
      <!-- <List  :totalnum="totalnum" :pagesize="pagesize" :pageval="pageval" @checkevent="checkevent" :bingos="bingos" :selectedarr = "selectedarr" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List> -->
      <div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="savedata">保存</div>
 			</div>
		</div>
	</div>
</template>

<script>
import List from '@/components/extend/listchecknoopt'
import * as types from '@/store/win-types'
import {basicinfo, saveurl, pagesize, relurl, listheadrel, pathinforel} from '@/module/admin/config/workstationinfo'
export default {
  name: 'AJworkstationrel',
  data () {
    return {
      msg: basicinfo.msgrelN,
      basicinfo: basicinfo,
      pagesize: pagesize,
      wininfo: {
        widhei: ['1000px', '600px'],
        btncancelleft: '420px',
        contenthei: '353px'
      },
      products: [],
      infoval: [],
      percentinfo: ['wid5', 'wid45', 'wid50'],
      colums: ['check', 'name', 'address'],
      listhead: listheadrel,
      optevent: [],
      pathinfo: pathinforel,
      bingos: [],
      searchinput: 'width:150px;margin-left:790px',
      rooms: [],
      selectedarr: [],
      deviceId: '',
      pageval: 1,
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
        url: saveurl,
        params: {
          par: {
            classroomIds: that.selectedarr,
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
      this.$router.push({name: pathinforel.prex})
    },
    pagepost (infos) {
      let that = this
      this.pageval = infos.page
      this.axios({
        method: 'post',
        url: relurl,
        params: {
          par: {
            pageSize: 10,
            pageIndex: infos.page,
            deviceId: that.deviceId
          }
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.total / pagesize)
        that.totalnum = res.data.total
        let temp = []
        let objs = res.data.classRoomList
        let selectobj = res.data.HasTheseClassroomIsSelected
        if (!that.checkoneflag) {
          that.checkres = res.data.HasTheseClassroomIsSelected
          that.checkoneflag = true
        }
        let start = (that.pageval - 1) * pagesize
        for (let item = start; item < objs.length; item++) {
          if (item < (that.pageval * pagesize < objs.length ? that.pageval * pagesize : objs.length)) {
            temp[item - start] = {}
            temp[item - start]['id'] = objs[item].classroomId
            temp[item - start]['name'] = objs[item].classroomName
            temp[item - start]['address'] = objs[item].classroomAddress
            temp[item - start].selected = false
          }
        }
        let tempse = {}
        for (let item = 0; item < objs.length; item++) {
          for (let items = 0; items < selectobj.length; items++) {
            if (objs[item].classroomId === selectobj[items]) {
              tempse[item] = objs[item].classroomId
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

    pagepost2(){
      var that = this;
      this.axios({
        method: 'post',
        url: relurl,
        params: {
          par: {
            deviceId: that.deviceId,
            classroomName:that.classroomName
          }
        }
      })
      .then(function (res) {
          that.totalnum = res.data.total
          if(res.data.classRoomList.length>0){
            var Selected = res.data.HasTheseClassroomIsSelected;
            var classRoomList = res.data.classRoomList;
            var temp = [];
            var select_temp = [];
            for(var i =0 ;i<classRoomList.length;i++){
                temp.push({
                  key:classRoomList[i].classroomId,
                  label:classRoomList[i].classroomName,
                  address:classRoomList[i].classroomAddress,
                })
                for(var j =0; j<Selected.length;j++){
                  if(classRoomList[i].classroomId==Selected[j]){
                    select_temp.push(classRoomList[i].classroomId)
                  }
                }

            }
            that.products = temp
            that.selectedarr = select_temp
            // 设置默认选中
            // var interval = setTimeout(()=>{
            //   that.setselect();
            // },200)
          }

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
      this.win(types.back, this.cancelfn)
    } else {
      this.deviceId = obj.id
      this.pagepost2({page: 1})
    }
  }
}
</script>
