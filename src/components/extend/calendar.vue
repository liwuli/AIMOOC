<template>
	<div style='float:left;margin-top: 2px;position: relative;' >
		<input type='text' :id='ids' :style="inputstyle" :value="dateval" :disabled="forbid"/>
		<div :id= 'ids+"icon"' class='icon iconfont' v-if="!iconclass" :style="iconstyle" style="margin-top: 5px;"></div>
		<div :id= 'ids+"icon"' class="iconfont" :class='iconclass' v-if="iconclass" :style="iconstyle" style="margin-top: 5px;"></div>
	</div>
</template>
<script type='text/javascript'>
export default {
  name: 'Calendarme',
  data () {
    return {
      obj: ''
    }
  },
  props: ['forbid', 'valshow', 'min', 'iconstyle', 'clear', 'iconclass', 'part', 'inputstyle', 'hmsshow', 'ids', 'ymdhms', 'dateval'],
  mounted () {
    this.callback()
  },
  methods: {
    callback () {
      if (!this.forbid) {
        let that = this
        let part = that.part !== undefined ? that.part : document.querySelector('.formwin')
        this.obj = this.$Calendar({
          'id': that.ids,
          'class': 'calendar',
          'init': that.dateval ? that.dateval : '',
          'min': (that.min && that.min !== undefined) ? that.min : false,
          'ymdhMs': that.ymdhms,
          'disabled': false,
          'callback': function (obj, setflag) {
            that.$emit(that.ids + 'fn', obj)
          },
          'hmsshow': that.hmsshow ? that.hmsshow : false,
          'part': part,
          'valshow': that.valshow ? that.valshow : false,
          'iconid': that.ids + 'icon',
          'clear': that.clear ? that.clear : false
        })
        this.$emit(this.ids + 'fn', that.obj.cfg.OriginObj)
      }
    }
  },
  updated () {
//  if (this.obj) {
//    this.obj.cfg.init = this.dateval
//    if (this.min) {
//      this.obj.cfg.min = this.min
//    }
//    if (this.obj.cfg.hourscroll) {
//      this.obj.cfg.hourscroll.cfg.vueupdateflag = true
//    }
//    if (this.obj.cfg.minutesscroll) {
//      this.obj.cfg.minutesscroll.cfg.vueupdateflag = true
//    }
//    if (this.obj.cfg.secondsscroll) {
//      this.obj.cfg.secondsscroll.cfg.vueupdateflag = true
//    }
//    console.log('updated---from vue', this.obj.cfg)
//    this.obj.initVal(this.obj.cfg)
//    this.$emit(this.ids + 'fn', this.obj.cfg.OriginObj)
//  }
  }
}
</script>
