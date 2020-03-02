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
			 		<span class="txt">{{basicinfo.nameN}}<i>*</i>：</span>
			 		<input type="text"  v-model="name" :value="name"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.desN}}：</span>
			 		<textarea name="" rows="" cols="" v-model="description" :value="description"></textarea>
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
import {basicinfo, pathinfo, editurl} from '@/module/admin/config/resourceinfo'
export default {
  name: 'AJresourceedit',
  data () {
    return {
      msg: basicinfo.msgeditN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['500px', '300px'],
        btncancelleft: '345px',
        contenthei: '183px'
      },
      description: '',
      name: ''
    }
  },
  methods: {
    valid () {
    },
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: editurl,
        params: {
          params: {
            resourceDescription: that.description,
            resourceName: that.name,
            resourceId: that.id
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
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
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = obj.id
      this.name = obj.name
      this.description = obj.des
    }
  }
}
</script>
