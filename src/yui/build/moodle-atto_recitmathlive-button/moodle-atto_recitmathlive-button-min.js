YUI.add("moodle-atto_recitmathlive-button",function(l,t){l.namespace("M.atto_recitmathlive").Button=l.Base.create("button",l.M.editor_atto.EditorPlugin,[],{TEMPLATE:'<div style="margin-bottom:20px;height:300px;overflow-y:auto" id="{{component}}inputblock"></div><div style="text-align:right"><button id="{{component}}close" class="btn btn-secondary">{{get_string "close" component}}</button><button class="btn btn-primary" id="{{component}}submit"> {{get_string "save" component}}</button></div>',COMPONENTNAME:"atto_recitmathlive",_currentSelection:null,_content:null,stream:null,math:null,initializer:function(){var t,e;this.get("host").canShowFilepicker("media")&&(this.addButton({title:"pluginname",icon:"e/math",iconComponent:this.COMPONENTNAME,callback:this.open,buttonName:"recitmathlive"}),t=M.cfg.wwwroot+"/lib/editor/atto/plugins/recitmathlive/js/mathlive.min.js",e=this,requirejs([t],function(t){window.MathLive=t;t=e.get("host").textarea.ancestor("form");t&&t.on("submit",e.submitAtto,e),setTimeout(function(){e.renderMath()},600)}),M.filter_mathjaxloader&&(window.MathJaxd={jax:["input/TeX","output/SVG"],extensions:["tex2jax.js","MathMenu.js","MathZoom.js"],showMathMenu:!1,showProcessingMessages:!1,messageStyle:"none",SVG:{useGlobalCache:!1},TeX:{extensions:["AMSmath.js","AMSsymbols.js","autoload-all.js"]}},M.filter_mathjaxloader.typeset()))},getSelectedNode:function(){var t=document.getSelection().anchorNode;return t?3==t.nodeType?t.parentNode:t:null},open:function(){var t,a,e,n,s,r,i,o;if(this.dialogue=this.getDialogue({headerContent:M.util.get_string("pluginname",this.COMPONENTNAME),focusAfterHide:!0,width:"auto",height:"auto"}),(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i))&&window.scrollTo(0,1),n="f(x)=",this.selectedNode||(e=this.getSelectedNode(),(e=this.getParentFromClass(e,this.COMPONENTNAME+"block"))&&e.classList.contains(this.COMPONENTNAME+"block")&&(this.selectedNode=e)),t=[],this.selectedNode&&(t=this.selectedNode.querySelectorAll("."+this.COMPONENTNAME)),e=l.Handlebars.compile(this.TEMPLATE),n=l.Node.create(e({elementid:this.get("host").get("elementid"),component:this.COMPONENTNAME,width:.8*window.innerWidth,height:.8*window.innerHeight})),this.dialogue.set("bodyContent",n).show(),a=document.getElementById(this.COMPONENTNAME+"inputblock"),e=document.getElementById(this.COMPONENTNAME+"close"),n=document.getElementById(this.COMPONENTNAME+"submit"),r=(s=this).get("host"),0==t.length)s.createField("f(x)=",!1);else for(i of t)o=i.getAttribute("data-latex"),s.createField(o,!0);e.addEventListener("click",function(t){t.preventDefault(),s.close()}),n.addEventListener("click",function(t){var e,n,i,o;t.preventDefault(),e="";for(n of a.getElementsByTagName("math-field"))i=n.getValue("latex"),o=s.formatForMathJaxFilter(i),e=e+"<span class='"+s.COMPONENTNAME+"' data-latex='"+i+"'>"+o+"</span><br>";r.focus(),r.restoreSelection(),s.selectedNode?s.selectedNode.innerHTML=e:r.insertContentAtFocusPoint("<span class='"+s.COMPONENTNAME+"block'>"+e+"</span>"),s.close(),setTimeout(function(){s.renderMath(),s.markUpdated()},500)},!1),a.addEventListener("keypress",function(t){"Enter"===t.key&&s.createField("",!0)})},createField(t,e){var n,i=document.getElementById(this.COMPONENTNAME+"inputblock"),o=document.createElement("math-field");o.classList.add("d-inline-block"),o.style.minWidth="300px",o.setAttribute("virtual-keyboard-mode","onfocus"),o.innerText=t,i.append(o),o.focus(),e&&((n=document.createElement("a")).innerHTML="<i class='fa fa-times'></i>",n.href="#",n.style.color="#ff0000",n.addEventListener("click",()=>{o.remove(),n.remove()}),i.append(n)),e=document.createElement("br"),i.append(e)},submitAtto(){this.unrenderMath(),this.markUpdated()},formatForMathJaxFilter(t){return"\\("+(t=t.replace(" ","\\ "))+"\\)"},doubleClickHandler(t){var e=this.getParentFromClass(t.target,this.COMPONENTNAME+"block");e&&(this.selectedNode=e,t.stopPropagation(),this.open())},getParentFromClass(t,e){if(!t)return!1;if(t.classList.contains(e))return t;for(;t=t.parentElement;)if(t.classList.contains(e))return t;return!1},tex2img(t,i,o){MathJax.Hub.Queue(function(){var n=MathJax.HTML.Element("span",{},t);MathJax.Hub.Typeset(n,function(){var e,t=n.getElementsByTagName("svg")[0];t?(t.setAttribute("xmlns","http://www.w3.org/2000/svg"),(e=new Image).src="data:image/svg+xml;base64,"+window.btoa(unescape(encodeURIComponent(t.outerHTML))),e.onload=function(){var t=document.createElement("canvas");t.width=e.width,t.height=e.height,t.getContext("2d").drawImage(e,0,0),t='<img src="'+t.toDataURL("image/png")+'"/>',i(t,o)}):i(n.innerHTML,o)})})},renderMath(){var t,e,n=this.get("host").editor.getDOMNode(),n=n.querySelectorAll("."+this.COMPONENTNAME);for(t of n)e=t.getAttribute("data-latex"),e=this.formatForMathJaxFilter(e),this.tex2img(e,(t,e)=>{e.innerHTML=t,e.onclick=this.doubleClickHandler.bind(this),e.setAttribute("contenteditable","false")},t)},unrenderMath(){var t,e,n=this.get("host").editor.getDOMNode(),n=n.querySelectorAll("."+this.COMPONENTNAME);for(t of n)e=t.getAttribute("data-latex"),t.innerHTML=this.formatForMathJaxFilter(e)},close:function(){this.getDialogue({focusAfterHide:null}).hide(),this.selectedNode=null}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});