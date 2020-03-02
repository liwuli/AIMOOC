<template>
  <div>
    <AJposition></AJposition>
    <div class="evalueatetab">
      <span class="span" @click="tabSwitch(item.value)" :class="item.value===active?'selected':''" v-for="item in tab">{{item.name}}</span>
    </div>
    <keep-alive>
      <component :is="active"></component>
    </keep-alive>
  </div>
</template>

<script>
import AJposition from '@/components/extend/position'
import ClassTeach from '@/module/admin/userLibrary/classTeach'
import ClassManage from '@/module/admin/userLibrary/classManage'

export default {
  name: 'userLibraryindex',
  components: {
    AJposition,
    ClassTeach,
    ClassManage
  },
  data () {
    return {
      active: 'ClassManage',
      tab: [{name: '行政班级', value: 'ClassManage'}, {name: '教学班级', value: 'ClassTeach'}]
    }
  },
  methods: {
    tabSwitch (value) {
      this.active = value
    }
  }
}
</script>
