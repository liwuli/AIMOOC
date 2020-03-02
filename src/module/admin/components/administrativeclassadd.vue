<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{basicinfo.msgaddN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
        <div class="formline">
          <span class="txt">{{administrativeclassinfo.type}}<i>*</i>：</span>
          {{administrativeclassinfo.typexz}}
        </div>
 				<div v-if="eduType" class="formline">
			 		<span class="txt">{{administrativeclassinfo.collegeN}}<i>*</i>：</span>
			 		<div id='select85' class="Select" style="width: 130px;"></div>
			 	</div>
			 	<div v-if="eduType" class="formline">
			 		<span class="txt">{{administrativeclassinfo.majorN}}<i>*</i>：</span>
			 		<div id='select86' class="Select" style="width: 130px;"></div>
			 	</div>
        <div v-if="!eduType" class="formline">
          <span class="txt">{{administrativeclassinfo.gradeN}}<i>*</i>：</span>
          <div id='select84' class="Select" style="width: 130px;"></div>
        </div>
        <div class="formline">
          <span class="txt">{{eduType?administrativeclassinfo.instructor:administrativeclassinfo.teacherN}}<i>*</i>：</span>
          <div id='select88' class="Select" style="width: 130px;"></div>
        </div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.nameN}}<i>*</i>：</span>
			 		<input type="text"  v-model="name"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{administrativeclassinfo.code}}<i>*</i>：</span>
			 		<input type="text"  v-model="code"/>
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
import {basicinfo, warntxt, collegemajorurl, administrativeclassinfo, pathinfo, addurl, getgradesurl, getusersurl} from '@/module/admin/config/administrativeclassinfo'
export default {
  name: 'AJadministrativeclassadd',
  data () {
    return {
      eduType: this.$store.state.educationType,
      administrativeclassinfo: administrativeclassinfo,
      wininfo: {
        widhei: ['500px', '320px'],
        btncancelleft: '345px',
        contenthei: '153px'
      },
      name: '',
      basicinfo: basicinfo,
      college: '',
      major: '',
      code: '',
      collegeobj: '',
      majorobj: '',
      classtype: 0,
      grade: '',
      teacherId: ''
    }
  },
  methods: {
    valid () {
      if (this.eduType) {
        if (this.major.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.major, '', false)
          return false
        }
      } else {
        if (this.grade.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.grade, '', false)
          return false
        }
      }
      if (this.teacherId.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.teacher, '', false)
        return false
      } else if (this.name.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.name, '', false)
        return false
      } else if (this.code.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.code, '', false)
        return false
      } else {
        return true
      }
    },
    getcollegemajor () {
      let that = this
      this.axios({
        method: 'post',
        url: collegemajorurl
      })
      .then(function (res) {
        let collegearr = [{value: -1, txt: '请选择院系'}]
        let majorarr = [[{value: -1, txt: '请选择专业'}]]
        let objs = res.data
        for (let item = 0; item < objs.length; item++) {
          collegearr.push({value: objs[item].collegeId, txt: objs[item].collegeName})
          majorarr[item + 1] = [{value: '', txt: '请选择专业'}]
          for (let items = 0; items < objs[item].majorList.length; items++) {
            majorarr[item + 1].push({value: objs[item].majorList[items].majorId, txt: objs[item].majorList[items].majorName})
          }
        }
        that.majorobj = that.$Select({
          'data': majorarr[0],
          'selectId': 'select86',
          'callback': function (obj) {
            that.major = obj.ind ? obj.value : ''
          }
        })
        that.collegeobj = that.$Select({
          'data': collegearr,
          'selectId': 'select85',
          'callback': function (obj) {
            that.college = obj.ind ? obj.value : ''
            that.getteacher()
            that.majorobj.cfg.data = majorarr[obj.ind]
            that.majorobj.cfg.domdata = false
            that.majorobj.initCommonVal()
          },
          'matchval': [{val: -1}]
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getgrade () { // 年级
      let that = this
      this.axios({
        method: 'post',
        url: getgradesurl
      })
        .then(function (res) {
          let temp = []
          let objs = res.data.data
          temp.push({value: -1, txt: '请选择'})
          for (let item = 0; item < objs.length; item++) {
            temp[item + 1] = {}
            temp[item + 1]['value'] = objs[item].id
            temp[item + 1]['txt'] = objs[item].name
          }
          that.$Select({
            'data': temp,
            'selectId': 'select84',
            'callback': function (obj) {
              that.grade = obj.ind ? obj.value : ''
              that.getteacher()
            },
            'matchval': [{val: -1}]
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async getteacher () { // 班主任
      try {
        let that = this
        const res = await this.axios({
          method: 'post',
          url: getusersurl,
          params: {params: {roleType: 2, collegeId: that.eduType ? that.college : that.grade}}
        })
        let objs = res.data
        let temp = []
        temp.push({value: -1, txt: '请选择'})
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].id
          temp[item + 1]['txt'] = objs[item].realName
        }
        that.$Select({
          'data': temp,
          'selectId': 'select88',
          'callback': function (obj) {
            that.teacherId = obj.ind ? obj.value : ''
          },
          'matchval': [{val: -1}]
        })
      } catch (err) {
        console.log(err)
      }
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      let data = {
        teacherId: that.teacherId,
        classesType: that.classtype,
        classesCode: that.code,
        classesName: that.name
      }
      if (this.eduType) {
        data.majorId = that.major
      } else {
        data.studySectionId = that.grade
      }
      this.axios({
        method: 'post',
        url: addurl,
        data: data
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
  created () {
    if (this.eduType) {
      // 高教-院系列表
      this.getcollegemajor()
    } else {
      // 普教-年级列表
      this.getgrade()
    }
  }
}
</script>
