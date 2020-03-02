<template>
  <div class="app">
    <Ghead></Ghead>
		<transition name="fade">
			<router-view></router-view>
		</transition>
    <div class="diligence_div1">
    	<span class="diligence_span1" :style="selecttitle==1 ?'color:#459CFC;':''" @click="updatetitle(1)">无感考勤</span>
    	<span class="diligence_span2" :style="selecttitle==2 ?'color:#459CFC;':''" @click="updatetitle(2)">考勤统计</span>

      <el-popover
        placement="bottom"
        width="160"
        v-model="visible">
        <p>您确定导出{{currentTotal}}条考勤记录吗？</p>
        <div style="text-align: right; margin: 0">
      	<el-button size="mini" type="text" @click="visible = false">取消</el-button>
      	<el-button type="primary" size="mini" @click="exportReport" >确定</el-button>
        </div>
       <!-- <el-button slot="reference">删除</el-button> -->
        <el-button v-show="exportReport_status" type="primary" slot="reference"  class="diligence_daochu" >导出</el-button>
      </el-popover>
    </div>
    <div class="diligence_div2" style="z-index: 99999999;">
        <el-menu :default-active="activeIndex" class="el-menu1" mode="horizontal" @select="handleSelect">
      	 <el-menu-item index="1" style="margin-left: 50px;">到勤率实时动态</el-menu-item>
      	 <el-menu-item index="2" style="margin-left: 20px !important;">到勤率回顾</el-menu-item>
      	</el-menu>
    </div>

    <keep-alive>
      <component ref="diligencetable" :is="currentComponent" :courseId="courseId"  @setcurrentTotal="setcurrentTotal"></component>
    </keep-alive>
  </div>
</template>

<script>
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'
  import store from '@/store/index.js'
  import diligencetable from './diligencetable'
  import diligencedynamics from './diligencedynamics'
  export default {
  	name: 'AJstatistics',
  	data(){
      return {
        selecttitle:1,  //标题默认选中
        activeIndex:'1',
        currentTotal:0, //表格数据条数
        visible:false,  //导出的控制显示
        currentComponent:'diligencedynamics',
        courseId: '',
        exportReport_status:false
      }
    },
     components: {
      Ghead,
      Gfoot,
      diligencetable,
      diligencedynamics
     },
    methods:{
      updatetitle(e){
              if(e==2){
                this.$router.push({'name': 'AJstatistics'})
               }
      },
      handleSelect(e){
        console.log(e)
        if(e=='1'){
            this.exportReport_status=false;
            this.currentComponent='diligencedynamics'
          }else{
            this.exportReport_status=true;
            this.currentComponent='diligencetable'
          }
      },
      //导出报表
      exportReport() {
        this.visible=false;
        this.$refs.diligencetable.exportReport();
      },

      setcurrentTotal(e){
        this.currentTotal=e;
      }

    }
}
</script>

<style>
  @import url("../../../../static/css/admin/diligence.css");
</style>
