<template>
  <div :id="id" class="doughnutChart"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/legend'
  export default {
    name: 'doughnutChart01',
    props: ['id', 'num', 'palette'],
    methods: {
      setEcharts: function () {
        console.log(this.$echarts)
        let data = []
        data[0] = {value: this.num, label: {formatter: '{c}%\n'}}
        data[1] = {value: 200 - this.num}


        let option = {
          series: [{
            hoverOffset: 0,
            label: {
              normal: {
                show: true,
                position: 'center',
                textStyle: {fontSize: '20', color: this.palette[2]}
              }
            },
            type: 'pie',
            radius: ['115%', '160%'],
            center: ['50%', '100%'],
            startAngle: 180,
            avoidLabelOverlap: false,
            labelLine: {
              normal: {show: false}
            },
            data: data,
            color: this.palette
          }]
        }

        setTimeout(() => {
          this.$echarts.init(document.getElementById(this.id)).setOption(option)
        }, 50)

      }
    },
    watch: {
      num: 'setEcharts'
    },
    mounted () {
      this.setEcharts()
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
