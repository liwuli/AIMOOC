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
			 		<span class="txt">{{basicinfo.majorN}}<i>*</i>：</span>
			 		<input type="text"  v-model="major"/>
			 	</div>
			 	<div class="formline">
		            <span class="txt">{{basicinfo.ScollegeN}}<i>*</i>:</span>
		            <div id='select88' ></div>
		            <select id="select89"></select>
	           </div>
			 	<!--<div class="formline">
			 		<span class="txt">{{basicinfo.descriptionN}}：</span>
			 		<textarea class="textarea" name="" v-model="description" rows="" cols=""></textarea>
			 	</div>-->
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
import {basicinfo, warntxt, pathinfo, addurl, collegeurl} from '@/module/admin/config/majorinfo'
export default {
  name: 'AJmajoradd',
  data () {
    return {
      msg: basicinfo.msgaddN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['500px', '320px'],
        btncancelleft: '345px',
        contenthei: '203px'
      },
      major: '',
      description: '',
      Scollege: ''
    }
  },
  created () {
    this.getCollegeList()
  },
  components: {
  },
  methods: {
    getCollegeList () {
      let that = this
      // 院系
      this.axios({
        method: 'post',
        url: collegeurl
      })
      .then(function (res) {
        let temp = []
        //temp[0] = {value: '', txt: '全部'}
        let objs = res.data
        for (let item = 0; item < objs.length; item++) {
          temp[item ] = {}
          temp[item ]['value'] = objs[item].id
          temp[item ]['txt'] = objs[item].collegeName
        }
				that.Scollege = objs[0].id
        that.collegeS = that.$Select({
          'data': temp,
          'originS': 'multiple',
          'selectId': ['select89', 'select88'],
          'callback': function (obj) {
            that.Scollege = obj.value
						// if (obj.ind !== 0) {
            //   that.Scollege = obj.value
            // } else {
            //   that.Scollege = ''
            // }
          },
          'cleartxt': '全部'
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    valid () {
      if (this.major.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.major, '', false)
        return false
      } else if (this.Scollege.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.Scollege, '', false)
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
        url: addurl,
        params: {
          par: {
            collegeId: that.Scollege,
            majorName: that.major
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
