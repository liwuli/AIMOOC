<template>
	<div ref="box" class="player-box row">
		<div id="V_fullScreen" class="fullscreen iconfont icon-a" title="点击进入全屏"></div>
		<div id="playerArea" :channel="channel" :screens="screens" ></div>
		<!-- <page :bingo="bingo" :totalnum="totalnum"  @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page> -->
		<!-- <div style="display: none;">{{info}}</div> -->
	</div>
</template>
<script type='text/javascript'>
import '../../../static/cklive/css/index.css'
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
      }
    } else {
      this.jsload = true
    }
  },

  data () {
    return {
      maxWidth: 1080,
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
  props: ['screens', 'totalnum', 'channel', 'title', 'pageval', 'bingos', 'pageinfo', 'pathinfo', 'info','channelnum','classroomid'],
  methods: {

    pagepost (page) {
      this.$emit('pagepost', {page: page})
    },


    setelement(){
        var that  = this;
        var E = {
          on : function(el, type, fn){
            el.addEventListener ?
              el.addEventListener(type, fn, false) :
              el.attachEvent("on" + type, fn);
          },
          un : function(el,type,fn){
            el.removeEventListener ?
              el.removeEventListener(type, fn, false) :
              el.detachEvent("on" + type, fn);
          }
        };


            function handler(e,arg1){
                that.$emit('seedetail',(arg1 || null))
            }

            for(var i = 0 ;i<this.channelnum;i++){
               E.on(document.getElementById('channel_'+i),'click',(function(arg1){
               	return function(e){
               		handler.call(this,e,arg1);
               	};
               })(that.classroomid[i]));
            }
    }

  },
  components: {
    // page
  },
  beforeUpdate () {
    // this.totalpage = this.pageinfo
    // this.bingo = this.bingos
    // if (this.screens === '1') {
    //   this.pagesize = 9
    // } else {
    //   this.pagesize = 4
    // }
    // this.pageindex = this.pageval
    // this.maxWidth = this.$refs.box.offsetWidth
  },
   watch: {
            'channelnum': function(newVal){
               this.flashinfo = this.$CFCMXK({
                 id: 'playerArea',
                 keycodeevent: false,
                 channelnum: this.channelnum, // 分屏模式
                 channelB: this.info,
                 channeltitle: this.title,
                 controlhei: 0,
                 widhei: {
                   wid: this.maxWidth
                 }
               })
               this.setelement();
            },

            'info': function(newVal){
               this.flashinfo = this.$CFCMXK({
                 id: 'playerArea',
                 keycodeevent: false,
                 channelnum: this.channelnum, // 分屏模式
                 channelB: this.info,
                 channeltitle: this.title,
                 controlhei: 0,
                 widhei: {
                   wid: this.maxWidth
                 }
               })

               this.setelement();
            }
  },

  mounted () {
    let that = this
    if (this.jsload) {
      if (!this.flashinfo) {
        this.flashinfo = this.$CFCMXK({
          id: 'playerArea',
          keycodeevent: false,
          channelnum: this.channelnum, // 分屏模式
          channelB: this.info,
          channeltitle: this.title,
          controlhei: 0,
          widhei: {
            wid: this.maxWidth
          }
        })
        this.setelement();
      } else {
        // this.flashinfo.resetflashinfo(this.info, this.title, this.pageval, this.pagesize, this.channel, this)
      }
    }
  }
}
</script>
<style scoped>
  .player-box{
    width: calc(80% - 100px);
    margin: 0 auto;
    position: relative;
    margin-left: calc(10% + 50px);
  }
</style>
