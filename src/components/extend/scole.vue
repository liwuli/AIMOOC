<template>
    <div class="scoleline">
		<div class="star" :id="starid">
			<div class="starbg" :style="'width: ' + wid + 'px'"></div>
		</div>
		<input type="text" :disabled="disabled" :id="ind" class="number" :style="inputstyle" :value="vals" />
	</div>
</template>
<script>
  export default {
    name: 'scole',
    data () {
      return {
        vals: 0,
        obj: '',
        inputstyle: 'width:50px;background: none;',
        time: 10
      }
    },
    components: {
    },
    props: ['items', 'starid', 'disabled', 'reset', 'resetupdate', 'scoletype', 'type', 'ind', 'bool', 'totalwid', 'starnum', 'inputstyle', 'wid', 'backgroundsize', 'val', 'totalscole'],
    mounted () {
      let that = this
//    this.vals = this.val
      if (this.reset) { // 用于更新inputval值
        this.vals = this.val
      }
      if (this.starid || this.resetupdate) {
        that.obj = that.$Scole({
          'starid': that.starid,
          'init': {
            'starnum': that.starnum ? that.starnum : 5,
            'wid': that.wid ? that.wid : 0, // 默认选中索引
            'val': that.val ? that.val : 0, // 默认选中
            'totalscole': that.totalscole ? that.totalscole : 100,
            'totalwid': that.totalwid ? that.totalwid : 100
          },
          'backgroundsize': that.backgroundsize ? that.backgroundsize : false,
          'disabled': that.bool ? that.bool : false,
          'type': that.type ? that.type : 'auto',
          'callback': function (obj, selfobj) {
            if (that.scoletype === 'init') {
              that.vals = parseInt(obj.val)
            } else {
              that.vals = obj.val
            }
            if (that.items) {
              that.$emit('scoleevent', {'val': that.vals, ind: that.ind, items: that.items, 'obj': selfobj})
            } else {
              that.$emit('scoleevent', {'val': that.vals, ind: that.ind, 'obj': selfobj})
            }
          }
        })
        if (that.ind !== undefined) {
          that.$emit('resetupdateevent', {ind: that.ind})
        }
      }
    },
    updated () {
      let that = this
      if (this.reset) { // 用于更新inputval值
        this.vals = this.val
      }
      if (!this.obj || this.resetupdate) {
        that.obj = that.$Scole({
          'starid': that.starid,
          'init': {
            'starnum': that.starnum ? that.starnum : 5,
            'wid': that.wid ? that.wid : 0, // 默认选中索引
            'val': that.val ? that.val : 0, // 默认选中
            'totalscole': that.totalscole ? that.totalscole : 100,
            'totalwid': that.totalwid ? that.totalwid : 100
          },
          'backgroundsize': that.backgroundsize ? that.backgroundsize : false,
          'type': that.type ? that.type : 'auto',
          'disabled': that.bool ? that.bool : false,
          'callback': function (obj, selfobj) {
            if (that.scoletype === 'init') {
              that.vals = parseInt(obj.val)
            } else {
              that.vals = obj.val
            }
            if (that.items) {
              that.$emit('scoleevent', {'val': that.vals, ind: that.ind, items: that.items, 'obj': selfobj})
            } else {
              that.$emit('scoleevent', {'val': that.vals, ind: that.ind, 'obj': selfobj})
            }
          }
        })
        if (that.ind !== undefined) {
          that.$emit('resetupdateevent', {ind: that.ind})
        }
      }
    }
  }
</script>
