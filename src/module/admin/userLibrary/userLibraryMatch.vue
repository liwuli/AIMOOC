<template>
  <div class="row">
    <div class="G_positon">
      <div class="item">
        <router-link :to="{name: 'AJuserLibrary'}">人员库</router-link> ><span>人员库匹配</span>
      </div>
    </div>
    <div class="row head">
      <span>班级: {{classInfo}}</span>
      <span class="leftSpace">学生人数: {{studentNum}}</span>
      <span class="leftSpace">已绑定: {{bindStuNum}}</span>
    </div>
    <div class="section floatleft">
      <div class="title">人员库列表</div>
      <div class="scrollfather" id="servercontrol1" :style="scrollpart[0]">
        <div class="scrollson" style="min-height: 100%;">
          <div class="floatleft top-item" v-for="(item,index) in xmlJson">
            <div class="text hides" :title="item.parentId">{{item.parentId}}</div>
            <div class="photo-wrap" :style="index === parentIndex?borderHard:''" @click="handleSelected(index)">
              <b class="del" @click="confirm(msg1,delUserIconByXml,1,item)">+</b>
              <img :src="item.userPics&&item.userPics[0]&&item.userPics[0].picPath" alt="">
            </div>
          </div>
        </div>
        <div class="scroll_ymove"><div class="scroll_y" ></div></div>
        <div class="scroll_xmove"><div class="scroll_x"></div></div>
      </div>
    </div>
    <div class="section floatright" style="background: #f2f0ff">
      <div class="title">用户列表</div>
      <div class="scrollfather" id="servercontrol2" :style="scrollpart[0]">
        <div class="scrollson" style="min-height: 100%;">
          <div class="floatleft top-item" v-for="item in classesStudentList">
            <div class="text hides font12" :title="item.realName">
              {{item.realName}} ({{item.roleType|roleType}}-{{item.gender|gender}})
            </div>
            <div class="photo-wrap" :style="item.userId === rightUserId?borderHard:''">
              <b class="nike" v-if="item.flag"></b>
              <b class="join" @click="confirm(msg2,matchStudentImageList,2,item)">+</b>
              <img :src="item.iconUrl" alt="" @click="findUserIconsByID(item)">
            </div>
          </div>
        </div>
        <div class="scroll_ymove"><div class="scroll_y" ></div></div>
        <div class="scroll_xmove"><div class="scroll_x"></div></div>
      </div>
    </div>
    <div class="section floatleft" style="margin-top: 10px;">
      <div class="title">人员库展示</div>
      <div class="scrollfather" id="servercontrol3" :style="scrollpart[1]">
        <div class="scrollson" style="min-height: 100%;">
          <div class="floatleft bottom-item" v-for="item in userPics">
            <div class="photo-wrap">
              <b v-if="item.sign" class="del" @click="delUserPic(item)">+</b>
              <b v-else class="del" @click="confirm(msg3,delUserIconByXml,3,item)">+</b>
              <img :src="item.picPath" alt="">
            </div>
          </div>
        </div>
        <div class="scroll_ymove"><div class="scroll_y" ></div></div>
        <div class="scroll_xmove"><div class="scroll_x"></div></div>
      </div>
    </div>
    <div class="section floatright" style="margin-top: 10px;background: #f2f0ff">
      <div class="title">用户展示</div>
      <div class="scrollfather" id="servercontrol4" :style="scrollpart[1]">
        <div class="scrollson" style="min-height: 100%;">
          <div class="floatleft bottom-item" v-for="item in usersList">
            <div class="photo-wrap">
              <b class="del" @click="delUserPic(item)">+</b>
              <img :src="item.localUrl" alt="">
            </div>
          </div>
        </div>
        <div class="scroll_ymove"><div class="scroll_y" ></div></div>
        <div class="scroll_xmove"><div class="scroll_x"></div></div>
      </div>
    </div>
  </div>
</template>

<script>
  import AJposition from '@/components/extend/position'
  import {deleteMatchStudentImage, findUserIconsByID, getUnmatchStudentXml, delUserIconByXml, findStudentImageListByClassID, matchStudentImageList} from '@/module/admin/config/userLibraryInfo'

  export default {
    name: 'AJuserLibraryMatch',
    components: {
      AJposition
    },
    data () {
      return {
        usersList: '',
        rightUserId: '',
        iconId: '',
        localPath: '',
        stoareaId: '',
        childId: '',
        parentIndex: -1,
        classesId: '',
        studentNum: '',
        bindStuNum: '',
        xmlJson: [],
        classesStudentList: [],
        listRecommend: [],
        msg1: ['确认删除', '是否确认删除此组全部照片？'],
        msg2: ['确认添加', '确认将人员库列表选中照片组添加至此用户？'],
        msg3: ['确认删除', '是否确认删除此照片？'],
        borderHard: {'border-color': '#3197fc'},
        classInfo: '',
        scrollpart: [{height: '360px', width: '98%', 'padding-left': '2%'}, {height: '140px', width: '98%', 'padding-left': '2%'}],
        scroll: {}
      }
    },
    computed: {
      userPics () {
        return this.xmlJson[this.parentIndex] && this.xmlJson[this.parentIndex].userPics || []
      },
      parentId () {
        return this.xmlJson[this.parentIndex] && this.xmlJson[this.parentIndex].parentId || ''
      }
    },
    filters: {
      gender (value) {
        switch (value) {
          case 1: return '男'
          case 2: return '女'
          default: return ''
        }
      },
      roleType (value) {
        switch (value) {
          case 2: return '老师'
          case 3: return '学生'
          default: return ''
        }
      }
    },
    methods: {
      async init () {
        this.localPath = ''
        let obj = this.$route.query
        this.classesId = obj.classesId
        this.studentNum = obj.studentNum || 0
        this.bindStuNum = obj.bindStuNum || 0
        let str = ''
        obj.collegeName && (str += (obj.collegeName + '-'))
        obj.majorName && (str += (obj.majorName + '-'))
        str += obj.classesName
        this.classInfo = str
        await this.getUnmatchStudentXml()
        await this.findStudentImageListByClassID()
        this.handleSelected(0)
        this.$nextTick(function () {
          this.creatScroll('servercontrol3')
        })
      },
      async getUnmatchStudentXml () { // 人员库列表
        try {
          const res = await this.axios.post(getUnmatchStudentXml, {classesId: this.classesId})
          if (!this.localPath) {
            this.localPath = res.data.fileLocalPath || ''
          }
          this.stoareaId = res.data.stoareaId || ''
          this.xmlJson = res.data.xmlJson || []
          this.$nextTick(function () {
            this.creatScroll('servercontrol1')
          })
        } catch (err) {
          console.log(err)
        }
      },
      async findStudentImageListByClassID () { // 用户列表
        try {
          const res = await this.axios.post(findStudentImageListByClassID, {classesId: this.classesId, localPath: this.localPath})
          this.classesStudentList = res.data.classesStudentList || []
          this.listRecommend = res.data.listRecommend || []
          this.findUserIconsByID(this.classesStudentList[0])
          this.$nextTick(function () {
            this.creatScroll('servercontrol2')
          })
        } catch (err) {
          console.log(err)
        }
      },
      async findUserIconsByID (item) { // 用户展示
        item && (this.rightUserId = item.userId)
        try {
          const res = await this.axios.post(findUserIconsByID, {userId: this.rightUserId})
          this.usersList = res.data.usersList || []
          this.$nextTick(function () {
            this.creatScroll('servercontrol4')
          })
        } catch (err) {
          console.log(err)
        }
      },
      delUserPic (item) { // 删除用户下照片
        this.iconId = item.iconId
        this.win(this.msg3, this.deleteMatchStudentImage)
      },
      async deleteMatchStudentImage () { // 删除用户下照片
        try {
          const res = await this.axios.post(deleteMatchStudentImage, {iconId: this.iconId})
          if (res.data.isSuccess) {
            this.win(['', '删除成功!'])
            this.findUserIconsByID()
          } else {
            this.win(['', res.data.content])
          }
        } catch (err) {
          console.log(err)
        }
      },
      async delUserIconByXml () { // 删除人员库
        try {
          const res = await this.axios.post(delUserIconByXml, {
            localPath: this.localPath,
            parentId: this.parentId,
            childId: this.childId
          })
          if (res.data.data !== 1) {
            this.win(['', '删除失败!'])
          }
          this.getUnmatchStudentXml()
        } catch (err) {
          console.log(err)
        }
      },
      async matchStudentImageList () { // 添加匹配
        try {
          const res = await this.axios.post(matchStudentImageList, {
            stoareaId: this.stoareaId,
            classesId: this.classesId,
            userId: this.userId,
            userPics: this.userPics
          })
          if (res.data.isSuccess === 1) {
            this.childId = 'all'
            this.delUserIconByXml()
            this.findUserIconsByID()
          } else {
            this.win(['', '添加失败!'])
          }
        } catch (err) {
          console.log(err)
        }
      },
      handleSelected (index) { // 选中人员库列表
        if (this.listRecommend[index]) { // 推荐匹配用户前三人
          let arr = this.listRecommend[index].userids || []
          for (let i = arr.length - 1; i > -1; i--) {
            for (let j = 0; j < this.classesStudentList.length; j++) {
              if (arr[i].userId === this.classesStudentList[j].userId) {
                this.classesStudentList.unshift(this.classesStudentList.splice(j,1)[0])
                break
              }
            }
          }
        }
        this.parentIndex = index
        this.$nextTick(function () {
          this.creatScroll('servercontrol3')
        })
      },
      confirm (msg, callback, value, item) {
        if (value === 1) {
          this.childId = 'all'
        } else if (value === 3) {
          this.childId = item.childId || ''
        } else if (value === 2) {
          this.userId = item.userId || ''
          if (!this.parentId) {
            this.win(['', '未选择人员库列表'])
            return
          }
        }
        this.win(msg, callback)
      },
      win (msg, callback) {
        this.$Win({
          title: msg[0],
          content: msg[1],
          btn: [['.save', '确定', '180px']],
          save: function (obj) {
            obj.remove(obj.getid)
            if (callback) {
              callback()
            }
          },
          cancel: function (obj) {
            obj.remove(obj.getid)
          }
        })
      },
      creatScroll (id) {
        if (!this.scroll[id]) {
          this.scroll[id] = this.$Scroll({
            'father': id,
            'getfatheridPosition': document.getElementById(id),
            'scrollels': '.app'
          })
        } else {
          if (document.getElementById(id)) {
            this.scroll[id].addElement()
          }
        }
      }
    },
    created () {
      console.log('created')
      this.init()
    },
    watch: {
      '$route' (to, from) {
        if (to.name === 'AJuserLibraryMatch') {
          console.log(this.$route)
          this.init()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .leftSpace{
    margin-left: 40px;
  }
  .head{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }
  .section{
    background: #f0f7ff;
    width: 49%;
    .title{
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }
  .top-item{
    width: 120px;
    margin-bottom: 30px;
    text-align: center;
    .text{
      padding: 0 1px;
      height: 14px;
      line-height: 14px;
      margin-bottom: 6px;
    }
    .font12{
      font-size: 12px;
    }
    .photo-wrap:hover{
      .join{
        display: block;
      }
    }
  }
  .bottom-item{
    margin-top: 6px;
    width: 120px;
    text-align: center;
  }
  .photo-wrap{
    width: calc(100% - 14px);
    height: 106px;
    margin: 0 auto;
    border: 4px solid #bdcbdc;
    border-radius: 4px;
    position: relative;
    background: #bfddff;
    img{
      width: 100%;
      height: 100%  ;
      display: block;
    }
    .join{
      display: none;
      font-size: 18px;
      color: #3298fd;
      width: 17px;
      height: 17px;
      line-height: 17px;
      border: 2px solid #3298fd;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      cursor: pointer;
    }
    .nike{
      background: #2d99fb;
      width: 15px;
      height: 15px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      position: absolute;
      right: -8px;
      top: -8px;
    }
    .nike:before{
      border-color: #fff;
      border-style: solid;
      border-width: 3px 3px 0 0;
      content: "";
      display: inline-block;
      height: 4px;
      width: 8px;
      vertical-align: text-top;
      transform: translateY(3px) rotateZ(133deg) rotateX(30deg);
      box-sizing: inherit;
    }
  }
  .del{
    color: #707271;
    background: #fff;
    width: 11px;
    height: 11px;
    line-height: 9px;
    border: 2px solid #707271;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    position: absolute;
    right: -10px;
    top: -10px;
    cursor: pointer;
    transform: rotate(45deg);
  }
</style>
