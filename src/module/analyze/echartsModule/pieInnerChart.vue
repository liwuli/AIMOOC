<template>
  <div :id="id" :style="size"></div>
</template>

<script>
  export default {
    name: 'pieInnerChart',
    props: ['id', 'xAxisLegend', 'size'],
    methods: {
      setEcharts () {
        let option = {
          animation: false,
          series: [
            {
              type: 'pie',
              radius: '75%',
              silent: true,
              startAngle: 155,
              center: ['50%', '60%'],
              hoverOffset: 0,
              label: {position: 'inner'},
              data: [
                {value: 40, name: '40%', label: {color: '#0a545e'}},
                {value: 20, name: '20%', label: {color: '#682b1f'}},
                {value: 80, name: '80%', label: {color: '#441241'}}
              ]
            }
          ],
          color: ['#00dfff', '#fa7860', '#b651af']
        }
        this.$echarts.init(document.getElementById(this.id)).setOption(option)
      }
    },
    mounted () {
      this.setEcharts()
    }
  }
</script>
