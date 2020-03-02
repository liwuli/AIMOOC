<template>
  <div class="app">
  	<Ghead></Ghead>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <link rel="stylesheet" type="text/css" href="../../../../static/css/default/channelmanage.css"/>
    <div class="center centerbottom50">
    	<div class="centers">
    		<Linklist></Linklist>
    		<div class="AA_right">
    			<AJposition></AJposition>
		      <div class="listrank" id="listrank">
						<div class="head">
							<div class="name">{{channelinfo.condition}}</div>
							<div class="status" >{{channelinfo.state}}</div>
							<div class="pink"  style="display: none;">{{channelinfo.rank}}</div>
							<div class="opt">{{channelinfo.opt}}</div>
						</div>
						<div class="list" :id="item.id" v-for="item in listinfo">
							<div class="name">{{item.name}}</div>
							<div class="status" >{{item.stateval}}</div>
							<div class="pink" style="display: none;">
								<input type="text" />
							</div>
							<div class="opt">
								<div class="btnset" @click="setstatefn(item)" style="margin-left: 10px;">
									<span>{{item.btnopt}}</span>
								</div>
								<div class="edit"  @click="editfn(item)">
									<span>{{channelinfo.edit}}</span>
								</div>
								<div class="up">
									<span class="upicon iconfont icon-downlist"></span>
									<span>{{channelinfo.up}}</span>
								</div>
								<div class="down">
									<span class="downicon iconfont icon-downlist"></span>
									<span>{{channelinfo.down}}</span>
								</div>
							</div>
						</div>
					</div>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {CFCMrank} from '../../../../static/js/channelrank.babel.min.js'
import {updownurl, opencloseurl, warntxt, pathinfo, listurl, channelinfo} from '@/module/admin/config/rankmanageinfo'
export default {
  name: 'AJrankmanage',
  data () {
    return {
      warntxt: warntxt,
      pathinfo: pathinfo,
      channelinfo: channelinfo,
      listinfo: []
    }
  },
  created () {
    this.pagepost() // 获取列表
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Linklist
  },
  methods: {
    setstatefn (item) {
      let that = this
      this.axios({
        method: 'post',
        url: opencloseurl,
        params: {
          par: {
            moduleId: item.id,
            status: (item.state === 1 ? 0 : 1)
          }
        }
      })
      .then(function (res) {
        if (res.data.isSuccess) {
          that.pagepost() // 重新调用数据列表
        } else {
          that.win(res.data.data, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    updownfn (val, id) {
      let that = this
      this.axios({
        method: 'post',
        url: updownurl,
        params: {
          par: {
            moduleId: id.toString(),
            upOrDown: val
          }
        }
      })
      .then(function (res) {
        if (res.data.isSuccess) {
          that.pagepost() // 重新调用数据
        } else {
          that.win(res.data.data, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    editfn (item) {
      this.$router.push({name: pathinfo.prex + 'edit', params: {item: item}})
    },
    pagepost () {
      let that = this
      this.axios({
        method: 'post',
        url: listurl
      })
      .then(function (res) {
        let objs = res.data.data
        let temp = []
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].moduleId
          temp[item]['name'] = objs[item].moduleName
          temp[item]['state'] = objs[item].status
          temp[item]['stateval'] = that.changestate(objs[item].status)
          if (objs[item].status) {
            temp[item]['btnopt'] = channelinfo.close
          } else {
            temp[item]['btnopt'] = channelinfo.open
          }
          temp[item]['orderNum'] = objs[item].orderNum
        }
        that.listinfo = temp
      })
      .then(function () {
        CFCMrank({
          fatherid: 'listrank',
          axiosfn: function (direction, id) {
            if (direction === 'up') {
              that.updownfn(0, id)
            } else {
              that.updownfn(1, id)
            }
          }
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    changestate (val) {
      return val ? channelinfo.open1 : channelinfo.close1
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJrankmanage') {
        this.pagepost()
      }
    }
  }
}
</script>
