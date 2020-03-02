<template>
  <div class="app">
    <Ghead></Ghead>

    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div class="center centerbottom50">
      <div class="centers">
        <Linklist></Linklist>
        <div class="GAA_right"  :style="'min-height:' + Mlefthei + 'px;'">
          <div class="G_positon">
            <div class="item">
              <a href="#/evaluateTemplateloop" class="active">{{evaluationtempletsetinfo.xkpj}}</a>
              <span class="separator">></span>
            </div>
            <div class="item">
              &nbsp;&nbsp;{{evaluationtempletsetinfo.xkpjmbsz}}
            </div>
          </div>
          <div class="typeline">
            <div class="part" @click="opentype(0)">
              <span class="spanicon iconfont radioed" style="margin-top: 0;">
                <div class="icon"></div>
              </span>
              <span class="spantxt">{{evaluationtempletsetinfo.radio}}</span>
            </div>
            <div class="part" @click="opentype(1)">
              <span class="spanicon iconfont checked" style="margin-top: 0;">
                <div class="icon"></div>
              </span>
              <span class="spantxt">{{evaluationtempletsetinfo.check}}</span>
            </div>
            <div class="part" @click="opentype(2)">
              <span class="spanicon iconfont icon-xkmbszscole"></span>
              <span class="spantxt">{{evaluationtempletsetinfo.scolename}}</span>
            </div>
            <div class="part" @click="opentype(3)">
              <span class="spanicon iconfont icon-xkmbcount"></span>
              <span class="spantxt">{{evaluationtempletsetinfo.count}}</span>
            </div>
            <div class="part" @click="opentype(4)">
              <span class="spanicon iconfont icon-xkmbwenda"></span>
              <span class="spantxt">{{evaluationtempletsetinfo.wenda}}</span>
            </div>
            <div class="resee" @click="jumptoresee">{{evaluationtempletsetinfo.resee}}</div>
          </div>
          <div class="evaluatetitle">{{evaluatetitle}}</div>
          <div class="evaluatetypelist" v-show="item.display" v-for="(item, ind) in evaluateinfo">
            <div class="evaluateintitle">
              {{item.num + 1}}.{{item.title}}
              <span class="scole" v-if="item.type === 'scole'">{{item.scole}}{{evaluationtempletsetinfo.scoletxt}}</span>
            </div>
            <Radio v-if="item.type === 'radio'" @radioevent="radioevent" :item="item" :type="item.aetype"  :radioinfo="item.radioinfo"></Radio>
            <Check v-if="item.type === 'check'" @checkevent="checkevent"   :item="item" :type="item.aetype" :info="item.checkinfo"></Check>
            <input type="number" min="0" class="scoleinput" v-if="item.type === 'scole'" v-model="evaluateinfo[ind].scoleval"/>
            <input type="text" min="0" class="scoleinput" v-if="item.type === 'count'" v-model="evaluateinfo[ind].countval"/>
            <span class="scole" style="float: left;margin: 15px 0 0 5px;" v-if="item.type === 'count'">{{evaluateinfo[ind].count}}</span>
            <textarea name="" rows="" cols="" class="textarea" v-if="item.type === 'question'" v-model="evaluateinfo[ind].questionval"></textarea>
            <span class="del icon-dellist iconfont" @click="delevaluatetypelist(item)"></span>
            <span class="edit iconfont icon-usercenteredit" @click="editevaluatetypelist(item)"></span>
          </div>
          <div class="saveevaluate" @click="saveevaluatefn" v-show="evaluateflag">{{evaluationtempletsetinfo.saveN}}</div>
        </div>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import Linklist from './linklist'
// import * as Mtypes from '@/store/mutation-types'
import Radio from '@/components/extend/radio'
import Check from '@/components/extend/check'
import {getevaluateurl, evaluationtempletsetinfo, saveurl} from '@/module/admin/config/evaluateTemplateloopsetinfo'
export default {
  name: 'AJevaluateTemplateloopsettemplate',
  data () {
    return {
      evaluationtempletsetinfo: evaluationtempletsetinfo,
      templateid: '',
      evaluateinfo: [],
      evaluateflag: false,
      evaluatetitle: '',
      isOpen: 0
    }
  },
  created () {
    this.templateid = this.geturlparam('templateid', location.hash)
    this.evaluatetitle = decodeURIComponent(this.geturlparam('evaluatetitle', location.hash))
    this.isOpen = this.geturlparam('isOpen', location.hash)
    this.getevaluate()
  },
  components: {
    Ghead,
    Gfoot,
    Linklist,
    Radio,
    Check
  },
  methods: {
    getevaluate () {
      let that = this
      this.axios({
        method: 'post',
        url: getevaluateurl,
        params: {
          modelId: that.templateid
        }
      })
      .then(function (res) {
        let objs = res.data.data
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
            for (let items = 0; items < objs[item].subDetails.length; items++) {
              titlearr.push(objs[item].subDetails[items].subTitle)
              valarr.push(items)
            }
            temp[item].radioinfo.classname = 'radiofather radio' + item
            temp[item].radioinfo.val = valarr
            temp[item].radioinfo.title = titlearr
            temp[item].radioinfo.opt = {}
            temp[item].radioinfo.opt.inputflag = true
            temp[item].radioinfo.opt.init = {val: false, index: 0}
            temp[item].radioinfo.opt.father = '.radio' + item + ' span'
          } else if (objs[item].questionType === 1) {
            temp[item].type = 'check'
            temp[item].num = item
            temp[item].aetype = 'add'
            temp[item].title = objs[item].detailTitle
            temp[item].display = true
            temp[item].checkinfo = []
            for (let items = 0; items < objs[item].subDetails.length; items++) {
              temp[item].checkinfo.push({txt: objs[item].subDetails[items].subTitle, val: items})
            }
          } else if (objs[item].questionType === 2) {
            temp[item].type = 'scole'
            temp[item].num = item
            temp[item].title = objs[item].detailTitle
            temp[item].display = true
            temp[item].scole = objs[item].detailPoint
            temp[item].scoleval = ''
          } else if (objs[item].questionType === 3) {
            temp[item].type = 'count'
            temp[item].num = item
            temp[item].title = objs[item].detailTitle
            temp[item].display = true
            temp[item].count = objs[item].detailUnit
            temp[item].countval = objs[item].detailPoint
          } else if (objs[item].questionType === 4) {
            temp[item].type = 'question'
            temp[item].num = item
            temp[item].title = objs[item].detailTitle
            temp[item].display = true
            temp[item].questionval = ''
          }
        }
        that.evaluateinfo = temp
        if (that.evaluateinfo.length > 0) {
          that.evaluateflag = true
        } else {
          that.evaluateflag = false
        }
        localStorage.setItem('evaluationinfo', JSON.stringify(that.evaluateinfo))
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jumptoresee () {
      localStorage.setItem('evaluationinfo', JSON.stringify(this.evaluateinfo))
      let routeData = this.$router.resolve({name: 'AJevaluateTemplateloopsettemplateresee', query: {templateid: this.templateid, evaluatetitle: this.evaluatetitle}})
      window.open(routeData.href, '_blank')
    },
    editevaluatetypelist (item) {
      switch (item.type) {
        case 'question':
          this.$router.push({name: 'AJevaluateTemplateloopsettemplateQuestionedit', query: {templateid: this.templateid}, params: {item: item, evaluateinfo: this.evaluateinfo}})
          break
        case 'count':
          this.$router.push({name: 'AJevaluateTemplateloopsettemplateCountedit', query: {templateid: this.templateid}, params: {item: item, evaluateinfo: this.evaluateinfo}})
          break
        case 'scole':
          this.$router.push({name: 'AJevaluateTemplateloopsettemplateScoleedit', query: {templateid: this.templateid}, params: {item: item, evaluateinfo: this.evaluateinfo}})
          break
        case 'check':
          this.$router.push({name: 'AJevaluateTemplateloopsettemplateCheckedit', query: {templateid: this.templateid}, params: {item: item, evaluateinfo: this.evaluateinfo}})
          break
        case 'radio':
          this.$router.push({name: 'AJevaluateTemplateloopsettemplateRadioedit', query: {templateid: this.templateid}, params: {item: item, evaluateinfo: this.evaluateinfo}})
          break
      }
    },
    delevaluatetypelist (item) {
      this.$router.push({name: 'AJevaluateTemplateloopsettemplatedel', query: {templateid: this.templateid}, params: {item: item, evaluateinfo: this.evaluateinfo}})
    },
    opentype (num) {
      switch (num) {
        case 0:
          this.$router.push({name: 'AJevaluateTemplateloopsettemplateRadioadd', query: {templateid: this.templateid}, params: {evaluateinfo: this.evaluateinfo}})
          break
        case 1:
          this.$router.push({name: 'AJevaluateTemplateloopsettemplateCheckadd', query: {templateid: this.templateid}, params: {evaluateinfo: this.evaluateinfo}})
          break
        case 2:
          this.$router.push({name: 'AJevaluateTemplateloopsettemplateScoleadd', query: {templateid: this.templateid}, params: {evaluateinfo: this.evaluateinfo}})
          break
        case 3:
          this.$router.push({name: 'AJevaluateTemplateloopsettemplateCountadd', query: {templateid: this.templateid}, params: {evaluateinfo: this.evaluateinfo}})
          break
        case 4:
          this.$router.push({name: 'AJevaluateTemplateloopsettemplateQuestionadd', query: {templateid: this.templateid}, params: {evaluateinfo: this.evaluateinfo}})
          break
      }
    },
    geturlparam (name, url) {
      let urls = url.split('?')[1].split('&')
      let val = ''
      for (let item = 0; item < urls.length; item++) {
        if (name === urls[item].split('=')[0]) {
          val = urls[item].split('=')[1]
          break
        }
      }
      return val
    },
    saveevaluatefn () {
      let dataobj = []
      for (let item = 0; item < this.evaluateinfo.length; item++) {
        dataobj[item] = {}
        dataobj[item].detailTitle = this.evaluateinfo[item].title
        if (this.evaluateinfo[item].type === 'radio') {
          dataobj[item].questionType = 0
          dataobj[item].subDetails = []
          for (let items = 0; items < this.evaluateinfo[item].radioinfo.title.length; items++) {
            dataobj[item].subDetails[items] = {}
            dataobj[item].subDetails[items].subTitle = this.evaluateinfo[item].radioinfo.title[items]
          }
        } else if (this.evaluateinfo[item].type === 'check') {
          dataobj[item].questionType = 1
          dataobj[item].subDetails = []
          for (let items = 0; items < this.evaluateinfo[item].checkinfo.length; items++) {
            dataobj[item].subDetails[items] = {}
            dataobj[item].subDetails[items].subTitle = this.evaluateinfo[item].checkinfo[items].txt
          }
        } else if (this.evaluateinfo[item].type === 'scole') {
          dataobj[item].questionType = 2
          dataobj[item].detailPoint = this.evaluateinfo[item].scole
        } else if (this.evaluateinfo[item].type === 'count') {
          dataobj[item].questionType = 3
          dataobj[item].detailUnit = this.evaluateinfo[item].count
        } else if (this.evaluateinfo[item].type === 'question') {
          dataobj[item].questionType = 4
        }
      }
      let that = this
      this.axios({
        method: 'post',
        url: saveurl,
        data: {
          modelId: that.templateid,
          details: dataobj
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
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
      this.$router.push({name: 'AJevaluateTemplateloop'})
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
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJevaluateTemplateloopsettemplate') {
        if (to.params.radioinfo) {
          if (to.params.num !== undefined) {
            this.evaluateinfo.splice(to.params.num, 1, to.params.radioinfo)
          } else {
            this.evaluateinfo.push(to.params.radioinfo)
          }
          if (this.evaluateinfo.length > 0) {
            this.evaluateflag = true
          } else {
            this.evaluateflag = false
          }
        }
        if (to.params.del) {
          to.params.del.display = false
          this.evaluateinfo.splice(to.params.del.num, 1)
          for (let item = 0; item < this.evaluateinfo.length; item++) {
            this.evaluateinfo[item].num = item
          }
        }
      }
    }
  }
}
</script>
