<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
      <router-view name="b"></router-view>
    </transition>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Flive.css">
		<Link></Link>
    <div class="center centerbottom50">
      <div class="centers1100" :style="'min-height: ' + minhei + 'px'">
        <div class="livetab">
          <span
            class="span"
            :class="livetabselectd[ind]"
            @click="changetype(ind)"
            v-for="(item, ind) in livetab"
          >{{item}}</span>
          <input type="text" class="searchinput" v-model="searchval">
          <span class="searchbtn" @click="search">{{liveinfo.search}}</span>
        </div>
        <div class="unlivesearch" id="unlivesearch">
          <Calendarme
            :valshow="valshows"
            :iconstyle="iconstyle"
            :ymdhms="ymdhms"
            :inputstyle="inputstyle"
            :part="part"
            :dateval="sydate"
            @startfn="startfn"
            :ids="start"
          ></Calendarme>
          <span class="to">{{liveinfo.to}}</span>
          <Calendarme
            :valshow="valshowe"
            :iconstyle="iconstyle"
            :ymdhms="ymdhms"
            :inputstyle="inputstyle"
            :part="part"
            :dateval="eydate"
            @endfn="endfn"
            :ids="end"
          ></Calendarme>
          <div class="searchbtn" @click="searchchunk">{{liveinfo.find}}</div>
        </div>
        <div class="livepink">
          <span class="span">{{liveinfo.pink}}：</span>
          <span
            class="span"
            :class="livepinkselectd[ind]"
            @click="changesee(ind)"
            v-for="(item, ind) in livepink"
          >{{item}}</span>
        </div>
        <div
          class="livelist"
          @click="seedetail(item)"
          v-for="(item, ind) in listinfo"
          :style="((ind + 1) % 4 === 0 && ind !== 0) ? 'margin-right: 0;' :''"
        >
          <div class="img">
            <img :src="item.imgurl ? item.imgurl : dlivepath">
          </div>
          <span class="name hides" :title="item.name + liveinfo.info + ':' +item.des">{{item.name}}</span>
          <div class="half">
            <span class="halficon iconfont icon-master"></span>
            <span class="txt hides" :title="item.person">{{item.person}}</span>
          </div>
          <div class="halfright">
            <span class="halficon iconfont icon-seetwo"></span>
            <span class="txt">{{item.num}}</span>
          </div>
          <div class="half" style="width: 100%;margin: 10px 0;">
            <span class="halficon iconfont icon-waitplay"></span>
            <span class="txt">{{item.dateval}}</span>
          </div>
        </div>
        <page
          :totalnum="totalnum"
          :bingo="bingo"
          @pagepost="pagepost"
          :pagesize="pagesize"
          :pageindex="pageindex"
          :totalpage="totalpage"
        ></page>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from "@/components/common/Homeheader";
import Gfoot from "@/components/common/footer";
import Link from "@/module/home/link";
import Calendarme from "@/components/extend/calendar.vue";
import page from "@/components/extend/page";
import {
  livecenterurl,
  pathinfolive,
  liveinfo,
  livepink,
  livepinkselectd,
  livetab,
  livetabendselectd,
  products,
  bingo,
  pageval,
  unlivepagesize,
  lessonresourcesurl
} from "@/module/home/config/liveinfo";
export default {
  name: "Flivelived",
  data() {
    return {
      products: products,
      bingo: bingo,
      pageval: pageval,
      pagesize: unlivepagesize,
      iconstyle: "margin-top:0px",
      dlivepath: "/static/images/Dlive.jpg",
      totalpage: 0,
      pageindex: 1,
      liveinfo: liveinfo,
      livetabselectd: livetabendselectd,
      livetab: livetab,
      livepinkselectd: livepinkselectd,
      livepink: livepink,
      listinfo: [],
      inputstyle: "width:130px;height:25px;line-height:25px",
      searchval: "",
      start: "start",
      end: "end",
      ymdhms: "ymd",
      valshows: false,
      valshowe: false,
      sydate: "",
      eydate: "",
      part: document.body,
      hotstate: 0,
      minhei: window.innerHeight - 65 - 50,
      totalnum: 0,
      lessonresourcesurl: ""
    };
  },
  created() {
    this.pagepost({ page: 1, sydate: "", eydate: "" });
  },
  components: {
    Ghead,
    Gfoot,
    Link,
    page,
    Calendarme
  },
  methods: {
    /* jumpdetail (item) {
      switch (item.type) {
        case 1:
          this.$router.push({name: pathinfolive.prex + 'detail', query: {liveid: item.id}})
          break
        case 0:
//        this.win(liveinfo.nostart, '', false)
          break
        case 2:
          this.$router.push({name: pathinfolive.prex + 'overdetail', query: {liveid: item.id}})
          break
      }
    },*/
    seedetail(item) {
     this.$router.push({
              name: "Flivereview",
              query: { liveId: item.id}
      });
     // let that = this;
      // this.axios({
      //   method: "post",
      //   url: lessonresourcesurl,
      //   params: {
      //     par: {
      //       liveId: item.id
      //     }
      //   }
      // })
      //   .then(function(res) {
      //     debugger
           
      //     // let objs = res.data.lessonList;
      //     // if (objs && objs.length > 0) {
      //     //   that.lessonId = objs[0]["lessonId"];
           
      //     // }
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },

    search() {
      this.$router.push({
        name: pathinfolive.prex + "search",
        params: { searchval: this.searchval }
      });
    },
    searchchunk() {
      this.pagepost({ page: 1 });
    },
    formcat(obj) {
      return (
        obj.year +
        "-" +
        (obj.month < 10 ? "0" + obj.month : obj.month) +
        "-" +
        (obj.day < 10 ? "0" + obj.day : obj.day)
      );
    },
    startfn(obj) {
      if (!this.valshows) {
        this.sydate = "";
        this.valshows = true;
      } else {
        this.sydate = this.formcat(obj);
        document.getElementById("start").value = this.sydate;
      }
    },
    endfn(obj) {
      if (!this.valshowe) {
        this.eydate = "";
        this.valshowe = true;
      } else {
        this.eydate = this.formcat(obj);
        document.getElementById("end").value = this.eydate;
      }
    },
    changetype(num) {
      this.livetabselectd = [];
      this.livetabselectd.splice(num, 1, "selected");
      switch (num) {
        case 0:
          this.$router.push({ name: pathinfolive.prex + "living" });
          break;
        case 1:
          this.$router.push({ name: pathinfolive.prex + "unlive" });
          break;
        case 2:
          this.$router.push({ name: pathinfolive.prex + "lived" });
          break;
      }
    },
    changesee(num) {
      this.hotstate = num;
      this.livepinkselectd = ["", ""];
      this.livepinkselectd.splice(num, 1, "selected");
      this.pagepost({ page: 1 });
    },
    getfiveday() {
      /* eslint-disable no-new */
      let temp = new Date().getTime() + 5 * 24 * 3600 * 1000;
      /* eslint-disable no-new */
      let temps = new Date(temp);
      return (
        temps.getFullYear() +
        "-" +
        (temps.getMonth() + 1 < 10
          ? "0" + (temps.getMonth() + 1)
          : temps.getMonth() + 1) +
        "-" +
        (temps.getDate() < 10 ? "0" + temps.getDate() : temps.getDate())
      );
    },
    pagepost(obj) {
      if (typeof obj === "number") {
        obj = { page: obj };
      }
      let that = this;
      that.pageindex = obj.page ? obj.page : obj;
      this.axios({
        method: "post",
        url: livecenterurl,
        data: {
          page: {
            pageSize: unlivepagesize,
            pageIndex: that.pageindex
          },
          liveStatus: 2,
          beginTime: that.sydate === "" ? "" : that.sydate,
          endTime: that.eydate === "" ? "" : that.eydate,
          orderType: that.hotstate.toString()
        }
      })
        .then(function(res) {
          let temp = [];
          let objs = res.data.reviewLivingList;
          that.totalnum = res.data.total;
          that.totalpage = Math.ceil(that.totalnum / unlivepagesize);
          for (let item = 0; item < objs.length; item++) {
            if (item < unlivepagesize) {
              temp[item] = {};
              temp[item]["id"] = objs[item].liveId;
              temp[item]["imgurl"] = objs[item].image;
              temp[item]["name"] = objs[item].liveName;
              temp[item]["person"] = objs[item].realName;
              temp[item]["num"] = objs[item].viewers;
              temp[item]["des"] = objs[item].description;
              temp[item]["type"] = 2;
              temp[item]["dateval"] =
                objs[item].beginTime.substring(
                  0,
                  objs[item].beginTime.length - 3
                ) +
                "-" +
                objs[item].endTime.split(" ")[1].substr(0, 5);
            }
          }
          that.listinfo = temp;
          that.bingo = [];
          that.bingo[that.pageindex - 1] = "selected";
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    //  this.eydate = this.getfiveday()
    if (location.hash.indexOf("Flive") >= 0) {
      document
        .querySelector('a[href="#/Flive"]')
        .setAttribute("class", "a active");
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "Flivelived") {
        this.pagepost({ page: this.pageindex });
      }
    }
  },
  beforeDestroy() {
    document.body.removeChild(document.getElementById("start_calendar"));
    document.body.removeChild(document.getElementById("end_calendar"));
  }
};
</script>
