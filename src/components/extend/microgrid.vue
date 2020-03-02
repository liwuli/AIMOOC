<template>
	<div ref="box" class="player-box row " :class=" info.length==5 ? 'class-room':''">
		<div id="V_fullScreen" class="fullscreen iconfont icon-a" title="点击进入全屏"></div>
		<div id="playerArea" :channel="channel" :screens="screens" ></div>
		<!-- <page :bingo="bingo" :totalnum="totalnum"  @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page> -->
		<!-- <div style="display: none;">{{info}}</div> -->
	</div>
</template>
<script type='text/javascript'>
import '../../../static/cklive/css/smart.css'
// import '../../../static/cklive/src/ckplayer/xkckplayer.js'
// import page from '@/components/extend/page'
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
        _this.ckplay = ckplay;
        _this.jsload = true
        _this.play();
      }
    } else {
      this.jsload = true
    }
  },
  data () {
    return {
      maxWidth: 1020,
      msg: 'list',
      bingo: [],
      pagesize: 4,
      pageindex: 1,
      totalpage: 0,
      str: '',
      delallN: delallN,
      addallN: addallN,
      flashinfo: '',
      jsload: false,
      ckplay:null
    }
  },
  props: ['screens', 'channel', 'title', 'info'],
  methods: {
      play(){
        this.flashinfo = this.$CFCMXK({
          id: 'playerArea',
          keycodeevent: false,
          channelnum: this.info.length, // 分屏模式
          channelB: this.info,
          channeltitle: this.title,
          controlhei: 0,
          widhei: {
            wid: this.maxWidth
          }
        })
      }
  },
  components: {
    // page
  },
  beforeUpdate () {
    this.maxWidth = this.$refs.box.offsetWidth
  },
   watch: {
            'info': function(newVal){
               this.flashinfo = this.$CFCMXK({
                 id: 'playerArea',
                 keycodeevent: false,
                 channelnum: this.info.length, // 分屏模式
                 channelB: this.info,
                 channeltitle: this.title,
                 controlhei: 0,
                 widhei: {
                   wid: this.maxWidth
                 }
               })
            },

            'channel': function(newVal){
               this.flashinfo = this.$CFCMXK({
                 id: 'playerArea',
                 keycodeevent: false,
                 channelnum: this.info.length, // 分屏模式
                 channelB: this.info,
                 channeltitle: this.title,
                 controlhei: 0,
                 widhei: {
                   wid: this.maxWidth
                 }
               })

            }
  },

  mounted () {
    let that = this
    if (this.jsload) {
      if (!this.flashinfo) {
        this.flashinfo = this.$CFCMXK({
          id: 'playerArea',
          keycodeevent: false,
          channelnum: this.info.length, // 分屏模式
          channelB: this.info,
          channeltitle: this.title,
          controlhei: 0,
          widhei: {
            wid: this.maxWidth
          }
        })
      } else {
        // this.flashinfo.resetflashinfo(this.info, this.title, this.pageval, this.pagesize, this.channel, this)
      }
    }
  }
}
</script>
<style>


  .class-room #playerArea .channel{
  	display: none !important;
  }

  .player-box{
    width: 1020px;
    margin: 0 auto;
    position: relative;
    /* margin-left: calc(10% + 50px); */
  }
</style>
