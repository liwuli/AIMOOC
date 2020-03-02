import {developUrl} from '@/module/admin/config/urlPage'
export const pnameN = '门户名称'
export const codeN = '门户编码'
export const statusN = '门户状态'
export const footerN = '页尾声明'
export const saveN = '保存'
export const cancelN = '取消'
export const listurl = developUrl + '/base/portal/findPortal'
export const editurl = developUrl + '/base/portal/saveOrUpdatePortal'
export const uploadimgurl = developUrl + '/base/portal/uploadImg'
export const msgeditN = '编辑'
export const valid = '有效'
export const unvalid = '无效'
export const filetype = '.jpg,.png,.bmp,.jpeg'
export const fileN = 'LOGO文件'
export const msgErr = '暂无门户数据！'
export const pathinfo = {'prex': 'AJportal', 'optname': '门户'}
export const radioinfo = {
  classname: 'radiofather',
  val: [0, 1],
  title: ['有效', '无效'],
  opt: {
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
