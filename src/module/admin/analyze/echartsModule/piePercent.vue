<template>
  <div :id="id" class="canvas"></div>
</template>

<script>
  export default {
    name: 'pie-percent',
    props: ['id', 'itemList', 'center', 'legendSite', 'textColor'],
    methods: {
      setEcharts () {
        var echarts = require('echarts/lib/echarts')
        require('echarts/lib/chart/pie')
        require('echarts/lib/component/legend')
        let option = {
          animation: false,
          legend: {
            icon: 'circle',
            orient: 'vertical',
            x: this.legendSite[0],
            y: this.legendSite[1],
            selectedMode: false,
            itemGap: 20,
            formatter: function (name) {
              for (var i = 0; i < option.series[0].data.length; i++) {
                if (option.series[0].data[i].name === name) {
                  return name + '   ' + option.series[0].data[i].value + '%'
                }
              }
            },
            textStyle: {fontSize: '16', color: this.textColor || '#fff'}
          },
          series: [
            {
              type: 'pie',
              radius: '62%',
              silent: true,
              startAngle: 155,
              center: this.center,
              hoverOffset: 0,
              label: {
                position: 'inner',
                formatter: '{d}%',
                fontSize: '20',
                fontWeight: 'bold'
              },
              data: this.itemList
            }
          ],
          color: ['#00dfff', '#fa7860', '#b651af', '#01a863']
        }
        echarts.init(document.getElementById(this.id)).setOption(option)
      }
    },
    mounted () {
      this.setEcharts()
    }
  }
</script>

<style scoped>
  .canvas {
    width: 100%;
    height: 100%;
  }
</style>
