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
			 		<span class="txt" style="min-width: 125px;">{{loopclassgroupinfo.name}}<i>*</i>：</span>
			 		<input type="text"  v-model="name" :value="name"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt" style="min-width: 125px;">{{loopclassgroupinfo.type}}<i>*</i>：</span>
			 		<div id='select92'></div>
			 	</div>
			 	<!--<div class="formline">
			 		<span class="txt" style="min-width: 125px;">{{loopclassgroupinfo.rel}}<i>*</i>：</span>
			 		<div id='select93' ></div>
			 	</div>-->
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{loopclassgroupinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{loopclassgroupinfo.saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {loopclassgroupinfo, warntxt, editurl, pathinfo, group, pagesize, loopurl} from '@/module/admin/config/GroupLoopManageinfo'
export default {
  name: 'AJGroupLoopManageedit',
  data () {
    return {
      msg: loopclassgroupinfo.edit,
      warntxt: warntxt,
      wininfo: {
        widhei: ['500px', '370px'],
        btncancelleft: '345px',
        contenthei: '253px'
      },
      loopclassgroupinfo: loopclassgroupinfo,
      name: '',
      pagesize: pagesize,
      type: 1,
      rel: '',
      id: ''
    }
  },
  methods: {
    valid () {
      if (this.name.toString().replace(/\s/gi, '') === '') {
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
          data: {
            loopClassGroupId: that.id,
            loopClassGroupName: that.name,
            groupType: that.type
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
      }
    },
    getxkpjb () {
      let that = this
      this.axios({
        method: 'post',
        url: loopurl,
        data: {
          modelName: '',
          isPublish: -1,
          isDelete: 0,
          curPage: 0,
          pageSize: pagesize
        }
      })
      .then(function (res) {
        let relarr = [{value: '', txt: '全部'}]
        let objs = res.data.result
        for (let item = 0; item < objs.length; item++) {
          relarr.push({value: objs[item].modelId, txt: objs[item].modelName})
        }
        that.$Select({
          'data': relarr,
          'selectId': 'select93',
          'callback': function (obj) {
            that.rel = obj.value
          },
          'matchval': [{val: that.rel}]
        })
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
    let that = this
    let objs = this.$route.params.item
    if (!objs) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = objs.id
      this.name = objs.name
      this.type = objs.typeval
      // this.rel = objs.relaid
      that.$Select({
        'data': group,
        'selectId': 'select92',
        'callback': function (obj) {
          that.type = obj.value
        },
        'matchval': [{val: that.type}]
      })
    }
  }
}
</script>
