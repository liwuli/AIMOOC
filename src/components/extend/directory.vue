<template>
	<div class="view1">
		<div v-for="(item,index) in classroom" style="width: 100%;height: auto;">
			<div @click="opentree(index)" class="view2">
				<div class="view3">{{item.buildingName}}</div>
				<div class="view4">
					<img :id="setid('img',index)" :class="{img_active: isActive}" style="width: 20px;height: 20px;display: none;" src="../../../static/images/right3.png" />
				</div>
			</div>
			<div :id="setid('div',index)" style="display: none;">
				<div :id="setid('tree',rooms.classroomId)" v-for="(rooms,index) in item.classRooms" @click="select_manual(rooms,item)" class="view5">
					<span>{{rooms.classroomName}}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				ulShowType: false,
				nodataShowType: false,
				inputValue: '',
				ab: '',
				classIndex: 0,
				isActive: false,				
			}
		},
		props: {
			'show': { //用于外部控制组件的显示/隐藏
				type: Boolean,
				default: true
			},
			'classroom': Array,
			'placeholder': String,
			'nodatatext': String,
			'checkedId':String
		},
		watch: {			
			checkedId:function(curVal,oldVal){			
				//获取选择框组件选择的参数的classroomsid对比 找到了就返回当前是第几个导航栏				
				this.classroom.forEach((item,index)=>{					
					for(var i =0; i<item.classRooms.length;i++ ){							
						if(item.classRooms[i].classroomId==curVal){							
							this.autosetselect(index,curVal)
							this.$emit('getlive',item.classRooms[i],item);
						}
					}
				})
			}
		},
		directives: {

		},
		methods: {
			//动态给DIV  id
			setid(id_name,res) {
				return id_name + res
			},
			
			//初始化完成
			opendiv(){
				document.getElementById('img0').setAttribute("class", "img_active");
				document.getElementById('div0').style.display = "";
				document.getElementById('tree'+this.classroom[0].classRooms[0].classroomId).style.backgroundColor="#ffffff";	
			},
			
			// 点击打开菜单
			opentree(res) {
				var img = document.getElementById('img' + res);
				var div = document.getElementById('div' + res);				
				if (img.getAttribute("class") == '') {
					img.setAttribute("class", "img_active")
					div.style.display = "";
				} else {
					img.className = "";
					div.style.display = "none";
				}
			},
			//num1指向当前选择的一级菜单索引   num2指向的是二级菜单里面的第几个索引
			autosetselect(num1,num2){
				var img = document.getElementById('img' + num1);
				var div = document.getElementById('div' + num1);
				var tree = document.getElementById('tree'+num2);
				// 获取当前选择的 一级菜单的样式是否为打开
				if (img.getAttribute("class") == '') {
					img.setAttribute("class", "img_active")
				}
				// 放出当前选中的二级菜单
				div.style.display = "";
				// 先把所有颜色恢复原来的颜色
				this.classroom.forEach((item,index)=>{								
					for(var i =0; i<item.classRooms.length;i++ ){							
						document.getElementById('tree'+item.classRooms[i].classroomId).style.backgroundColor="#FFFFFF"
					}
				})
				// 设置当前选择的背景色
				tree.style.backgroundColor="#3197fc";
				//this.$emit('getlive',this.classroom[num1].classRooms[num2],this.classroom);
			},
			
			// 手动选择教室
			select_manual(res,classroom){		
				
				// 先把所有颜色恢复原来的颜色
				this.classroom.forEach((item,index)=>{
					
					for(var i =0; i<item.classRooms.length;i++ ){
						if(item.buildingId==classroom.buildingId){
							//console.log(index);
							//var div = document.getElementById('div' + index);
						}else{
							var div = document.getElementById('div' + index);
							var img = document.getElementById('img' + index);
							div.style.display = "none";
							img.className = "";
						}
						
						document.getElementById('tree'+item.classRooms[i].classroomId).style.backgroundColor="#ffffff"
					}
				})
				document.getElementById('tree'+res.classroomId).style.backgroundColor="#3197fc"
				this.$emit('getlive',res,classroom);
			}

		},
		computed: {
			length: function() {				
				return this.datalist.length;
			},
			
		}
	}
	
	

		
	
</script>

<style lang="scss" scoped>
	.view1 {
		float: left;
		position: relative;
		margin-left: 150px;
		width: 180px;
		height: 650px;
		border: 1px solid #009688;
		margin-bottom: 100px;
		display: inline-block;
		overflow: auto;
		cursor: pointer;
	}

	.view2 {
		width: 100%;
		height: 40px;
		background: #d5dfeb;
		border-bottom: 1px solid #f3f3f3;
		cursor: pointer;
	}

	.view3 {
		float: left;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.view4 {
		float: right;
		width: 0px;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.img_active {
		transform: rotate(90deg);
		ms-transform: rotate(90deg);
		/* IE 9 */
		moz-transform: rotate(90deg);
		/* Firefox */
		webkit-transform: rotate(90deg);
		/* Safari and Chrome */
		o-transform: rotate(90deg);
		/* Opera */
	}

	.view5 {
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #f3f3f3;
		cursor: pointer;
		background: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		// color: #ffffff;
	}

	.view5:hover {
		background-color: #3197fc !important;
	}
</style>
