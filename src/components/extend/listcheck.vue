<template>
	<div style="float: left;width: 100%;">
		<slot></slot>
		<div class="optline" :style="optlinestyle">
			<div class="delallforbid" id="delall" :style="delbtn" @click="delall(info, $event)">{{delallN}}</div>
			<div :style="addbtn" class="addall" @click="listevent('addlist', 'null', info)">{{addallN}}</div>
		</div>
		<div class='AA_listhead'>
			<div v-if="item == 'check'" class='item' :class="percentinfo[ind]" v-for='(item, ind) in head'>
				<span class="check" id="checkall">
					<div class="icon"></div>
				</span>
			</div>
			<div v-if="item != 'check'" :title="item" class='item' :class="percentinfo[ind]" v-for='(item, ind) in head'>
				{{item}}
			</div>
		</div>
		<div class='AA_list' id="fatherlist">
			<div class="lists" v-for='item in info'>

        <!-- 多选选择框 -->
				<div v-if="items == 'check'" :disabledelall="item.disabledelall" :id="item.id" class="item hides" :class="percentinfo[ind]"
				 :style="heigtinfoP" v-for='(items, ind) in colums'>
					<span class="check" :style="heigtinfoP?'margin-top: 18px':''">
						<div class="icon"></div><input type="checkbox" value="0" />{{item[items] }}
					</span>
				</div>


				<div v-if="items == 'photo'" :title="item[items]||nopictureN" class="item hides" :class="percentinfo[ind]" :style="heigtinfoP"
				 v-for='(items, ind) in colums'>
					<img :src="item[items]||img" alt="">
				</div>

        <!-- <span>{{item.opt}}</span> -->
        <!-- 内容区  这个不显示操作 和 多选 只展示内容 -->
				<div v-if="items != 'opt' && items != 'check' && items != 'optevent' && items != 'photo'" :title="item[items]"
				 class="item hides" :class="percentinfo[ind]" :style="heigtinfoP" v-for='(items, ind) in colums'>
					{{item[items]}}
				</div>
        <!-- 操作模块 -->
        <!-- 这里把items != 'check'修改成  items == 'check' -->
				<div v-if="items == 'opt' && items != 'check' && item.optevent" class="item hides" :class="percentinfo[ind]" :style="heigtinfoP"
				 v-for='(items, ind) in colums'>
					<div class="opt iconfont" @click="listevent(item.optevent[indopt], item, info)" :ind="item.ind" :class="item.optevent[indopt]"
					 v-for="(itemopt, indopt) in item[items]">{{itemopt|showtext2(item.optevent[indopt],item)}}</div>
				</div>


				<div v-if="items == 'opt' && items != 'check' && !item.optevent" class="item hides" :class="percentinfo[ind]"
				 :style="heigtinfoP" v-for='(items, ind) in colums'>
					<div v-if="item.code !== 'DefaultCourse'||optevent[indopt] !== 'headoptedit'&&optevent[indopt] !== 'headoptdel'"
					 @click="listevent(optevent[indopt], item, info)" :ind="item.ind" :class="[optevent[indopt], 'opt iconfont']"
					 :style="heigtinfoP?'margin-top: 13px':''" v-for="(itemopt, indopt) in item[items]">
						{{itemopt|showtext(optevent[indopt],item)}}
					</div>
				</div>


			</div>
		</div>
		<page :bingo="bingo" :totalnum="totalnum" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page>
	</div>
</template>
<script type='text/javascript'>
	import page from '@/components/extend/page'
	import img from '@/../static/images/D_user.png'
	import {
		nopictureN,
		delallN,
		addallN
	} from '@/components/config/listinfo'
	export default {
		created() {},
		data() {
			return {
				nopictureN: nopictureN,
				img: img,
				msg: 'list',
				bingo: [],
				pageindex: 1,
				totalpage: 0,
				str: '',
				delallN: delallN,
				addallN: addallN,
				checkallflagrole: false,
				checkclickflag: false,
				allcheck: false
			}
		},
		components: {
			page
		},
		props: ['heigtinfoP', 'addQuery', 'pageval', 'totalnum', 'optlinestyle', 'copy', 'delbtn', 'addbtn', 'pagesize',
			'show', 'selectedarr', 'bingos', 'pageinfo', 'pathinfo', 'info', 'percentinfo', 'colums', 'head', 'optevent'
		],
		methods: {

			listevent(type, item, info) {
				switch (type) {
					case 'skip':
						this.skip(item)
						break
					case 'manlist':
						this.manlist(item, info)
						break
					case 'report':
						this.report(item, info)
						break
					case 'singlephoto':
						this.singlephoto(item, info)
						break
					case 'lesson':
						this.lesson(item, info)
						break
					case 'addlist':
						this.addlist(item, info)
						break
					case 'stoplive':
						this.stoplive(item, info)
						break
					case 'resetpass':
						this.resetpass(item, info)
						break
					case 'stlist':
						this.stlist(item, info)
						break
					case 'headoptedit':
					case 'editlist':
						this.editlist(item, info)
						break
					case 'seedetail':
						this.seedetail(item, info)
						break

					case 'play':
						this.playvideo(item, info)
						break

					case 'download':
						this.downloadvideo(item, info)
						break
					case 'headoptdel':

					case 'dellist':
						this.dellist(item, info)
						break

					case 'release':
						this.release(item, info)
						break
					case 'rel':
					case 'rela':
						this.rela(item, info)
						break
					case 'store':
						this.store(item, info)
						break
					case 'powerlist':
						this.powerlist(item, info)
						break
					case 'downhlist':
						this.downhlist(item, info)
						break
					case 'downllist':
						this.downllist(item, info)
						break
					case 'downlist':
						this.downlist(item, info)
						break
					case 'toplist': // 公告管理置顶
						this.toplist(item, info)
						break
					case 'move': // 课程资源移动
						this.move(item, info)
						break
					case 'publish': // 课程资源发布
						this.publish(item, info)
						break
					case 'unpublish': // 课程资源取消发布
						this.unpublish(item, info)
						break
					case 'living': // 直播中
						this.living(item, info)
						break
					case 'settemplate': // 设置课程模板
						this.settemplate(item, info)
						break
					case 'Mlist':
						this.Mlist(item, info)
						break
					case 'see':
						this.see(item, info)
						break
					case 'seetranscode':
						this.seetranscode(item, info)
						break
				}
			},
			skip(item) {        
				this.$router.push({
					'name': this.pathinfo.skip,
					query: item
				})
			},
			manlist(item, info) { // 管理按钮事件,弹出新页面
				window.open('Http://' + item.deip + ':' + item.port + '/AiBrain/gotoLive.html#/?uuid=2')
			},
			singlephoto(item, info) {
				this.$router.push({
					'name': this.pathinfo.prex + 'singlephoto',
					params: {
						singlephoto: 'singlephoto',
						'item': item,
						info: info
					}
				})
			},
			lesson(item, info) { // 跳转节次页面
				this.$router.push({
					'name': this.pathinfo.prex + 'lessonlist',
					query: {
						info: item.id,
            item:item
					}
				})
			},
			seetranscode(item, info) { // 转码工具
				this.$router.push({
					'name': this.pathinfo.prex + 'seetranscode',
					params: {
						seetranscode: 'seetranscode',
						item: item,
						info: info
					}
				})
			},
			Mlist(item, info) { // 添加模板
				let urls = location.protocol + '//' + location.host + '/index.html#/' + this.pathinfo.prex + 'Manage' +
					'?courseId=' + item.id
				window.open(urls, '_blank')
			},
			see(item, info) { // 删除节次模板
				if (item.Query) {
					let querys = {}
					for (let k in item.Query) {
						querys[k] = item.Query[k]
					}
					if (item.Query.typeval) {
						this.$router.push({
							'name': this.pathinfo.prex + 'see' + item.Query.typeval,
							query: querys,
							params: {
								see: 'see',
								item: item,
								info: info
							}
						})
					} else {
						this.$router.push({
							'name': this.pathinfo.prex + 'see',
							query: querys,
							params: {
								see: 'see',
								item: item,
								info: info
							}
						})
					}
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'see',
						params: {
							see: 'see',
							item: item,
							info: info
						}
					})
				}
			},
			settemplate(item, info) {
				this.$router.push({
					'name': this.pathinfo.prex + 'settemplate',
					params: {
						settemplate: 'settemplate',
						'item': item,
						info: info
					},
					query: {
						templateid: item.id,
						name: item.name,
						publish: item.isOpenval
					}
				})
			},
			move(item, info) {
				if (item.Query) {
					let querys = {}
					for (let k in item.Query) {
						querys[k] = item.Query[k]
					}
					this.$router.push({
						'name': this.pathinfo.prex + 'move',
						params: {
							move: 'move',
							'item': item,
							info: info
						},
						query: querys
					})
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'move',
						params: {
							move: 'move',
							'item': item,
							info: info
						}
					})
				}
			},
			living(item, info) {
				if (item.Query) {
					let querys = {}
					for (let k in item.Query) {
						querys[k] = item.Query[k]
					}
					this.$router.push({
						'name': this.pathinfo.prex + 'living',
						params: {
							living: 'living',
							'item': item,
							info: info
						},
						query: querys
					})
				} else {
					let routeData = this.$router.resolve({
						'name': this.pathinfo.prex + 'living',
						params: {
							living: 'living',
							'item': item,
							info: info
						},
						query: {
							channelid: item.channelid,
							programid: item.id
						}
					})
					window.open(routeData.href, '_blank')
				}
			},
			publish(item, info) {
				if (item.Query) {
					let querys = {}
					for (let k in item.Query) {
						querys[k] = item.Query[k]
					}
					this.$router.push({
						'name': this.pathinfo.prex + 'publish',
						params: {
							publish: 'publish',
							'item': item,
							info: info
						},
						query: querys
					})
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'publish',
						params: {
							publish: 'publish',
							'item': item,
							info: info
						}
					})
				}
			},
			unpublish(item, info) {
				if (item.Query) {
					let querys = {}
					for (let k in item.Query) {
						querys[k] = item.Query[k]
					}
					this.$router.push({
						'name': this.pathinfo.prex + 'unpublish',
						params: {
							unpublish: 'unpublish',
							'item': item,
							info: info
						},
						query: querys
					})
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'unpublish',
						params: {
							unpublish: 'unpublish',
							'item': item,
							info: info
						}
					})
				}
			},
			toplist(item, info) {
				this.$router.push({
					'name': this.pathinfo.prex + 'top',
					params: {
						top: 'top',
						'item': item,
						info: info
					}
				})
			},
			resetpass(item, info) {
				this.$router.push({
					'name': this.pathinfo.prex + 'resetpass',
					params: {
						resetpass: 'resetpass',
						'item': item,
						info: info
					}
				})
			},
			addlist(item, info) {
				if (this.addQuery) {
					this.$router.push({
						'name': this.pathinfo.prex + 'add',
						params: {
							add: 'add',
							info: info
						},
						query: this.addQuery
					})
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'add',
						params: {
							add: 'add',
							info: info
						}
					})
				}
			},
			stlist(item, info) {
				if (item.Query) {
					this.$router.push({
						'name': this.pathinfo.prex + 'stlist',
						query: item.Query,
						params: {
							stlist: 'stlist',
							item: item,
							info: info
						}
					})
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'stlist',
						params: {
							stlist: 'stlist',
							item: item,
							info: info
						}
					})
				}
			},
			editlist(item, info) {
				if (this.addQuery) {
					this.$router.push({
						'name': this.pathinfo.prex + 'edit',
						params: {
							edit: 'edit',
							'item': item,
							info: info
						},
						query: this.addQuery
					})
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'edit',
						params: {
							edit: 'edit',
							'item': item,
							info: info
						}
					})
				}
			},
			store(item, info) {
				this.$router.push({
					'name': this.pathinfo.prex + 'storerel',
					params: {
						store: 'store',
						'item': item,
						info: info
					}
				})
			},
			powerlist(item, info) {
				if (item.resourceFromWhere === 4) {
					let urls = location.protocol + '//' + location.host + '/dist/index.html#/' + 'demand' + '?lessonId=' + item.lessonId +
						'&teacherId=' + item.teacherId
					window.open(urls, '_blank')
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'power',
						params: {
							power: 'power',
							'item': item,
							info: info
						}
					})
				}
			},
			report(item, info) {
				let urls = location.protocol + '//' + location.host + '/dist/report.html#/' + '?lessonId=' + item.lessonId +
					'&teacherId=' + item.teacherId
				window.open(urls, '_blank')
			},
			
			dellist(item, info) {
				
				let temp = []
				temp.push(item.id || item.deid)
				if (item.Query) {
					let querys = {}
					for (let k in item.Query) {
						querys[k] = item.Query[k]
					}
					this.$router.push({
						'name': this.pathinfo.prex + 'del',
						query: querys,
						params: {
							del: 'del',
							'item': temp,
							info: info,
							itself:item

						}
					})
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'del',
						params: {
							del: 'del',
							'item': temp,
							info: info,
							itself:item
						}
					})
				}
			},
			// 直播管理发布  只有当状态 Status =4才是录制完成  才可以用发布功能
			release(item, info) {
				if(item.Status!=4){
					return;
				}
				let temp = []
				temp.push(item.id || item.deid)
				if (item.Query) {
					let querys = {}
					for (let k in item.Query) {
						querys[k] = item.Query[k]
					}
					this.$router.push({
						'name': this.pathinfo.prex + 'release',
						query: querys,
						params: {
							release: 'release',
							'item': temp,
							info: info,
							list:item
						}
					})
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'release',
						params: {
							release: 'release',
							'item': temp,
							info: info,
							list:item
						}
					})
				}
			},
			rela(item, info) {
				if (item.Query) {
					this.$router.push({
						'name': this.pathinfo.prex + 'rel',
						params: {
							rel: 'rel',
							'item': item,
							info: info
						},
						query: item.Query
					})
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'rel',
						params: {
							rel: 'rel',
							'item': item,
							info: info
						}
					})
				}
			},
			downlist(item, info) {
				if (item.Query) {
					let querys = {}
					for (let k in item.Query) {
						querys[k] = item.Query[k]
					}
					if (item.Query.typeval) {
						if (item.Query.typevalflag) {
							this.$router.push({
								'name': this.pathinfo.prex + 'downlist' + item.Query.typevalflag,
								query: querys,
								params: {
									downlist: 'rel' + item.Query.typeval,
									'item': item,
									info: info
								}
							})
						} else {
							this.$router.push({
								'name': this.pathinfo.prex + 'downlist' + item.Query.typeval,
								query: querys,
								params: {
									downlist: 'rel' + item.Query.typeval,
									'item': item,
									info: info
								}
							})
						}
					} else {
						this.$router.push({
							'name': this.pathinfo.prex + 'downlist',
							query: querys,
							params: {
								downlist: 'downlist',
								'item': item,
								info: info
							}
						})
					}
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'downlist',
						params: {
							downlist: 'downlist',
							'item': item,
							info: info
						}
					})
				}
			},
			seedetail(item, info) {
				if (item.type === 'live') {
					this.$router.push({
						'name': 'Flivedetail',
						query: {
							liveid: item.id
						}
					})
				} else {
					this.$router.push({
						'name': this.pathinfo.prex + 'seedetail',
						params: {
							rel: 'rel',
							'item': item,
							info: info
						}
					})
				}
			},

			playvideo(item, info) {
				this.$router.push({
					'name': this.pathinfo.prex + 'see',
					params: {
						see: 'see',
						'item': item,
						info: info
					}
				})
				// this.$router.push({'name': this.pathinfo.prex + 'power', params: {power: 'power', 'item': item, info: info}})
			},

			downloadvideo(item, info) {
				this.$emit('downlevent', {
					item: item,
					info: info
				})
			},

			stoplive(item, info) {
				this.$emit('stopliveevent', {
					item: item,
					info: info
				})
			},
			downhlist(item, info) {
				this.$emit('downhevent', {
					item: item,
					info: info
				})
			},
			downllist(item, info) {
				this.$emit('downlevent', {
					item: item,
					info: info
				})
			},
			pagedeal() {
				this.bingo = []
				for (let i = 0; i < this.totalpage; i++) {
					if (this.pageindex - 1 === i) {
						this.bingo.push('selected')
					} else {
						this.bingo.push('')
					}
				}
			},
			pagepost(page) {
				this.$emit('pagepost', {
					page: page
				})
			},
			updatefn(arr) {
				let that = this
				let temp = this.selectedarr ? this.selectedarr : []
				if (!this.info) {
					this.info = []
				}
				if (temp.length === this.info.length && temp.length !== 0) {
					this.checkallflagrole = true
				}
				this.str = this.$Check({
					'father': '#fatherlist .lists span',
					'multline': {
						'flag': true,
						'classname': '#fatherlist .lists',
						'index': temp
					},
					'checktop': 'AA_list',
					'checkall': 'checkall',
					'checkallflag': that.checkallflagrole,
					'inputflag': true
				}, function(id, val, str) {
					let obj = document.getElementById('delall')
					if (JSON.stringify(str) === '{}' && typeof id !== 'object') {
						obj.className = 'delallforbid'
					} else {
						obj.className = 'delall'
					}
					if (typeof id === 'object') {
						that.allcheck = id
					} else {
						let dis = 0
						for (let k in str) {
							if (document.getElementById(str[k]).getAttribute('disabledelall') === '1') {
								dis++
							}
						}
						if (dis > 0) {
							obj.className = 'delallforbid'
						} else {
							if (JSON.stringify(str) === '{}' && typeof id !== 'object') {
								obj.className = 'delallforbid'
							} else {
								obj.className = 'delall'
							}
						}
						that.allcheck = str
					}
					if (that.copy) {
						that.copyall()
					}
				})
			},
			delall(info) {
				if (document.getElementById('delall').getAttribute('class') === 'delallforbid') {
					return false
				}
				let temp = []
				for (let i in this.allcheck) {
					temp.push(i)
				}
				if (temp.length > 0) {
					if (this.addQuery) {
						this.$router.push({
							'name': this.pathinfo.prex + 'del',
							params: {
								del: 'del',
								'item': temp,
								info: info
							},
							query: this.addQuery
						})
					} else {
						this.$router.push({
							'name': this.pathinfo.prex + 'del',
							params: {
								del: 'del',
								'item': temp,
								info: info
							}
						})
					}
				}
			},
			copyall() { // 校园电视台复制节目单

				let temp = []
				for (let i in this.allcheck) {
					temp.push(i)
				}
				this.$emit('checkevent', {
					item: temp
				})
			}
		},
		filters: {
			showtext: function(message, value, info) {
				if (value === 'publish' && info.isPublish && info.isPublish === '已发布') {
					return '取消发布'
				} else {
					return message
				}
			},

			// 设置点击 操作功能 对应显示的参数
			showtext2: function(message, value, info) {

				if(message=='发布'){
					if (info.Status!=undefined && info.Status==4) {
						   if(info.isPublish!=undefined && info.isPublish==1){
								 return '取消发布'
							 }else{
								 return message
							 }
					} else {
						return message;
					}
				}else{
					return message
				}
			}
		},
		mounted() {
			if (this.pageinfo) {
				this.totalpage = this.pageinfo
			}
			if (this.bingos) {
				this.bingo = this.bingos
			}
			if (this.pageval) {
				this.pageindex = this.pageval
			}
			if (this.colums[0] === 'check' && this.info.length > 0) {
				this.updatefn()
			}
		},
		beforeUpdate() {
			this.totalpage = this.pageinfo
			this.bingo = this.bingos
			this.pageindex = this.pageval
		},
		updated() {
			if (this.colums[0] === 'check' && this.info.length > 0) {
				this.updatefn()
			}
		},
		watch: {
			'$route'() {
				if (document.getElementById('delall')) {
					document.getElementById('delall').className = 'delallforbid'
				}
			}
		}
	}
</script>
