<template>
	<div class='checks' style="float: left;" >
		<span class="check"  :style="styles" v-for='item in info'>
			<div class="icon"></div>
			<input type="checkbox" :value="item.val"/>
			{{item.txt}}
		</span>
	</div>
</template>
<script type='text/javascript'>
export default {
  name: 'check',
  data () {
    return {
    }
  },
  props: ['forbid', 'info', 'selectarr', 'styles', 'item', 'type'],
  mounted () {
    let temp = []
    if (this.selectarr) {
      temp = this.selectarr
    }
    let that = this
    this.$Check({
      'disabled': this.forbid,
      'father': '.checks  span',
      'inputflag': true,
      'multline': false,
      'init': {
        'index': temp,
        'val': true
      }
    }, function (id, val, str) {
      that.$emit('checkevent', {id: id, val: val, str: str, item: this.item})
    })
  },
  updated () {
    if (this.type === 'edit') {
      let temp = []
      if (this.selectarr) {
        temp = this.selectarr
      }
      let that = this
      this.$Check({
        'father': '.checks  span',
        'inputflag': true,
        'multline': false,
        'init': {
          'index': temp,
          'val': true
        }
      }, function (id, val, str) {
        that.$emit('checkevent', {id: id, val: val, str: str, item: this.item})
      })
    }
  }
}
</script>
