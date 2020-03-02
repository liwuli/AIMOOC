<template>
  <div :id="id" :style="size"></div>
</template>

<script>
  export default {
    name: 'pieOutChart',
    props: ['id', 'pieData', 'size'],
    methods: {
      setEcharts () {
        let option = {
          series: [
            {
              type: 'pie',
              radius: '60%',
              startAngle: 155,
              center: ['50%', '50%'],
              labelLine: {
                length: 30,
                length2: 50
              },
              label: {
                formatter: ['{a|{c}%}\n\n{a|{b}}'].join('\n'),
                padding: [0, -85],
                rich: {
                  a: {
                    align: 'middle',
                    width: 160
                  }
                }
              },
              data: this.pieData
            }
          ],
          color: ['#ec6969', '#d34c2d', '#f98324', '#d0569e', '#b755c6', '#dc4611', 'f9bb4f']
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
