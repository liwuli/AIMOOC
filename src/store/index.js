import 'babel-polyfill/dist/polyfill.min.js'
import Vue from 'vue'
import Vuex from 'vuex'
import {state} from './state'
import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'
import CFCMScroll from 'willscroll'
import CFCMCalendar from 'willcalendar'
import CFCMCheckbox from 'willcheck'
import CFCMRadio from 'willradio'
import CFCMWin from 'willwin'
import CFCMScole from 'willscole'
import CFCMSelect from 'willselect'
import CFCMXK from 'willxk'
import CFCMRailc from 'willrailc'
import LocalVideo from 'willvideo'
import CFCMBD from 'willcanvasbd'
import CFCMimg from 'willimg'
import VueSocketio from 'vue-socket.io'

import {developUrl} from '../module/admin/config/urlPage'
// Vue.use(VueSocketio, 'http://' + location.hostname + ':999')
Vue.use(VueSocketio, 'http://172.16.160.46:999')

Vue.use(CFCMBD)
Vue.use(CFCMimg)
Vue.use(LocalVideo)
Vue.use(CFCMRailc)
Vue.use(CFCMXK)
Vue.use(CFCMSelect)
Vue.use(CFCMScroll)
Vue.use(CFCMCalendar)
Vue.use(CFCMWin)
Vue.use(CFCMCheckbox)
Vue.use(CFCMRadio)
Vue.use(CFCMScole)
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
//  product
  }
})
