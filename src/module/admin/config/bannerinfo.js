export const basicinfo = {
  linkdemo: 'http://xxx.com',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  sureN: '确定',
  addallN: '焦点图添加',
  contentN: '确定要删除吗？',
  publishcontentN: '确定要发布吗？',
  unpublishcontentN: '确定要取消发布吗？',
  msgaddN: '焦点图添加',
  msgeditN: '焦点图编辑',
  msgdelN: '焦点图删除',
  msgpublishN: '发布',
  msgunpublishN: '取消发布',
  textareaN: '描述',
  linkN: '链接',
  fileN: '焦点图'
}
export const listhead = ['banner图', '描述', '链接', '状态', '操作']
export const pathinfo = {'prex': 'AJbanner', 'optname': '焦点图'}
export const percentinfo = ['wid30', 'wid20', 'wid15', 'wid10', 'wid25']
export const colums = ['img-html', 'des', 'link', 'stateval', 'opt']
export const optobjinfoAll = ['发布', '编辑', '删除']
export const opteventAll = ['publish mt10', 'editlist mt10', 'dellist mt10']
export const optobjinfoAllA = ['取消发布']
export const opteventAllA = ['unpublish mt10']
export const products = []
export const infoval = []
export const bingos = []
export const pageval = 1

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/base/Banner/findBannerList'
export const addurl = developUrl + '/base/Banner/addBanner'
export const editurl = developUrl + '/base/Banner/updateBanner'
export const delurl = developUrl + '/base/Banner/deleteBanner'
export const publishurl = developUrl + '/base/Banner/publishOrUnpublish'
export const uploadimgurl = developUrl + '/base/portal/uploadImg'
export const pagesize = 10
export const powerinfo = {
  OeN: '编辑',
  OdN: '删除',
  OaN: '添加',
  OpublishN: '发布',
  OunpublishN: '取消发布',
  OPpublishlist: 'publish mt10',
  OPalist: 'addlist',
  OPelist: 'editlist mt10',
  OPdlist: 'dellist mt10'
}
export const filetype = '.jpg,.png,.bmp,.jpeg'
export const warntxt = {
  picwarn: '建议图片大小：1200 * 487px  小于300KB',
  tobig: '图片不能大于300KB',
  files: '请上传图片',
  imgurl: '图片上传中...',
  publish: '已发布',
  unpublish: '未发布',
  more: '最多发布五个焦点图！',
  desN: '请填写描述！',
  urlN: '请填写链接地址！',
  imgN: '请上传banner图！'
}
