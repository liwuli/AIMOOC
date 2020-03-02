<template>
	<div class="editor" :style="styles">
		<div id="editorElem"></div>
	</div>
</template>
<script type='text/javascript'>
import E from 'wangeditor'
export default {
  name: 'editor',
  data () {
    return {
      editorContent: ''
    }
  },
  methods: {
  },
  props: ['styles'],
  mounted () {
    let editing = new E('#editorElem')
    // 自定义菜单配置
    editing.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
//    'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
//    'emoticon',  // 表情
//    'image',  // 插入图片
      'table'  // ,表格
//    'video',  // 插入视频
//    'code',  // 插入代码
//    'undo',  // 撤销
//    'redo'  // 重复
    ]
    let that = this
    editing.customConfig.onchange = (html) => {
      that.editorContent = html
      that.$emit('editorcontent', {'content': that.editorContent, 'editing': editing})
    }
    editing.create()
    that.$emit('editorcontent', {'content': that.editorContent, 'editing': editing})
  }
}
</script>
