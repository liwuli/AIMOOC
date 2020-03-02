<template>
  <div>
    <div class="G_search">
      <span class="txt" style="float: left; line-height: 30px;">院系:</span>
      <el-cascader clearable
      placeholder="请选择院系和专业" style="float: left;margin-left: 10px;width: 250px;"
      :options="options" @change="select_class"
      filterable></el-cascader>
      <!-- <div class="part">
        <span class="txt" style="line-height: 30px;">院系:</span>
        <div id='select5' class="Select" style="width: 130px;"></div>
      </div> -->
    <!--  <div class="part">
        <span class="txt" style="line-height: 30px;">专业:</span>
        <div id='select6' class="Select" style="width: 130px;"></div>
      </div> -->
      <div class="part" style="margin-left: 20px;">
        <span class="txt" style="line-height: 30px;">班级:</span>
        <!-- <input type="text" v-model="classesName" style="border-right: none;"/> -->

      </div>
      <el-input style="float: left;width: 150px;"
        placeholder="请输入班级"
        v-model="classesName"
        clearable>
      </el-input>
      <!-- <div class="btn" style="float: left;" @click="pagepost({page: 1})">查询</div> -->
      <el-button type="primary" @click="pagepost({page: 1})" style="float: left;margin-left: 20px;" icon="el-icon-search">搜索</el-button>
    </div>
    <List :delbtn="delbtn" :addbtn="delbtn" :totalnum="totalnum" :pageinfo="pageinfo" :pageval="pageIndex" :pagesize="pageSize" :bingos="bingos"
          :head='listhead' :percentinfo="percentinfo" :colums="colums" :info='products' :optevent='optevent' :pathinfo="pathinfo" @pagepost="pagepost"></List>
  </div>
</template>

<script>
  import List from '@/components/extend/listcheck'
  import {findUserLibClassesList, findAllUserLibClassesList} from '@/module/admin/config/userLibraryInfo'

  export default {
    name: 'userLibraryManage',
    components: {
      List
    },
    data () {
      return {
        collegeId: '',
        majorId: '',
        classesName: '',
        delbtn: 'display: none',
        totalnum: 0,
        pageSize: 10,
        pageIndex: 1,
        products: [],
        pathinfo: {skip: 'AJuserLibraryMatch'},
        listhead: ['院系', '专业', '班级', '学生人数', '已绑定数', '操作'],
        optevent: ['skip'],
        colums: ['collegeName', 'majorName', 'classesName', 'studentNum', 'bindStuNum', 'opt'],
        percentinfo: ['wid20', 'wid20', 'wid20', 'wid10', 'wid10', 'wid20'],
        options:[]
      }
    },
    computed: {
      pageinfo () {
        return Math.ceil(this.totalnum / this.pageSize)
      },
      bingos () {
        let arr = []
        arr[this.pageIndex - 1] = 'selected'
        return arr
      }
    },
    methods: {

      select_class(e){
        this.collegeId = e[0] || ''
        this.majorId = e[1] || ''
      },

      async pagepost (obj) {
        try {
          this.pageIndex = obj.page
          const res = await this.axios.post(
            findUserLibClassesList,
            {
              classesType: 0,
              collegeId: this.collegeId,
              majorId: this.majorId,
              classesName: this.classesName.replace(/\s/g, ''),
              page: {pageSize: this.pageSize, pageIndex: this.pageIndex}
            }
          )
          this.totalnum = res.data.total || 0
          let arr = res.data.classesList || []
          let temp = []
          for (let i = 0; i < arr.length; i++) {
            if (i < this.pageSize) {
              temp[i] = {}
              temp[i]['classesId'] = arr[i].classesId
              temp[i]['collegeName'] = arr[i].collegeName
              temp[i]['majorName'] = arr[i].majorName
              temp[i]['classesName'] = arr[i].classesName
              temp[i]['studentNum'] = arr[i].studentNum
              temp[i]['bindStuNum'] = arr[i].bindStuNum
              temp[i]['opt'] = ['人员库匹配']
            }
          }
          this.products = temp
        } catch (err) {
          console.log(err)
        }
      },
      async findAllUserLibClassesList (arr, callback) { // 高教人员库行政班级
        try {
          let that = this
          const res = await this.axios.post(findAllUserLibClassesList)
          let objs = res.data.classesList

          var temp = []
          for(var i =0;i<objs.length;i++){
            temp.push({
              value:objs[i].collegeId,
              label:objs[i].collegeName,
              children: []
            })
            for(var j=0; j< objs[i].majorList.length;j++){
              temp[i].children.push({
                value:objs[i].majorList[j].majorId,
                label:objs[i].majorList[j].majorName,
              })
            }
          }

          that.options=temp;
          // for (let i = 0, len = arr.length; i < len; i++) {
          //   let temp = []
          //   temp[0] = {value: '-1', txt: '选择院系', list: []}
          //   for (let item = 0; item < objs.length; item++) {
          //     temp[item + 1] = {value: objs[item].collegeId, txt: objs[item].collegeName, list: objs[item].majorList}
          //   }
          //   this.$Select({
          //     'data': temp,
          //     'selectId': arr[i][0],
          //     'callback': function (obj) {
          //       that.collegeId = obj.ind ? obj.value : ''
          //       let objs = obj.list
          //       let temp = []
          //       temp[0] = {value: '-1', txt: '选择专业', item: obj}
          //       for (let item = 0; item < objs.length; item++) {
          //         temp[item + 1] = {value: objs[item].majorId, txt: objs[item].majorName}
          //       }
          //       that.$Select({
          //         'data': temp,
          //         'selectId': arr[i][1],
          //         'callback': function (obj) {
          //           that.majorId = obj.ind ? obj.value : ''
          //         },
          //         'matchval': [{val: -1}]
          //       })
          //     },
          //     'matchval': [{val: -1}]
          //   })
          // }
        } catch (err) {
          console.log(err)
        }
      }
    },
    created () {
      this.pagepost({page: 1})
    },
    mounted () {
      this.findAllUserLibClassesList([['select5', 'select6']])
    }
  }
</script>
