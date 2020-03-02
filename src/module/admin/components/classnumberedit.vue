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
			 		<span class="txt">{{nameN}}<i>*</i>：</span>
			 		<input type="text"  v-model="name" :value="name" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{desN}}：</span>
			 		<textarea name="" rows="" cols="" v-model="description" :value="description"></textarea>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {warntxt, pathinfo, editurl, msgtemplateeditN, nameN, desN, saveN, cancelN} from '@/module/admin/config/classnumberinfo'
export default {
  name: 'AJclassnumberedit',
  created () {
    let obj = this.$route.params
    this.id = obj.info[0]
    this.name = obj.info[1]
    this.description = obj.info[2]
  },
  data () {
    return {
      msg: msgtemplateeditN,
      wininfo: {
        widhei: ['500px', '370px'],
        btncancelleft: '345px',
        contenthei: '253px'
      },
      description: '',
      name: '',
      nameN: nameN,
      desN: desN,
      saveN: saveN,
      cancelN: cancelN,
      id: ''
    }
  },
  methods: {
    valid () {
      if (this.name.replace(/\s/gi, '') === '') {
        this.win(warntxt.nameNULL, '', false)
        return false
      }
      return true
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: editurl,
        data: {
          templateName: that.name,
          description: that.description,
          templateId: that.id
        }
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
        } else {
          that.$router.push({name: pathinfo.prex})
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
  }
}
</script>
