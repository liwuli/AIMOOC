<template>
 	<div class="formwin">
 		<transition name="fade">
	    	<router-view></router-view>
	    </transition>
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfnlabel"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei + ';'">
			 	<div class="scrollfather" :id="scrollfather" :style="'width:680px;' + 'height:' + wininfo.contenthei + ';'">
					<div class="scrollson" >
						<div class="labellist" v-for="item in labellist">
							<div class="label">{{item.labelGroupName}}</div>
							<div class="checkfather">
								<span @click="checkboxevent($event)" :id="items.labelId" :class="(selectedlabel[items.labelId] && selectedlabel[items.labelId].id === items.labelId) ? 'checked' : 'check'"  v-for="items in item.labels">
									<div class="icon"></div>
									{{items.labelName}}
								</span>
							</div>
						</div>
					</div>
					<div class="scroll_ymove">
						<div class="scroll_y" ></div>
					</div>
					<div class="scroll_xmove">
						<div class="scroll_x"></div>
					</div>
				</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfnlabel" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedatalabel">{{msgsetN}}</div>
 			</div>
 		</div>
 	</div>
</template>
<script>
import * as types from '@/store/win-types'
import {labelinfo, cancelN, getlabelsurl} from '@/module/admin/config/courseonlineinfo'
export default {
  name: 'AJcourseOnlinelabeledit',
  data () {
    return {
      msg: labelinfo.title,
      wininfo: {
        widhei: ['700px', '470px'],
        btncancelleft: '245px',
        contenthei: '353px'
      },
      labelinfo: labelinfo,
      scrollfather: 'scrollfather',
      msgsetN: labelinfo.saveN,
      cancelN: cancelN,
      scroll: false,
      labellist: [],
      idstring: {},
      selectedlabel: '',
      info: '',
      edit: ''
    }
  },
  mounted () {
    let routeinfo = this.$route.params.labels
    if (routeinfo) {
      this.selectedlabel = routeinfo
      this.idstring = Object.assign({}, routeinfo, {})
      this.info = this.$route.params.info
      this.edit = this.$route.params.edit
    }
    this.getlabel()
  },
  methods: {
    savedatalabel () {
      if (this.edit === 'edit') {
        this.$router.push({name: 'AJcourseOnlineedit', params: {selectarr: this.idstring, info: this.info}})
      } else {
        this.$router.push({name: 'AJcourseOnlineadd', params: {selectarr: this.idstring}})
      }
    },
    getlabel () {
      let that = this
      this.axios({
        method: 'post',
        url: getlabelsurl
      })
      .then(function (res) {
        that.labellist = res.data.result
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    checkboxevent (ev) {
      let obj = ev.currentTarget
      let idval = obj.getAttribute('id')
      if (obj.className === 'check') {
        obj.className = 'checked'
        this.idstring[idval] = {id: idval, name: obj.textContent}
      } else {
        obj.className = 'check'
        delete this.idstring[idval]
      }
    },
    cancelfnlabel () {
      if (this.edit === 'edit') {
        this.$router.push({name: 'AJcourseOnlineedit', params: {selectarr: this.idstring, info: this.info}})
      } else {
        this.$router.push({name: 'AJcourseOnlineadd', params: {selectarr: this.idstring}})
      }
    },
    win (content, backfn, flag) {
      if (flag === undefined) {
        flag = true
      }
      this.$Win({
        'title': types.title,
        'type': 'txt',
        'content': content,
        'timeout': types.Timeout3,
        'cancel': function (obj) {
          obj.remove(obj.getid)
        },
        'closeshow': flag,
        'timefn': function () {
          if (backfn) {
            backfn()
          }
        }
      })
    }
  },
  updated () {
    if (!this.scroll) {
      this.scroll = this.$Scroll({
        'father': 'scrollfather',
        'getfatheridPosition': document.querySelector('.formwin'),
        'scrollels': '.app'
      })
    } else {
      this.scroll.addElement()
    }
  }
}
</script>
