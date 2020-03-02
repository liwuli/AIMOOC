
<template>
  <div class="AA_left" :style="'height:' + auto_height + 'px'">
     <div class="outer-container">
         <div class="inner-container">
            <div class="content" >
                  <el-menu  class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :default-active="url"
                    background-color="#2a303e" text-color="#ffffff" active-text-color="#fbcc47" :router="true" @select="menu_select">
                        <el-submenu :index="ind+''" v-for="(items, ind) in links" :key="items.ind">
                          <template slot="title">
                            <span class="iconfont icontitle" :class="'icon-' + items.moduleCode"></span>
                            <span slot="title" style="margin-left: 10px;">{{items.moduleName}}</span>
                          </template>
                           <el-menu-item v-for="alink in items.childModules" :key="alink.moduleId" :index="alink.moduleCode">{{alink.moduleName}}</el-menu-item>
                       </el-submenu>

                  </el-menu>
            </div>
         </div>
     </div>


  </div>
</template>
<script>
  export default {
    name: 'AJlinklist',
    data() {
      return {
        links: this.$store.state.roleinfolinkMenu,
        minhei: window.innerHeight - 65 - 50,
        openclosearr: localStorage.getItem('linkoclose') ? JSON.parse(localStorage.getItem('linkoclose')) : {
          0: 0
        },
        navOpen: [],
        navInfo: {
          currentIndex: 0,
          maxLength: 2,
          showType: false
        },
        isCollapse: false,
        auto_height: 0,
        url:''
      }
    },


    computed: {

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      menu_select(e){
         localStorage.setItem("select_menu",JSON.stringify(e));
      },
      open_change(e){

      }
    },
    mounted() {
      var height = document.body.clientHeight - 115;
      this.auto_height = height;
      console.log("111"+this.$route.path)
      this.url = this.$route.path.split('/')[1];
      // console.log(JSON.stringify(this.$store.state.roleinfolinkMenu));
    },
    watch: {
      '$route'(to, from) {

      }
    },
    beforeDestroy() {

    }
  }
</script>

<style>
  .el-menu-vertical:not(.el-menu--collapse) {
    float: left;
    width: 278px;
    height: 100%;
    /* height: 822px; */
  }

  .el-menu-item:hover {
    background-color: #3197fc !important;
  }

  .outer-container,.content {
  	width: 278px;
  	height: 822px;
  }
  .outer-container {
      position: relative;
      overflow: hidden;
  }
  .inner-container {
      position: absolute;
      left: 0;
      overflow-x: hidden;
      overflow-y: scroll;
  }
   /* for Chrome */
  .inner-container::-webkit-scrollbar {
      display: none;
  }

</style>
