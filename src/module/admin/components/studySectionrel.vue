<style type="text/css">
	.powerlist{
		float: left;
		color: #4e4e4e;
		min-height: 30px;
		line-height: 30px;
		width: 100%;
	}
	.powerlist .titles{
		background: #fff;
		border-bottom: 1px solid #4e4e4e;
		float: left;
		height: 30px;
		width: 100%;
	}
	.powerlist .checklist{
		float: left;
		min-height: 30px;
		padding: 0 10px 0 0;
		width: auto;
	}
	.check, .checked{
		width: auto;
	}
</style>
<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'width:97%;height:' + wininfo.contenthei">
			 	<List  :totalnum="totalnum" :pagesize="pagesize" :pageval="pageval" :bingos="bingos" @checkevent="checkevent" :selectedarr = "selectedarr" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import List from '@/components/extend/listchecknoopt'
import {basicinfo, pathinfo, pagesize, percentinforel, pageval, pageinfo, products, infoval, columsrel, saveselecturl, bingos, listheadrel, getselecturl} from '@/module/admin/config/studySectioninfo'
export default {
  name: 'AJstudySectionrel',
  data () {
    return {
      msg: basicinfo.msgroomaddN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['800px', '490px'],
        btncancelleft: '345px',
        contenthei: '373px'
      },
      checkallflag: false,
      pageval: pageval,
      pagesize: pagesize,
      infoval: infoval,
      pageinfo: pageinfo,
      products: products,
      bingos: bingos,
      scroll: '',
      listhead: listheadrel,
      colums: columsrel,
      percentinfo: percentinforel,
      selectedarr: {},
      idarr: [],
      studySectionId: '',
      checkres: [],
      totalnum: 0,
      checkoneflag: false
    }
  },
  components: {
    List
  },
  methods: {
    checkevent (obj) {
      this.checkres = []
      for (let i in obj.checkid) {
        this.checkres.push(obj.checkid[i])
      }
    },
//  checkevent (ev) {
//    let flag = ev.currentTarget.className
//    if (flag === 'check') {
//      ev.currentTarget.className = 'checked'
//    } else {
//      ev.currentTarget.className = 'check'
//    }
//  },
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: saveselecturl,
        params: {
          'par': {
            subjectIds: that.checkres,
            studySectionId: that.studySectionId
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
    pagepost (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: getselecturl,
        params: {
          par: {
            studySectionId: that.studySectionId
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.subjectList
        let selectobj = res.data.HasTheseSubjectIdsIsSelected
        if (!that.checkoneflag) {
          that.checkres = res.data.HasTheseSubjectIdsIsSelected
          that.checkoneflag = true
        }
        that.pageinfo = Math.ceil(objs.length / pagesize)
        that.totalnum = objs.length
        let start = (that.pageval - 1) * pagesize
        for (let item = start; item < (that.pageval * pagesize < objs.length ? that.pageval * pagesize : objs.length); item++) {
          temp[item - start] = {}
          temp[item - start]['id'] = objs[item].subjectId
          temp[item - start]['name'] = objs[item].subjectName
          temp[item - start].selected = false
        }
        let tempse = {}
        for (let item = 0; item < objs.length; item++) {
          for (let items = 0; items < selectobj.length; items++) {
            if (objs[item].subjectId === selectobj[items]) {
              tempse[item] = objs[item].subjectId
              break
            }
          }
        }
        that.selectedarr = tempse
        that.products = temp
        that.bingos = []
        that.bingos[that.pageval - 1] = 'selected'
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
      this.studySectionId = obj.id
      this.pagepost({page: this.pageval})
    }
  }
}
</script>
