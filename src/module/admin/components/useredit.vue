
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
			 		<span class="txt">{{show?basicinfo.teacherCodeN:basicinfo.studentCodeN}}<i>*</i>：</span>
			 		<input type="text" v-model="code"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.realNameN}}<i>*</i>：</span>
			 		<input type="text" v-model="realName" :value="realName"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.sexN}}：</span>
			 		<Radio :type='edit' :genderval="gender" @radioevent="radioevent" :radioinfo="radioinfo"></Radio>
			 	</div>
        <div class="formline">
          <span class="txt">{{eduType ? basicinfo.departmentsN : basicinfo.gradeN}}<i>*</i>：</span>
          <div id='select84' style="margin-top: 3px;"></div>
        </div>
        <div v-if="eduType&&!show" class="formline">
          <span class="txt">{{selectinfo.major}}<i>*</i>：</span>
          <div id='select66' class="Select" style="margin-top: 3px;"></div>
        </div>
        <div v-if="!show" class="formline">
          <span class="txt">{{basicinfo.classN}}<i>*</i>：</span>
          <div id='select77' class="Select" style="margin-top: 3px;"></div>
        </div>
			 	<div class="formline">
			 	  <span class="txt">{{basicinfo.roleN}}:</span>
			 	  <div id='select83' style="margin-top: 3px;" multiple="multiple"></div>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.phoneN}}：</span>
			 		<input type="text" v-model="phone" :value="phone"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.telephoneN}}：</span>
			 		<input type="text" v-model="telephone" :value="telephone"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.emailN}}：</span>
			 		<input type="email" v-model="email" :value="email"/>
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
import Radio from '@/components/extend/radio'
import {classesListurl, collegemajorurl, selectinfo, getclassesurl, basicinfo, warntxt, pathinfo, getuseroleurl, collegeurl, roleinfo, roleurl, radioinfo, editurl, getgradesurl} from '@/module/admin/config/userinfo'
export default {
  name: 'AJuseredit',
  components: {
    Radio
  },
  data () {
    return {
      roleType: null,
      eduType: this.$store.state.educationType,
      basicinfo: basicinfo,
      selectinfo: selectinfo,
      wininfo: {
        widhei: ['500px', '455px'],
        btncancelleft: '345px',
        contenthei: '378px'
      },
      email: '',
      edit: 'edit',
      realName: '',
      userName: '',
      telephone: '',
      departments: '',
      grade: '',
      phone: '',
      gender: '',
      genderval: '',
      roleinfo: roleinfo,
      radioinfo: radioinfo,
      role: [],
      roletypeval: '',
      roletype: '',
      collegeid: '',
      gradeid: '',
      ids: '',
      code: '',
      oldClassId: '',
      classId: '',
      majorId: ''
    }
  },
  computed: {
    msg: function () {
      switch (this.roleType) {
        case 2: return basicinfo.msgeditT
        case 3: return basicinfo.msgeditS
      }
    },
    show: function () {
      switch (this.roleType) {
        case 2: return true
        case 3: return false
      }
    },
    organization () {
      return this.eduType ? this.departments : this.grade
    }
  },
  methods: {
    valid () {
      let emailparten = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
      let phoneparten = /^1[0-9]{10}$/
      if (this.code.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.code, '', false)
        return false
      } else if (this.realName.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.realName, '', false)
        return false
      } else if (this.realName.toString().replace(/\s/gi, '') === 'admin') {
        this.win(warntxt.illegalrealName, '', false)
        return false
      } else if (this.organization.replace(/\s/gi, '') === '') {
        if (this.eduType) {
          this.win(warntxt.college, '', false)
        } else {
          this.win(warntxt.grade, '', false)
        }
        return false
      } else if (this.phone.toString().replace(/\s/gi, '') !== '' && !phoneparten.test(this.phone.toString())) {
        this.win(warntxt.phone, '', false)
        return false
      } else if (this.email.toString().replace(/\s/gi, '') !== '' && !emailparten.test(this.email.toString())) {
        this.win(warntxt.email, '', false)
        return false
      } else {
        if (!this.show) {
          if (this.majorId.toString().replace(/\s/gi, '') === '') {
            this.win(warntxt.major, '', false)
            return false
          } else if (this.classId.toString().replace(/\s/gi, '') === '') {
            this.win(warntxt.classN, '', false)
            return false
          } else {
            return true
          }
        }
        return true
      }
    },
    roleevent (obj) {
      this.roletypeval = obj.val
    },
    radioevent (obj) {
      this.genderval = obj.val
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      let data = {
        'params': {
          roleType: that.roleType,
          userName: that.code,
          code: that.code,
          realName: that.realName,
          gender: that.genderval,
          organization: that.organization,
          roleIds: that.role,
          telephone: that.telephone,
          phone: that.phone,
          email: that.email,
          id: that.ids,
          isdelete: 0
        }
      }
      if (this.eduType) {
        data.params.majorId = that.majorId
      }
      if (!this.show) {
        data.params.oldClassId = that.oldClassId
        data.params.classId = that.classId
      }
      this.axios({
        method: 'post',
        url: editurl,
        params: data
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getrole (temp, userId) {
      let that = this
      this.axios({
        method: 'post',
        url: getuseroleurl,
        params: {
          params: {
            userId: userId
          }
        }
      })
      .then(function (res) {
        let temparr = []
        let objs = res.data.result.data
        for (let i = 0; i < objs.length; i++) {
          temparr.push({val: objs[i].id})
        }
        if (temparr.length === 0) {
          temparr = false
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
          'matchval': temparr
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
    },
    getroleurl () {
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
        that.getrole(temp, that.ids)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getgradeurl () {
      let that = this
      this.axios({
        method: 'post',
        url: getgradesurl,
        params: {
          'par': {
            pageSize: 1000,
            pageIndex: 1
          }
        }
      })
      .then(function (res) {
        let temp = []
        let obj = res.data.data
        for (let item = 0; item < obj.length; item++) {
          if (obj[item]) {
            temp.push({value: obj[item].id, txt: obj[item].name})
          }
        }
        that.$Select({
          'data': temp,
          'selectId': 'select84',
          'callback': function (obj) {
            that.grade = obj.value
            !that.show && that.getclasses()
          },
          'matchval': [{val: that.gradeid}]
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    async getcollegeurl () { // 高教院系专业
      try {
        let res = await this.axios.post(collegemajorurl)
        let objs = res.data
        let that = this
        let collegearr = [{value: '-1', txt: '全部'}]
        let majorarr = [[{value: '-1', txt: '全部'}]]
        for (let item = 0; item < objs.length; item++) {
          collegearr.push({value: objs[item].collegeId, txt: objs[item].collegeName})
          majorarr[item + 1] = [{value: '', txt: '全部'}]
          for (let items = 0; items < objs[item].majorList.length; items++) {
            majorarr[item + 1].push({value: objs[item].majorList[items].majorId, txt: objs[item].majorList[items].majorName})
          }
        }
        this.majorobj = !this.show ? this.$Select({
          'data': majorarr[0],
          'selectId': 'select66',
          'callback': function (obj) {
            that.majorId = obj.ind ? obj.value : ''
            that.getclasses()
          },
          'matchval': [{val: that.majorId || -1}]
        }) : []
        this.collegeobj = this.$Select({
          'data': collegearr,
          'selectId': 'select84',
          'callback': function (obj) {
            that.departments = obj.ind ? obj.value : ''
            if (that.show) {
              return
            }
            that.majorobj.cfg.data = majorarr[obj.ind]
            that.majorobj.cfg.domdata = false
            that.majorobj.initCommonVal()
          },
          'matchval': [{val: that.collegeid || -1}]
        })
      } catch (err) {
        console.log(err)
      }
    },
    getclasses () { // 班级
      let that = this
      let url = this.eduType ? classesListurl : getclassesurl
      let data = this.eduType ? {majorId: this.majorId, classesType: 0} : {'studySectionId': that.grade}
      this.axios({
        method: 'post',
        url: url,
        data: data
      })
        .then(function (res) {
          let temp = []
          let objs = res.data.classesList
          let val = -1
          temp.push({value: -1, txt: '请选择'})
          for (let item = 0; item < objs.length; item++) {
            temp[item + 1] = {}
            temp[item + 1]['value'] = objs[item].classesId
            temp[item + 1]['txt'] = objs[item].classesName
            if (objs[item].classesId === that.oldClassId) {
              val = that.oldClassId
            }
          }
          that.$Select({
            'data': temp,
            'selectId': 'select77',
            'callback': function (obj) {
              that.classId = obj.ind ? obj.value : ''
            },
            'matchval': [{val: val}]
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.roleType = this.$route.query
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.userName = obj.name || ''
      this.realName = obj.rname || ''
      this.email = obj.mail || ''
      this.telephone = obj.tel || ''
      this.departments = obj.school || ''
      this.collegeid = obj.schoolid || ''
      this.majorId = obj.majorId || ''
      this.grade = obj.school || ''
      this.gradeid = obj.schoolid || ''
      this.phone = obj.phone || ''
      this.gender = obj.gender === 1 ? 0 : 1
      this.genderval = obj.gender || ''
      this.roletypeval = obj.roleType || ''
      this.roletype = obj.roleType - 2
      this.ids = obj.id || ''
      this.passw = obj.passw || ''
      this.code = obj.code || ''
      this.oldClassId = obj.classesId || ''
      // 角色列表
      this.getroleurl()
      if (this.eduType) {
        // 高教-院系列表
        this.getcollegeurl()
      } else {
        // 普教-年级列表
        this.getgradeurl()
      }
    }
  }
}
</script>
