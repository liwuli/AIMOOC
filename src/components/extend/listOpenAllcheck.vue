<style type='text/css'>
	.sons{
		float: left;
		margin-left: 10px;
		width: auto;
	}
	.op{
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
	<div style="float: left;width: 100%;">

		<div class='AA_listhead'  style="height: auto;box-shadow: none;margin-bottom: 2px;" v-for="(headitems, headind) in info">
			<div class="AA_listheadlist">
				<div v-if="item == 'check'"   class='item' :class="percentinfo[ind]" v-for='(item, ind) in listhead'>
					<span class="op" @click = "firstlevelhead($event)"> </span>
				</div>
				<div v-if="item != 'check'" :title="headitems.name" class='item' :class="percentinfo[ind]" v-for='(item, ind) in listhead'>
					{{headitems.name}}
				</div>
			</div>
			<div class='AA_list' style="box-shadow: none;" :id="'AA_list_' + headitems.id + '_' + listind" v-for='(list, listind) in info[headind].list'>
				<div class="listshead" style="float: left;"  >
					<div  v-if="items == 'check'" :id="'checkall_' + headitems.id + '_'+ list.id" class="item"  style="box-shadow: none;" :class="percentinfo[ind]"  v-for='(items, ind) in colums'>
						<span class="check"  style="margin-top: 0;margin-left: 0;"><div class="icon"></div></span>
					</div>
					<div  v-if="items != 'check'" class="item" style="box-shadow: none;line-height: 30px;color:#4e4e4e" v-for='(items, ind) in colums'>
						{{list.name}}:
					</div>
				</div>
				<div class="lists" :id="'lists_' + headitems.id + '_' + list.id">
					<div class="sons" :title="son.name" :id="headitems.id + '_' + list.id + '__' + son.id" v-for="(son, sonind) in info[headind].list[listind].opt">
						<span class="check" style="padding-right: 10px;"><div class="icon"></div></span>
						{{son.name}}
					</div>
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
      checkallflag: [],

    }
  },
  props: ['info', 'percentinfo', 'colums', 'listhead', 'selectmodules'],
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
      for (let i = 0; i < this.info.length; i++) {
        this.strarr[i] = []
        temp[i] = []
        that.checkallflag[i] = []
        for (let k = 0; k < this.info[i]['list'].length; k++) {
          if (that.selectmodules) {
            temp[i][k] = []
            that.checkallflag[i][k] = false
            for (let n = 0; n < that.selectmodules.length; n++) {
              if (that.info[i]['list'][k].id === that.selectmodules[n].id) {
                for (let m = 0; m < that.info[i]['list'][k].opt.length; m++) { // 遍历全部的权限
                  for (let l = 0; l < that.selectmodules[n].operations.length; l++) {
                    if (that.info[i]['list'][k].opt[m].id === that.selectmodules[n].operations[l].operationId) {
                      temp[i][k].push(m)
                      if (temp[i][k].length === that.info[i]['list'][k].opt.length && temp[i].length !== 0) {
                        that.checkallflag[i][k] = true
                      }
                      break
                    }
                  }
                }
              }
            }
          }
          (function (i, k) {
            that.strarr[i][k] = that.$Check({
              'father': '#AA_list_' + that.info[i]['id'] + '_' + k + ' .lists .sons span',
              'multline': {
                'flag': true,
                'classname': '#lists_' + that.info[i]['id'] + '_' + that.info[i]['list'][k]['id'] + ' .lists  .sons',
                'index': temp[i][k]
              },
              'checktop': 'lists',
              'checkall': 'checkall_' + that.info[i]['id'] + '_' + that.info[i]['list'][k]['id'],
              'inputflag': false,
              'checkallflag': that.checkallflag[i][k]
            }, function (id, val, str) {
              that.$emit('getcheckids', that.strarr)
            })
          })(i, k)
        }
      }
    }
  },
  updated () {
    this.updatefn()
  }
}
</script>
