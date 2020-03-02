<template>
  <div class="main">
    <span>第{{pageIndex}}/{{totalPages}}页,</span>
    <span style="padding-left: 4px;">共{{totalNum}}条</span>
    <img src="/static/images/pagefirst.png" @click="paging('first')" alt="">
    <img src="/static/images/pageprev.png" @click="paging(-1)" alt="">
    <span>{{pageIndex}}</span>
    <img src="/static/images/pagenext.png" @click="paging(1)" alt="">
    <img src="/static/images/pagelast.png" @click="paging('last')" alt="">
    <input v-model="goToPage" type="text"/>
    <button type="button" @click="paging(0)">前往</button>
  </div>
</template>

<script>
    export default {
      name: 'pagination',
      props: ['pageSize', 'pageIndex', 'totalNum'],
      data () {
        return {
          re: /^[0-9]+.?[0-9]*$/,
          pagevalue: this.pageIndex,
          goToPage: ''
        }
      },
      computed: {
        totalPages () {
          return Math.ceil(this.totalNum / this.pageSize) || ''
        }
      },
      methods: {
        paging (type) {
          switch (type) {
            case -1:
              if (this.pagevalue > 1) {
                this.pagevalue--
                this.$emit('pagePost', this.pagevalue)
              }
              break
            case 1:
              if (this.pagevalue < this.totalPages) {
                this.pagevalue++
                this.$emit('pagePost', this.pagevalue)
              }
              break
            case 0:
              if (this.re.test(this.goToPage) && this.goToPage > 0 && this.goToPage <= this.totalPages) {
                this.pagevalue = this.goToPage
                this.$emit('pagePost', this.pagevalue)
              }
              break
            case 'first':
              if (this.pagevalue !== 1) {
                this.pagevalue = 1
                this.$emit('pagePost', this.pagevalue)
              }
              break
            case 'last':
              if (this.pagevalue !== this.totalPages) {
                this.pagevalue = this.totalPages
                this.$emit('pagePost', this.pagevalue)
              }
              break
          }
        }
      }
    }
</script>

<style scoped>
  .main{
    font-size: 18px;
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 0;
    width: auto;
    height: 50px;
    padding: 10px 40px;
  }
  .main img{
    cursor: pointer;
    height: 20px;
    transform: translateY(4px);
    padding: 0 6px;
  }
  .main span{
    display: inline-block;
    height: 100%;
    padding-top: 3px;
  }
  .main input{
    float: none;
    height: 22px;
    width: 50px;
    border: 1px solid #eee;
    background-color: rgba(0,0,0,0);
    margin: 0 15px 0 10px;
    color: #fff;
    transform: translateY(-1px);
  }
  .main button{
    background-color: #0adaf6;
    color: #014049;
    border: none;
    outline: none;
    height: 26px;
    width: 46px;
    cursor: pointer;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
</style>
