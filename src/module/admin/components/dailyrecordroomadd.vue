<style type="text/css">
	.powerlist{
		float: left;
		color: #4e4e4e;
		min-height: 30px;
		line-height: 30px;
		width: 100%;
	}
	.powerlist .titles{
		background: #fff;
		border-bottom: 1px solid #4e4e4e;
		float: left;
		height: 30px;
		width: 100%;
	}
	.powerlist .checklist{
		float: left;
		min-height: 30px;
		padding: 0 10px 0 0;
		width: auto;
	}
	.check, .checked{
		width: auto;
	}
</style>
<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="scrollfather" :id="scrollfather" :style="'width:680px;' + 'height:' + wininfo.contenthei + ';'">
					<div class="scrollson" >
						 <List  :totalnum="totalnum" :pagesize="pagesize" :selectarr="selectlist" @getcheckids="getcheckids" :info='rooms'  :listhead='listhead'  :colums="colums" :percentinfo='percentinfo'></List>
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
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import List from '@/components/extend/listOpenAllcheckforroomadd'
import {pathinfo, saveurl, pagesize, percentinfo1, listhead1, buildingurl, msgroomaddN, saveN, cancelN} from '@/module/admin/config/dailyrecordinfo'
export default {
  name: 'AJaddroom',
  data () {
    return {
      msg: msgroomaddN,
      wininfo: {
        widhei: ['700px', '470px'],
        btncancelleft: '545px',
        contenthei: '353px'
      },
      scrollfather: 'scrollfather',
      rooms: '',
      checkallflag: false,
      saveN: saveN,
      cancelN: cancelN,
      scroll: '',
      listhead: listhead1,
      percentinfo: percentinfo1,
      selectlist: '',
      totalnum: 0,
      pagesize: pagesize
    }
  },
  beforeCreate () {
    let that = this
    this.axios({
      method: 'post',
      url: buildingurl,
      params: {
        params: {
          pageSize: pagesize,
          pageIndex: 1
        }
      }
    })
    .then(function (res) {
      let temp = []
      let objs = res.data.result.data
      that.totalnum = objs.length
      for (let item = 0; item < objs.length; item++) {
        temp[item] = {}
        temp[item]['ind'] = item
        temp[item]['id'] = objs[item].buildingId
        temp[item]['name'] = objs[item].buildingName
        temp[item]['des'] = objs[item].buildingDescription
        temp[item]['list'] = []
        let objsub = objs[item].classrooms
        for (let k = 0; k < objsub.length; k++) {
          temp[item]['list'][k] = {}
          temp[item]['list'][k]['id'] = objsub[k].classroomId
          temp[item]['list'][k]['name'] = objsub[k].classroomName
          temp[item]['list'][k]['address'] = objsub[k].classroomAddress
        }
      }
      that.rooms = temp
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  components: {
    List
  },
  methods: {
    valid () {
    },
    getcheckids (ids) {
      this.idarr = []
      let temp = []
      for (let i = 0; i < ids.length; i++) {
        temp[i] = {}
        for (let m = 0; m < ids[i].length; m++) {
          if (m === ids[i].length - 1) {
            let str = ids[i][m].cfg.str
            for (let k in str) {
              let idopt = k.split('_')
              if (!temp[i][idopt[1]]) { // 如果没有该项，则添加该项
                temp[i][idopt[1]] = idopt[1]
              }
            }
          }
        }
      }
      for (let m = 0; m < temp.length; m++) {
        if (temp[m]) {
          for (let k in temp[m]) {
            this.idarr.push(temp[m][k])
          }
        }
      }
    },
    checkevent (ev) {
      let flag = ev.currentTarget.className
      if (flag === 'check') {
        ev.currentTarget.className = 'checked'
      } else {
        ev.currentTarget.className = 'check'
      }
    },
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: saveurl,
        data: {
          'params': {
            classroomIds: that.idarr
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message, that.cancelfn, false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.go(-1);
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
  mounted () {
    let obj = this.$route.params.selectlist
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.selectlist = obj
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
