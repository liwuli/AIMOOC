<template>
 <div class="GAA_right" style="width: 96%;padding: 0 2%;margin: 0;overflow-x: hidden;overflow-y: auto;height: 100%;">
 		<link rel="stylesheet" type="text/css" href="/static/css/default/Global.css"/>
   <div v-if="btn" class="close">
     <span @click="close">×</span>
   </div>
 		<div class="evaluatetitle">{{evaluatetitle}}</div>
		<div class="evaluatetypelist" :style="pw" v-show="item.display" v-for="(item, ind) in evaluateinfo">
			<div class="evaluateintitle">
				{{item.num + 1}}.{{item.title}}
				<span v-if="item.type === 'scole'">{{item.scole}}{{evaluationtempletsetinfo.scoletxt}}</span>
			</div>
			<Radio v-if="item.type === 'radio'" :item="item" :type="add" :radioinfo="item.radioinfo" :forbid="true"></Radio>
      <div v-if="item.type === 'check'" class='checks' style="float: left;">
        <span :class="ite.sel?'checked':'check'" v-for='ite in item.checkinfo'>
          <div class="icon"></div>
          {{ite.txt}}
        </span>
      </div>
			<input type="number" min="0" class="scoleinput" v-if="item.type === 'scole'" v-model="evaluateinfo[ind].scoleval" disabled/>
			<input type="number" min="0" class="scoleinput" v-if="item.type === 'count'" v-model="evaluateinfo[ind].countval" disabled/>
			<textarea class="textarea" v-if="item.type === 'question'" v-model="evaluateinfo[ind].questionval" disabled></textarea>
		</div>
 	</div>
</template>

<script>
// import * as types from '@/store/win-types'
import Radio from '@/components/extend/radio'
import {getevaluateDetailurl, getevaluateurl, evaluationtempletsetinfo} from '@/module/admin/config/evaluateTemplateloopsetinfo'
export default {
  name: 'AJevaluateTemplateloopsettemplateresee',
  data () {
    return {
      resultId: '',
      btn: false,
      evaluationtempletsetinfo: evaluationtempletsetinfo,
      templateid: '',
      evaluateinfo: [],
      evaluatetitle: '',
      add: 'add',
      pw: ''
    }
  },
  components: {
    Radio
  },
  methods: {
    init () {
      let obj = this.$route.query
      this.templateid = obj.templateid
      this.evaluatetitle = obj.evaluatetitle
      this.resultId = obj.resultId
      this.btn = obj.origin ? 1 : 0
      if (obj.isOpen) {
        this.getevaluate()
      } else {
        this.evaluateinfo = JSON.parse(localStorage.getItem('evaluationinfo'))
      }
      this.pw = 'padding: 15px;width:' + (window.innerWidth * 0.96 - 30) + 'px;'
    },
    getevaluate () {
      let that = this
      let url = this.resultId ? getevaluateDetailurl : getevaluateurl
      let data = this.resultId ? {resultId: that.resultId, modelId: that.templateid} : {modelId: that.templateid}
      this.axios({
        method: 'post',
        url: url,
        params: data,
        data: data
      })
        .then(function (res) {
          let objs = res.data.stemAndItemList || res.data.data
          if (!objs) {
            return
          }
          let temp = []
          for (let item = 0; item < objs.length; item++) {
            temp[item] = {}
            if (objs[item].questionType === 0) {
              temp[item].type = 'radio'
              temp[item].num = item
              temp[item].aetype = 'add'
              temp[item].title = objs[item].detailTitle
              temp[item].display = true
              temp[item].radioinfo = {}
              let valarr = []
              let titlearr = []
              let val = false
              let index = 0
              for (let items = 0; items < objs[item].subDetails.length; items++) {
                titlearr.push(objs[item].subDetails[items].subTitle)
                valarr.push(items)
                if (objs[item].answers && objs[item].answers[0] === objs[item].subDetails[items].subDetailId) {
                  val = true
                  index = items
                }
              }
              temp[item].radioinfo.classname = 'radiofather radio' + item
              temp[item].radioinfo.val = valarr
              temp[item].radioinfo.title = titlearr
              temp[item].radioinfo.opt = {}
              temp[item].radioinfo.opt.inputflag = true
              temp[item].radioinfo.opt.init = {val: val, index: index}
              temp[item].radioinfo.opt.father = '.radio' + item + ' span'
            } else if (objs[item].questionType === 1) {
              temp[item].type = 'check'
              temp[item].num = item
              temp[item].aetype = 'add'
              temp[item].title = objs[item].detailTitle
              temp[item].display = true
              temp[item].checkinfo = []
              temp[item].selectarr = []
              for (let items = 0; items < objs[item].subDetails.length; items++) {
                if (objs[item].answers && objs[item].answers.indexOf(objs[item].subDetails[items].subDetailId) !== -1) {
                  temp[item].checkinfo.push({txt: objs[item].subDetails[items].subTitle, val: items, sel: true})
                } else {
                  temp[item].checkinfo.push({txt: objs[item].subDetails[items].subTitle, val: items, sel: false})
                }
              }
            } else if (objs[item].questionType === 2) {
              temp[item].type = 'scole'
              temp[item].num = item
              temp[item].title = objs[item].detailTitle
              temp[item].display = true
              temp[item].scole = objs[item].detailPoint
              temp[item].scoleval = objs[item].answers ? objs[item].answers[0] : ''
            } else if (objs[item].questionType === 3) {
              temp[item].type = 'count'
              temp[item].num = item
              temp[item].title = objs[item].detailTitle
              temp[item].display = true
              temp[item].count = objs[item].detailUnit
              // temp[item].countval = objs[item].detailPoint
              temp[item].countval = objs[item].answers ? objs[item].answers[0] : ''
            } else if (objs[item].questionType === 4) {
              temp[item].type = 'question'
              temp[item].num = item
              temp[item].title = objs[item].detailTitle
              temp[item].display = true
              temp[item].questionval = objs[item].answers ? objs[item].answers[0] : ''
            }
          }
          that.evaluateinfo = temp
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    close () {
      this.$router.go(-1)
    }
  },
  created () {
    this.init()
  },
  watch: {
    '$route' () {
      this.init()
    }
  }
}
</script>

<style type="text/css" scoped>
  .close{
    height: 20px;
    position: relative;
  }
  .close span{
    font-size: 40px;
    line-height: 50px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    color: #656;
  }
</style>
