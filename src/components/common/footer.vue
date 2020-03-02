<template>
  <footer class="footer" v-html="footer"></footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      footer: ''
    }
  },
  created () {
    this.footer = this.$store.state.headfooter.footer
  }
}
</script>

<style>
	.footer{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
