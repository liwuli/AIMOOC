<template>
  <div class="app">
  	<Ghead></Ghead>
  	<link rel="stylesheet" type="text/css" href="../../../../static/css/default/Mcourse.css"/>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<div class="Firsttitle">{{courseName}}</div>
    		<div class="M_left" :style="'min-height:' + Mlefthei + 'px;'">
			 			<div class="Manage" v-for="(items, ind) in links">
			 				<span class="iconfont iconcss" :class="'icon-' + items.icon"></span>
			 				<router-link :key="ind"  class="a hides active" v-if="ind === 2"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
			 				<router-link :key="ind"  class="a hides" v-if="ind !== 2"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
			 			</div>
			  </div>
    		<div class="M_right"  :style="'min-height:' + Mlefthei + 'px;'">
    				<div class="formline" v-show='contentshow'>
					 		<span class="txt">{{synopsisaddN}}：</span>
					 		<editor :styles="styles" @editorcontent="editorcontent"></editor>
					 		<div class="mrightsaveres" style="margin-left: 400px;margin-top: 30px;" @click='savedata'>{{saveN}}</div>
					 	</div>
    				<div class="mrightnoticelist" v-show="!contentshow">
    					<div class="content">
    					  <div class="infos" style="height: auto;" v-html="lists.content"></div>
    					</div>
    					<!--<span class="open iconfont icon-open" @click='openclose($event)'></span>-->
    					<span class="edit iconfont icon-xiugai" @click='edit(lists)'></span>
    					<span class="del iconfont icon-del" @click='del(lists)'></span>
    				</div>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/Nheader'
import AJposition from '@/components/extend/position'
import editor from '@/components/extend/editor.vue'
import {warntxt, listurl, synopsiseditN, synopsisdefault, synopsisaddN, pathinfo, saveN, synopsiscreatebtnN, links, FirsttitleN, listsynopsisurl, savesynopsisurl} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManagesynopsis',
  data () {
    return {
      links: links,
      FirsttitleN: FirsttitleN,
      Mlefthei: window.innerHeight - 65 - 50,
      pathinfo: pathinfo,
      synopsisaddN: synopsisaddN,
      styles: 'width: 100%;float: left;height: 400px;',
      synopsiscreatebtnN: synopsiscreatebtnN,
      lists: synopsisdefault,
      saveN: saveN,
      contentshow: true,
      courseId: '',
      content: '',
      editorobjs: '',
      courseName: ''
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
  },
  components: {
    Ghead,
    AJposition,
    editor
  },
  methods: {
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
    getcoursename () {
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: {
          courseId: that.courseId
        }
      })
      .then(function (res) {
        let obj = res.data
        that.courseName = obj.courseName
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    editorcontent (content) {
      console.log(content)
      this.content = content.content
      this.editorobjs = content.editing
    },
    edit (item) {
      this.synopsisaddN = synopsiseditN
      this.contentshow = true
    },
    del (item) {
      this.$router.push({name: 'AJcourseManagesynopsisdel', params: {item: item}, query: {courseId: this.courseId}})
    },
    savedata () {
      if (this.content.replace(/(<p><br><\/p>)/g, '') === '') {
        this.win(warntxt.synopsisnull, '', false)
        return false
      }
      // axios 保存
      let that = this
      this.axios({
        method: 'post',
        url: savesynopsisurl,
        data: {
          id: that.lists.id,
          courseId: that.courseId,
          content: that.content
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message, '', false)
        } else {
          // 保存成功后，获取列表信息
          that.contentshow = false
          that.pagepost()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    pagepost () {
      let that = this
      this.axios({
        method: 'post',
        url: listsynopsisurl,
        data: {
          courseId: that.courseId
        }
      })
      .then(function (res) {
        let temp = Object.assign({}, synopsisdefault)
        let objs = res.data.result.CoursesOutlineList
        for (let item = 0; item < objs.length; item++) {
          temp['content'] = objs[item].content
          temp['id'] = objs[item].id
        }
        that.lists = Object.assign({}, temp)
        that.editorobjs.txt.html(that.lists.content)
        that.content = that.lists.content
        if (!that.lists.content) {
          that.contentshow = true
        } else {
          that.contentshow = false
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
      if (to.name === 'AJcourseManagesynopsis') {
        this.pagepost()
      }
    }
  },
  mounted () {
    this.getcoursename()
    this.pagepost()
  }
}
</script>
