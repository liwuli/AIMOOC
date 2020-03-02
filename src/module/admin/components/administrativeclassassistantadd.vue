<style type="text/css">
@import url("/static/css/default/Gback.css");
</style>
<template>
	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'width: 780px;height:' + wininfo.contenthei">
	 			<div class="G_search" >
					<div class="part" >
				 	  <span class="txt">{{administrativeclassinfo.collegeN}}:</span>
				 	  <div id='select885' class="Select" ></div>
				 </div>
				 	<div class="part" >
				 	  <input type="text"  v-model="name" :placeholder="administrativeclassinfo.assistantadduserplaceholder"/>
				 	</div>
					 <div class="btn" @click="search">{{administrativeclassinfo.searchN}}</div>
				</div>
	        	<div id="administrtivelist">
					<div class="lists" style="width: 100%;">
						<span class="radio" style="width: 100%;">
							<div class="icon"></div>
							<input type="radio" value="" style="display: none;"/>
							<div class="number">{{relassistantlistheadadd[1]}}</div>
							<div class="number">{{relassistantlistheadadd[3]}}</div>
							<div class="number">{{relassistantlistheadadd[4]}}</div>
						</span>
					</div>
					<div class="lists" v-for="item in products" style="width: 100%;">
						<span class="radio" :id="item.id" style="width: 100%;">
							<div class="icon"></div>
							<input type="radio" :value="item.id"  style="display: none;"/>
							<div class="number hides" :title="item.college">&nbsp;{{item.college}}&nbsp;</div>
							<div class="number hides" :title="item.code" >&nbsp;{{item.code}}&nbsp;</div>
							<div class="number hides" :title="item.name" :id="item.id + '_name'">&nbsp;{{item.name}}&nbsp;</div>
						</span>
					</div>
				</div>
				<page  :totalnum="totalnum" :bingo="bingos" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage" ></page>
        	</div>
        	<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{administrativeclassinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{administrativeclassinfo.sureN}}</div>
 			</div>
		</div>
	</div>
</template>

<script>
import page from '@/components/extend/page'
import * as types from '@/store/win-types'
import {warntxt, setmemeberurl, getcollegeurl, assistantaddurl, administrativeclassinfo, pathinfo, pageval, relassistantlistheadadd, pagesize} from '@/module/admin/config/administrativeclassinfo'
export default {
  name: 'AJadministrativeclassassistantadd',
  data () {
    return {
      msg: administrativeclassinfo.adduser,
      administrativeclassinfo: administrativeclassinfo,
      relassistantlistheadadd: relassistantlistheadadd,
      wininfo: {
        widhei: ['800px', '550px'],
        btncancelleft: '345px',
        contenthei: '433px'
      },
      products: [],
      infoval: [],
      optevent: [],
      pathinfo: pathinfo,
      bingos: [],
      searchinput: 'width:150px;margin-left:790px',
      pagesize: pagesize,
      pageval: pageval,
      totalnum: 0,
      name: '',
      college: '',
      classid: '',
      pageindex: 1,
      totalpage: 0,
      isManualAdmin: ''
    }
  },
  created () {
    this.classid = this.geturlparam('ClassGroupId', location.hash)
    this.college = this.geturlparam('CollegeId', location.hash)
    this.getcollege({page: 1})
    this.pagepost({page: 1})
  },
  components: {
    page
  },
  methods: {
    valid () {
      if (this.isManualAdmin === '') {
        this.win(warntxt.selectmaster, '', false)
        return false
      } else {
        return true
      }
    },
    geturlparam (name, url) {
      let urls = url.split('?')[1].split('&')
      let val = ''
      for (let item = 0; item < urls.length; item++) {
        if (name === urls[item].split('=')[0]) {
          val = urls[item].split('=')[1]
          break
        }
      }
      return val
    },
    getcollege (obj) {
      let that = this
      this.axios({
        method: 'post',
        url: getcollegeurl,
        params: {
          'par': {
            collegeOrOrganization: 0,
            pageSize: 10000,
            pageIndex: obj.page
          }
        }
      })
      .then(function (res) {
        let temp = []
        temp.push({value: '', txt: '全部'})
        let objs = res.data.data
        for (let item = 0; item < objs.length; item++) {
          temp.push({value: objs[item].id, txt: objs[item].collegeName})
        }
        that.$Select({
          'data': temp,
          'selectId': 'select885',
          'callback': function (obj) {
            that.college = obj.value
          }
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: setmemeberurl,
        data: {
          classesId: that.classid,
          teacherId: that.isManualAdmin
        }
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      //this.$router.push({name: pathinfo.prex})
      this.$router.go(-1);
    },
    pagepost (obj) {
      let that = this
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageval = obj.page
      this.axios({
        method: 'post',
        url: assistantaddurl,
        data: {
          collegeId: that.college,
          keywords: that.name,
          page: {
            pageSize: pagesize,
            pageIndex: that.pageval
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.usersList
        that.totalpage = Math.ceil(res.data.total / pagesize)
        that.totalnum = res.data.total
        let start = (that.pageval - 1) * pagesize
        for (let item = start; item < objs.length; item++) {
          if (item < (that.pageval * pagesize < objs.length ? that.pageval * pagesize : objs.length)) {
            temp.push({id: objs[item].userId, code: objs[item].code, name: objs[item].realName, college: objs[item].collegeName})
          }
        }
        that.products = temp
        that.bingos = []
        that.bingos[that.pageval - 1] = 'selected'
      })
      .then(function () {
        that.$Radio({
          'father': '#administrtivelist .lists span',
          'multline': {
            'flag': true,
            'class': '#administrtivelist .lists',
            'index': 0
          },
          'inputflag': true
        }, function (id, val) {
          that.isManualAdmin = id
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    search () {
      this.pagepost({page: 1})
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
  }
}
</script>
