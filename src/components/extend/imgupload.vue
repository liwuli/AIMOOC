<template>
	<div>
		<vue-core-image-upload 
		:extensions='' 
		:crop = "true"
		class="btn btn-primary" 
		@imageuploaded="imageuploaded" 
		:max-file-size="5242880" 
		url="" >
	</vue-core-image-upload>
	</div>
</template>
<script type='text/javascript'>
import VueCoreImageUpload from 'vue-core-image-upload'
export default {
  name: 'imgupload',
  components: {
    'vue-core-image-upload': VueCoreImageUpload
  },
  data () {
    return {
      src: ''
    }
  },
  methods: {
    imageuploaded (res) {
      if (res.errcode === 0) {
        this.src = res.data.src
      }
    }
  }
}
</script>
