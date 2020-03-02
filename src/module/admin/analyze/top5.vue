<template>
<!--  <div>
    <div class="top">TOP5</div>
      <div v-for="item in list" class="item">
          <div class="left text_overflow" :title="item.name">{{item.name}}</div>
          <div v-if="bar" class="bar" :style="'width:'+Math.ceil(item.value/100*240)+'px'"></div>
          <div class="right">{{item.value}}%</div>
      </div>
  </div> -->
 <div class="outer-container">
    <div class="inner-container">
        <div class="top">TOP5</div>
        <div v-for="item in list" class="item">
            <div class="left text_overflow" style="float: left;" :title="item.name">{{item.name}}</div>
            <div v-if="bar" class="bar" :style="'width:'+Math.ceil(item.value/100*240)+'px'"></div>
            <div class="right">{{item.value}}%</div>
        </div>
    </div>
</div>
</template>

<script>
  export default {
    name: 'top5',
    props: ['list', 'bar']
  }
</script>

<style scoped>
  .top {
    height: 54px;
    font-size: 20px;
    color: #00dfff;
    text-align: center;
    line-height: 54px;
  }
  .item{
    position: relative;
    padding: 0 20px;
    overflow: hidden;
    font-size: 16px;
    line-height: 36px;
  }

  .bar{
    height: 8px;
    position: absolute;
    left: 145px;
    top: 50%;
    background: linear-gradient(to right, #3c40f7, #139ef9, #0adaf6);
    margin-top: -4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  .left{float: left;color: #fff;max-width: 140px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .right{float: right;color: #fff;}

  .text_overflow{
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

.outer-container{
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
}
.inner-container{
	position: absolute;
	left: 0;
	top: 0;
	right: -17px;
	bottom: 0;
	overflow-x: hidden;
	overflow-y: scroll;
}

</style>
