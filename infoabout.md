#格式要求：
1.js部分，要求换行为两个空格，不允许tab,中文空格等格式 jslint 格式校验,
2.js部分，不得使用第三方库，如jquery等，请使用es6编码，编译后使用
3.js部分，接口调用部分，需写入到methods方法中，每个接口一个方法
4.js部分，必须使用英文单引号，不允许使用双引号
5.js部分，除必要的console.log()（如接口返回值信息打印）需要保留外，不允许存在log信息
6.css部分，尽量不要写到vue文件中的style中，
7.css部分，使用sass编译，设计颜色请定义到变量中，使用$color+色值来定义，样式表中不允许存在十六进制（如#ffffff等）和英文单词（如red等）表示的色值，编译后目录存放于样式表统计目录中
8.不得修改项目目录结构
9.以下为控件格式要求及说明

#canlendar:

name: 'Calendarme'
props: ['valshow', 'min', 'clear', 'part', 'inputstyle', 'hmsshow', 'ids', 'ymdhms', 'dateval']

valshow: 是否显示日期，true/false, false时需要自己手动设置日历值
min: 最小日期
clear: 是否显示清空按钮
part: 日历显示填充区域
inputstyles: input style
hmsshow: true/false, true时只显示时分秒
ids： 日历id
ymdhms: 'ymdhMs', ymd必须项，指定日历显示的格式，除ymd外，可自左向右一次组合（ymdh, ymdhM, ymdhms）
dateval: 赋初始值

#check.vue
name: 'check',
props: ['info', 'selectarr', 'styles'],

info: check所有信息格式为[{val: '', txt: ''}]
selectarr: '已选中部分' [0,1,2]数组索引
styles： check，checked的style部分

#echart
props: ['styles', 'echartid', 'echartdata', 'title']
stylels: echart style
echartid:'echartid'
echartdata: echart 数据，参考echartapi
title: title

#wangeditor
props: ['styles']
that.$emit('editorcontent', {'content': that.editorContent, 'editing': editing})
styles: styles
editorcontent: {回调内容， 编辑器}

#page
props: ['pagestyles', 'bingo', 'pagesize', 'pageindex', 'totalpage']
pagestyles: G_page的style
bingo: ['selected'],分页选中样式
pagesize：10每页显示条数
pageindex： 页码
totalpage： 总页数

#radio
props: ['radioinfo', 'genderval', 'type']

radioinfo: 配置信息
addradioinfo = {
  classname: 'radiofather',
  val: [1, 0],
  title: ['是', '否'],
  opt: {
    init: {
      val: true,
      index: 0/genderval
    },
    inputflag: true
  }
}
genderval： 选中索引值
type： add/edit, 添加和编辑，两个不用的功能，需要使用不同的radioinfo

#railc 预约日历
props: ['railid', 'titleinfo', 'dateval', 'days', 'lostday', 'show']
railid： id
titleinfo: 左上角注释
dateval： 初始日期
days： 显示天数
lostday： true/false当前日期前几天开始
show：true/false上下周