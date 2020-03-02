<template>
	<div :class="classname" >
		<span class="radio" :class="forbid?fixed:''" v-for='(item, ind) in radioinfo.title'>
			<div class="icon"></div>
			<input type="radio" :value="radioinfo.val[ind]"/>
			{{radioinfo.title[ind]}}
		</span>
	</div>
</template>
<script type='text/javascript'>
export default {
  created () {
    if (this.type === 'edit') {
      this.radioinfo = {title: []}
    } else {
      this.classname = this.radioinfo.classname
    }
  },
  data () {
    return {
      fixed: 'radio',
      classname: '',
      vals: ''
    }
  },
  props: ['forbid', 'radioinfo', 'genderval', 'type', 'item'],
  methods: {
    callback () {
      this.$emit('radioevent', {val: this.vals, item: this.item})
    }
  },
  mounted () {
    if (this.type !== 'edit') {
      this.classname = this.radioinfo.classname
      let that = this
      this.$Radio(that.radioinfo.opt,
        function (val) {
          that.vals = val
          that.callback()
        })
    }
  },
  computed: {

  },
  updated () {
    if (this.type === 'edit') {
      let that = this
      this.classname = this.radioinfo.classname
      if (this.genderval !== undefined) {
        this.radioinfo.opt.init.index = this.genderval
      }
      this.$Radio(that.radioinfo.opt,
        function (val) {
          that.vals = val
          that.callback()
        })
    }
  }
}
</script>
