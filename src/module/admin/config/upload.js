import * as types from '@/store/win-types'
import {developUrl} from '@/module/admin/config/urlPage'

export const importBAndC = developUrl + '/base/classroom/importBuildingsAndClassrooms'
export const addBatchStudentIn = developUrl + '/base/classes/addBatchStudentIn'
export const url = developUrl + '/control/controlRecording/import'
export const upload = function (url) {
  if (!this.files || this.files.name === undefined) {
    this.$Win({
      'title': types.title,
      'type': 'txt',
      'content': '请选择文件',
      'timeout': types.Timeout3,
      'cancel': function (obj, backfn) {
        obj.remove(obj.getid)
      },
      'closeshow': false
    })
    return
  }
  if (this.files.name.indexOf('.xls') < 0) {
    this.$Win({
      'title': types.title,
      'type': 'txt',
      'content': '错误的文件类型',
      'timeout': types.Timeout3,
      'cancel': function (obj, backfn) {
        obj.remove(obj.getid)
      },
      'closeshow': false
    })
    return
  }
  // 打开loading
  this.loading=true;
  let that = this
  let formData = new FormData()
  formData.append('file', this.files)
  this.axios({
    method: 'post',
    url: url,
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'},
    timeout: 1000 * 60 * 10
  })
    .then(function (res) {
      that.loading=false;
      if (res.data.code === 500) {
        let meg = '表单导入失败'
        res.data.result && res.data.result[0] && res.data.result[0].message && (meg = res.data.result[0].message)
        that.win(meg, '', false)
      } else {
        that.win('表单导入成功', that.cancelfn, false)
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}
