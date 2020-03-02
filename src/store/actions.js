import * as types from './mutation-types'

const actions = {
  [types.PathObj] ({ commit }, param) {
    commit(types.PathObj, param)
  },
  [types.version] ({ commit }, param) {
    commit(types.version, param)
  },
  [types.roleinfo] ({ commit }, param) {
    commit(types.roleinfo, param)
  },
  [types.Flinks] ({ commit }, param) {
    commit(types.Flinks, param)
  },
  [types.bodyheight] ({ commit }, param) {
    commit(types.bodyheight, param)
  },
  [types.headfooter] ({ commit }, param) {
    commit(types.headfooter, param)
  }
}
export {actions}
