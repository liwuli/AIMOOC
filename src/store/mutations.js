import * as types from './mutation-types'
import {linkinfolist} from '@/route/index'
const mutations = {
  [types.PathObj] (state, param) {
    state.pathobj = param
  },
  [types.Flinks] (state, param) {
    state.Flinks = param.Flinks
    state.educationType = param.educationType
  },
  [types.bodyheight] (state, param) {
    if (param.bodyheight < window.innerHeight - 65 - 50) {
      state.bodyheight = window.innerHeight - 65 - 50
    } else {
      state.bodyheight = param.bodyheight
    }
  },
  [types.headfooter] (state, param) {
    state.headfooter = param.headfooter
  },
  [types.version] (state, param) {
    state.version = param.version
  },
  [types.roleinfo] (state, param) {
    state.roleinfo = param.data
    for (let i = 0; i < state.roleinfo.length; i++) {
      state.roleinfolink[linkinfolist[state.roleinfo[i].path]] = {ind: state.roleinfo[i].ind, 'name': linkinfolist[state.roleinfo[i].path], 'title': state.roleinfo[i].pathname}
      state.powerinfo[linkinfolist[state.roleinfo[i].path]] = state.roleinfo[i].opt
    }
    for (let i = 0; i < param.datamenu.length; i++) {
      for (let k = 0; k < param.datamenu[i].childModules.length; k++) {
        param.datamenu[i].childModules[k].moduleCode = linkinfolist[param.datamenu[i].childModules[k].moduleCode]
        state.powerinfo[param.datamenu[i].childModules[k].moduleCode] = param.datamenu[i].childModules[k].opt
      }
    }
    state.roleinfolinkMenu = param.datamenu
//  param.roleinfo.code = param.roleinfo.userName.replace(/\s/gi, '')
    state.userinfo = param.roleinfo
  }
}
export { mutations }
