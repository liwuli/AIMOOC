<template>
    <div class="vue-dropdown default-theme" v-show-extend="show">
        <div class="search-module clearfix">
            <input class="search-text" 
            @keyup='search($event)' @focus='focus($event)' @blur='blur($event)' :placeholder="placeholder" v-model="inputValue" ref="inputSelect" />
            <span class="iconfont search-icon" @click="inputFocus()" ></span>
        </div>
        <ul class="list-module" v-show="ulShowType">
            <li v-for ="(item,index) in datalist" @click="appClick(item)" 
            :key="index" :class="index==classIndex && 'selected'">
                <p class="list-item-text" :title="item.txt" :value="item.value" :ind="index">{{item.txt}}</p>
            </li>
        </ul>
        <div class="tip__nodata" v-show="nodataShowType">{{nodatatext}}</div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                datalist:[],
                ulShowType: false,
                nodataShowType: false,
                inputValue:'',
                ab: '',
                classIndex: 0
            }
        },
        props:{
            'show':{//用于外部控制组件的显示/隐藏
                type:Boolean,
                default:true
            },
            'itemlist':Array,
            'placeholder':String,
            'nodatatext':String,
            'checkedId':String
        },
        watch:{
            itemlist:function(val){
                if(val.length>0){
                    for(var i=0;i<val.length;i++){
                        val[i].ind = i;
                    }
                    this.datalist = val;
                }
            },
            checkedId:function(val){
                var data = this.datalist;
                if(data && data.length>0){
                    for(var i=0;i<data.length;i++){
                        if(data[i].value == val){
                            this.appClick(data[i]);
                            return;
                        }
                    }
                }
                
            }
        },
        directives:{
            'show-extend':function(el,binding,vnode){//bind和 update钩子
                let value = binding.value,searchInput = null;
                if(value){
                    el.style.display='block';
                }else{//隐藏后，恢复初始状态
                    el.style.display='none';
                    searchInput = el.querySelector(".search-text");
                    searchInput.value = '';
                    vnode.context.datalist = vnode.context.itemlist;//还原渲染数据
                }
            }
        },
        methods:{
            appClick:function(data){
                if(data.ind!=0 && data.value!='-1'){
                    this.classIndex = data.ind;
                    this.inputValue = data.txt;
                    this.$emit('selectFunc',data);
                }
            },
            search:function(e){
                let vm = this,searchvalue = e.currentTarget.value;
                vm.datalist = vm.itemlist.filter(function(item,index,arr){
                    return item.txt.indexOf(searchvalue) != -1;
                });
                this.focus();
            },
            focus:function(e){
                if(this.datalist.length>0){
                    this.nodataShowType = false;
                    this.ulShowType = true;
                }else {
                    this.ulShowType = false;
                    this.nodataShowType = true;
                }
            },
            blur:function(e){
                var _this = this;
                _this.ab = setTimeout(function(){
                    _this.ulShowType = false;
                    _this.nodataShowType = false;
                },200);
            },
            inputFocus:function(){
                clearTimeout(this.ab);
                this.$refs.inputSelect.focus();
            }
        },
        computed:{
            length:function(){
                return this.datalist.length;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vue-dropdown.default-theme {
        box-shadow: 0 0 0 1px #929ac2;
        background: #fff;
        border-radius: 0px;
        float: left;
        height: 28px;
        line-height: 28px;
        width: 220px;
        margin-top: 3px;
        &._self-show {
            display: block!important;
        }

        .search-module {
            background: #fff;
            border-radius: 0px;
            height: 28px;
            line-height: 28px;
            position: relative;
            .search-text {
                box-shadow: 1px 0 0 0 #929ac2;
                float: left;
                height: inherit;
                line-height: inherit;
                text-indent: 10px;
                overflow: hidden;
                width: 80%;
                white-space: nowrap;
                outline: none;
                border: none;
            }
            .search-text::-webkit-input-placeholder {
                color: #141414;
                font-size: 14px;
            }
            .search-icon {
                position: relative;
                float: right;
                color: #929ac2;
                cursor: pointer;
                height: inherit;
                line-height: inherit;
                text-align: center;
                width: 20%;
            }
            .search-icon::before {
                content: "\e878";
            }

        }

        .list-module {
            position: relative;
            z-index: 2;
            top: 1px;
            max-height: 200px;
            overflow-y: auto;
            box-shadow: 1px 0 0 0 #929ac2, -1px 0 0 0 #929ac2, 0 1px 0 0 #929ac2;
            background: #fff;
            li {
                &._self-hide {
                    display: none;
                }
                float: left;
                box-shadow: 0 1px 0 0 #929ac2;
                min-height: 28px;
                text-indent: 10px;
                width: 100%;
                overflow: hidden;
                white-space: normal;
                word-break: break-all;
            }
            li:hover,
            li.selected {
                background: #929ac2;
                cursor: pointer;
                p {
                    color: #fff;
                }
            }
        }
    }
    .tip__nodata {
        position: relative;
        z-index: 1;
        top: 1px;
        overflow-y: auto;
        box-shadow: 1px 0 0 0 #929ac2, -1px 0 0 0 #929ac2, 0 1px 0 0 #929ac2;
        background: #fff;
        margin-top: 0;
        height: 34px;
        text-indent: 10px;
        font-size: 14px;
        line-height: 34px;
        color: #141414;
    }
</style>
