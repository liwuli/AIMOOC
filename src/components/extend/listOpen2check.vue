<template>
	<div style="float: left;width: 100%;">
		<div class="optline" >
			<div :style="addbtn" class="addall" @click="listevent('addroomlist', 'null', info)">{{addallN}}</div>
		</div>
		<div class="rootlevel" v-for="(clas, classind) in info">
			<div class="firstlevel fold">
				<div class="firstlevelhead" @click = "firstlevelhead($event)">
					<span class="op marginTop13" ></span>
					{{clas.name}}
          <router-link class="headright" :to="{path: 'unoccupiedSeat', query: {id: clas.id, name: clas.name}}" target="_blank">{{seatBtn}}</router-link>
				</div>
				<div class="secondlevel" v-for="(secitems, secind) in clas.list">
					<div class="secondlevelhead" @click = "thirdlevelhead($event)">
						<div v-if="item == 'check'" class="itemsec" :class="percentinfo[ind]" v-for='(item, ind) in head'>
							<span class="op marginTop13" ></span>
						   {{secitems.name}}
						</div>
						<div v-if="item != 'check' && item != 'opt'" :title="addressN + '：' + secitems.address"  class="itemsec" :class="percentinfo[ind]" v-for='(item, ind) in head'>
							{{addressN}}：{{secitems.address}}
						</div>
						<div v-if="item == 'opt'"  class="itemsec" :class="percentinfo[ind]" v-for='(item, ind) in head'>									
							<div class="opt" v-if="secitems.onrecording" :style="secitems.onrecording[roomind]" @click="listevent(roomoptevent[roomind], secitems, clas)" :class="roomoptevent[roomind]" v-for="(roomopt, roomind) in roominfo">{{roomopt}}</div>
							<div class="opt" v-if="!secitems.onrecording" @click="listevent(roomoptevent[roomind], secitems, clas)" :class="roomoptevent[roomind]" v-for="(roomopt, roomind) in roominfo">{{roomopt}}</div>
						</div>
					</div>
						<div class='AA_listhead'  v-for="(headitems, headind) in secitems.list">
							<div class="AA_listheadlist" @click = "thirdlevelhead2($event)">
								<div v-if="item == 'check'"   class='item hides' :class="percentinfo[ind]" v-for='(item, ind) in head'>
									<span class="check" :id="'checkall_' + clas.id + '_' + secitems.id + '_' + headitems.id"><div class="icon"></div></span>
									<span class="op"></span>
									{{headitems.name}}
								</div>
								<div v-if="item != 'check' && item != 'opt'" :title="headitems.des" class='item hides' :class="percentinfo[ind]" v-for='(item, ind) in head'>
									{{headitems.des}}
								</div>
								<div v-if="item == 'opt'" class='item hides' :class="percentinfo[ind]" v-for='(item, ind) in head'>
									<div class="opt" @click="listevent(optevent[indopt], headitems, secitems)" :class="optevent[indopt]" v-for="(itemopt, indopt) in headitems.opt">{{itemopt}}</div>
								</div>
							</div>
							<div class='AA_list' :id="'AA_list_' + clas.id + '_' + secitems.id + '_' + headitems.id" >
								<div class="lists"  v-for='(item, itemind) in headitems.list'>
									<div  v-if="items == 'check'" class="item" :class="percentinfo[ind]"  v-for='(items, ind) in colums'>
										<span class="check"><div class="icon"></div><input type="checkbox" value="0"/></span>
										{{item.name }}
									</div>
									<div  v-if="items != 'opt' & items != 'check'" :title="item.des" class="item hides" :class="percentinfo[ind]"  v-for='(items, ind) in colums'>
										{{item.des }}
									</div>
									<div  v-if="items == 'opt' && items != 'check'" class="item hides" :class="percentinfo[ind]"  v-for='(items, ind) in colums'>
										<div class="opt" @click="listevent(item.eventlist[itemoptind], item, headitems)" :class="optevent[itemoptind]" v-for="(itemopts, itemoptind) in item.opt">
											{{itemopts}}
										</div>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type='text/javascript'>
import {addallN, addressN} from '@/components/config/listinfo'
export default {
  data () {
    return {
      addressN: addressN,
      addallN: addallN
    }
  },
  props: ['seatBtn', 'openList', 'addbtn', 'selectarr', 'roominfo', 'info', 'percentinfo', 'colums', 'head', 'optevent', 'roomoptevent', 'pathinfo'],
  methods: {
    firstlevelhead (ev) {
			if(ev.currentTarget.parentElement.className.indexOf('fold') === -1){
				ev.currentTarget.parentElement.className += ' ' + 'fold'
				ev.currentTarget.children[0].className = ev.currentTarget.children[0].className.replace('clicked', '')
			}else{
				ev.currentTarget.parentElement.className = ev.currentTarget.parentElement.className.replace('fold', '')
				ev.currentTarget.children[0].className += ' ' + 'clicked'
			}
   //    let flag = ev.currentTarget.parentElement.parentElement
			// console.log(flag)
   //    if (flag.className.indexOf('fold') === -1) {
   //      ev.className += ' ' + 'fold'
   //      //ev.currentTarget.className = ev.currentTarget.className.replace('clicked', '')
   //    } else {
   //      ev.className = flag.className.replace('fold', '')
   //      ev.currentTarget.className += ' ' + 'clicked'
   //    }
      this.$store.dispatch({
        type: 'bodyheight',
        bodyheight: document.querySelector('.AA_right').clientHeight
      })
    },
		
    thirdlevelhead (ev) {
			console.log(ev.currentTarget.parentElement);
			var flag = ev.currentTarget.parentElement;
			if(!flag.getAttribute('style')){
				flag.setAttribute('style', 'height:auto')
				ev.currentTarget.children[0].children[0].setAttribute('style', 'transform:rotate(90deg)')
			}else{
				flag.removeAttribute('style');
				ev.currentTarget.children[0].children[0].removeAttribute('style')
			}
      // let flag = ev.currentTarget.parentElement.parentElement.parentElement
      // if (!flag.getAttribute('style')) {
      //   ev.currentTarget.setAttribute('style', 'transform:rotate(90deg)')
      //   flag.setAttribute('style', 'height:auto')
      // } else {
      //   flag.removeAttribute('style')
      //   ev.currentTarget.removeAttribute('style')
      // }
      this.$store.dispatch({
        type: 'bodyheight',
        bodyheight: document.querySelector('.AA_right').clientHeight
      })
    },
		
		thirdlevelhead2 (ev) {
			console.log(ev.currentTarget.parentElement);
			var flag = ev.currentTarget.parentElement;
			if(!flag.getAttribute('style')){
				flag.setAttribute('style', 'height:auto')
				ev.currentTarget.children[0].children[1].setAttribute('style', 'transform:rotate(90deg)')
			}else{
				flag.removeAttribute('style');
				ev.currentTarget.children[0].children[1].removeAttribute('style')
			}
		  this.$store.dispatch({
		    type: 'bodyheight',
		    bodyheight: document.querySelector('.AA_right').clientHeight
		  })
		},
    listevent (type, item, info) {
      switch (type) {
        case 'classBrand':
          this.classBrand(item, info)
          break
        case 'analysis':
          this.analysis(item, info)
          break
        case 'addlist':
          this.addlist(item, info)
          break
        case 'editlist':
          this.editlist(item, info)
          break
        case 'dellist':
          this.dellist(item, info)
          break
        case 'roomadd':
          this.roomadd(item, info)
          break
        case 'channeleditlist':
          this.channeleditlist(item, info)
          break
        case 'channelsetlist':
          this.channelsetlist(item, info)
          break
        case 'channeldellist':
          this.channeldellist(item, info)
          break
        case 'addroomlist':
          this.addroomlist(item, info)
          break
      }
    },
    classBrand (item, info) { // 智慧班牌
      const { href } = this.$router.resolve({path: '/classBrand', query: { ip: item.deviceIp }})
      window.open(href, '_blank')
    },
    analysis (item, info) {
      window.open('Http://' + item.deviceIp + ':' + item.port + '/AiBrain/gotoLive.html#/?uuid=1')
    },
    addroomlist (item, info) { // 通道编辑
      this.$router.push({'name': this.pathinfo.prex + 'addroom', params: {addroom: 'addroom', item: item, info: info, selectlist: this.selectarr}})
    },
    channeleditlist (item, info) { // 通道编辑
      this.$router.push({'name': this.pathinfo.prex + 'editchannel', params: {editchannel: 'editchannel', item: item, info: info}})
    },
    channelsetlist (item, info) { // 通道标定
      this.$router.push({'name': this.pathinfo.prex + 'setchannel', params: {setchannel: 'setchannel', item: item, info: info}})
    },
    channeldellist (item, info) { // 通道删除
      this.$router.push({'name': this.pathinfo.prex + 'delchannel', params: {delchannel: 'delchannel', item: item, info: info}})
    },
    roomadd (item, info) { // 设备添加
      this.$router.push({'name': this.pathinfo.prex + 'add', params: {add: 'add', item: item, info: info}})
    },
    addlist (item, info) { // 通道添加
      this.$router.push({'name': this.pathinfo.prex + 'addchannel', params: {addchannel: 'addchannel', item: item, info: info}})
    },
    editlist (item, info) { // 设备编辑
      this.$router.push({'name': this.pathinfo.prex + 'edit', params: {edit: 'edit', item: item, info: info}})
    },
    dellist (item, info) {
      this.$router.push({'name': this.pathinfo.prex + 'del', params: {del: 'del', item: item, info: info}})
    },
    updatefn () {
      for (let i = 0; i < this.info.length; i++) {
        for (let k = 0; k < this.info[i].list.length; k++) {
          for (let l = 0; l < this.info[i].list[k].list.length; l++) {
            this.$Check({
              'father': '#AA_list_' + this.info[i].id + '_' + this.info[i].list[k].id + '_' + this.info[i].list[k].list[l].id + ' .lists span',
              'multline': {
                'flag': true,
                'classname': '#AA_list_' + this.info[i].id + '_' + this.info[i].list[k].id + '_' + this.info[i].list[k].list[l].id + ' .lists',
                'index': []
              },
              'checktop': 'AA_list',
              'checkall': 'checkall_' + this.info[i].id + '_' + this.info[i].list[k].id + '_' + this.info[i].list[k].list[l].id,
              'chackallflag': false,
              'inputflag': true
            }, function () { })
          }
        }
      }
    }
  },
  updated () {
    this.updatefn()
  }
}
</script>
<style type='text/css' scoped>
  .headright{
    color: #000;
    float: right;
    padding-right: 15px;
    cursor: pointer;
  }
  .rootlevel{
    float: left;
    width: 100%;
  }
  .firstlevel{
    cursor: default;
    float: left;
    margin-bottom: 1px;
    overflow: hidden;
    width: 100%;
  }
  .secondlevel{
    cursor: default;
    float: left;
    height: 40px;
    overflow: hidden;
    width: 100%;
    border-bottom: 1px solid #d8d4d4;
  }
  .firstlevelhead,.secondlevelhead{
    cursor: default;
    /*color: #fff;*/
    float: left;
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
    width: 100%;
  }
  .secondlevelhead {
    height: 40px;
    line-height: 40px;
  }
  .op{
    border-width: 7px;
    border-color: transparent transparent transparent #fff;
    border-style: solid;
    float: left;
    height: 0;
    margin: 8px 5px 0 10px;
    transform-origin: center;
    transition: all .1s linear;
    width: 0;
  }
  .op.marginTop13 {
    margin-top: 13px;
  }
  .itemsec{
    float: left;
  }
  .opt{
    border-radius: 5px;
    cursor: pointer;
    float: left;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    margin: 0 5px;
    padding: 0 5px;
    text-align: center;
    text-indent: 0;
    width: auto;
    font-size: 16px;
  }
  .fold{
    height: 40px;
  }
  .clicked{
    transform: rotate(90deg);
  }
</style>
