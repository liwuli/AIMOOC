<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}<span style="margin-left: 15px;">{{this.$store.state.userinfo.userName}}</span> </span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei + ';'">

			 	<div class="scrollfather" :id="scrollfather" :style="'width:680px;' + 'height:' + wininfo.contenthei + ';'">
					<div class="scrollson" >
						<!-- <List :totalnum="totalnum"  @getcheckids="getcheckids" :selectmodules="selectmodules"  :info='modules' :listhead='listhead'  :colums="colums" :percentinfo='percentinfo'></List> -->
            <el-checkbox v-model="checked" @change="setAll" size="medium" style="margin-left: 15px;margin-bottom: 10px;">全选</el-checkbox>
            <el-tree
            :data="quanxian"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-checked-keys="default_checked"
            @check="handleCheckChange">
          </el-tree>


					</div>
					<div class="scroll_ymove">
						<div class="scroll_y" ></div>
					</div>
					<div class="scroll_xmove">
						<div class="scroll_x"></div>
					</div>
				</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="getCheckedNodes">{{msgsetN}}</div>
        <!-- <div class="save" @click="getCheckedNodes">获取选中数据</div> -->
 			</div>
 		</div>
 	</div>
</template>
<script>
import * as types from '@/store/win-types'
import List from '@/components/extend/listOpenAllcheck'
import {pathinforole, seturl, percentinfo, colums, listhead, roleurl, moduleurl, msgsetN, cancelN} from '@/module/admin/config/powerinfo'
export default {
  name: 'AJrolepower',
  data () {
    return {
      msg: msgsetN,
      wininfo: {
        widhei: ['700px', '470px'],
        btncancelleft: '245px',
        contenthei: '353px'
      },
      scrollfather: 'scrollfather',
      msgsetN: msgsetN,
      cancelN: cancelN,
      modules: [],
      scroll: false,
      listhead: listhead,
      colums: colums,
      percentinfo: percentinfo,
      idarr: {},
      roleid: '',
      selectmodules: [],
      totalnum: 0,
      quanxian:[],
      default_checked:[],
      checked:false,
      suoyou:[],
      pagedata:{}
    }
  },
  created () {
    let item = this.$route.params.item
    if (!item) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.roleid = item.id
      // 获取模块
      let that = this
      this.axios({
        method: 'post',
        url: roleurl,
        params: {
          params: {
            roleId: that.roleid
          }
        }
      })
      .then(function (res) {
        that.selectmodules = []
        if (res.data.code !== 200) {
          this.win(res.data.message)
        } else {
          // 获取模块，并且获取子模块
          let obj = []
          let arr = []
          let temp = res.data.result.data
          for (let i = 0; i < temp.length; i++) {
            obj[i] = {}
            obj[i]['id'] = temp[i].module.moduleId
            obj[i]['des'] = temp[i].module.moduleDescription
            obj[i]['operations'] = temp[i].operations

            //arr.push(temp[i].module.moduleId);
            //arr.push(temp[i].permissionId);
            if(temp[i].operations.length>0){
              for(var j =0;j<temp[i].operations.length;j++){
                  arr.push(temp[i].operations[j].operationId)
              }
            }
          }
          // console.log(arr)

          that.default_checked=arr;
          that.totalnum = obj.length
          that.selectmodules = obj
        }
      })
      .catch(function (error) {
        console.log(error)
      })
      // 列出所有模块
      this.axios({
        method: 'post',
        url: moduleurl
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          this.win(res.data.message)
        } else {
          // 获取模块，并且获取子模块
          let obj = []
          let temp = res.data.result.modules
          for (let i = 0; i < temp.length; i++) {
            obj[i] = {}
            obj[i]['id'] = temp[i].moduleId
            obj[i]['name'] = temp[i].moduleDescription
            obj[i]['list'] = []
            let objs = temp[i].childModules
            let tmp = []
            for (let j = 0; j < objs.length; j++) {
              tmp[j] = {}
              tmp[j]['id'] = objs[j].moduleId
              tmp[j]['name'] = objs[j].moduleName
              tmp[j]['opt'] = []
              let objss = objs[j].operations
              for (let k = 0; k < objss.length; k++) {
                tmp[j]['opt'].push({id: objss[k].operationId, des: objss[k].operationCode, name: objss[k].operationName})
              }
            }
            obj[i]['list'] = tmp
          }

          var quanxian = [];
          let suoyou  = [];
          for(var i=0; i<temp.length;i++){
             // 一级权限
             quanxian[i]={
               id:temp[i].moduleId,
               label:temp[i].moduleDescription,
               children:[],
               level:1,
             }
             if(temp[i].childModules.length>0){
                for(var j =0; j<temp[i].childModules.length;j++){
                  quanxian[i].children[j]={
                     id:temp[i].childModules[j].moduleId,
                     label:temp[i].childModules[j].moduleDescription,
                     children:[],
                     level:2
                  }
                  if(temp[i].childModules[j].operations.length>0){
                      for(var k =0; k<temp[i].childModules[j].operations.length;k++){

                          suoyou.push(temp[i].childModules[j].operations[k].operationId)

                          quanxian[i].children[j].children[k]={
                             id:temp[i].childModules[j].operations[k].operationId,
                             label:temp[i].childModules[j].operations[k].operationDescription,
                             parent_id:temp[i].childModules[j].moduleId,
                             level:3
                          }
                      }
                  }

                }
             }

          }
          that.quanxian= quanxian;
          that.suoyou=suoyou
          that.modules = obj
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  methods: {
    handleCheckChange(e,w){
      // console.log(e);
      // console.log(w);
    },

    setAll(e){
      console.log(e);
      if(e){
        this.default_checked=this.suoyou;
      }else{
        this.$refs.tree.setCheckedKeys([]);
        this.default_checked=[]
      }

    },

    getCheckedNodes(e){
       var  data_list= this.$refs.tree.getCheckedNodes(true,true)
       var arr = [];
       for(var i=0; i<data_list.length;i++){
          arr.push(data_list[i].parent_id)
       }
       // es6新语法数组去重
       var newarr = Array.from(new Set(arr))
       // 先获取所有选中的二级菜单
       var permissions = [];
       for(var i=0;i<newarr.length;i++){
          // 判断二级菜单里面的那些操作被选中
          permissions.push({
            moduleId:newarr[i],
            operations:[]
          })
          for(var j=0;j<data_list.length;j++){
            if(newarr[i]==data_list[j].parent_id){
                permissions[i].operations.push(data_list[j].id)
            }
          }
       }

      this.pagedata={
        permissions:permissions,
        role:this.roleid
      }
      this.savedata2();
       console.log(this.pagedata);
       // console.log(this.$refs.tree.getCheckedNodes(true,true));
       // console.log(this.$refs.tree.getCheckedKeys(true,true));
    },

    valid () {

    },
    getcheckids (ids) {
      this.idarr = {}
      let temp = []
      let j = 0
      for (let i = 0; i < ids.length; i++) {
        for (let m = 0; m < ids[i].length; m++, j++) {
          let str = ids[i][m].cfg.str
          temp[j] = {}
          for (let k in str) {
            let idopt = k.split('__')
            if (temp[j][idopt[0].split('_')[1]]) { // 如果有该项，则添加opt
              temp[j][idopt[0].split('_')[1]].push({operationCode: idopt[1]})
            } else { // 如果没有该项，则添加该项
              temp[j][idopt[0].split('_')[1]] = []
              temp[j][idopt[0].split('_')[1]].push({operationCode: idopt[1]})
            }
          }
        }
      }
      this.idarr['role'] = this.roleid
      this.idarr['permissions'] = []
      for (let m = 0; m < temp.length; m++) {
        if (temp[m]) {
          let obj = {}
          for (let k in temp[m]) {
            if (temp[m][k].length > 0) {
              obj['moduleId'] = k
              obj['operations'] = []
              for (let n = 0; n < temp[m][k].length; n++) {
                obj['operations'].push(temp[m][k][n].operationCode)
              }
              this.idarr['permissions'].push(obj)
            }
          }
        }
      }
    },
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: seturl,
        data: that.idarr
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },

    savedata2 () {
      let that = this
      this.axios({
        method: 'post',
        url: seturl,
        data: that.pagedata
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },


    cancelfn () {
      this.$router.push({name: pathinforole.prex})
    },
    win (content, backfn, flag) {
      if (flag === undefined) {
        flag = true
      }
      this.$Win({
        'title': types.title,
        'type': 'txt',
        'content': content,
        'timeout': types.Timeout3,
        'cancel': function (obj) {
          obj.remove(obj.getid)
        },
        'closeshow': flag,
        'timefn': function () {
          if (backfn) {
            backfn()
          }
        }
      })
    }
  },
  updated () {
    if (!this.scroll) {
      this.scroll = this.$Scroll({
        'father': 'scrollfather',
        'getfatheridPosition': document.querySelector('.formwin'),
        'scrollels': '.app'
      })
    } else {
      this.scroll.addElement()
    }
  },
  components: {
    List
  }
}
</script>
