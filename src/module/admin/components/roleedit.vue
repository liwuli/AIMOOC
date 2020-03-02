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
			 	<div class="formline" >
			 	  <span class="txt">{{basicinfo.roletypeN}}:</span>
			 	  <div id='select83'  class="Select" style="margin-top: 3px;" ></div>
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
import {basicinfo, warntxt, pathinfo, editurl, roletype} from '@/module/admin/config/roleinfo'
export default {
  name: 'AJroleedit',
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
      name: '',
      id: '',
      roletype: roletype
    }
  },
  methods: {
    valid () {
      if (this.name.replace(/\s/gi, '') === '') {
        this.win(warntxt.name, '', false)
        return false
      } else {
        return true
      }
    },
    savedata () {
      if (this.valid()) {
        let that = this
        this.axios({
          method: 'post',
          url: editurl,
          params: {
            params: {
              description: that.description,
              roleName: that.name,
              id: that.id,
              type: that.roletypeval * 1
            }
          }
        })
        .then(function (res) {
          if (res.data.code !== 200) {
            that.win(res.data.message, '', false)
          } else {
            that.$router.push({name: pathinfo.prex})
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
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
    let that = this
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn)
    } else {
      this.id = obj.id
      this.description = obj.description
      this.name = obj.roleName
      this.type = obj.type
    }
    that.$Select({
      'data': roletype,
      'selectId': 'select83',
      'callback': function (obj) {
        that.roletypeval = obj.value
      },
      'matchval': [{val: that.type + ''}]
    })
  }
}
</script>
