<template>
	<div  :id="echartid" :echartdata="echartdata" :style="styles"></div>
</template>
<script type='text/javascript'>
import echarts from 'willechart/src/echarts.min.js'
export default {
  name: 'echarts',
  data () {
    return {
    }
  },
  props: ['styles', 'echartid', 'echartdata', 'title'],
  mounted () {
    let that = this
    // 基于准备好的dom，初始化echarts实例
    let app = echarts.init(document.getElementById(that.echartid))
    app.title = this.title
    // 使用刚指定的配置项和数据显示图表。
    app.setOption(this.echartdata)
  },
  updated () {
    let that = this
    // 基于准备好的dom，初始化echarts实例
    let app = echarts.init(document.getElementById(that.echartid))
    app.title = this.title
    // 使用刚指定的配置项和数据显示图表。
    app.setOption(this.echartdata)
  }
}
</script>
