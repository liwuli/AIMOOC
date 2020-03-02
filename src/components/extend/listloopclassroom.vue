<template>
	<div ref="box" class="player-box row class-room">
		<div id="V_fullScreen" class="fullscreen iconfont icon-a" title="点击进入全屏"></div>
		<div id="playerArea" :channel="channel" :screens="screens" ></div>
		<page :bingo="bingo" :totalnum="totalnum"  @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page>
		<div style="display: none;">{{info}}</div>
	</div>
</template>
<script type='text/javascript'>
import '../../../static/cklive/css/smart.css'
// import '../../../static/cklive/src/ckplayer/xkckplayer.js'
import page from '@/components/extend/page'
import {delallN, addallN} from '@/components/config/listinfo'
export default {
  created () {
    let _this = this
    let ckplay = document.createElement('script')
    ckplay.setAttribute('src', '/static/cklive/src/ckplayer/ckplayer.js')
    ckplay.setAttribute('id', 'ckscript')
    if (!document.getElementById('ckscript')) {
      document.body.appendChild(ckplay)
      ckplay.onload = function () {
        _this.jsload = true
      }
    } else {
      this.jsload = true
    }
  },
  data () {
    return {
      maxWidth: 800,
      msg: 'list',
      bingo: [],
      pagesize: 5,
      pageindex: 1,
      totalpage: 0,
      str: '',
      delallN: delallN,
      addallN: addallN,
      flashinfo: '',
      jsload: false
    }
  },
  props: ['screens', 'totalnum', 'channel', 'title', 'pageval', 'bingos', 'pageinfo', 'pathinfo', 'info'],
  methods: {
    pagedeal () {
      this.bingo = []
      for (let i = 0; i < this.totalpage; i++) {
        if (this.pageindex - 1 === i) {
          this.bingo.push('selected')
        } else {
          this.bingo.push('')
        }
      }
    },
    pagepost (page) {
      this.$emit('pagepost', {page: page})
    }
  },
  components: {
    page
  },
  beforeUpdate () {
    this.totalpage = this.pageinfo
    this.bingo = this.bingos
    if (this.screens === '1') {
      this.pagesize = 9
    } else {
      this.pagesize = 5
    }
    this.pageindex = this.pageval
    this.maxWidth = this.$refs.box.offsetWidth
  },
  updated () {
    let that = this
    if (this.jsload) {
      if (!this.flashinfo) {
        this.flashinfo = this.$CFCMXK({
          id: 'playerArea',
          keycodeevent: false,
          channelnum: that.pagesize, // 分屏模式
          channelB: that.info,
          channeltitle: that.title,
          controlhei: 0,
          widhei: {
            wid: this.maxWidth
          }
        })
      } else {
        this.flashinfo.resetflashinfo(this.info, this.title, this.pageval, this.pagesize, this.channel, this)
      }
    }
  }
}
</script>
<style>

/*  .nosingal{
	  display: none !important;
  } */
  .class-room #playerArea .channel{
		display: none !important;
	}
  
</style>

