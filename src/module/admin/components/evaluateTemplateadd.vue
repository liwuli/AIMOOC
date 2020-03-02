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
			 		<input type="text"  v-model="evaluateTemplateName"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{descriptionN}}：</span>
			 		<input type="text"  v-model="description"/>
			 	</div>
			 	<div class="formline" >
			 	  <span class="txt">{{roleN}}:</span>
			 	  <div id='select83'  style="margin-top: 3px;" multiple="multiple"></div>
			 	</div>
			 	<!--<div class="formline">
			 		<span class="txt">{{validN}}：</span>
			 		<Radio :type="add" @radioevent="evaluatetemplateaddevent" :radioinfo="evaluatetemplateaddinfo"></Radio>
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
import {warntxt, pathinfo, addurl, msgaddN, evaluateTemplateNameN, validN, evaluatetemplateaddinfo, roleN, descriptionN, roleurl, saveN, cancelN} from '@/module/admin/config/evaluateTemplateinfo'
export default {
  name: 'AJevaluateTemplateadd',
  data () {
    return {
      msg: msgaddN,
      add: 'add',
      wininfo: {
        widhei: ['500px', '270px'],
        btncancelleft: '345px',
        contenthei: '153px'
      },
      evaluateTemplateName: '',
      validN: validN,
      roleN: roleN,
      description: '',
      evaluateTemplateNameN: evaluateTemplateNameN,
      descriptionN: descriptionN,
      evaluatetemplateaddinfo: evaluatetemplateaddinfo,
      saveN: saveN,
      cancelN: cancelN,
      validval: 0
    }
  },
  created () {
    this.getrole()
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
    evaluatetemplateaddevent (obj) {
      this.validval = obj.val
    },
    getrole () {
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
        that.$Select({
          'data': temp,
          'selectId': 'select83',
          'callback': function (obj) {
            that.role = []
            for (let i = 0; i < obj.length; i++) {
              if (typeof obj[i] === 'object') {
                that.role.push(obj[i].value)
              }
            }
          }
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: addurl,
        params: {
          par: {
            evaluateTemplateName: that.evaluateTemplateName,
            description: that.description,
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
  }
}
</script>
