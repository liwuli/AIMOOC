<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">教室添加</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">教室名称<i>*</i>：</span>
			 		<input type="text"  v-model="room" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">教室类型：</span>
			 		<div class="Select" id="select01" style="margin-top: 3px"></div>
			 	</div>
			    <!--<div class="formline">
			 		<span class="txt">{{basicinfo.roomipN}}：</span>
			 		<input type="text"  v-model="roomip" />
			 	</div>-->
			 	<!--<div class="formline">
			 		<span class="txt">{{basicinfo.pointN}}：</span>
			 		<Radio :genderval="vals" :type="add" @radioevent="radioevent" :radioinfo="radioinfo"></Radio>
			 	</div>-->
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">取消</div>
 				<div class="save" @click="savedata">保存</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
// import Radio from '@/components/extend/radio.vue'
import {addradioinfo, warntxt, pathinfo, adddetailurl} from '@/module/admin/config/buildinginfo'
import {microteaching} from '@/module/admin/config/urlPage'
export default {
  name: 'AJbuildingadddetail',
  created () {
    this.id = this.$route.params.info[0]
    this.ind = this.$route.params.info[4]
  },
  data () {
    return {
      isAnalysis: 0,
      room: '',
      address: '',
      id: '',
      ind: 0,
      vals: 1,
      radioinfo: addradioinfo,
      wininfo: {
        widhei: ['500px', '300px'],
        btncancelleft: '345px',
        contenthei: '253px'
      },
      add: 'add'
    }
  },
  components: {
//  Radio
  },
  methods: {
    valid () {
      if (this.room.replace(/\s/gi, '') === '') {
        this.win(warntxt.room, '', false)
        return false
      } else {
        return true
      }
    },
    radioevent (obj) {
      this.vals = obj.val
    },
    savedata () {
      debugger
      if (this.valid()) {
        let that = this
        this.axios({
          method: 'post',
          url: adddetailurl,
          params: {
            params: {
              isAnalysis: that.isAnalysis,
              classroomName: that.room,
              classroomAddress: that.address,
              teachBuildingId: that.id
            }
          }
        })
        .then(function (res) {
          if (res.data.code !== 200) {
            that.win(res.data.message, '', false)
          } else {
            that.$router.push({name: pathinfo.prex, params: {ind: that.ind}})
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    cancelfn () {
      //this.$router.push({name: pathinfo.prex})
      this.$router.go(-1);
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
    let that = this
    var data = []
    if(microteaching){
        data = [{txt: '云录播教室', value: 0}, {txt: '集中智慧教室', value: 1}, {txt: '单机智慧教室', value: 2},{txt: '微格教室', value: 3}]
    }else{
        data = [{txt: '云录播教室', value: 0}, {txt: '集中智慧教室', value: 1}, {txt: '单机智慧教室', value: 2}]
    }
    this.$Select({
      data: data,
      selectId: 'select01',
      callback: function (obj) {
        that.isAnalysis = obj.value
      }
    })
  }
}
</script>
