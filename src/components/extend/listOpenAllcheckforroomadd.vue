<style type='text/css'>
	.sons{
		float: left;
		margin-left: 10px;
		width: auto;
	}
	.ops{
		border-width: 7px;
		border-color: transparent transparent  transparent  #fff;
		border-style: solid;
		float: left;
		height: 0;
		margin: 8px 5px 0 10px;
		transform-origin: center;
		transition: all .1s linear;
		transform: rotate(90deg);
		width: 0;
	}
	.check,.checked{
		width:auto
	}
</style>
<template>
	<div style="float: left;width: 675px;">
		<div class='AA_listhead'  style="height: auto;box-shadow: none;margin-bottom: 2px;" v-for="(headitems, headind) in info">
			<div class="AA_listheadlist">
				<div v-if="item == 'check'"   class='item' :class="percentinfo[ind]" v-for='(item, ind) in listhead'>
					<span class="check" :id="'checkall_'+headitems.id"><div class="icon"></div></span>
					<span class="ops" @click = "firstlevelhead($event)"> </span>
				</div> 
				<div v-if="item != 'check'" :title="headitems.name" class='item' :class="percentinfo[ind]" v-for='(item, ind) in listhead'>
					{{headitems.name}}
				</div>
			</div>
			<div class='BB_list' style="box-shadow: none;" :id="'BB_list_' + headitems.id " >
				<div class="lists" :title="list.name" style="width:auto;box-shadow:none;padding:0 10px 0 0" :id="headitems.id + '_' + list.id" v-for='(list, listind) in headitems.list'>
					<span class="check"><div class="icon"></div></span>
					{{list.name}}
				</div>
			</div>
		</div>
	</div>
</template>
<script type='text/javascript'>
import {addallN, delalltemplateN} from '@/components/config/listinfo'
export default {
  data () {
    return {
      delallN: delalltemplateN,
      addallN: addallN,
      strarr: [],
      showarr: [],
      checkallflag: []
    }
  },
  props: ['selectarr', 'info', 'percentinfo', 'colums', 'listhead'],
  methods: {
    firstlevelhead (ev) {
      let flag = ev.currentTarget.parentElement.parentElement.parentElement
      if (flag.clientHeight <= 30) {
        flag.style.height = 'auto'
        ev.currentTarget.setAttribute('style', 'transform:rotate(90deg)')
      } else {
        flag.style.height = '30px'
        ev.currentTarget.setAttribute('style', 'transform:rotate(0deg)')
      }
    },
    updatefn () { // 更新操作，重新实例化checkbox及选中值
      let that = this
      let temp = []
      if (this.selectarr) {
        for (let m = 0; m < this.selectarr.length; m++) {
          temp[m] = []
          for (let k = 0; k < this.selectarr[m].length; k++) {
            for (let i = 0; i < this.info[m]['list'].length; i++) {
              if (this.selectarr[m][k] === this.info[m]['list'][i].id) {
                temp[m].push(i)
              }
            }
          }
        }
      }
      for (let i = 0; i < this.info.length; i++) {
        this.strarr[i] = []
        if (this.info[i]['list'].length === temp[i].length) {
          that.checkallflag[i] = true
        }
        for (let k = 0; k < this.info[i]['list'].length; k++) {
          this.strarr[i][k] = this.$Check({
            'father': '#BB_list_' + that.info[i]['id'] + ' .lists  span',
            'multline': {
              'flag': true,
              'classname': '#BB_list_' + that.info[i]['id'] + ' .lists',
              'index': temp[i]
            },
            'checktop': 'BB_list',
            'checkall': 'checkall_' + that.info[i]['id'],
            'inputflag': false,
            'checkallflag': that.checkallflag[i]
          }, function (id, val, str) {
            that.selectarr = null
            that.$emit('getcheckids', that.strarr)
          })
        }
      }
    }
  },
  updated () {
    this.updatefn()
  }
}
</script>
