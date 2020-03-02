<template>
 <div style="float: left;width: 100%;">
 	<div class="G_page" style="float: right;" v-show="totalnum > 0" :style="pagestyles" id="G_page" :totalnum="totalnum">
 	<div class="item" v-if="totalnum">共{{totalnum}}条 </div>
 	<div class="item pagegray" v-show="pageindex - 1 <= 0" >&nbsp;首页&nbsp;</div>
 	<div class="item pagegray" v-show="pageindex - 1 <= 0" >&nbsp;上页&nbsp;</div>
 	<div class="item" v-show="pageindex - 1 > 0" @click="jumpto(1)">&nbsp;首页&nbsp;</div>
 	<div class="item" v-show="pageindex - 1 > 0" @click="prevpage" >&nbsp;上页&nbsp;</div>
 	<div class="listG">
	 	<div class="list" :class="bingo[item - 1]" @click="jumpto(item)" v-if="totalpage <= 10" v-for="item in totalpage">
	 		{{item}}
	 	</div>
	 	<div class="list" @click="jumpto(item)" :class="bingo[item - 1]" v-if="totalpage > 10 && (item >= pageindex && item <= pageindex + 2) && pageindex < totalpage - 5 && item <= totalpage - 3" v-for="item in totalpage">
	 		{{item}}
	 	</div>
	 	<div class="list" @click="jumpto(item)" :class="bingo[item - 1]" v-if="totalpage > 10 && pageindex > totalpage - 6 && item > totalpage - 6 && item <= totalpage - 3" v-for="item in totalpage">
	 		{{item}}
	 	</div>
	 	<div class="listcenter" v-show="show">
	 		...
	 	</div>
	 	<div class="list" @click="jumpto(item)" :class="bingo[item - 1]" v-if="totalpage > 10 && totalpage-2 <= item" v-for="item in totalpage">
	 		{{item}}
	 	</div>
 	</div>
 	<div class="item" v-show="totalpage - pageindex > 0" @click="nextpage" >&nbsp;下页&nbsp;</div>
 	<div class="item" v-show="totalpage - pageindex > 0" @click="jumpto(totalpage)">&nbsp;末页&nbsp;</div>
 	<div class="item pagegray" v-show="totalpage - pageindex <= 0" >&nbsp;下页&nbsp;</div>
 	<div class="item pagegray" v-show="totalpage - pageindex <= 0" >&nbsp;末页&nbsp;</div>
 	<div class="item">
 		<!--<div class="txt">跳转</div>-->
 		<input type="text" size="3" v-model="pageval" :value="pageval" @keyup="numberin"/>
 		<div class="go" @click="jumpto(pageval)">GO</div>
 	</div>
 </div>
 <div style="float: left;width: 100%;"><div class="error">{{errorval}}</div></div>
 </div>
</template>

<script>
export default {
  name: 'page',
  data () {
    return {
      msg: '分页：',
      show: false,
      pageval: '',
      errorval: '',
      frompink: 0,
      topink: 0,
      has: 0
    }
  },
  props: ['pagestyles', 'bingo', 'pagesize', 'pageindex', 'totalpage', 'totalnum'],
  methods: {
    numberin () {
      this.pageval = this.pageval.replace(/\D/g, '')
      if (this.totalpage < this.pageval) {
        this.errorval = '超过最大页数'
        return false
      } else if (this.pageval < 0) {
        this.errorval = '页数不能小于0'
        return false
      } else {
        this.errorval = ''
      }
    },
    jumpto (page) {
      if (this.totalpage < page) {
        this.errorval = '超过最大页数'
        return false
      } else if (page < 0) {
        this.errorval = '页数不能小于0'
        return false
      } else {
        this.pageval = ''
        this.$emit('pagepost', page * 1)
      }
    },
    nextpage () {
      if (this.pageindex < this.totalpage) {
        this.$emit('pagepost', this.pageindex + 1)
      } else {
        this.$emit('pagepost', this.totalpage)
      }
    },
    prevpage () {
      if (this.pageindex > 1) {
        this.$emit('pagepost', this.pageindex - 1)
      } else {
        this.$emit('pagepost', 1)
      }
    }
  },
  mounted () {
    if (this.totalpage > 10) {
      this.show = true
    }
    if (this.pageindex + 5 >= this.totalpage) {
      this.show = false
    }
    this.frompink = (this.pageindex - 1) * this.pagesize + 1
    this.topink = this.pageindex < this.totalpage ? this.pageindex * this.pagesize : this.totalnum
    this.has = this.topink - this.frompink + 1
  },
  watch: {
    totalpage: function (val, oldVal) {
      if (val) {
        this.totalpage = val * 1
        if (this.totalpage > 10) {
          if (!this.show) {
            this.show = true
          }
        } else {
          this.show = false
        }
        this.frompink = (this.pageindex - 1) * this.pagesize + 1
        this.topink = this.pageindex < this.totalpage ? this.pageindex * this.pagesize : this.totalnum
        this.has = this.topink - this.frompink + 1
      }
    },
    pageindex: function (val, oldVal) {
      if (this.totalpage > 10) {
        if (!this.show) {
          this.show = true
        }
      } else {
        this.show = false
      }
      this.pageindex = val * 1
      if (val + 5 >= this.totalpage) {
        this.show = false
      }
      this.frompink = (this.pageindex - 1) * this.pagesize + 1
      this.topink = this.pageindex < this.totalpage ? this.pageindex * this.pagesize : this.totalnum
      this.has = this.topink - this.frompink + 1
    },
    totalnum: function (val, oldVal) {
      if (this.totalpage > 10) {
        if (!this.show) {
          this.show = true
        }
      } else {
        this.show = false
      }
      this.totalnum = val * 1
      if (this.pageindex + 5 >= this.totalpage) {
        this.show = false
      }
      this.frompink = (this.pageindex - 1) * this.pagesize + 1
      this.topink = this.pageindex < this.totalpage ? this.pageindex * this.pagesize : this.totalnum
      this.has = this.topink - this.frompink + 1
    }
  }
}
</script>
