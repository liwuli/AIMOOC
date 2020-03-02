/**
 * author: lihang
 * created: 2018/9/11
 * describe: 公共方法的封装
 */
/*
 * params: 无
 * return: 无
 * function: 公共对象的构造方法
 * */
var $public = function () {
  this.init.apply(this, arguments)
}
$public.prototype = {
  /*
   * params: 无
   * return: 无
   * function: 初始化方法
   * */
  init: function () {

  },
  /*
   * params: 字段名
   * return: 字段值
   * function: 获取地址栏的查询字段值
   * */
  getHashStr: function (name) {
    var url = location.hash // 获取url中"?"符后的字串
    var theRequest = new Object()
    if (url.indexOf('?')) {
      var str = url.substr(url.indexOf('?') + 1);
      var strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
      }
    }
    return theRequest[name]
  }
}
export default new $public()
