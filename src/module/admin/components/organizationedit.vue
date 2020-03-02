<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.organizationNameN}}<i>*</i>：</span>
			 		<input type="text"  v-model="organizationName" :value="subjectName"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.descriptionN}}：</span>
			 		<input type="text"  v-model="description" :value="description"/>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{basicinfo.saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {basicinfo, warntxt, pathinfo, editurl} from '@/module/admin/config/organizationinfo'
export default {
  name: 'AJorganizationedit',
  data () {
    return {
      msg: basicinfo.msgeditN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['500px', '320px'],
        btncancelleft: '345px',
        contenthei: '203px'
      },
      organizationName: '',
      description: '',
      ids: ''
    }
  },
  components: {
  },
  methods: {
    valid () {
      if (this.organizationName.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.organizationName, '', false)
        return false
      } else {
        return true
      }
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: editurl,
        params: {
          par: {
            collegeId: that.ids,
            collegeOrOrganization: 1,
            collegeName: that.organizationName,
            description: that.description,
            collegeCode: that.organizationName
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
      this.ids = obj.id
      this.organizationName = obj.organizationName
      this.description = obj.description
    }
  }
}
</script>
