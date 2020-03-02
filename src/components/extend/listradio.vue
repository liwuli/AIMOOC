<template>
	<div style="float: left;width: 100%;">
		<div :class="topclass">
			<div :class="lists" v-for='item in info'>
				<span class="radio"  >
					<div class="icon"></div>
					<input type="radio" :value="item.value"/>
					{{item.txt}}
				</span>
			</div>
		</div>
	</div>
</template>
<script type='text/javascript'>
export default {
  data () {
    return {
      msg: 'list',
      topclassd: 'AA_list',
      listsd: 'lists'
    }
  },
  props: ['info', 'topclass', 'item'],
  methods: {},
  mounted () {
    let that = this
    this.$Radio({
      'father': '.' + (that.topclass ? that.topclass : that.topclassd) + '  span',
      'multline': {
        'flag': true,
        'class': '.' + (that.lists ? that.lists : that.listsd),
        'index': 0
      },
      'inputflag': true
    }, function () {})
  }
}
</script>
