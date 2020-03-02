//兼容ie8以下getElementsByClassName操作
	function getClassNames(classString,tagName){  
	      if (document.getElementsByClassName) {  
	            return document.getElementsByClassName(classString)  
	      }else {  
	            var el = document.getElementsByTagName(tagName),ret = [];           
	            for(i = 0; i < el.length; i++) {  
	         if(hasClass(el[i],classString)){  
	                ret.push(el[i])  
	         }  
	      }  
	      return ret;  
	       }  
	}  
	function hasClass(tagStr,classString){  
	     var arr=tagStr.className.split(/\s+/ );  //这个正则表达式是因为class可以有多个,判断是否包含  
	     for (var i=0;i<arr.length;i++){  
            if (arr[i]==classString){  
                  return true ;  
            }  
	     }  
	     return false ;  
	}
	var textareaels,emotionsels,emotion;
	if(document.getElementsByClassName){
		textareaels=document.getElementsByClassName("textareas")[0];
		emotionsels=document.getElementsByClassName("emotions")[0];
		emotion=document.getElementsByClassName("emotion")[0];
	}
	else
	{
		textareaels=getClassNames("textareas","div")[0];
		emotionsels=getClassNames("emotions","div")[0];
		emotion=getClassNames("emotion","div")[0];
	}
	//初始化表情,添加时间和路径
	var emotiosimg=""
	for(var i=0;i<75;i++){
		emotiosimg+='<img src="/static/qqface/face/'+(i+1)+'.gif" onclick="emotionto(this)" />'
	}
	emotionsels.innerHTML=emotiosimg;
	//点击表情操作功能
	function emotionto(param){
		textareaels.innerHTML=textareaels.innerHTML+'<img src="'+param.getAttribute("src")+'"/>';
		textareaels.focus()
		if (document.getElementById('sendmessagebtn')) {
		  document.getElementById('sendmessagebtn').setAttribute('class', 'sendblue')
		  
		}
		if (navigator.userAgent.toLowerCase().match(/.(msie)/)!=null) 
		{  
			var rng;  
			textareaels.focus();  
			rng = document.selection.createRange();  
			rng.moveStart('character', -textareaels.innerText.length);  
			var text = rng.text;  
			for (var i = 0; i < textareaels.innerText.length; i++) {  
				if (textareaels.innerText.substring(0, i + 1) == text.substring(text.length - i - 1, text.length)) 
				{
					result = i + 1;  
				}  
			 } 
		}
		else
		{
			var range = document.createRange();  //返回新创建的 Range 对象，两个边界点都被设置为文档的开头。
			range.selectNodeContents(textareaels); //设置该范围的边界点，使它包含指定节点的子孙节点，但不包含指定的节点本身。 
			range.collapse(false);  //折叠该范围，使它的边界点重合。如果范围的开始点和结束点在文档的同一位置，则为 true，即范围是空的，或折叠的。
			var sel = window.getSelection();  //获取选中区域
			sel.removeAllRanges();  //清除选中的区域
			sel.addRange(range); //将range添加到selection当中
		}
		emotionsels.style.display="none";
		emotion.setAttribute("flag","false");
	}
	//点击表情图标，显示表情
	emotion.onclick=function(){
		var flag=this.getAttribute("flag");
		if(flag=="false"){
			emotionsels.style.display="block";
			this.setAttribute("flag","true");
		}
		else
		{
			emotionsels.style.display="none";
			this.setAttribute("flag","false");
		}
	}