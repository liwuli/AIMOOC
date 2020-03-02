<template>
  <div :id="id" class="doughnutChart"></div>
</template>

<script>
  export default {
    name: 'chartSingleDoughnut',
    props: ['id', 'num', 'palette'],
    methods: {
      setEcharts: function () {
        var echarts = require('echarts/lib/echarts')
        require('echarts/lib/chart/pie')
        let integer = Math.ceil(this.num)
        let data = []
        data[0] = {value: integer, name: integer + '%'}
        data[1] = {value: 100 - integer, name: ''}
        let option = {
          series: [{
            hoverOffset: 0,
            label: {
              normal: {
                show: true,
                position: 'center',
                textStyle: {fontSize: '24', color: this.palette && this.palette[2]}
              }
            },
            type: 'pie',
            radius: ['60%', '75%'],
            avoidLabelOverlap: false,
            labelLine: {
              normal: {show: false}
            },
            data: data,
            color: this.palette
          }]
        }
        echarts.init(document.getElementById(this.id)).setOption(option)
      }
    },
    mounted () {
      this.setEcharts()
    },
    watch: {
      num: 'setEcharts'
    }
  }
</script>

<style scoped>
  .doughnutChart {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
</style>
