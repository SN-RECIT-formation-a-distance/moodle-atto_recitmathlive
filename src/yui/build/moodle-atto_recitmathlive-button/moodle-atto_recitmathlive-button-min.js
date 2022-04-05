YUI.add("moodle-atto_recitmathlive-button",function(s,t){s.namespace("M.atto_recitmathlive").Button=s.Base.create("button",s.M.editor_atto.EditorPlugin,[],{TEMPLATE:'<div style="margin-bottom:20px"><math-field id="{{component}}input" virtual-keyboard-mode="onfocus">{{content}}</math-field></div><button id="{{component}}close" class="btn btn-secondary">{{get_string "close" component}}</button><button class="btn btn-secondary" id="{{component}}submit"> {{get_string "save" component}}</button></div>',COMPONENTNAME:"atto_recitmathlive",_currentSelection:null,_content:null,stream:null,math:null,initializer:function(){var t,e;this.get("host").canShowFilepicker("media")&&(this.addButton({title:"pluginname",icon:"e/math",iconComponent:this.COMPONENTNAME,callback:this.open,buttonName:"recitmathlive"}),t=M.cfg.wwwroot+"/lib/editor/atto/plugins/recitmathlive/js/mathlive.min.js",e=this,requirejs([t],function(t){window.MathLive=t;t=e.get("host").textarea.ancestor("form");t&&t.on("submit",e.submitAtto,e),setTimeout(function(){e.renderMath()},600)}))},getSelectedNode:function(){var t=document.getSelection().anchorNode;return 3==t.nodeType?t.parentNode:t},open:function(){var i,t,e,n,o;this.dialogue=this.getDialogue({headerContent:M.util.get_string("pluginname",this.COMPONENTNAME),focusAfterHide:!0,width:"auto",height:"auto"}),(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i))&&window.scrollTo(0,1),e="f(x)=",t=this.getSelectedNode(),(t=this.getParentFromClass(t,this.COMPONENTNAME))&&t.classList.contains(this.COMPONENTNAME)&&(e=(this.selectedNode=t).getAttribute("data-latex")),t=s.Handlebars.compile(this.TEMPLATE),e=s.Node.create(t({elementid:this.get("host").get("elementid"),component:this.COMPONENTNAME,content:e,width:.8*window.innerWidth,height:.8*window.innerHeight})),this.dialogue.set("bodyContent",e).show(),i=document.getElementById(this.COMPONENTNAME+"input"),t=document.getElementById(this.COMPONENTNAME+"close"),e=document.getElementById(this.COMPONENTNAME+"submit"),o=(n=this).get("host"),t.addEventListener("click",function(t){t.preventDefault(),n.close()}),e.addEventListener("click",function(t){var e;t.preventDefault(),e=i.getValue("latex"),t=n.formatForMathJaxFilter(e),o.focus(),o.restoreSelection(),n.selectedNode?(n.selectedNode.innerHTML=t,n.selectedNode.setAttribute("data-latex",e)):o.insertContentAtFocusPoint("<span class='"+n.COMPONENTNAME+"' data-latex='"+e+"'>"+t+"</span>"),n.close(),setTimeout(function(){n.renderMath(),n.markUpdated()},500)},!1)},submitAtto(){this.unrenderMath(),this.markUpdated()},formatForMathJaxFilter(t){return"\\("+(t=t.replace(" ","\\ "))+"\\)"},doubleClickHandler(t){this.getParentFromClass(t.target,this.COMPONENTNAME)&&(t.stopPropagation(),this.open())},getParentFromClass(t,e){if(t.classList.contains(e))return t;for(;t=t.parentElement;)if(t.classList.contains(e))return t;return!1},renderMath(){var t,e,i=this.get("host").editor.getDOMNode(),n=i.querySelectorAll("."+this.COMPONENTNAME);for(t of n)t.ondblclick=this.doubleClickHandler.bind(this),e=t.getAttribute("data-latex"),t.innerHTML="<math-field virtual-keyboard-mode=\"onfocus\" style='display:inline-block' default-mode='inline-math'>"+e+"</math-field>";MathLive.renderMathInElement(i);for(t of n=i.querySelectorAll("."+this.COMPONENTNAME+" math-field"))t.addEventListener("focus",this.onFocus.bind(this)),t.addEventListener("blur",this.onBlur.bind(this))},onFocus(t){var e=this.get("host");t.isTrusted&&(this.selectedNode=t.target.parentElement,e.editor.getDOMNode().setAttribute("contenteditable","false"),e.saveSelection())},onBlur(t){var e=this.get("host");t.isTrusted&&this.selectedNode&&(t=this.selectedNode.children[0].getValue("latex"),e.editor.getDOMNode().setAttribute("contenteditable","true"),e.focus(),e.restoreSelection(),this.selectedNode&&this.selectedNode.setAttribute("data-latex",t),this.selectedNode=null)},unrenderMath(){var t,e,i=this.get("host").editor.getDOMNode(),i=i.querySelectorAll("."+this.COMPONENTNAME);for(t of i)e=t.getAttribute("data-latex"),t.innerHTML=this.formatForMathJaxFilter(e)},close:function(){this.getDialogue({focusAfterHide:null}).hide(),this.selectedNode=null}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});