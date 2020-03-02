<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Fcourse.css"/>
    <link rel="stylesheet" type="text/css" href="/static/cklive/css/indexvideo.css"/>
    <Link></Link>
    <div class="center centerbottom50">
      <div class="centers1100">
        <div class="cdetail_title">
          <span class="backarr iconfont icon-jiantou"  @click="backto"></span>
          <span class="title" @click="backto">{{detailinfo.title}}</span>
        </div>
        <div class="cdetail_left">
          <div class="video" id="playerArealocal"></div>
          <div class="videobottom">
            <div class="collect" @click="faviratefn($event)">
              <span class="collecticon iconfont " :class="favirate"></span>
              <span class="txt">{{detailinfo.collect}}</span>
            </div>
            <div class="download" @click="resdown">
              <span class="downloadicon iconfont icon-download"></span>
              <span class="txt">{{detailinfo.download}}</span>
            </div>
            <div class="learn" style="display: none;" @click="learned($event)">
              <span class="learicon iconfont icon-bingo"></span>
              <span class="txt">{{detailinfo.learn}}</span>
            </div>
          </div>
          <div class="files">
            <span class="title">{{detailinfo.resdownload}}</span>
            <div class="scrollfather" :id="resdownload" style="height: 100px">
              <div class="scrollson" >
                <div class="reslist" v-for="item in filesinfo" >
                  <span class="iconres iconfont" v-if="item.type === 'ppt'" :class="'ppt icon-' + item.type "  @click="seefile(item)"></span>
                  <span class="iconres iconfont" v-if="item.type === 'pdf'" :class="'ppt icon-' + item.type "  @click="seefile(item)"></span>
                  <span class="iconres iconfont" v-if="item.type === 'word'" :class="'word icon-' + item.type"  @click="seefile(item)"></span>
                  <span class="iconres iconfont" v-if="item.type === 'excel'" :class="'excel icon-' + item.type"  @click="seefile(item)"></span>
                  <span class="iconres iconfont" v-if="item.type === 'file'" :class="'file icon-' + item.type"  @click="seefile(item)"></span>
                  <span class="iconres iconfont" v-if="item.type === 'pic'" :class="'pic icon-' + item.type"  @click="seefile(item)"></span>
                  <span class="iconres iconfont" v-if="item.type === 'audio'" :class="'pic icon-' + item.type"  @click="seefile(item)"></span>
                  <span class="name hides"  @click="seefile(item)">{{item.name}}</span>
                </div>
               </div>
              <div class="scroll_ymove">
                <div class="scroll_y" ></div>
              </div>
              <div class="scroll_xmove">
                <div class="scroll_x"></div>
              </div>
            </div>
            <div class="resdownload"><a :href="getallresurl">{{detailinfo.resdownloadtogether}}</a></div>
          </div>
          <div class="mixpart">
            <div class="tab">
              <span @click="changemixparttab(ind, item.type)" :style="mixparttabstye[ind]" :class="mixparttabselected[ind]" v-for="(item, ind) in mixpartinfo">
               {{item.name}}
              </span>
            </div>
           <!-- <div class="stpart" :style="mixparttabstyle[0]" style="display: none">
              <div class="head">
                <span v-for="item in stinfo.headinfo">{{item}}</span>
                <span v-for="item in stheadinfoval">{{item}}</span>
              </div>
              <div class="half">
                <div class="leftspan">
                  {{stinfo.leftinfo[0]}}<span class="blue">{{stobj.duration}}s</span>
                </div>
                <div class="leftspan">
                  {{stinfo.leftinfo[1]}}<span class="blue">{{stobj.sampling}}s</span>
                </div>
                <div class="leftspan">
                  {{stinfo.leftinfo[2]}}<span class="blue">{{stobj.N}}</span>
                </div>
                <div class="leftspan">
                  {{stinfo.leftinfo[3]}}<span class="blue">{{stobj.NS}}</span>
                </div>
                <div class="leftspan">
                  {{stinfo.leftinfo[4]}}<span class="blue">{{stobj.NT}}</span>
                </div>
                <div class="leftspan">
                  {{stinfo.leftinfo[5]}}<span class="blue">{{stobj.g}}</span>
                </div>
                <div class="leftspan">
                  {{stinfo.leftinfo[6]}}<span class="blue">{{stobj.NT / stobj.N * 100|formcatfn}}%</span>
                </div>
                <div class="leftspan">
                  {{stinfo.leftinfo[7]}}<span class="blue">{{(stobj.g - 1) / stobj.N * 100|formcatfn}}%</span>
                </div>
                <div class="leftspan">
                  {{stinfo.leftinfo[8]}}<span class="blue">({{stobj.type}})</span>
                </div>
              </div>
              <div class="half">
                <div class="rtChart" id="rtChart"></div>
                <div class="halfhead">
                  <span v-for="item in stinfo.halfhead">{{item}}</span>
                  <div v-for="item in stinfo.halfmodel">
                    <span>{{item.model}}</span>
                    <span>{{item.val}}</span>
                  </div>
                </div>
              </div>
              <div class="stchart" id="stChart"></div>
            </div>-->
            <div class="discusspart" :style="mixparttabstyle[0]">
              <div class="publishbtn" @click="publishappraiseevent">{{discusspartinfo.btn}}</div>
              <div class="list" v-for="(item, ind) in discusslist">
                <div class="img">
                  <img  :src="item.imgurl ? item.imgurl : duserpath" align="" title=""/>
                </div>
                <div class="right">
                    <span class="title">{{item.name}}</span>
                    <span class="dates">{{item.dates}}</span>
                    <span class="content">{{item.content}}</span>
                    <span class="appraiseicontxt" v-show="!item.state" @click="discusstitleappaise(item)">{{item.appraisenum}}</span>
                    <span class="appraiseicontxt" v-show="item.state" >{{item.appraisenum}}</span>
                    <span class="appraiseicon iconfont icon-praise" v-show="!item.state" @click="discusstitleappaise(item)"></span>
                    <span class="appraiseicon blue iconfont icon-praised" v-show="item.state" ></span>
                    <span class="discussicontxt">{{item.discuss}}</span>
                    <span class="discussicon iconfont icon-appraise"  @click="showresponse($event, ind)"></span>
                    <div class="response" :style="responseshow[ind]">
                      <div class="head">{{item.appraisearr.length}}{{discusspartinfo.appraisenum}}</div>
                      <div class="listpart">
                        <div class="lists" v-for="items in item.appraisearr">
                          <span class="name">{{items.name}}：</span>
                          <span class="textcontent">{{items.textval}}</span>
                        </div>
                      </div>
                      <input class="input" :placeholder="discusspartinfo.palceholder" v-model="responseval[ind]"/>
                      <div class="publishbtn" @click="responseevent(item, ind)">{{discusspartinfo.appraise}}</div>
                    </div>
                </div>
              </div>
              <page :totalnum="totalnum" :bingo="bingo" @pagepost="getdiscuss" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page>
            </div>
            <div class="discusspart1" :style="mixparttabstyle[1]">
              <div class="responseback" v-show="!responseshowquestion">
                <div class="publishbtn" @click="publishappraiseevent1">{{discusspartinfo.btn1}}</div>
                <div class="list" style="min-height: 130px" v-for="(item, ind) in questionlist">
                  <div class="img">
                    <img :src="item.imgurl ? item.imgurl : duserpath" align="" title=""/>
                  </div>
                  <div class="right">
                      <span class="title">{{item.name}}</span>
                      <span class="dates">{{item.dates}}</span>
                      <span class="content hides blue" style="height: 20px" @click="showresponsequestion(item, ind)">{{item.title}}</span>
                      <span class="content" >{{item.content}}</span>
                      <span class="appraiseicontxt" v-show="!item.state" @click="titleappaise(item)">{{item.appraisenum}}</span>
                      <span class="appraiseicontxt" v-show="item.state" >{{item.appraisenum}}</span>
                      <span class="appraiseicon iconfont icon-praise" v-show="!item.state" @click="titleappaise(item)"></span>
                    	<span class="appraiseicon iconfont blue icon-praised" v-show="item.state" ></span>
                      <span class="discussicontxt">{{item.discuss}}</span>
                      <span class="discussicon iconfont icon-commit"  @click="showresponsequestion(item, ind)"></span>
                  </div>
                </div>
                <page :totalnum="totalnum1" :bingo="bingoq" @pagepost="getquestion" :pagesize="pagesize" :pageindex="pageindexq" :totalpage="totalpageq"></page>
              </div>
              <div class="responseback" v-show="responseshowquestion">
                <div class="back" @click="backevent">
                  <span class="backicon iconfont icon-jiantou"></span>
                  <span class="backtxt" style="cursor: pointer">{{questioninfo.back}}</span>
                </div>
                <div class="list"  style="min-height: 130px" >
                  <div class="img">
                    <img :src="resquestionitem.imgurl ? resquestionitem.imgurl : duserpath"  align="" title=""/>
                  </div>
                  <div class="right">
                      <span class="title">{{resquestionitem.name}}</span>
                      <span class="dates">{{resquestionitem.dates}}</span>
                      <span class="content hides blue" style="height: 20px">{{resquestionitem.title}}</span>
                      <span class="content">{{resquestionitem.content}}</span>
                  </div>
                  <div class="iappraise" @click="iappraiseevent(resquestionitem)">{{questioninfo.iappraise}}</div>
                </div>
                <div class="back">
                  <span class="backtxt">{{questioninfo.all}}</span>
                </div>
                <div class="list" v-for="(item, ind) in resquestionitem.appraisearr">
                  <div class="img">
                    <img :src="item.imgurl ? item.imgurl : duserpath" align="" title=""/>
                  </div>
                  <div class="right">
                      <span class="title">{{item.name}}</span>
                      <span class="dates">{{item.dates}}</span>
                      <span class="content">{{item.textval}}</span>
                      <span class="appraiseicontxt" >{{item.num}}</span>
                      <span class="appraiseicon iconfont icon-praise" v-show="!item.state" @click="resappraiseevent(item)"></span>
                      <span class="appraiseicon iconfont icon-praised blue" v-show="item.state" ></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="setscole" :style="mixparttabstyle[2]">
              <div class="setcoleshow" v-if="!chartshow">
              	<div class="head">
	                <span v-for="(item, ind) in setscoletemplatelist" @click="templateevent(item, ind)" :class="scoleselected[ind]">{{item.name}}</span>
	              </div>
	              <div class="list" v-for="(item, itemind) in setscolerealdatalist">
	                <div class="lists" style="font-size: 14px">{{item.title.name}}({{item.title.scole}}{{scoleinfo.scole}})</div>
	                <div class="lists" v-for="(items, ind) in item.content">
	                  <span class="content">{{items.name}}({{items.scole}}{{scoleinfo.scole}})</span>
	                  <div class="scole">
	                    <scole :key="items.id" :scoletype="scoletype" :timeout="scoletime" @resetupdateevent="resetupdateevent" :resetupdate="resetupdate[items.ind]" :items="items" :ind="'scoleinput_' + items.ind"   @scoleevent="scoleevent"  :starid="'star_' + items.ind" :totalwid="totalwid" :bool="bool" :starnum="starnum" :inputstyle="inputstyle" :val="initscoleval" :disabled="disabled" :wid="initscoleval" :totalscole="items.scole"></scole>
	                    <span class="scoletxt">{{scoleinfo.scole}}</span>
	                  </div>
	                </div>
	              </div>
	              <div class="list" style="border:none">
	                <div class="lists" style="font-size: 14px">{{scoleinfo.scole}}({{scoletotal}}{{scoleinfo.scole}}): {{scolesettotal.val}} {{scoleinfo.scole}}</div>
	              </div>
	              <div class="list" style="border:none">
	                <div class="submit" @click="submitscole">{{scoleinfo.setscolesubmit}}</div>
	              </div>
              </div>
              <div class="setcoleshowchat" v-show="chartshow">
              	<div class="head">
	                <span v-for="(item, ind) in setscoletemplatelist" @click="templateevent(item, ind)" :class="scoleselected[ind]">{{item.name}}</span>
	              </div>
              	<div class="title">
              		<span class="txt fontsize12">{{scoleinfo.total}}{{setscolepersonnum}}{{scoleinfo.personset}}：</span>
              		<span class="txt fontsize17">{{setscoleval}}</span>
              	</div>
              	<div class="half">
              		<echarts :echartdata="echartzdata" :title="ztitle" :echartid = "echartid" :styles = "zstyles"></echarts>
              	</div>
              	<div class="half">
              		<echarts :echartdata="piedata" :title="ztitle" :echartid = "pieid" :styles = "zstyles"></echarts>
              	</div>
	            </div>
            </div>

          </div>
        </div>
        <div class="cdetail_right">
          <div class="courseinfo">
            <div class="courseinfos">
              <div class="left">
                <span class="title hides" :title="courseshowinfo.title">{{courseshowinfo.title}}</span>
                <span class="teachercharge hides" :title="courseshowinfo.name">{{detailinfo.teachercharge}}{{courseshowinfo.name}}</span>
              </div>
              <div class="right">
                <img :src="courseshowinfo.imgurl ? courseshowinfo.imgurl : dcoursepath"/>
              </div>
            </div>
            <div class="tab">
              <span :style="'width:' + 100 / tabinfo.length + '%'" @click="changetab(ind, item.type)" :class="tabselected[ind]" v-for="(item, ind) in tabinfo">
                {{item.name}}
              </span>
            </div>
            <!--选集-->
            <div class="scrollfather" :id="xj" style="height: 270px" :style="tabstyle[0]">
              <div class="scrollson" >
                <div class="xjlist" @click="changeresourceid(item)" v-for="item in xjlist">
                  <div class="img">
                  	<span class="txt" v-if="item.play">{{detailinfo.play}}</span>
                    <span class="txt" v-if="!item.play">{{item.title}}</span>
                    <img  :src="item.imgurl ? item.imgurl : dcoursepath"/>
                  </div>
                  <!-- <div class="title hides" >{{item.title}}</div> -->
                  <div class="title hides" :title=item.title >{{item.title}}</div> <!-- 资源名称过长时，鼠标放置名称处显示完成资源名称。 -->


                  <div class="see hides">{{detailinfo.time + '  ' + item.time}}</div>
                </div>
               </div>
              <div class="scroll_ymove">
                <div class="scroll_y" ></div>
              </div>
              <div class="scroll_xmove">
                <div class="scroll_x"></div>
              </div>
            </div>
            <!--目录-->
            <div class="scrollfather" :id="ml" style="height: 270px" :style="tabstyle[1]">
              <div class="scrollson" >
                <div class="mllist" :class="item.id === lessonId ? 'mllisthover' : ''" v-for="item in mllist" @click="mllisteent(item)">
                  <div class="jieci hides">{{item.num}}</div>
                  <div :title="item.name" class="title hides">{{item.name}}</div>
                  <div class="dates hides">
                    <span class="txt" >{{item.dates}}</span>
                    <span class="playicon iconfont icon-video"></span>
                  </div>
                </div>
               </div>
              <div class="scroll_ymove">
                <div class="scroll_y" ></div>
              </div>
              <div class="scroll_xmove">
                <div class="scroll_x"></div>
              </div>
            </div>
            <!--笔记-->
            <div class="notelist" :style="tabstyle[2]">
              <div class="tabtwo">
                <span class="tabhalf" @click="mynoteevent($event, ind)" :class="noteselected[ind]" v-for="(item, ind) in mynote">
                  {{item}}
                </span>
              </div>
              <!--我的笔记-->
              <div class="scrollfather" :id="note" style="height: 250px" :style="tabtwoselected[0]">
                <div class="scrollson" >
                  <div class="tabcreatebtn" :class="tabcreatebtnselected" @click="notecreatebtn($event)">{{noteinfo.addnote}}</div>
                  <div class="tabcreatecontent" v-show="tabcreatebtnflag">
                    <textarea name="" :placeholder="noteinfo.textareaplaceholder" v-model="mynotecontent" class="tabtextarea" rows="" cols=""></textarea>
                    <div class="time">
                      <span class="timeicon iconfont icon-bofang"></span>
                      <span class="timeval">{{notetimeval}}</span>
                    </div>
                    <div class="save" @click="notesave">{{noteinfo.save}}</div>
                    <div class="cancel" @click="notecancel">{{noteinfo.cancel}}</div>
                  </div>
                  <!--<div class="tabcreatecontent" style="position: absolute;bottom:20px;z-index: 5;background: #fff;height:230px" v-show="tabeditflag">
                    <textarea name="" :placeholder="noteinfo.textareaplaceholder" style="margin-top: 80px;" v-model="mynoteeditcontent" class="tabtextarea" rows="" cols=""></textarea>
                    <div class="save" @click="noteeditsave(item, ind)">{{noteinfo.save}}</div>
                    <div class="cancel" @click="noteeditcancel(ind)">{{noteinfo.cancel}}</div>
                  </div>-->
                  <div class="mynotelist"  v-for="(item, ind) in mynotelist" >
                    <div class="img">
                      <img :src="item.imgurl ? item.imgurl : duserpath" alt="" />
                    </div>
                    <div class="line" style="margin-bottom: 20px">
                      <span class="title hides" :title="item.name">{{item.name}}</span>
                      <div class="time" @click="jumptoseconds(item.timejump)">
                        <span class="timeicon iconfont icon-bofang"></span>
                        <span class="timeval">{{item.time}}</span>
                      </div>
                    </div>
                    <div class="line" >
                      <span class="title hides" :title="item.commit">{{item.commit}}</span>
                      <input type="text" class="input" :id="'mynoteinput' + ind"/>
                      <div class="save1" :id="'mynotesave' + ind" @click="noteeditsave(item, ind)">{{noteinfo.save}}</div>
                    	<div class="cancel1" :id="'mynotecancel' + ind" @click="noteeditcancel(ind)">{{noteinfo.cancel}}</div>
                      <div class="time" style="border:none">
                        <span class="appraiseicon iconfont icon-praise" v-show="!item.state" @click="noteappraise(item)"></span>
                        <span class="appraiseicon iconfont icon-praised blue"  v-show="item.state"></span>
                        <span class="timeval" v-show="!item.state" @click="noteappraise(item)">{{item.num}}</span>
                        <span class="timeval"  v-show="item.state">{{item.num}}</span>
                      </div>
                    </div>
                    <div class="dates">{{item.dates}}</div>
                    <div class="optline">
	                    <span class="edit iconfont icon-xiugai" @click="mynoteedit(item, ind)"></span>
	                    <span class="del iconfont icon-del" @click="mynotedel(item)"></span>
	                   </div>
                  </div>
                 </div>
                <div class="scroll_ymove">
                  <div class="scroll_y" ></div>
                </div>
                <div class="scroll_xmove">
                  <div class="scroll_x"></div>
                </div>
              </div>
              <!--他人笔记-->
              <div class="scrollfather" :id="othernote" style="height: 250px;margin-top: 0;" :style="tabtwoselected[1]">
                <div class="scrollson" >
                  <div class="othernotelist" v-for="item in othernotelist">
                    <div class="img">
                      <img :src="item.imgurl ? item.imgurl : duserpath" alt="" />
                    </div>
                    <div class="line" style="margin-bottom: 20px">
                      <span class="title hides" :title="item.name">{{item.name}}</span>
                      <div class="time" @click="jumptoseconds(item.time)">
                        <span class="timeicon iconfont icon-bofang"></span>
                        <span class="timeval">{{item.time}}</span>
                      </div>
                    </div>
                    <div class="line">
                      <span class="title hides" :title="item.commit">{{item.commit}}</span>
                      <div class="time" style="border:none">
                        <span class="appraiseicon iconfont icon-praise" v-show="!item.state" @click="othernoteappraise(item)"></span>
                        <span class="appraiseicon iconfont icon-praised blue"  v-show="item.state"></span>
                        <span class="timeval" v-show="!item.state" @click="othernoteappraise(item)">{{item.num}}</span>
                        <span class="timeval" v-show="item.state">{{item.num}}</span>
                      </div>
                    </div>
                    <div class="dates">{{item.dates}}</div>
                  </div>
                 </div>
                <div class="scroll_ymove">
                  <div class="scroll_y" ></div>
                </div>
                <div class="scroll_xmove">
                  <div class="scroll_x"></div>
                </div>
              </div>
            </div>
            <!--知识点-->
            <div class="scrollfather" :id="knowledge" style="height: 250px" :style="tabstyle[3]">
              <div class="scrollson" >
                <div class="tabcreatebtn" v-show="knowledgecreateflag" :class="knowledgecreatebtnselected" @click="knowledgecreatebtn($event)">{{knowledgeinfo.addknowledge}}</div>
                <div class="tabcreatecontent" v-show="knowledgecreatebtnflag">
                  <div class="knowledgeline">
                    <span class="txt">{{knowledgeinfo.nowtime}}</span>
                    <div class="red" style="float: left">*</div>
                    <span class="txt">：</span>
                    <input type="text" class="input" @blur="knowledgeblur('h')" v-model="knowledgehour" :value="knowledgehour"/>
                    <span class="txt">{{knowledgeinfo.hour}}</span>
                    <input type="text" class="input" @blur="knowledgeblur('m')" v-model="knowledgeminutes" :value="knowledgeminutes"/>
                    <span class="txt">{{knowledgeinfo.minutes}}</span>
                    <input type="text" class="input" @blur="knowledgeblur('s')" v-model="knowledgeseconds" :value="knowledgeseconds"/>
                    <span class="txt">{{knowledgeinfo.seconds}}</span>
                  </div>
                  <div class="knowledgeline">
                    <span class="txt">{{knowledgeinfo.content}}</span>
                    <div class="red" style="float: left">*</div>
                    <span class="txt">：</span>
                    <input type="text" class="inputb" maxlength="10" v-model="knowledgecontent"/>
                  </div>
                  <div class="save1" style="margin-left: 47px" @click="knowledgesave">{{knowledgeinfo.save}}</div>
                  <div class="cancel1" @click="knowledgecancel">{{knowledgeinfo.cancel}}</div>
                </div>
                <div class="knowledgelist" v-for="(item, ind) in knowledgelist" >
                  <div class="time hides" @click="jumptoseconds(item.dates)">{{item.dates}}</div>
                  <div class="title hides">{{item.title}}</div>
                  <span v-if="knowledgecreateflag" class="editicon iconfont icon-xiugai" @click="knowledgeedit(item, ind)"></span>
                  <span v-if="knowledgecreateflag" class="delicon iconfont icon-del" @click="knowledgedel(item, ind)"></span>
                  <input type="text"  v-show="knowledgeeditbtnflag[ind]" :value="item.title" v-model="knowledgeeditval" class="editcontent" />
                  <div class="save1" v-show="knowledgeeditbtnflag[ind]" style="margin-left: 47px" @click="knowledgeeditsave(item, ind)">{{knowledgeinfo.save}}</div>
                  <div class="cancel1" v-show="knowledgeeditbtnflag[ind]" @click="knowledgeeditcancel(item, ind)">{{knowledgeinfo.cancel}}</div>
                </div>
               </div>
              <div class="scroll_ymove">
                <div class="scroll_y" ></div>
              </div>
              <div class="scroll_xmove">
                <div class="scroll_x"></div>
              </div>
            </div>
            <!--微视频-->
            <div class="scrollfather" :id="microvideo" style="height: 250px" :style="tabstyle[4]">
              <div class="scrollson" >
                <div class="tabcreatebtn" v-show="microvideocreateflag" :class="microvideocreatebtnselected" @click="microvideocreatebtn($event)">{{microvideoinfo.addmicrovideo}}</div>
                <div class="tabcreatecontent" v-show="microvideocreatebtnflag">
                  <div class="knowledgeline">
                    <span class="txt">{{microvideoinfo.start}}</span>
                    <span class="txt">：</span>
                    <input type="number" class="input" @blur="knowledgeblur('h')" min="0" v-model="microSH" :value="microSH"/>
                    <span class="txt">{{microvideoinfo.hour}}</span>
                    <input type="number" class="input" @blur="knowledgeblur('m')" min="0" v-model="microSM" :value="microSM"/>
                    <span class="txt">{{microvideoinfo.minutes}}</span>
                    <input type="number" class="input" @blur="knowledgeblur('s')"  min="0" v-model="microSs" :value="microSs"/>
                    <span class="txt">{{microvideoinfo.seconds}}</span>
                    <span class="getnowtime" @click="getmicrostarttime">{{microvideoinfo.gettime}}</span>
                  </div>
                  <div class="knowledgeline">
                    <span class="txt">{{microvideoinfo.end}}</span>
                    <span class="txt">：</span>
                    <input type="number" class="input" @blur="knowledgeblur('h')" min="0" v-model="microEH" :value="microEH"/>
                    <span class="txt">{{microvideoinfo.hour}}</span>
                    <input type="number" class="input" @blur="knowledgeblur('m')" min="0" v-model="microEM" :value="microEM"/>
                    <span class="txt">{{microvideoinfo.minutes}}</span>
                    <input type="number" class="input" @blur="knowledgeblur('s')" min="0" v-model="microEs" :value="microEs"/>
                    <span class="txt">{{microvideoinfo.seconds}}</span>
                    <span class="getnowtime"  @click="getmicroendtime">{{microvideoinfo.gettime}}</span>
                  </div>
                  <div class="knowledgeline">
                    <span class="txt">{{microvideoinfo.name}}：</span>
                    <input type="text" class="input" v-model="microname" :value="microname" style="width: 200px; text-align: left;padding: 0 10px;"/>
                  </div>
                  <div class="save1" style="margin-left: 41px" @click="microvideosave">{{microvideoinfo.save}}</div>
                  <div class="cancel1" @click="microvideocancel">{{microvideoinfo.cancel}}</div>
                </div>
                <div class="microvideolist" v-for="(item, ind) in microvideolist" >
                  <div class="img" @click="microvideosee(item)">
                    <span class="txt">{{microvideoinfo.pic}}</span>
                    <img :src="item.imgurl ? item.imgurl : dmicrovideourl" alt="" title=""/>
                  </div>
                  <span class="title">{{item.title}}</span>
                  <span class="title" style="width: auto">{{microvideoinfo.times}}：{{item.dates}}</span>
                  <span v-if="microvideocreateflag" class="delicon iconfont icon-del" @click="microvideodel(item, ind)"></span>
                  <a :href="'/base/courseMicroVideo/downloadMicroVideo?id=' + item.id"><span class="editicon iconfont icon-download" ></span></a>
                </div>
               </div>
              <div class="scroll_ymove">
                <div class="scroll_y" ></div>
              </div>
              <div class="scroll_xmove">
                <div class="scroll_x"></div>
              </div>
            </div>
        </div>
          <div class="relativecourse">
            <span class="title">{{detailinfo.reshot}}</span>
            <div class="scrollfather" :id="reshot" >
              <div class="scrollson" >
                <div v-if="item.ispush>0" class="reshotlist" v-for="item in reshotlist">
                  <div class="img" @click="jumptointroduction(item)">
                    <span class="txt">{{detailinfo.courseDpic}}</span>
                    <img :src="item.imgurl ? item.imgurl : dcoursepath"/>
                  </div>
                  <div class="title hides">{{item.title}}</div>
                  <div class="teacher hides">{{detailinfo.teacher}}{{item.teacher}}</div>
                  <div class="see hides">{{detailinfo.personnum}}{{item.num}}</div>
                </div>
               </div>
              <div class="scroll_ymove">
                <div class="scroll_y" ></div>
              </div>
              <div class="scroll_xmove">
                <div class="scroll_x"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/Homeheader'
import Gfoot from '@/components/common/footer'
import echarts from '@/components/extend/echart'
import Link from '@/module/home/link'
import scole from '@/components/extend/scole'
import page from '@/components/extend/page'
import {getnoteappraiseurl, sturl, faviratestateurl, favirateaddurl, faviratedelurl, discusstitleappaiseurl, titleappraiseurl, resdiscussurl, pagesize, warntxt, getdiscussurl, resteacherquestionurl, addmicrovideourl, getteacherquestionurl, getmicrovideourl, submitscoleurl, gettemplateurl, editnoteurl, addnoteurl, getDetailnoteurl, knowledgedelurl, knowledgeediturl, getDetailrelresurl, getDetailrelcourseurl, coursedetailwarntxt, getcouseaboutinfourl, getDetailresurl, getDetailmlurl, knowledgeaddurl, knowledgelisturl, detailinfo, stinfo, scoleinfo, questioninfo, discusspartinfo, mixparttabstyle, mixparttabselected, mixpartinfo, noteinfo, microvideoinfo, knowledgeinfo, tabselected, tabtwoselected, tabinfo, tabstyle, mynote, noteselected} from '@/module/home/config/courseinfo'
export default {
  name: 'Fcoursedetail',
  data () {
    return {
      resquestionitem: {name: '', title: '', dates: '', content: '', appraisenum: 0, discuss: 0, appraisearr: [], imgurl: ''},
      zstyles: 'width:300px;height:300px',
      dcoursepath: '/static/images/Dcourse.jpg',
      duserpath: '/static/images/D_user.png',
      microSH: 0,
      microEH: 0,
      microSM: 0,
      microEM: 0,
      microSs: 0,
      microEs: 0,
      resetupdate: [],
      scoletime: 300,
      fnname: 'scolefn',
      microname: '',
      mixparttabstye: [ '', '', '', ''],
      favirate: 'icon-starbg',
      mynoteoptshow: [],
      mynoteeditcontent: '',
      noteedititem: '',
      echartzdata: {},
      tabeditflag: false,
      echartid: 'zhuid',
      ztitle: '统计图',
      pieid: 'pieid',
      piedata: {},
      piezdata: {},
      chartshow: false,
      scolesettotal: {val: 0},
      scoleinfo: scoleinfo,
      questioninfo: questioninfo,
      scoleselected: ['selected'],
      scoleresselected: ['selected'],
      appraisestarbool: false,
      scolealldata: [],
      setscolepersonnum: 0,
      setscoleval: 0,
      scoletotal: 0,
      bingo: [],
      setscoleind: 0,
      scoletype: 'init',
      bingoq: [],
      scoletemplatelistid: '',
      scoledetaillist: [],
      totalwid: 135,
      starnum: 5,
      initscoleval: 0,
      totalscole: 5,
      notetimeval: '00:00:00',
      disabled: 'disabled',
      inputstyle: 'width:20px;margin:0 5px 0 20px;background:none;height:12px;border:1px solid #707070',
      bool: false,
      pagesize: pagesize,
      pageindex: 1,
      pageindexq: 1,
      totalpageq: 0,
      totalpage: 0,
      responseval: [],
      responseshow: [],
      responsevalq: [],
      responseshowquestion: false,
      detailinfo: detailinfo,
      stinfo: stinfo,
      discusspartinfo: discusspartinfo,
      mixparttabstyle: mixparttabstyle,
      tabstyle: tabstyle,
      tabselected: tabselected,
      knowledgeinfo: knowledgeinfo,
      microvideoinfo: microvideoinfo,
      mixpartinfotemp: mixpartinfo,
      mixpartinfo: [],
      tabinfo: tabinfo,
      noteinfo: noteinfo,
      infos: {},
      mynote: mynote,
      noteselected: noteselected,
      mixparttabselected: mixparttabselected,
      tabcreatebtnselected: '',
      knowledgecreatebtnselected: '',
      microvideocreatebtnselected: '',
      notecreatebtnstyle: '',
      filesinfo: [],
      resdownload: 'resdownload',
      knowledgehour: 0,
      knowledgeminutes: 0,
      knowledgeseconds: 0,
      knowledgecontent: '',
      reshot: 'reshot',
      scroll: '',
      reshotflag: '',
      getDetailrelcourseurl: [],
      courseshowinfo: '',
      xj: 'xj',
      xjflag: '',
      xjlist: [],
      ml: 'ml',
      mlflag: '',
      mllist: [],
      note: 'note',
      noteflag: '',
      othernote: 'othernote',
      othernoteflag: '',
      othernotelist: [],
      knowledge: 'knowledge',
      knowledgeflag: '',
      knowledgelist: [],
      microvideo: 'microvideo',
      microvideoflag: '',
      microvideolist: [],
      mynotelist: [],
      microvideocreatebtnflag: false,
      tabcreatebtnflag: false,
      knowledgecreatebtnflag: false,
      tabtwoselected: tabtwoselected,
      knowledgeeditbtnflag: [],
      knowledgeeditval: '',
      stheadinfoval: [0, 0, 0, 0, 0], // st头部信息假数据
      discusslist: [],
      questionlist: [],
      courseId: '',
      lessonId: '',
      urlparam: location.href.split('?')[1],
      resourceid: '',
      getallresurl: '',
      mynotecontent: '',
      scolearr: {},
      totalnum: 0,
      totalnum1: 0,
      resourceinfo: '',
      screens: 0,
      scolearrdetail: [],
      stobj: '',
      downlist: {},
      scoleobj: {},
      videoobj: '',
      knowledgecreateflag: false,
      dmicrovideourl: '/static/images/Dmicrovideo.png',
      notescrollsonmargintop: 0,
      notescrollytop: 0,
      othernotescrollsonmargintop: 0,
      othernotescrollytop: 0,
      microvideocreateflag: false,
      setscoletemplatelist: [],
      setscoledatalist: [],
      setscolerealdatalist: [],
      reset: false,
      reshotlist: ''
    }
  },
  created () {

    if (!this.$store.state.userinfo.userName) {
      this.mixpartinfotemp.pop()
      this.mixpartinfo = this.mixpartinfotemp.concat([])
    } else {
      this.mixpartinfo = mixpartinfo
    }
    this.courseId = this.geturlparam('courseId', location.hash)
    this.lessonId = this.geturlparam('lessonId', location.hash)
    this.resourceid = this.geturlparam('resourceId', location.hash)
    this.getcouseaboutinfo() // 获取课程教师相关信息
    this.getxj() // 获取选集
    this.getml() // 获取目录
  },
  components: {
    Ghead,
    Gfoot,
    Link,
    page,
    scole,
    echarts
  },
  filters: {
    formcatfn: function (value) {
      return Number(value).toFixed(1)
    }
  },
  methods: {
    resetupdateevent (obj) {
      this.resetupdate.splice(obj.ind.split('_')[1], 1, false)
    },
    knowledgeblur (param) {
      if (param === 'h') {
        if (isNaN(this.knowledgehour * 1)) {
          this.knowledgehour = 0
          this.win(knowledgeinfo.illegal, '', false)
          return false
        }
        if (this.knowledgehour * 1 >= 60) {
          this.knowledgehour = 0
          this.win(knowledgeinfo.timetolong, '', false)
          return false
        }
      } else if (param === 'm') {
        if (isNaN(this.knowledgeminutes * 1)) {
          this.knowledgeminutes = 0
          this.win(knowledgeinfo.illegal, '', false)
          return false
        }
        if (this.knowledgeminutes * 1 >= 60) {
          this.knowledgeminutes = 0
          this.win(knowledgeinfo.timetolong, '', false)
          return false
        }
      } else if (param === 's') {
        if (isNaN(this.knowledgeseconds * 1)) {
          this.knowledgeseconds = 0
          this.win(knowledgeinfo.illegal, '', false)
        }
        if (parseInt(this.knowledgeseconds) >= 60) {
          this.knowledgeseconds = 0
          this.win(knowledgeinfo.timetolong, '', false)
        }
      }
    },
    jumptoseconds (hms) {
      this.videoobj.opts('jump', this.hmstoseconds(hms))
    },
    backto () {
      this.$router.push({path: '/Fcourseintroduction', query: {courseId: this.geturlparam('courseId', location.hash)}})
    },
    resdown () {
      this.$router.push({name: 'FcourseDetaildown', params: {downlist: this.downlist}, query: {courseId: this.geturlparam('courseId', location.hash), lessonId: this.geturlparam('lessonId', location.hash)}})
    },
    faviratefn (ev) {
      if (!this.$store.state.userinfo.userName) {
        this.win(warntxt.login, '', false)
      } else {
        if (ev.currentTarget.children[0].className.indexOf('icon-starbg') >= 0) {
          // 添加收藏
          this.addfavirate()
        } else {
          // 取消收藏
          this.delfavirate()
        }
      }
    },
    getfaviratestate () {
      if (!this.$store.state.userinfo.userName) {
        this.win(warntxt.login, '', false)
      } else {
        let that = this
        this.axios({
          method: 'post',
          url: faviratestateurl,
          data: {
            resourceId: that.resourceid,
            userId: that.$store.state.userinfo.id
          }
        })
        .then(function (res) {
          if (res.data.resourceIsCollected === 0) {
            that.favirate = 'icon-starbg'
          } else {
            that.favirate = 'icon-star'
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    addfavirate () {
      let that = this
      this.axios({
        method: 'post',
        url: favirateaddurl,
        params: {
          par: {
            resourceId: that.resourceid,
            collectType: 0,
            visitUrl: location.href
          }
        }
      })
      .then(function (res) {
        if (res.data.isSuccess) {
          that.win(warntxt.addfaviratesucess, '', false)
          that.favirate = 'icon-star'
        } else {
          that.win(warntxt.addfaviratefail, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    delfavirate () {
      let that = this
      this.axios({
        method: 'post',
        url: faviratedelurl,
        params: {
          par: {
            resourceId: that.resourceid
          }
        }
      })
      .then(function (res) {
        if (res.data.isSuccess) {
          that.win(warntxt.delfaviratesucess, '', false)
          that.favirate = 'icon-starbg'
        } else {
          that.win(warntxt.delfaviratefail, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    discusstitleappaise (item) {
      let that = this
      this.axios({
        method: 'post',
        url: discusstitleappaiseurl,
        data: {
          objectId: item.id
        }
      })
      .then(function (res) {
        that.getdiscuss({page: that.pageindex})
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    titleappaise (item) {
      let that = this
      this.axios({
        method: 'post',
        url: titleappraiseurl,
        data: {
          objectId: item.id
        }
      })
      .then(function (res) {
        that.getquestion({page: that.pageindexq})
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    seefile (item) {
      if (item.type === 'pic') {
        let urls = location.protocol + '//' + location.host + '/index.html#/Fcoursedetailfileseepic?resourceid=' + item.id + '&coursename=' + item.courseinfo.title + '&courseid=' + this.courseId
        window.open(urls, '_blank')
      } else if (item.type === 'audio') {
        let urls = location.protocol + '//' + location.host + '/index.html#/Fcoursedetailfileseeaudio?resourceid=' + item.id + '&coursename=' + item.courseinfo.title + '&courseid=' + this.courseId
        window.open(urls, '_blank')
      } else {
        let urls = location.protocol + '//' + location.host + '/index.html#/Fcoursedetailfilesee?resourceid=' + item.id + '&coursename=' + item.courseinfo.title + '&courseid=' + this.courseId
        window.open(urls, '_blank')
      }
    },
    getmicrostarttime () {
      let time = document.getElementById('V_nowtime').textContent
      this.microSH = time.split(':')[0] * 1
      this.microSM = time.split(':')[1] * 1
      this.microSs = time.split(':')[2] * 1
    },
    getmicroendtime () {
      let time = document.getElementById('V_nowtime').textContent
      this.microEH = time.split(':')[0] * 1
      this.microEM = time.split(':')[1] * 1
      this.microEs = time.split(':')[2] * 1
    },
    getcouseaboutinfo () {
      let that = this
      this.axios({
        method: 'post',
        url: getcouseaboutinfourl,
        data: {
          courseId: that.geturlparam('courseId', location.hash)
        }
      })
      .then(function (res) {
        that.courseshowinfo = {
          title: res.data.courseName,
          name: res.data.teacherName,
          imgurl: res.data.imgurl,
          teacherid: res.data.teacherId
        }
        that.getres(that.courseshowinfo) // 获取文档下载
        that.getreshot() // 获取课程推荐
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    geturlparam (name, url) {
      let urls = url.split('?')[1].split('&')
      let val = ''
      for (let item = 0; item < urls.length; item++) {
        if (name === urls[item].split('=')[0]) {
          val = urls[item].split('=')[1]
          break
        }
      }
      return val
    },
    scoleevent (objs) {
      let num = objs.ind.split('_')[1] * 1
      if (!this.scoleobj[num]) {
        this.scoleobj[num] = objs.obj
      }
      this.scolearr[num] = Object.assign({}, {score: objs.val, templateDetailId: objs.items.id})
      this.scolesettotal.val = 0
      for (let item in this.scolearr) {
        this.scolesettotal.val += this.scolearr[item].score
      }
    },
    submitscole () { // 提交评分
      if (!this.$store.state.userinfo.userName) {
        this.win(warntxt.login, '', false)
        return false
      }
      let that = this
      let temp = []
      for (let item in that.scolearr) {
        temp.push(that.scolearr[item])
      }
      this.axios({
        method: 'post',
        url: submitscoleurl,
        data: {
          courseId: that.geturlparam('courseId', location.hash),
          resourceId: that.resourceid,
          userId: that.$store.state.userinfo.id,
          evaluateTemplateId: that.scoletemplatelistid,
          totalScore: that.scolesettotal.val,
          results: temp
        }
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(coursedetailwarntxt.setscolefail, '', false)
        } else {
          that.getscole()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    microvideosee (item) {
      let urls = location.protocol + '//' + location.host + '/index.html#/Fcoursedetailmicrovideosee?courseId=' + this.geturlparam('courseId', location.hash) + '&resourceid=' + item.id + '&lessonId=' + this.geturlparam('lessonId', location.hash) + '&coursename=' + this.courseshowinfo.title + '&videoname=' + item.name + '&microname=' + item.title
      window.open(urls, '_blank')
//    this.$router.push({name: 'Fcoursedetailmicrovideosee', params: {item: item}, query: {courseId: this.geturlparam('courseId', location.hash), resourceid: item.id, lessonId: this.geturlparam('lessonId', location.hash), coursename: this.courseshowinfo.title, videoname: item.name, microname: item.title}})
    },
    learned (ev) {
      ev.currentTarget.className = 'learned'
    },
    templateevent (item, ind) {
      let that = this
      for (let k = 0; k < this.setscoletemplatelist.length; k++) {
        this.scoleselected.splice(k, 1, '')
      }
      this.scoletemplatelistid = item.templateid
      this.scoleselected.splice(ind, 1, 'selected')
      this.setscoleind = ind
      // 需要判断该模板是否已经评价
      if (this.setscoledatalist[ind].data !== null) {
        // 未评价
        this.chartshow = false
        this.initscoleval = 0
        this.scoletotal = 0
        this.scolesettotal.val = 0
        this.setscolerealdatalist = []
        this.setscolerealdatalist = this.setscoledatalist[ind].data
        this.resetupdate = []
        for (let k = 0; k < that.setscolerealdatalist.length; k++) {
          that.scoletotal += that.setscolerealdatalist[k].title.scole
          for (let m = 0; m < that.setscolerealdatalist[k].content.length; m++) {
            this.resetupdate.push(true)
          }
        }
        this.scolearr = Object.assign({}, {})
      } else {
        // 已评价
        this.chartshow = true
        this.piezdata = this.setscoledatalist[ind].pie
        if (this.piezdata.totalDatas.length > 0) {
          this.zdatafn(this.piezdata.totalDatas[0].levelsData)
          this.pieatafn(this.piezdata.totalDatas[0].levelsData)
          this.setscolepersonnum = this.piezdata.totalDatas[0].totalUser
          this.setscoleval = parseFloat(this.piezdata.totalDatas[0].totalAvg).toFixed(2)
        } else {
          let nodata = {level1: 0, level2: 0, level3: 0, level4: 0}
          this.zdatafn(nodata)
          this.pieatafn(nodata)
          this.setscolepersonnum = 0
          this.setscoleval = 0
        }
      }
    },
    getscole () {
      let that = this
      this.axios({
        method: 'post',
        url: gettemplateurl,
        data: {
          courseId: that.geturlparam('courseId', location.hash),
          resourceId: that.resourceid,
          userId: that.$store.state.userinfo.id
        }
      })
      .then(function (res) {
        let obj = res.data.evaluationTemplateList
        // 获取模板
        let temptemplate = [] // 模板数组
        let scolelist = []
        for (let item = 0; item < obj.length; item++) {
          scolelist[item] = {} // 维护数据项
          if (obj[item].isSuccess === 1) { // 未评价
            temptemplate.push({name: obj[item].evaluateTemplateName, templateid: obj[item].evaluateTemplateId})
            scolelist[item].data = [] // 设置data项为数组
            scolelist[item].pie = null // 设置饼图项为null
            let subobj = obj[item].evaluationDetailList // 详情列表
            let j = 0
            for (let subitem = 0; subitem < subobj.length; subitem++) {
              scolelist[item].data[subitem] = {}
              scolelist[item].data[subitem]['title'] = {}
              scolelist[item].data[subitem]['title']['id'] = subobj[subitem].evaluateDetailId
              scolelist[item].data[subitem]['title']['name'] = subobj[subitem].evaluateDetailName
              scolelist[item].data[subitem]['title']['scole'] = subobj[subitem].totalPoints
              scolelist[item].data[subitem]['content'] = []
              let sub2obj = subobj[subitem].evaluateDetailList
              for (let sub2item = 0; sub2item < sub2obj.length; sub2item++) {
                scolelist[item].data[subitem]['content'][sub2item] = {}
                scolelist[item].data[subitem]['content'][sub2item]['id'] = sub2obj[sub2item].evaluateDetailId
                scolelist[item].data[subitem]['content'][sub2item]['name'] = sub2obj[sub2item].evaluateDetailName
                scolelist[item].data[subitem]['content'][sub2item]['scole'] = sub2obj[sub2item].totalPoints
                scolelist[item].data[subitem]['content'][sub2item]['ind'] = j
                j++
              }
            }
          } else if (obj[item].isSuccess === 2) { // 已评价
            scolelist[item].data = null // 设置data项为数组为null
            scolelist[item].pie = {} // 设置饼图项为【】
            scolelist[item].pie = obj[item].evaluationResults
            for (let pieitem = 0; pieitem < scolelist[item].pie.totalDatas.length; pieitem++) {
              temptemplate.push({name: scolelist[item].pie.totalDatas[pieitem].evaluateTemplateName, templateid: scolelist[item].pie.totalDatas[pieitem].evaluateTemplateId})
            }
          }
        }
        if (obj.length === 0) { // 去除评分项
          that.mixparttabstye.splice(2, 1, 'display:none')
          that.mixparttabstyle.splice(2, 1, 'height:0px;overflow:hidden')
        }
        if (obj.length > 0) {
          that.scoletemplatelistid = temptemplate[that.setscoleind].templateid
          that.setscoletemplatelist = temptemplate
          that.setscoledatalist = scolelist
          if (that.setscoledatalist.length > 0) { // 当有数据时进行判断
            if (that.setscoledatalist[that.setscoleind].data !== null) { // 未评价
              that.chartshow = false
              that.scoletotal = 0
              that.setscolerealdatalist = that.setscoledatalist[that.setscoleind].data
              for (let k = 0; k < that.setscolerealdatalist.length; k++) {
                that.scoletotal += that.setscolerealdatalist[k].title.scole
              }
            } else {
              that.chartshow = true
              that.piezdata = that.setscoledatalist[that.setscoleind].pie
              if (that.piezdata.totalDatas.length > 0) {
                that.zdatafn(that.piezdata.totalDatas[0].levelsData)
                that.pieatafn(that.piezdata.totalDatas[0].levelsData)
                that.setscolepersonnum = that.piezdata.totalDatas[0].totalUser
                that.setscoleval = parseFloat(that.piezdata.totalDatas[0].totalAvg).toFixed(2)
              } else {
                let nodata = {level1: 0, level2: 0, level3: 0, level4: 0}
                that.zdatafn(nodata)
                that.pieatafn(nodata)
                that.setscolepersonnum = 0
                that.setscoleval = 0
              }
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    responseevent (item, ind) {
      let that = this
      this.axios({
        method: 'post',
        url: resdiscussurl,
        data: {
          threadId: item.id,
          name: '',
          content: that.responseval[ind]
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          that.responseval[ind] = ''
          // 重新获取综合讨论区数据
          that.getdiscuss({page: that.pageindex})
        } else {
          that.win(res.data.message, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    responsequestionevent (item, ind) {
    },
    publishappraiseevent () {
      if (this.$store.state.userinfo.userName) {
        this.$router.push({name: 'Fcoursedetailappraiseadd', query: {courseId: this.geturlparam('courseId', location.hash), lessonId: this.geturlparam('lessonId', location.hash), resourceid: this.resourceinfo.id}})
      } else {
        this.win(warntxt.login, '', false)
      }
    },
    publishappraiseevent1 () {
      if (this.$store.state.userinfo.userName) {
        this.$router.push({name: 'Fcoursedetailappraiseadd1', query: {courseId: this.geturlparam('courseId', location.hash), lessonId: this.geturlparam('lessonId', location.hash), resourceid: this.resourceinfo.id}})
      } else {
        this.win(warntxt.login, '', false)
      }
    },
    showresponse (ev, ind) {
      let obj = ev.currentTarget
      for (let i = 0; i < this.pagesize; i++) {
        this.responseshow[i] = false
      }
      if (obj.className.indexOf('icon-appraised') < 0) {
        this.responseshow.splice(ind, 1, 'height:auto;box-shadow: 0 0 0 1px #e6f2fe')
        obj.className = obj.className.replace(/(icon-appraise)/gi, 'icon-appraised').replace(/(discussicon)/gi, 'discussiconed')
      } else {
        obj.className = obj.className.replace(/(icon-appraised)/gi, 'icon-appraise').replace(/(discussiconed)/gi, 'discussicon')
        this.responseshow.splice(ind, 1, '')
      }
    },
    showresponsequestion (item, ind) {
      this.resquestionitem = item
      if (!this.responseshowquestion) {
        this.responseshowquestion = true
      } else {
        this.responseshowquestion = false
      }
    },
    backevent () {
      this.responseshowquestion = false
    },
    iappraiseevent (item) {
      this.$router.push({name: 'Fcoursedetailiappraiseadd', params: {item: item}, query: {courseId: this.geturlparam('courseId', location.hash), lessonId: this.geturlparam('lessonId', location.hash), resourceid: this.resourceid}})
    },
    zdatafn (obj) {
      this.echartzdata = Object.assign({}, {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['0-60', '60-80', '80-90', '90-100'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            minInterval: 1
          }
        ],
        series: [
          {
            name: '人',
            type: 'bar',
            barWidth: '60%',
            data: [obj.level1, obj.level2, obj.level3, obj.level4]
          }
        ]
      }, {})
    },
    pieatafn (obj) {
      this.piedata = Object.assign({}, {
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['0-60', '60-80', '80-90', '90-100']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '45%',
            center: ['55%', '60%'],
            data: [
              {value: obj.level1, name: '0-60'},
              {value: obj.level2, name: '60-80'},
              {value: obj.level3, name: '80-90'},
              {value: obj.level4, name: '90-100'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }, {})
    },
    getres (param) {
      let that = this
      this.axios({
        method: 'post',
        url: getDetailrelresurl,
        params: {
          par: {
            course: that.geturlparam('courseId', location.hash),
            lesson: that.geturlparam('lessonId', location.hash),
            resType: '1,2,3',
            isPublish: 1
          }
        }
      })
      .then(function (res) {
        let objs = res.data.result.data
        let temp = []
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].resourceId
          temp[item]['name'] = objs[item].resourceName
          temp[item]['type'] = that.changefiletype(objs[item].originResourceLocation === null ? '' : objs[item].originResourceLocation.toString().replace(/.*.(pdf|mp3|doc|docx|ppt|pptx|xls|xlsx|txt|jpg|jpeg|png|bmp)$/gi, '$1'))
          temp[item]['urls'] = objs[item].originResourceLocation
          temp[item]['courseinfo'] = param
        }
        that.filesinfo = temp
        that.getallresurl = res.data.result.zipPath
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    changefiletype (type) {
      switch (type) {
        case 'doc':
        case 'docx':
          return 'word'
        case 'ppt':
        case 'pptx':
          return 'ppt'
        case 'xls':
        case 'xlsx':
          return 'excel'
        case 'txt':
          return 'file'
        case 'bmp':
        case 'jpg':
        case 'jpeg':
        case 'png':
          return 'pic'
        case 'mp3':
          return 'audio'
        case 'pdf':
          return 'pdf'
      }
    },
    getreshot () {
      let that = this
      this.axios({
        method: 'post',
        url: getDetailrelcourseurl,
        data: {
          name: that.courseshowinfo.title,
          id: that.geturlparam('courseId', location.hash),
          teacherid: that.courseshowinfo.teacherid
        }
      })
      .then(function (res) {
        let objs = res.data.courseList
        let temp = []
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].courseId
          temp[item]['num'] = objs[item].clicks
          temp[item]['teacher'] = objs[item].teacherName
          temp[item]['imgurl'] = objs[item].imgurl
          temp[item]['title'] = objs[item].courseName
          temp[item]['ispush'] = objs[item].ispush
        }
        that.reshotlist = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jumptointroduction (item) {
      let urls = location.protocol + '//' + location.host + '/index.html#/Fcourseintroduction?resourceid=' + item.id
      window.open(urls, '_blank')
//    this.$router.push({name: 'Fcourseintroduction', query: {'courseId': item.id}})
    },
    noteappraise (item) {
      let that = this
      this.axios({
        method: 'post',
        url: getnoteappraiseurl,
        params: {
          params: {
            noteId: item.id,
            courseResourceId: that.resourceid
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message, '', false)
        } else {
          that.notescrollsonmargintop = document.getElementById('note').children[0].style.marginTop
          that.notescrollytop = document.getElementById('note').querySelector('.scroll_y').style.top
          that.getmynote()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getmynote () {
      let that = this
      this.axios({
        method: 'post',
        url: getDetailnoteurl,
        params: {
          params: {
            courseId: that.geturlparam('courseId', location.hash),
            userId: that.$store.state.userinfo.id,
            courseResourceId: that.resourceid
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(coursedetailwarntxt.getmynotefail, '', false)
        } else {
          let temp = []
          let objs = res.data.result.CoursesNoteList
          for (let item = 0; item < objs.length; item++) {
            temp[item] = {}
            temp[item]['id'] = objs[item].id
            temp[item]['ind'] = item
            temp[item]['num'] = objs[item].praiseCount
            temp[item]['state'] = objs[item].praise
            temp[item]['imgurl'] = that.$store.state.userinfo.picture
            temp[item]['name'] = that.$store.state.userinfo.userName
            temp[item]['commit'] = objs[item].content
            temp[item]['time'] = that.secondtoms(objs[item].time, 'hms')
            temp[item]['timejump'] = that.secondtoms(objs[item].time, 'hms')
            temp[item]['timeval'] = objs[item].time
            temp[item]['dates'] = objs[item].lastupdatedate
            that.mynoteoptshow[item] = false
          }
          that.mynotelist = temp
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    othernoteappraise (item) {
      let that = this
      this.axios({
        method: 'post',
        url: getnoteappraiseurl,
        params: {
          params: {
            noteId: item.id,
            courseResourceId: that.resourceid
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message, '', false)
        } else {
          that.othernotescrollsonmargintop = document.getElementById('othernote').children[0].style.marginTop
          that.othernotescrollytop = document.getElementById('othernote').querySelector('.scroll_y').style.top
          that.getothernote()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getothernote () {
      let that = this
      this.axios({
        method: 'post',
        url: getDetailnoteurl,
        params: {
          params: {
            courseId: that.geturlparam('courseId', location.hash),
            userVoidId: that.$store.state.userinfo.id,
            courseResourceId: that.resourceid
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(coursedetailwarntxt.getothernotefail, '', false)
        } else {
          let temp = []
          let objs = res.data.result.CoursesNoteList
          for (let item = 0; item < objs.length; item++) {
            temp[item] = {}
            temp[item]['id'] = objs[item].id
            temp[item]['num'] = objs[item].praiseCount
            temp[item]['state'] = objs[item].praise
            temp[item]['imgurl'] = objs[item].picture
            temp[item]['name'] = objs[item].userName
            temp[item]['commit'] = objs[item].content
            temp[item]['time'] = that.secondtoms(objs[item].time, 'hms')
            temp[item]['timeval'] = objs[item].time
            temp[item]['dates'] = objs[item].createdate
          }
          that.othernotelist = temp
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    mynoteedit (item, ind) {
//    this.tabeditflag = true
//    this.mynoteeditcontent = item.commit
      document.getElementById('mynoteinput' + ind).value = item.commit
      document.getElementById('mynoteinput' + ind).style.display = 'block'
      document.getElementById('mynotesave' + ind).style.display = 'block'
      document.getElementById('mynotecancel' + ind).style.display = 'block'
      this.noteedititem = item
    },
    mynotedel (item) {
      if (!this.$store.state.userinfo.userName) {
        this.win(warntxt.login, '', false)
        return false
      } else {
        this.$router.push({name: 'Fcoursedetailmynotedel', params: {item: item}, query: {courseId: this.geturlparam('courseId', location.hash), lessonId: this.geturlparam('lessonId', location.hash), resourceId: item.id}})
      }
    },
    noteeditsave (item, ind) {
      if (!this.$store.state.userinfo.userName) {
        this.win(warntxt.login, '', false)
        return false
      }
      let that = this
      that.mynoteeditcontent = document.getElementById('mynoteinput' + ind).value
      if (that.mynoteeditcontent.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.mynotecontent, '', false)
        return false
      }
      this.axios({
        method: 'post',
        url: editnoteurl,
        params: {
          params: {
            id: that.noteedititem.id,
            content: that.mynoteeditcontent
          }
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          that.tabeditflag = false
          that.mynoteeditcontent = ''
          that.noteedititem = ''
          document.getElementById('mynoteinput' + ind).value = ''
          document.getElementById('mynoteinput' + ind).style.display = 'none'
          document.getElementById('mynotesave' + ind).style.display = 'none'
          document.getElementById('mynotecancel' + ind).style.display = 'none'
          that.getmynote()
        } else {
          that.win(coursedetailwarntxt.editmynotefail, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    noteeditcancel (ind) {
//    this.tabeditflag = false
      document.getElementById('mynoteinput' + ind).value = ''
      document.getElementById('mynoteinput' + ind).style.display = 'none'
      document.getElementById('mynotesave' + ind).style.display = 'none'
      document.getElementById('mynotecancel' + ind).style.display = 'none'
//    this.mynoteeditcontent = ''
      this.noteedititem = ''
    },
    mynoteenter (ind) {
      this.mynoteoptshow.splice(ind, 1, true)
    },
    mynoteleave (ind) {
      this.mynoteoptshow.splice(ind, 1, false)
    },
    getxj () {
      let that = this
      this.axios({
        method: 'post',
        url: getDetailresurl,
        params: {
          par: {
            course: that.geturlparam('courseId', location.hash),
            lesson: that.geturlparam('lessonId', location.hash),
            resType: '0,4'
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.result.data
        let tempind = 0
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].resourceId
          temp[item]['time'] = objs[item].duration ? that.changesecondstoms(objs[item].duration) : '00:00:00'
          temp[item]['imgurl'] = objs[item].icon
          temp[item]['title'] = objs[item].resourceName
          temp[item]['resList01'] = objs[item].resList01
          temp[item]['resList02'] = objs[item].resList02
          temp[item]['resList03'] = objs[item].resList03
          temp[item]['titleList'] = objs[item].titleList
          temp[item]['idList01'] = objs[item].idList01
          temp[item]['idList02'] = objs[item].idList02
          temp[item]['idList03'] = objs[item].idList03
          temp[item]['screen'] = objs[item].screen
          if (that.resourceid) {
            if (objs[item].resourceId === that.resourceid) {
              that.downlist.S = objs[item].idList03
              that.downlist.G = objs[item].idList02
              that.downlist.B = objs[item].idList01
              that.downlist.T = objs[item].titleList
              tempind = item
              temp[item]['play'] = 1
              that.resourceinfo = temp[item]
              that.screens = temp[item].screen
            } else {
              temp[item]['play'] = 0
            }
          } else {
            temp[item]['play'] = 0
          }
        }
        if (objs.length > 0) {
          debugger
          if (!that.resourceid) {
            that.resourceid = temp[tempind]['id']
            temp[tempind]['play'] = 1
            that.resourceinfo = temp[tempind]
            that.screens = temp[tempind].screen
            // 实例化播放器
            that.infos['channelB'] = temp[tempind].resList01
            that.infos['channel'] = temp[tempind].resList02
            that.infos['channelS'] = temp[tempind].resList03
            that.infos['channeltitle'] = temp[tempind].titleList
            that.downlist.S = temp[tempind].idList03
            that.downlist.G = temp[tempind].idList02
            that.downlist.B = temp[tempind].idList01
            that.downlist.T = temp[tempind].titleList
            let modelval = []
            if (that.infos.channelB.length > 0) {
              modelval.push('标清')
            }
            if (that.infos.channel.length > 0) {
              modelval.push('高清')
            }
            if (that.infos.channelS.length > 0) {
              modelval.push('超清')
            }
            that.infos['channelnum'] = that.infos['channeltitle'].length
            that.infos['model'] = modelval
            that.infos['knowledge'] = []
            that.infos['mainfile'] = [0, 0]
            that.infos['playtype'] = 'play'
            that.infos['widhei'] = {wid: 685, hei: 386}
            that.infos['id'] = 'playerArealocal'
            that.infos['autoplay'] = true
            that.infos['slidebackfn'] = function (time) {
              let times = that.changesecondstoms(time)
              that.knowledgeminutes = times.split(':')[1] * 1
              that.knowledgeseconds = times.split(':')[2] * 1
            }
            that.videoobj = that.$Video(that.infos)
          } else {
            // 实例化播放器
            that.infos['channelB'] = temp[tempind].resList01
            that.infos['channel'] = temp[tempind].resList02
            that.infos['channelS'] = temp[tempind].resList03
            that.infos['channeltitle'] = temp[tempind].titleList
            let modelval = []
            if (that.infos.channelB.length > 0) {
              modelval.push('标清')
            }
            if (that.infos.channel.length > 0) {
              modelval.push('高清')
            }
            if (that.infos.channelS.length > 0) {
              modelval.push('超清')
            }
            that.infos['channelnum'] = that.infos['channeltitle'].length
            that.infos['model'] = modelval
            that.infos['knowledge'] = []
            that.infos['mainfile'] = [0, 0]
            that.infos['playtype'] = 'play'
            that.infos['autoplay'] = true
            that.infos['widhei'] = {wid: 685, hei: 386}
            that.infos['id'] = 'playerArealocal'
            that.infos['slidebackfn'] = function (time) {
              let times = that.changesecondstoms(time)
              that.knowledgeminutes = times.split(':')[1] * 1
              that.knowledgeseconds = times.split(':')[2] * 1
            }
            that.videoobj = that.$Video(that.infos)
          }
          if (that.screens > 1) {
            that.tabinfo = tabinfo.slice(0, 4)
          } else {
            that.getmicrovideo() // 获取微视频
          }
          that.xjlist = temp
          that.getknowledge() // 获取知识点
          that.getmynote() // 获取我的笔记
          that.getothernote() // 获取他人笔记
          if (that.$store.state.userinfo.userName) {
            that.getscole() // 我要打分
          }
          that.getquestion({page: 1}) // 老师答疑区
          that.getdiscuss({page: 1}) // 综合讨论区
          that.getfaviratestate() // 获取资源收藏状态
        } else {
          that.win(coursedetailwarntxt.getresfail, '-1', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    changeresourceid (item) {
      this.$router.push({name: 'FcourseDetail', query: {courseId: this.geturlparam('courseId', location.hash), lessonId: this.geturlparam('lessonId', location.hash), resourceId: item.id}})
      this.$router.go(0)
    },
    getknowledge () {
      let that = this
      this.axios({
        method: 'post',
        url: knowledgelisturl,
        params: {
          params: {
            courseId: that.geturlparam('courseId', location.hash),
            lessonId: that.geturlparam('lessonId', location.hash),
            resourceId: that.resourceid
          }
        }
      })
      .then(function (res) {
        let temp = []
        that.knowledgelist = []
        let knowledgelists = []
        that.knowledgeeditbtnflag = []
        let objs = res.data.result.CoursesKnowledgePointList
        that.knowledgecreateflag = res.data.result.editable
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].id
          temp[item]['title'] = objs[item].content
          temp[item]['dates'] = that.secondtoms(objs[item].time, 'hms')
          temp[item]['datesval'] = parseInt(objs[item].time)
          that.knowledgelist.splice(item, 1, temp[item])
          that.knowledgeeditbtnflag.splice(item, 1, false)
          knowledgelists[item] = {}
          knowledgelists[item]['time'] = that.secondtoms(objs[item].time, 'hms')
          knowledgelists[item]['content'] = objs[item].content
        }
        that.videoobj.cfg.knowledge = knowledgelists
        that.videoobj.addknowledge()
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    secondtoms (val, type) {
      let hour = parseInt(parseInt(val) / 3600)
      let minutes = parseInt((parseInt(val) - hour * 3600) / 60)
      let seconds = parseInt(val) - hour * 3600 - minutes * 60
      if (type === 'ms') {
        return (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
      } else if (type === 'hms') {
        return (hour < 10 ? ('0' + hour) : hour) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
      }
    },
    getmicrovideo () {
      let that = this
      this.axios({
        method: 'post',
        url: getmicrovideourl,
        params: {
          params: {
            courseId: that.geturlparam('courseId', location.hash),
            lessonId: that.geturlparam('lessonId', location.hash),
            resourceId: that.resourceid
          }
        }
      })
      .then(function (res) {
        let temp = []
        that.microvideolist = []
        that.microvideocreateflag = res.data.result.editable
        let objs = res.data.result.CoursesMicroVideoList
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].id
          temp[item]['title'] = objs[item].name
          temp[item]['dates'] = that.secondtoms(objs[item].duration, 'hms')
          temp[item]['datesval'] = parseInt(objs[item].duration)
          temp[item]['imgurl'] = objs[item].icon
          that.microvideolist.splice(item, 1, temp[item])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    concatTime (obj) {
      if (obj) {
        return '-' + obj.substring(obj.lastIndexOf(':'), 0).replace(/-/g, '').replace(/\s/, '-')
      } else {
        return ''
      }
    },
    getml () {
      let that = this
      this.axios({
        method: 'post',
        url: getDetailmlurl,
        data: {
          courseId: that.geturlparam('courseId', location.hash)
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.lessons
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].lessonId
          temp[item]['courseid'] = that.geturlparam('courseId', location.hash)
          temp[item]['num'] = '第' + (item + 1) + '节'
          temp[item]['name'] = objs[item].lessonName + that.concatTime(objs[item]['startTime'])
          temp[item]['dates'] = objs[item].duration ? that.changesecondstoms(objs[item].duration) : '00:00:00'
        }
        that.mllist = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    changesecondstoms (param) {
      let hour = parseInt(parseInt(param) / 3600)
      let minutes = parseInt(parseInt(param - hour * 3600) / 60)
      let seconds = parseInt(param) - hour * 3600 - 60 * minutes
      return (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
    },
    angleType (rt, ch) {
      if (rt <= 0.3) {
        return '练习型'
      } else if (rt >= 0.7) {
        return '讲授型'
      } else if (ch >= 0.4) {
        return '对话型'
      } else if ((rt > 0.3 && rt < 0.7) || ch < 0.4) {
        return '混合型'
      }
    },
    resappraiseevent (item) {
      let that = this
      this.axios({
        method: 'post',
        url: resteacherquestionurl,
        data: {
          objectId: item.id
        }
      })
      .then(function (res) {
        // 重新获取数据
        that.getquestion({page: that.pageindexq})
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getquestion (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageindexq = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: getteacherquestionurl,
        data: {
          resourceId: that.resourceid,
          forumId: 'titles'
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.CourseForumThreadList
        that.totalpageq = Math.ceil(objs.length / that.pagesize)
        that.totalnum1 = objs.length
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].id
          temp[item]['name'] = objs[item].creator
          temp[item]['dates'] = objs[item].createdate.substr(0, objs[item].createdate.length - 3)
          temp[item]['title'] = objs[item].name
          temp[item]['state'] = objs[item].praise
          temp[item]['content'] = objs[item].content
          temp[item]['appraisenum'] = objs[item].praiseCount
          temp[item]['discuss'] = objs[item].postCount
          temp[item]['imgurl'] = objs[item].icon
          temp[item]['appraisearr'] = []
          let subobjs = objs[item].CourseForumPostList
          for (let resitem = 0; resitem < subobjs.length; resitem++) {
            temp[item]['appraisearr'][resitem] = {}
            temp[item]['appraisearr'][resitem]['id'] = subobjs[resitem].id
            temp[item]['appraisearr'][resitem]['name'] = subobjs[resitem].creator
            temp[item]['appraisearr'][resitem]['textval'] = subobjs[resitem].content
            temp[item]['appraisearr'][resitem]['imgurl'] = subobjs[resitem].icon
            temp[item]['appraisearr'][resitem]['dates'] = subobjs[resitem].createdate.substr(0, subobjs[resitem].createdate.length - 3)
            temp[item]['appraisearr'][resitem]['num'] = subobjs[resitem].praiseCount
            temp[item]['appraisearr'][resitem]['state'] = subobjs[resitem].praise
          }
        }
        let temp1 = []
        for (let item = that.pagesize * (that.pageindexq - 1); item < temp.length; item++) {
          if (item < (that.pagesize * that.pageindexq - temp.length > 0 ? temp.length : that.pagesize * that.pageindexq)) {
            temp1.push(temp[item])
          }
        }
        that.resquestionitem = {name: '', title: '', dates: '', content: '', appraisenum: 0, discuss: 0, appraisearr: [], imgurl: ''}
        that.questionlist = []
        that.bingoq = []
        that.bingoq[that.pageindexq - 1] = 'selected'
        that.resquestionitem = Object.assign({}, temp1[0], {})
        that.questionlist = temp1
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getdiscuss (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageindex = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: getdiscussurl,
        data: {
          resourceId: that.resourceid,
          forumId: 'discuss'
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.CourseForumThreadList
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].id
          temp[item]['name'] = objs[item].creator
          temp[item]['dates'] = objs[item].createdate.substr(0, objs[item].createdate.length - 3)
          temp[item]['content'] = objs[item].content
          temp[item]['appraisenum'] = objs[item].praiseCount
          temp[item]['state'] = objs[item].praise
          temp[item]['discuss'] = objs[item].postCount
          temp[item]['imgurl'] = objs[item].icon
          temp[item]['appraisearr'] = []
          let subobjs = objs[item].CourseForumPostList
          for (let resitem = 0; resitem < subobjs.length; resitem++) {
            temp[item]['appraisearr'][resitem] = {}
            temp[item]['appraisearr'][resitem]['id'] = subobjs[resitem].id
            temp[item]['appraisearr'][resitem]['name'] = subobjs[resitem].creator
            temp[item]['appraisearr'][resitem]['textval'] = subobjs[resitem].content
          }
        }
        let temp1 = []
        that.totalpage = Math.ceil(temp.length / that.pagesize)
        that.totalnum = temp.length
        for (let item = that.pagesize * (that.pageindex - 1); item < temp.length; item++) {
          if (item < (that.pagesize * that.pageindex - temp.length > 0 ? temp.length : that.pagesize * that.pageindex)) {
            temp1.push(temp[item])
          }
        }
        that.bingo = []
        that.bingo[that.pageindex - 1] = 'selected'
        that.discusslist = temp1
      })
      .catch(function (error) {
        console.log(error)
      })
    },
/*    getechart () {
      let that = this
      this.axios({
        method: 'post',
        url: sturl,
        data: {
          resourceId: 'db285b90706f480a80abd64fe50ea40b',
          sampling: '10',
          orgFile: 'http://192.168.21.245:5000/Actions.xml'
        }
      })
      .then(function (res) {
        // 教学类型判断
        if (res.data.code === 500) {
          that.mixparttabstye.splice(0, 1, 'display:none')
          that.mixparttabstyle.splice(0, 1, 'height:0px;overflow:hidden')
          that.mixparttabselected = ['', '', '', '', '']
          that.mixparttabselected.splice(1, 1, 'selected')
          that.mixparttabstyle.splice(1, 1, 'height: auto;margin:2%')
          return false
        }
        let objs = res.data.result
        if (!objs) {
          that.stobj = {
            duration: 0,
            sampling: 0,
            N: 0,
            NS: 0,
            NT: 0,
            g: 0,
            type: 0
          }
        } else {
          that.stobj = objs
          that.stobj.type = that.angleType(objs.Rt, objs.Ch)
          that.stheadinfoval.splice(0, 1, objs.events[0].inPlatform)
          that.stheadinfoval.splice(1, 1, objs.events[1].leavePlatform)
          that.stheadinfoval.splice(2, 1, objs.events[2].blackBoard)
          that.stheadinfoval.splice(3, 1, objs.events[3].interaction)
          that.stheadinfoval.splice(4, 1, objs.events[4].ppt)
          Rtangel({
            'id': 'rtChart',
            'netlen': 10,
            'linehei': 25,
            'ch': objs.Ch,
            'rt': objs.Rt
          })
          let stjson = {}
          stjson.STPointList = objs.STPointList
          let horLen = 0
          let verLen = 0
          let linehei = 0
          for (var i = 0; i < stjson.STPointList.length; i++) {
            if (stjson.STPointList[i] === 't') {
              horLen++
            } else {
              verLen++
            }
          }
          if (horLen > verLen) {
            linehei = horLen
          } else {
            linehei = verLen
          }
          stChart({
            'id': 'stChart',
            'netlen': stjson.STPointList.length,
            'linehei': parseInt(620 / linehei),
            'stArr': stjson.STPointList,
            'minstep': 5,
            'minpoint': 20
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },*/
    mynoteevent (ev, ind) {
      this.noteselected = ['', '']
      this.noteselected.splice(ind, 1, 'selected')
      this.tabtwoselected = ['width:0;height:0px', 'width:0;height:0px']
      this.tabtwoselected.splice(ind, 1, 'width:353px;height:250px;z-index:1')
    },
    mllisteent (item) {
      this.$router.push({name: 'FcourseDetail', query: {courseId: item.courseid, lessonId: item.id}})
      this.$router.go(0)
    },
    knowledgecreatebtn () {
      this.knowledgecreatebtnflag = true
      this.knowledgecreatebtnselected = 'tabcreatebtnselected'
      let time = document.getElementById('V_nowtime').textContent
      this.knowledgehour = time.split(':')[0] * 1
      this.knowledgeminutes = time.split(':')[1] * 1
      this.knowledgeseconds = time.split(':')[2] * 1
    },
    notecreatebtn (ev) {
      this.notetimeval = document.getElementById('V_nowtime').textContent
      this.tabcreatebtnflag = true
      this.tabcreatebtnselected = 'tabcreatebtnselected'
    },
    microvideocreatebtn (ev) {
      this.microvideocreatebtnflag = true
      this.microvideocreatebtnselected = 'tabcreatebtnselected'
    },
    notesave () {
      if (!this.$store.state.userinfo.userName) {
        this.win(warntxt.login, '', false)
        return false
      }
      if (this.mynotecontent.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.mynotecontent, '', false)
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: addnoteurl,
        params: {
          params: {
            courseId: that.geturlparam('courseId', location.hash),
            content: that.mynotecontent,
            courseResourceId: that.resourceid,
            time: that.hmstoseconds(that.notetimeval)
          }
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          that.tabcreatebtnflag = false
          that.tabcreatebtnselected = ''
          that.mynotecontent = ''
          that.getmynote() // 重新获取笔记
        } else {
          that.win(coursedetailwarntxt.addknowledgefail, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    hmstoseconds (num) {
      let splitval = num.split(':')
      return splitval[0] * 3600 + splitval[1] * 60 + splitval[2] * 1
    },
    notecancel () {
      this.tabcreatebtnflag = false
      this.tabcreatebtnselected = ''
    },
    microvideosave () {
      let that = this
      if (!this.$store.state.userinfo.userName) {
        this.win(warntxt.login, '', false)
        return false
      }
      if (that.microSH * 3600 + that.microSM * 60 + that.microSs * 1 >= that.microEH * 3600 + that.microEM * 60 + that.microEs * 1) {
        this.win(warntxt.microtimewrong, '', false)
        return false
      }
      let time = document.getElementById('V_totaltime').textContent // 总时长
      let totaltime = time.split(':')[0] * 3600 + time.split(':')[1] * 60 + time.split(':')[2] * 1
      if (that.microSH * 3600 + that.microEM * 60 + that.microEs * 1 >= totaltime || that.microEH * 3600 + that.microSM * 60 + that.microSs * 1 >= totaltime) {
        this.win(warntxt.timetolong, '', false)
        return false
      }
      if (that.microname.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.micronamewrong, '', false)
        return false
      }
      this.axios({
        method: 'post',
        url: addmicrovideourl,
        params: {
          params: {
            courseId: that.geturlparam('courseId', location.hash),
            lessonId: that.geturlparam('lessonId', location.hash),
            resourceId: that.resourceid,
            startSecond: (parseInt(that.microSH) * 3600 + parseInt(that.microSM) * 60 + parseInt(that.microSs)).toString(),
            endSecond: (parseInt(that.microEH) * 3600 + parseInt(that.microEM) * 60 + parseInt(that.microEs)).toString(),
            name: that.microname,
            storagestack: '',
            toolPath: 'M:/ffmpeg/ffmpeg.exe'
          }
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          that.microSH = 0
          that.microSM = 0
          that.microSs = 0
          that.microEH = 0
          that.microEM = 0
          that.microEs = 0
          that.microvideocreatebtnflag = false
          that.microvideocreatebtnselected = ''
          that.getmicrovideo() // 重新获取微视频
        } else {
          that.win(res.data.message, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    microvideocancel () {
      this.microvideocreatebtnflag = false
      this.microvideocreatebtnselected = ''
    },
    knowledgesave () {
      let that = this
      if (!this.$store.state.userinfo.userName) {
        this.win(warntxt.login, '', false)
        return false
      }
      if (this.knowledgecontent.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.knowledgecontent, '', false)
        return false
      }
      let time = document.getElementById('V_totaltime').textContent // 总时长
      let totaltime = time.split(':')[0] * 3600 + time.split(':')[1] * 60 + time.split(':')[2] * 1
      let inputtime = that.knowledgeminutes * 60 + that.knowledgeseconds * 1
      if (totaltime < inputtime) {
        this.win(knowledgeinfo.timetolong, '', false)
        return false
      }
      this.axios({
        method: 'post',
        url: knowledgeaddurl,
        params: {
          params: {
            courseId: that.geturlparam('courseId', location.hash),
            icon: '',
            type: null,
            pageNo: '',
            lessonId: that.geturlparam('lessonId', location.hash),
            content: that.knowledgecontent,
            resourceId: that.resourceid,
            time: that.knowledgehour * 3600 + that.knowledgeminutes * 60 + that.knowledgeseconds * 1 + ''
          }
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          that.knowledgecreatebtnflag = false
          that.knowledgecreatebtnselected = ''
          that.knowledgecontent = ''
          that.knowledgehour = 0
          that.knowledgeminutes = 0
          that.knowledgeseconds = 0
          that.getknowledge() // 重新获取知识点
        } else {
          that.win(coursedetailwarntxt.addknowledgefail, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    knowledgecancel () {
      this.knowledgecreatebtnflag = false
      this.knowledgecreatebtnselected = ''
    },
    knowledgeedit (item, ind) {
      this.knowledgeeditval = item.title
      for (let i = 0; i < this.knowledgeeditbtnflag.length; i++) {
        if (this.knowledgeeditbtnflag[i]) {
          this.knowledgeeditbtnflag.splice(i, 1, false)
        }
      }
      this.knowledgeeditbtnflag.splice(ind, 1, true)
    },
    knowledgedel (item, ind) {
      if (!this.$store.state.userinfo.userName) {
        this.win(warntxt.login, '', false)
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: knowledgedelurl,
        params: {
          params: {
            id: item.id
          }
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          that.getknowledge() // 重新获取知识点
        } else {
          that.win(coursedetailwarntxt.delknowledgefail, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    knowledgeeditsave (item, ind) {
      if (!this.$store.state.userinfo.userName) {
        this.win(warntxt.login, '', false)
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: knowledgeediturl,
        params: {
          params: {
            id: item.id,
            content: that.knowledgeeditval
          }
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          for (let i = 0; i < that.knowledgeeditbtnflag.length; i++) {
            if (that.knowledgeeditbtnflag[i]) {
              that.knowledgeeditbtnflag.splice(i, 1, false)
            }
          }
          that.getknowledge() // 重新获取知识点
        } else {
          that.win(coursedetailwarntxt.editknowledgefail, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    knowledgeeditcancel () {
      for (let i = 0; i < this.knowledgeeditbtnflag.length; i++) {
        if (this.knowledgeeditbtnflag[i]) {
          this.knowledgeeditbtnflag.splice(i, 1, false)
        }
      }
    },
    microvideodel (item, ind) {
      this.$router.push({name: 'Fcoursedetailmicrovideodel', params: {item: item}, query: {courseId: this.geturlparam('courseId', location.hash), lessonId: this.geturlparam('lessonId', location.hash)}})
    },
    changetab (ind, type) {
      this.tabselected = ['', '', '', '', '']
      this.tabstyle = ['height: 0px;margin-top:0px', 'height: 0px;margin-top:0px', 'height: 0px;margin-top:0px', 'height: 0px;margin-top:0px', 'height: 0px;margin-top:0px']
      this.tabselected.splice(ind, 1, 'selected')
      if (ind === 2) {
        this.tabstyle.splice(ind, 1, 'height: 290px;margin-top:0px')
      } else {
        this.tabstyle.splice(ind, 1, 'height: 250px;margin-top:20px')
      }
    },
    changemixparttab (ind, type) {
      this.mixparttabselected = ['', '', '', '']
      this.mixparttabstyle = ['height: 0px;margin:0;overflow:hidden', 'height: 0px;margin:0;overflow:hidden', 'height: 0px;margin:0;overflow:hidden', 'height: 0px;margin:0;overflow:hidden', 'height: 0px;margin:0;overflow:hidden']
      this.mixparttabselected.splice(ind, 1, 'selected')
      this.mixparttabstyle.splice(ind, 1, 'height: auto;margin:2%')
      if (ind === 3) {
        if (this.chartshow) {
          this.zdatafn(this.piezdata.totalDatas[0].levelsData)
          this.pieatafn(this.piezdata.totalDatas[0].levelsData)
          this.setscolepersonnum = this.piezdata.totalDatas[0].totalUser
          this.setscoleval = this.piezdata.totalDatas[0].totalAvg
        }
      }
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
          if (backfn === '-1') {
            window.history.go(-1)
          } else {
            if (backfn) {
              backfn()
            }
          }
        }
      })
    }
  },
  mounted () {
    // this.getechart() // st分析
    if (location.hash.indexOf('Fcourse') >= 0) {
      document.querySelector('a[href="#/Fcourse"]').setAttribute('class', 'a active')
    }
  },
  updated () {
    if (!this.scroll) {
      this.scroll = this.$Scroll({
        'father': 'resdownload',
        'getfatheridPosition': document.querySelector('#resdownload'),
        'scrollels': '.app'
      })
    } else {
      if (document.querySelector('#resdownload')) {
        this.scroll.addElement()
      }
    }
    if (!this.reshotflag) {
      this.reshotflag = this.$Scroll({
        'father': 'reshot',
        'getfatheridPosition': document.querySelector('#resdownload'),
        'scrollels': '.app'
      })
    } else {
      if (document.querySelector('#reshot')) {
        this.reshotflag.addElement()
      }
    }
    if (!this.xjflag) {
      this.xjflag = this.$Scroll({
        'father': 'xj',
        'getfatheridPosition': document.querySelector('#resdownload'),
        'scrollels': '.app'
      })
    } else {
      if (document.querySelector('#xj')) {
        this.xjflag.addElement()
      }
    }
    if (!this.mlflag) {
      this.mlflag = this.$Scroll({
        'father': 'ml',
        'getfatheridPosition': document.querySelector('#resdownload'),
        'scrollels': '.app'
      })
    } else {
      if (document.querySelector('#ml')) {
        this.mlflag.addElement()
      }
    }
    if (!this.noteflag) {
      this.noteflag = this.$Scroll({
        'father': 'note',
        'getfatheridPosition': document.querySelector('#resdownload'),
        'scrollels': '.app'
      })
    } else {
      if (document.querySelector('#note')) {
        this.noteflag.addElement()
        document.getElementById('note').children[0].style.marginTop = this.notescrollsonmargintop
        document.getElementById('note').querySelector('.scroll_y').style.top = this.notescrollytop
      }
    }
    if (!this.othernoteflag) {
      this.othernoteflag = this.$Scroll({
        'father': 'othernote',
        'getfatheridPosition': document.querySelector('#resdownload'),
        'scrollels': '.app'
      })
    } else {
      if (document.querySelector('#othernote')) {
        this.othernoteflag.addElement()
        document.getElementById('othernote').children[0].style.marginTop = this.othernotescrollsonmargintop
        document.getElementById('othernote').querySelector('.scroll_y').style.top = this.othernotescrollytop
      }
    }
    if (!this.knowledgeflag) {
      this.knowledgeflag = this.$Scroll({
        'father': 'knowledge',
        'getfatheridPosition': document.querySelector('#resdownload'),
        'scrollels': '.app'
      })
    } else {
      if (document.querySelector('#knowledge')) {
        this.knowledgeflag.addElement()
      }
    }
    if (!this.microvideoflag) {
      this.microvideoflag = this.$Scroll({
        'father': 'microvideo',
        'getfatheridPosition': document.querySelector('#resdownload'),
        'scrollels': '.app'
      })
    } else {
      if (document.querySelector('#microvideo')) {
        this.microvideoflag.addElement()
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.params.recall) {
        if (to.params.recall === 'getquestion') {
          this.getquestion({page: this.pageindexq})
        }
        if (to.params.recall === 'getdiscuss') {
          this.getdiscuss({page: this.pageindex})
        }
        if (to.params.recall === 'getmicrovideo') {
          this.getmicrovideo()
        }
        if (to.params.recall === 'getmynotelist') {
          this.getmynote()
        }
      }
    }
  }
}
</script>
