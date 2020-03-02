<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'pading:20px;height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<div id='select0'  style="margin-top: 3px;width: 150px;"></div>
			 		<input type="text" :placeholder="liveinfo.masterselectplaceholder" style="margin: 0px 15px 0px 130px;" class="input" v-model="name"/>
			 		<span class="btn" @click="pagepost(1)">{{liveinfo.search}}</span>
			 	</div>
			 	<div id="livemasterlist">
					<div class="lists" >
						<span class="radio" id="">
							<div class="icon"></div>
							<input type="radio" value="" style="display: none;"/>
							<div class="number">{{liveinfo.schoolnumber}}</div>
							<div class="name">{{liveinfo.mastername}}</div>
						</span>
					</div>
					<div class="lists" v-for="item in masterlist">
						<span class="radio" :id="item.id">
							<div class="icon"></div>
							<input type="radio" :value="item.id"  style="display: none;"/>
							<div class="number hides" :title="item.num">{{item.num}}</div>
							<div class="name hides" :title="item.name" :id="item.id + '_name'">{{item.name}}</div>
						</span>
					</div>
				</div>
				<page  :totalnum="totalnum" :bingo="bingos" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage" ></page>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{liveinfo.cancel}}</div>
 				<div class="save" @click="savedata">{{liveinfo.save}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import page from '@/components/extend/page'
import {warntxt, liveinfo, getuserurl, masterroletypearr, pathinfo, pagesize} from '@/module/admin/config/liveinfo'
export default {
  name: 'AJliveeditmaster',
  data () {
    return {
      msg: liveinfo.masterbtn,
      add: 'add',
      pathinfo: pathinfo,
      pagesize: pagesize,
      pageindex: 1,
      totalpage: 0,
      bingos: [],
      wininfo: {
        widhei: ['576px', '595px'],
        btncancelleft: '200px',
        contenthei: '468px'
      },
      liveinfo: liveinfo,
      type: 4,
      name: '',
      masterlist: [],
      isManualAdmin: false,
      totalnum: 0
    }
  },
  created () {
    this.pagepost({page: 1})
  },
  components: {
    page
  },
  methods: {
    savedata () {
      if (!this.isManualAdmin.id) {
        this.win(warntxt.selectmaster, '', false)
      } else {
        this.$router.push({name: pathinfo.prex + 'edit', params: {isManualAdmin: this.isManualAdmin}})
      }
    },
    pagepost (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageindex = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: getuserurl,
        params: {
          params: {
            pageSize: obj.pagesize ? obj.pagesize : pagesize,
            offset: (obj.page - 1) * pagesize,
            keyword: that.name,
            roleType: that.type
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message, '', false)
        } else {
          let objs = res.data.result.data
          that.masterlist = []
          that.totalnum = res.data.result.total
          that.totalpage = Math.ceil(that.totalnum / pagesize)
          for (let item = 0; item < objs.length; item++) {
            if (item < pagesize) {
              that.masterlist.push({id: objs[item].id, num: objs[item].code, name: objs[item].realName})
            }
          }
          that.bingos = []
          that.bingos[obj.page - 1] = 'selected'
        }
      })
      .then(function () {
        that.$Radio({
          'father': '#livemasterlist .lists span',
          'multline': {
            'flag': true,
            'class': '#livemasterlist .lists',
            'index': 0
          },
          'inputflag': true
        }, function (id, val) {
          that.isManualAdmin = {'id': id, name: document.getElementById(id + '_name').textContent}
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: pathinfo.prex + 'edit'})
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
    let that = this
    that.$Select({
      'data': masterroletypearr,
      'selectId': 'select0',
      'callback': function (obj) {
        that.type = obj.value
      }
    })
  }
}
</script>
