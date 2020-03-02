<template>
	<div style="float: left;width: auto;" :class="topclass">
		<div id="less" @mouseup="lessevent" class="less"  v-show='show'>{{prev}}</div>
		<div :class="railpart" :id="railid" >{{dateval}}</div>
		<div id="add" @mouseup="addevent" class="add"  v-show='show'>{{next}}</div>
	</div>
</template>
<script type='text/javascript'>
import * as types from '@/components/config/listinfo'
export default {
  name: 'Railc',
  data () {
    return {
      prev: types.prev,
      next: types.next,
      titleinfo: types.railpartcomment,
      days:7
    }
  },
  //  'days', 去掉了这个传入的属性
  props: ['railid', 'dateval', 'railpart', 'resetflag', 'topclass', 'lostday', 'show'],
  methods: {
    lessevent () {
      this.$emit('lessevent', 'less')
    },
    addevent () {
      this.$emit('addevent', 'add')
    }
  },
  mounted () {
    let that = this
    if (that.dateval) {
      if (!that.railid) {
        that.railid = 'dates'
      }
      if (!that.lostday) {
        that.lostday = false
      }
      if (!that.days) {
        that.days = 7
      }
      this.$Railc({
        'id': that.railid,
        'date': that.dateval,
        'datelen': that.days,
        'lostday': that.lostday,
        'callback': function (obj) {
          that.$emit('railcevent', obj)
        }
      })
    }
  },
  updated () {
    let that = this
    if (that.dateval) {
      if (!that.railid) {
        that.railid = 'dates'
      }
      if (!that.lostday) {
        that.lostday = false
      }
      if (!that.days) {
        that.days = 7
      }
      this.$Railc({
        'id': that.railid,
        'date': that.dateval,
        'datelen': that.days,
        'lostday': that.lostday,
        'callback': function (obj) {
          that.$emit('railcevent', obj)
        }
      })
    }
  }
}
</script>
