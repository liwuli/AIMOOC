<template>
  <div class="G_positon">
    <slot></slot>
    <div class="item" v-for="(item,index) in brumblist" :key="index">
      <router-link :to="{name: item.name}">{{item.meta.breadcrumbName}}</router-link>
      <span class="separator" v-if="index !== brumblist.length-1 && item.meta.breadcrumbName">></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AJposition',
  data () {
    return {
      brumblist: ''
    }
  },
  created () {
    this.position()
  },
  components: {},
  methods: {
    position () {
      this.brumblist = this.$route.matched
      this.$route.matched.forEach((item, index) => {
        item.meta.breadcrumbName === '' ? item.path = '/' : this.$route.path === item.path
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.position()
    }
  }
}
</script>
