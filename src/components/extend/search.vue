<template>
 <div class="G_search" :style="Gsearchstyle">
 	<!-- <input type="text" @blur="blur($event)" :style="styles" v-model="val" :placeholder="msg"/> -->
	 <el-input style="float: left;width: 150px;"
	  :placeholder="msg"
	  v-model="val"
	  clearable>
	</el-input>
	<el-button type="primary" @click="search" style="float: left;margin-left: 20px;" icon="el-icon-search">搜索</el-button>
 	<!-- <div class="btn" @click="search" :style="searchbtnstyles">{{searchN}}</div> -->
 </div>
</template>

<script>
import {searchN, msgSearchN} from '@/components/config/listinfo'
export default {
  name: 'search',
  data () {
    return {
      msg: msgSearchN,
      val: '',
      searchN: searchN
    }
  },
  props: ['Gsearchstyle', 'styles', 'searchbtnstyles'],
  methods: {
    blur (ev) {
      this.val = ev.currentTarget.value
    },
    search () {
      this.$emit('searchevent', {keys: this.val, page: 1})
    }
  }
}
</script>
