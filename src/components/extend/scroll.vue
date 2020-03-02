<style type="text/css">
	@import url("/static/css/default/scroll.css");
</style>
<template>
	<div>
		{{msg}}
		<div class="scrollfather" id="scrollfather1" style="width: 300px;height: 100px;">
			<p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>0</p>
			<p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>0</p>
			<p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>0</p>
			<p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>0</p>
			<p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>0</p>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
  name: 'Scroll',
  data () {
    return {
      msg: '滚动条信息'
    }
  },
  props: ['info', 'id', 'part'],
  mounted: function () {
    this.$Scroll({
      'getfatheridPosition': document.getElementById('app')
    })
  }
}
</script>
