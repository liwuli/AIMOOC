<template>
    <div class="carousel">
    	<div class="total" :style="styles">
    		<div class="item" :style="itemstyle" v-for="(item, ind) in links">
	    		<img :src="item"/>
	    	</div>
    	</div>
    	<div class="btn" :style="btnstyle" >
    		<div class="item" :class="classes[ind]" @click="change(ind)" v-for="(item, ind) in links"></div>
    	</div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      links: ['/static/images/0.jpg', '/static/images/0.jpg', '/static/images/0.jpg'],
      styles: '',
      itemstyle: '',
      btnstyle: '',
      classes: [],
      selected: 0,
      timeout: 3000,
      interval: null
    }
  },
  components: {
  },
  computed: {
    initval () {
      return document.documentElement.clientWidth
    }
  },
  methods: {
    change (ind) {
      clearInterval(this.interval)
      for (let i = 0; i < this.links.length; i++) {
        if (ind === i) {
          this.selected = i
          this.classes[i] = 'selected'
        } else {
          this.classes[i] = ''
        }
      }
      this.styles = 'width:' + this.initval * this.links.length + 'px;margin-left:-' + this.initval * ind + 'px;'
      this.intervalfn()
    },
    autoplay () {
      this.intervalfn()
    },
    intervalfn () {
      let that = this
      let linklen = this.links.length
      this.interval = setInterval(function () {
        that.change(that.selected + 1 > linklen - 1 ? 0 : that.selected + 1)
      }, this.timeout)
    }
  },
  mounted () {
    this.classes[0] = 'selected'
    this.styles = 'width:' + this.initval * this.links.length + 'px;'
    this.itemstyle = 'width:' + this.initval + 'px'
    this.btnstyle = 'left:' + (this.initval - 35 * this.links.length) / 2 + 'px'
    this.autoplay()
  }
}
</script>

