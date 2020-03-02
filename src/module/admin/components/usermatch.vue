<template>
  <div class="app">
  	<Ghead></Ghead>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<Linklist></Linklist>
    		<div class="AA_right">
          <AJposition>
            <div class="item">
              <router-link :to="{name: 'AJuser'}">{{basicinfo.navN}}</router-link>
              <span class="separator">></span>
            </div>
          </AJposition>
          <div v-if="eduType" class="G_search">
            <div class="part">
              <span class="txt">{{selectinfo.college}}：</span>
              <div id='select33' class="Select" :style="selectstyle"></div>
            </div>
            <div class="part">
              <span class="txt">{{selectinfo.major}}：</span>
              <div id='select34' class="Select" :style="selectstyle"></div>
            </div>
            <div class="part">
              <span class="txt">{{selectinfo.classN}}：</span>
              <div id='select35' class="Select" :style="selectstyle"></div>
            </div>
            <div class="btn" @click="pagepost(1)" style="float: left;">{{basicinfo.searchN}}</div>
          </div>
          <div v-else="eduType" class="G_search">
            <div class="part">
              <span class="txt">{{selectinfo.grade}}：</span>
              <div id='select36' class="Select" :style="selectstyle"></div>
            </div>
            <div class="part">
              <span class="txt">{{selectinfo.classN}}：</span>
              <div id='select37' class="Select" :style="selectstyle"></div>
            </div>
            <div class="btn" @click="pagepost(1)" style="float: left;">{{basicinfo.searchN}}</div>
          </div>
          <div class="routeline">
            <div class="item" v-for="item in unMatchStudentList">
              <img :src="item.localUrl" alt="">
              <span @click="add(item)">{{basicinfo.addN}}</span><span @click="del(item)">{{basicinfo.delN}}</span>
            </div>
          </div>
          <page :bingo="bingo" :totalnum="totalnum" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page>
        </div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Linklist from './linklist'
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import AJposition from '@/components/extend/position'
import page from '@/components/extend/page'
import {getclassesurl, getgradesurl, unMatchImagetUrl, courseUrl, basicinfo, selectinfo, selectstyle} from '@/module/admin/config/userinfo'

export default {
  name: 'AJusermatch',
  components: {
    Linklist,
    Ghead,
    Gfoot,
    AJposition,
    page
  },
  data () {
    return {
      unMatchStudentList: [],
      bingo: ['selected'],
      totalnum: '',
      pageindex: 1,
      pagesize: 18,
      eduType: this.$store.state.educationType,
      selectinfo: selectinfo,
      selectstyle: selectstyle,
      basicinfo: basicinfo,
      grade: '',
      classesId: ''
    }
  },
  computed: {
    totalpage () {
      return Math.ceil(this.totalnum / this.pagesize)
    }
  },
  methods: {
    async getclasses () { // 普教班级
      let that = this
      try {
        let res = await this.axios.post(getclassesurl, {'studySectionId': that.grade})
        let objs = res.data.classesList
        let temp = []
        temp.push({value: '', txt: '全部'})
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].classesId
          temp[item + 1]['txt'] = objs[item].classesName
        }
        this.$Select({
          'data': temp,
          'selectId': 'select37',
          'callback': function (obj) {
            that.classesId = obj.value
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    async getgrades () { // 普教年级
      let that = this
      try {
        let res = await this.axios.post(getgradesurl)
        let objs = res.data.data
        let temp = []
        temp.push({value: -1, txt: '全部'})
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].id
          temp[item + 1]['txt'] = objs[item].name
        }
        this.$Select({
          'data': temp,
          'selectId': 'select36',
          'callback': function (obj) {
            that.grade = obj.ind ? obj.value : ''
            that.getclasses()
          },
          'matchval': [{val: -1}]
        })
      } catch (err) {
        console.log(err)
      }
      this.axios({
        method: 'post',
        url: getgradesurl
      })
        .then(function (res) {

        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async getcollegemajor () { // 高教院系专业班级
      try {
        let that = this
        let res = await this.axios({method: 'post', url: courseUrl})
        let objs = res.data.classesList
        let temp = []
        temp[0] = {value: '-1', txt: '请选择...', list: []}
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].collegeId
          temp[item + 1]['txt'] = objs[item].collegeName
          temp[item + 1]['list'] = objs[item].majorList
        }
        this.$Select({
          'data': temp,
          'selectId': 'select33',
          'callback': function (obj) {
            let objs = obj.list
            let temp = []
            temp[0] = {value: '-1', txt: '请选择...', list: []}
            for (let item = 0; item < objs.length; item++) {
              temp[item + 1] = {}
              temp[item + 1]['value'] = objs[item].majorId
              temp[item + 1]['txt'] = objs[item].majorName
              temp[item + 1]['list'] = objs[item].classesList
            }
            that.$Select({
              'data': temp,
              'selectId': 'select34',
              'callback': function (obj) {
                let objs = obj.list
                let temp = []
                temp[0] = {value: '-1', txt: '请选择...'}
                for (let item = 0; item < objs.length; item++) {
                  temp[item + 1] = {}
                  temp[item + 1]['value'] = objs[item].classesId
                  temp[item + 1]['txt'] = objs[item].classesName
                }
                that.$Select({
                  'data': temp,
                  'selectId': 'select35',
                  'callback': function (obj) {
                    that.classesId = obj.ind ? obj.value : ''
                    console.log(that.classesId)
                  }
                })
              },
              'matchval': [{val: -1}]
            })
          },
          'matchval': [{val: -1}]
        })
      } catch (err) {
        console.log(err)
      }
    },
    async pagepost (value) {
      let num = value || 1
      this.pageindex = num
      this.bingo = []
      this.bingo[num - 1] = 'selected'
      try {
        let res = await this.axios.post(unMatchImagetUrl, {classesId: this.classesId, page: {pageSize: this.pagesize, pageIndex: this.pageindex}})
        this.totalnum = res.data.total
        this.unMatchStudentList = res.data.unMatchStudentList
      } catch (err) {
        console.log(err)
      }
    },
    add (item) {
      this.$router.push({name: 'AJusermatchadd', params: {item: item}})
    },
    del (item) {
      this.$router.push({name: 'AJusermatchdel', params: {item: item}})
    }
  },
  mounted () {
    if (this.eduType) {
      this.getcollegemajor()
    } else {
      this.getgrades()
    }
    this.pagepost(1)
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJusermatch') {
        this.pagepost(this.pageindex)
      }
    }
  }
}
</script>
