<template>
  <div :id="id" :style="size"></div>
</template>

<script>
  export default {
    name: 'hollowPieChart',
    props: ['id', 'pieData', 'size'],
    methods: {
      setEcharts () {
        let option = {
          series: [
            {
              hoverOffset: 0,
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  textStyle: {fontSize: '30', fontWeight: 'bold'}
                }
              },
              type: 'pie',
              radius: ['70%', '90%'],
              avoidLabelOverlap: false,
              labelLine: {
                normal: {show: false}
              },
              data: this.pieData
            }
          ]
        }
        this.$echarts.init(document.getElementById(this.id)).setOption(option)
      }
    },
    mounted () {
      this.setEcharts()
    },
    watch: {
      pieData: 'setEcharts'
    }
  }
</script>
