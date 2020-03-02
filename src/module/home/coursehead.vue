<template>
  <div class="coursehead">
    <div class="img">
      <img :src="courseheadinfo.imgurl ? courseheadinfo.imgurl : dcoursepath"/>
    </div>
    <div class="title">{{courseheadinfo.title}}</div>
    <div class="line">
      <span class="person iconfont icon-person"></span>
      <span class="persontext">{{courseheadinfo.person}}</span>
      <scole :starid="star" :reset="reset" :totalwid="totalwid" :ind="inds"  :bool="bool"  :starnum="starnum" :inputstyle="inputstyle" :val="courseheadinfo.scoleval" :disabled="disabled" :wid="courseheadinfo.wid" :totalscole="totalscole"></scole>
      <span class="teacher">{{courseinfo.teacher}}: {{courseheadinfo.teacher}}</span>
    </div>
    <div class="line" style="margin-top: 58px;">
      <span class="startlearn" v-if="startlearn === 0" @click="startlearnevent">{{courseinfo.startlearn}}</span>
      <span class="startlearn"  v-if="startlearn === 1" @click="startlearnevent">{{courseinfo.goonlearn}}</span>
      <span class="startlearn"  v-if="startlearn === 2" @click="startlearnevent">{{courseinfo.viewlearn}}</span>
      <span class="focus iconfont" :style="focus ? 'color:#fe0324' : ''" :class="focus ? 'icon-onfocus' : 'icon-focus'" @click="favirate($event)"></span>
      <span class="focustxt" @click="faviratetxt($event)">{{focus ? courseinfo.unfocus : courseinfo.focus}}</span>
    </div>
  </div>
</template>

<script>
import scole from '@/components/extend/scole'
import * as types from '@/store/win-types'
export default {
  name: 'Fcoursehead',
  data () {
    return {
      star: 'star',
      dcoursepath: '/static/images/Dcourse.jpg',
      totalwid: 135,
      inds: 'scoleheadinput_0',
      starnum: 5,
      reset: true,
      totalscole: 5,
      disabled: 'disabled',
      loginN: '请先登录...',
      inputstyle: 'width:25px;margin:0 25px 0 15px;background:none',
      bool: true
    }
  },
  props: ['courseheadinfo', 'courseinfo', 'focus', 'startlearn'],
  components: {
    scole
  },
  methods: {
    favirate (ev) {
      if (window.getCookie('currentUser') === '') {
        this.win(this.loginN, '', false)
        return false
      }
      let classname = ev.target.className
      if (classname.indexOf('icon-focus') >= 0) {
        ev.target.className = classname.replace(/(icon-focus)/gi, 'icon-onfocus')
        ev.target.setAttribute('style', 'color:#fe0324')
        this.$emit('favirate', {status: 1})
      } else {
        ev.target.className = classname.replace(/(icon-onfocus)/gi, 'icon-focus')
        ev.target.removeAttribute('style')
        this.$emit('favirate', {status: 0})
      }
    },
    faviratetxt (ev) {
      if (window.getCookie('currentUser') === '') {
        this.win(this.loginN, '', false)
        return false
      }
      let obj = ev.target.previousElementSibling
      let classname = obj.className
      if (classname.indexOf('icon-focus') >= 0) {
        obj.className = classname.replace(/(icon-focus)/gi, 'icon-onfocus')
        obj.setAttribute('style', 'color:#fe0324')
        this.$emit('favirate', {status: 1})
      } else {
        obj.className = classname.replace(/(icon-onfocus)/gi, 'icon-focus')
        obj.removeAttribute('style')
        this.$emit('favirate', {status: 0})
      }
    },
    startlearnevent () {      
      if (window.getCookie('currentUser') === '') {
        this.win(this.loginN, '', false)
        return false
      }
      this.$emit('startlearnevent', {status: this.startlearn})
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
