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
			 		<span class="txt">{{evaluateTemplateNameN}}<i>*</i>：</span>
			 		<input type="text"  v-model="evaluateTemplateName" :value="evaluateTemplateName"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{descriptionN}}：</span>
			 		<input type="text"  v-model="description" :value="description"/>
			 	</div>
			 	<div class="formline" >
			 	  <span class="txt">{{roleN}}:</span>
			 	  <div id='select83'  style="margin-top: 3px;" multiple="multiple"></div>
			 	</div>
			 	<!--<div class="formline">
			 		<span class="txt">{{validN}}：</span>
			 		<Radio  :genderval="validval" :type="edit" @radioevent="evaluatetemplateeditevent" :radioinfo="evaluatetemplateeditinfo"></Radio>
			 	</div>-->
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
import Radio from '@/components/extend/radio'
import {warntxt, pathinfo, editurl, msgeditN, evaluateTemplateNameN, roleurl, roleN, validN, evaluatetemplateeditinfo, descriptionN, isOpenN, saveN, cancelN} from '@/module/admin/config/evaluateTemplateinfo'
export default {
  name: 'AJevaluateTemplateadd',
  data () {
    return {
      msg: msgeditN,
      edit: 'edit',
      wininfo: {
        widhei: ['500px', '470px'],
        btncancelleft: '345px',
        contenthei: '353px'
      },
      evaluateTemplateName: '',
      roleN: roleN,
      validN: validN,
      description: '',
      evaluateTemplateNameN: evaluateTemplateNameN,
      evaluatetemplateeditinfo: evaluatetemplateeditinfo,
      descriptionN: descriptionN,
      isOpenN: isOpenN,
      saveN: saveN,
      cancelN: cancelN,
      role: [],
      validval: ''
    }
  },
  components: {
    Radio
  },
  methods: {
    valid () {
      if (this.evaluateTemplateName.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.evaluateTemplateName, '', false)
        return false
      } else if (this.role.length === 0) {
        this.win(warntxt.rolerel, '', false)
        return false
      } else {
        return true
      }
    },
    evaluatetemplateeditevent (obj) {
      this.validval = obj.val
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
            evaluateTemplateId: that.evaluateTemplateId,
            evaluateTemplateName: that.evaluateTemplateName,
            description: that.description,
            isOpen: that.isOpen,
            roleIds: that.role
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
      this.win(types.back, this.cancelfn, false)
    } else {
      this.evaluateTemplateId = obj.id
      this.evaluateTemplateName = obj.evaluateTemplateName
      this.description = obj.description
      this.isOpen = obj.isOpen
      this.validval = obj.isOpenval ? 0 : 1 // 可用的值
      let objs = obj.roleid
      let that = this
      this.axios({
        method: 'post',
        url: roleurl
      })
      .then(function (res) {
        let temp = []
        let obj = res.data.result.data
        for (let item = 0; item < obj.length; item++) {
          temp.push({value: obj[item].id, txt: obj[item].roleName})
          if (item === 0) {
            that.role = []
            that.role.push(obj[item].id)
          }
        }
        let temps = []
        for (let i = 0; i < objs.length; i++) {
          temps.push({val: objs[i]})
        }
        that.$Select({
          'data': temp,
          'selectId': 'select83',
          'callback': function (obj) {
            that.role = []
            for (let i = 0; i < obj.length; i++) {
              if (obj[i]) {
                that.role.push(obj[i].value)
              }
            }
          },
          'matchval': temps
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
