<template>
  <nav class="gnav">
  	<div class="centers">
  		<!--<a target="_self"   @click="jump('/module/' + items.name, this)" :href="'/module/' + items.name"   v-for="(items, ind) in links">{{items.title}}</a>-->

  			<router-link
          :key="ind"
          :id="items.id"
          @click.native="jump('/module/' + items.name, 'nav_' + ind)"
          :to="{path: '/module/' + items.name}"
          v-for="(items, ind) in links"
        >
          {{items.title}}
        </router-link>

  		<!--<router-link :to="{name:'Home'}" >首页</router-link>
  		<router-link :to="{name:'Course'}" >课程中心</router-link>
  		<router-link :to="{name:'Product'}" >产品单页</router-link>-->
  	</div>
  </nav>
</template>

<script>

export default {
  name: 'Nav',
  created () {
    let navid = location.pathname.replace(/(.*\/)*([^.]+).*/ig, '$2')
    navid ? localStorage.setItem('navid', 'nav_' + navid) : localStorage.setItem('navid', 'nav_home')
  },
  data () {
    return {
      links: [{
        name: 'home.html',
        id: 'nav_home',
        title: '首页'
      },
      {
        name: 'course.html',
        id: 'nav_course',
        title: '课程'
      },
      {
        name: 'product.html',
        id: 'nav_product',
        title: '产品'
      },
      {
        name: 'admin.html',
        id: 'admin',
        title: '后台管理'
      }],
      id: ''
    }
  },
  methods: {
    jump (param, id) {
      localStorage.setItem('navid', id)
      location.href = param
    }
  },
  mounted () {
    document.getElementById(localStorage.getItem('navid')).setAttribute('class', 'active')
  },
  destroy () {
    localStorage.removeItem('navid')
  }
}
</script>

