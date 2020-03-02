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
			 				<router-link :key="ind"  class="a hides active" v-if="ind === 0"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
			 				<router-link :key="ind"  class="a hides" v-if="ind !== 0"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
			 			</div>
			  </div>
    		<div class="M_right"  :style="'min-height:' + Mlefthei + 'px;'">
    				<div class="formline">
    					<span class="txt">{{nameN}}<span class="red">*</span></span>
    					<input type="text"  class="input" v-model="courseName"/>
    				</div>
    				<div class="formline">
    					<span class="txt">{{desN}}</span>
    					<textarea name="" class="textarea" v-model="description" rows="" cols=""></textarea>
    				</div>
    				<div class="formline">
    					<span class="txt">{{uploadN}}</span>
    					<!--<input type="file" id="uploadimg" class="input" @change="onchange($event)" style="width: 110px;opacity: 0;"/>-->
    					<div class="selectbtn" @click="selectfn">{{selectN}}</div>
    				</div>
    				<div class="formline">
    					<div id="imgPreview">
							    <img id="img1" :src="allurl"/>
							</div>
    				</div>
    				<div class="mrightsave" @click="savedata" >{{saveN}}</div>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/Nheader'
import AJposition from '@/components/extend/position'
// import {PreviewImage} from '../../../../static/js/imgup.js'
import {localinfo, listurl, editurl, pathinfo, nullN, saveN, selectN, uploadN, desN, nameN, links, FirsttitleN, dcoursepath} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManage',
  data () {
    return {
      links: links,
      FirsttitleN: FirsttitleN,
      Mlefthei: window.innerHeight - 65 - 50,
      uploadN: uploadN,
      selectN: selectN,
      saveN: saveN,
      desN: desN,
      nameN: nameN,
      pathinfo: pathinfo,
      courseName: '',
      description: '',
      imgurl: '',
      courseId: '',
      geturl: '',
      allurl: '',
      files: '',
      courseType: '',
      dcoursepath: dcoursepath
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
    let that = this
    this.axios({
      method: 'post',
      url: listurl,
      data: {
        courseId: that.courseId
      }
    })
    .then(function (res) {
//    console.log(res, 'res from course')
      let obj = res.data
      if (!obj.courseId) {
//      that.win('暂无数据')
      } else {
        that.courseId = obj.courseId
        that.courseName = obj.courseName
        that.description = obj.description
        that.courseType = obj.courseType
        that.allurl = obj.imgurl === null ? that.dcoursepath : obj.imgurl
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  components: {
    Ghead,
    AJposition
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
    selectfn () {
      this.$router.push({'name': this.pathinfo.prex + 'basicupload', query: {courseId: this.courseId}, params: {basicupload: 'basicupload', imgurl: ''}})
    },
    check () {
      if (this.courseName.replace(/\s/gi, '') === '') {
        this.win(nullN, '', false)
      } else {
        return true
      }
    },
    savedata () {
      if (this.check()) {
        let that = this
        this.axios({
          method: 'post',
          url: editurl,
          data: {
            courseId: that.courseId,
            courseName: that.courseName,
            description: that.description,
            courseType: that.courseType,
            imgurl: that.geturl
          }
        })
        .then(function (res) {
          that.win(localinfo.content, '', false, localinfo.msg)
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    win (content, backfn, flag, title) {
      if (flag === undefined) {
        flag = true
      }
      let titles = ''
      if (title === undefined) {
        titles = types.title
      } else {
        titles = title
      }
      this.$Win({
        'title': titles,
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
      if (to.name === 'AJcourseManage') {
//      console.log(from, to)
        if (to.params.geturl) {
          this.geturl = to.params.geturl
          this.allurl = to.params.allurl === null ? this.dcoursepath : to.params.allurl
        }
      }
    }
  }
}
</script>
