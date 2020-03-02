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
						<div class="labelgrouplist" >
							<div class="checkfather">
								<span @click="checkboxevent($event)" class="check" :id="item.labelGroupId" v-for="item in labelgrouplist">
									<span class="icon"></span>
									{{item.labelGroupName}}
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
import {screenImportN, saveN, cancelN, exceptlist, addurl} from '@/module/admin/config/coursescreeninfo'
export default {
  name: 'AJcurriculumimport',
  data () {
    return {
      msg: screenImportN,
      wininfo: {
        widhei: ['700px', '470px'],
        btncancelleft: '245px',
        contenthei: '353px'
      },
      scrollfather: 'scrollfather',
      msgsetN: saveN,
      cancelN: cancelN,
      scroll: false,
      labelgrouplist: [],
      idstring: {},
      labelGroupArr: [],
      selectedlabel: '',
      info: '',
      edit: ''
    }
  },
  created () {
    this.getlabelGroups()
  },
  methods: {
    getlabelGroups () {
      let that = this
      this.axios({
        method: 'post',
        url: exceptlist
      })
      .then(function (res) {
        that.labelgrouplist = res.data.labelGroups
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
        this.idstring[idval] = {labelGroupId: idval, labelGroupName: obj.textContent.replace(/\$|\n|\t/gi, '')}
        this.labelGroupArr = []
        for (let keys in this.idstring) {
          this.labelGroupArr.push(this.idstring[keys])
        }
      } else {
        obj.className = 'check'
        delete this.idstring[idval]
      }
    },
    savedatalabel () {
      let that = this
      this.axios({
        method: 'post',
        url: addurl,
        data: {
          labelGroups: that.labelGroupArr
        }
      })
      .then(function (res) {
        let resinfo = res.data
        if (resinfo.id === '0') {
          that.win(resinfo.content, '', false)
        } else {
          that.cancelfnlabel()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfnlabel () {
      this.$router.push({name: 'AJcurriculum'})
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
