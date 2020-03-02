<template>
	<div class="floatleft">
		<div class="railpartcommont" v-show='show'>{{titleinfo}}</div>
		<div class="railpart" :id="railid || rail" >{{dateval}}</div>
    <div class="floatright" style="width: 100px">
      <div id="less" @mouseup="lessevent" class="less" v-show='show'>{{prev}}</div>
      <div id="add" @mouseup="addevent" class="add" v-show='show'>{{next}}</div>
      <slot></slot>
    </div>
	</div>
</template>
<script type='text/javascript'>
import * as types from '@/components/config/listinfo'
export default {
  name: 'Railc',
  data () {
    return {
      rail: 'dates',
      prev: types.prev,
      next: types.next,
      titleinfo: types.railpartcomment,
      railobj: ''
    }
  },
  props: ['railid', 'minweek', 'weekflag', 'maxweek', 'titleinfo', 'dateval', 'resetflag', 'days', 'lostday', 'show'],
  methods: {
    lessevent () {
      if (this.minweek !== undefined) {
        this.railobj.cfg.addeventflag = true
        if (this.weekflag <= this.minweek) {
          this.railobj.cfg.lesseventflag = false
        } else {
          this.$emit('lessevent', 'less')
        }
      } else {
          this.$emit('lessevent', 'less')
      }
    },
    addevent () {
      if (this.maxweek !== undefined) {
        this.railobj.cfg.lesseventflag = true
        if (this.weekflag >= this.maxweek) {
          this.railobj.cfg.addeventflag = false
        } else {
          this.$emit('addevent', 'add')
        }
      } else {
        this.$emit('addevent', 'add')
      }
    }
  },
  updated () {
    let that = this
    if (that.dateval) {
      this.railobj = this.$Railc({
        'id': that.railid || that.rail,
        'date': that.dateval,
        'datelen': that.days ? that.days : 7,
        'lostday': that.lostday ? that.lostday : false,
        'callback': function (obj) {
          that.$emit('railcevent', obj)
        }
      })
    }
  }
}
</script>
