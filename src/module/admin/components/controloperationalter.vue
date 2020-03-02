<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">时间冲突</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{content}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="checkstatus">继续加课</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {basicinfo, pathinfo, delurl,pathinforel} from '@/module/admin/config/controlrecordinfo'
import {addurl} from '@/module/admin/config/controloperationinfo'
export default {
  name: 'AJcontroloperationalter',
  data () {
    return {
      msg: basicinfo.msgdelN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      ids: '',
      classroomid: '',
	  content:'',
	  mydata:null
    }
  },
  methods: {
    checkstatus(){
      debugger
      if(this.button==0){
        this.savedata();
      }else{
        this.savedata2();
      }
    },

    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: addurl,
        data:that.mydata
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
          setTimeout(function () {
            that.cancelfn()
          }, 1200)
        } else {
          // that.$router.go(-1);
		  that.$router.push({name: 'AJcontroloperation'})
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },

    savedata2 () {
      let that = this
      this.axios({
        method: 'post',
        url: addurl,
        data:{
          classroomId:that.mydata.classroomId,
          classroomType:that.mydata.classroomType,
          endTime:that.mydata.endTime
        }
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
          setTimeout(function () {
            that.cancelfn()
          }, 1200)
        } else {
          // that.$router.go(-1);
      that.$router.push({name: 'AJcontroloperation'})
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },

    cancelfn () {

	  this.$router.push({name: 'AJcontroloperationadd'})
      // this.$router.go(-1);
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
     this.content = obj.content.data.content
     this.mydata =  obj.mydata
     this.button= obj.button

    }
  }
}
</script>
