<template>
  <div>
    <div class="G_search" style="margin-bottom: 10px;">
      <div class="part">
        <span class="txt" style="line-height: 30px;">学期:</span>

        <!-- <div id='select5' class="Select"></div> -->
      </div>
       <el-select v-model="termId" placeholder="请选择学期" :popper-class="'el_selects_css'" style="float: left;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

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
  import {termSelect,findTermsLists} from '@/module/analyze/config'
  import {findUserLibClassesList} from '@/module/admin/config/userLibraryInfo'

  export default {
    name: 'userLibraryTeach',
    components: {
      List
    },
    data () {
      return {
        termId: '',
        classesName: '',
        termSelect: termSelect,
        delbtn: 'display: none',
        totalnum: 0,
        pageSize: 10,
        pageIndex: 1,
        products: [],
        pathinfo: {skip: 'AJuserLibraryMatch'},
        listhead: ['学期', '班级', '学生人数', '已绑定数', '操作'],
        optevent: ['skip'],
        colums: ['termName', 'classesName', 'studentNum', 'bindStuNum', 'opt'],
        percentinfo: ['wid30', 'wid20', 'wid15', 'wid15', 'wid20'],
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
      async pagepost (obj) {
        try {
          this.pageIndex = obj.page
          const res = await this.axios.post(
            findUserLibClassesList,
            {
              classesType: 1,
              termId: this.termId,
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
              temp[i]['termName'] = arr[i].termName
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
      getTermId (obj) {
        this.termId = obj.ind ? obj.value : ''
      },

      async findTermsLists(){
         const res = await this.axios.post(findTermsLists)
         let objs = res.data.termList || []
         let temp = []
         for(var i =0; i<objs.length;i++){
           temp.push({
             value:objs[i].termId,
             label:objs[i].termName
           })
         }
         this.options=temp;
      }


    },
    created () {
      this.pagepost({page: 1})
      this.findTermsLists();
    },
    mounted () {

      // this.termSelect(['select5'], this.getTermId)
    }
  }
</script>
