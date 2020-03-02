<template>
	<div class="singlefile">
		<form action="">
		<input type="file" id='singlefile' @change="change($event)" style="border:none;display: none;" :accept="type"/>
		<div @click='fileclick($event)' class="filebtn">{{singlefileN}}</div>
		<div class="singlefileshow hides">{{filename}}</div>
		</form>
	</div>
</template>
<script type='text/javascript'>
import * as types from '@/components/config/listinfo'
export default {
  name: 'singlefile',
  data () {
    return {
      files: '',
      fileinfo: '',
      filename: '',
      singlefileN: types.singlefileN
    }
  },
  props: ['type'],
  mounted () {
  },
  methods: {
    fileclick (ev) {
      ev.currentTarget.previousElementSibling.click()
//    document.getElementById('singlefile').click()
    },
    change (ev) {
      this.files = ev.currentTarget.value
      this.fileinfo = ev.currentTarget.files[0]
      this.filename = this.fileinfo.name
      this.$emit('fileevent', {fileval: this.files, fileinfo: this.fileinfo})
    }
  }
}
</script>
