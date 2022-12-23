    // This file is part of Moodle - http://moodle.org/
    //
    // Moodle is free software: you can redistribute it and/or modify
    // it under the terms of the GNU General Public License as published by
    // the Free Software Foundation, either version 3 of the License, or
    // (at your option) any later version.
    //
    // Moodle is distributed in the hope that it will be useful,
    // but WITHOUT ANY WARRANTY; without even the implied warranty of
    // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    // GNU General Public License for more details.
    //
    // You should have received a copy of the GNU General Public License
    // along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
    
    /**
     * This atto plugin allows to take pictures directly from your webcam and integrate them to your text.
     *
     * @package    atto_recitmathlive
     * @copyright  2019 RECIT
     * @license    {@link http://www.gnu.org/licenses/gpl-3.0.html} GNU GPL v3 or later
     */
    
    /**
     * @module moodle-atto_recitmathlive-button
     */
    
    /**
     * Atto text editor recitmathlive plugin.
     *
     * @namespace M.atto_recitmathlive
     * @class button
     * @extends M.editor_atto.EditorPlugin
     */
    


         
    Y.namespace('M.atto_recitmathlive').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
        TEMPLATE: '' +
            '<div style="margin-bottom:20px;height:300px;overflow-y:auto" id="{{component}}inputblock"></div>'+
            '<div style="text-align:right"><button id="{{component}}close" class="btn btn-secondary">{{get_string "close" component}}</button>' +
            '<button class="btn btn-primary" id="{{component}}submit"> {{get_string "save" component}}</button></div>',
        COMPONENTNAME: 'atto_recitmathlive',
        /**
         * A reference to the current selection at the time that the dialogue
         * was opened.
         *
         * @property _currentSelection
         * @type Range
         * @private
         */
        _currentSelection: null,
    
        /**
         * A reference to the HTMl of the dialuge content
         *
         * @property _content
         * @type String
         * @private
         */
        _content: null,
        stream: null,

        math: null,
    
        initializer: function() {
            if (this.get('host').canShowFilepicker('media')) {
                this.addButton({
                    title: 'pluginname',
                    icon: 'e/math',
                    iconComponent: this.COMPONENTNAME,
                    callback: this.open,
                    buttonName: 'recitmathlive'
                });
                
                var src = M.cfg.wwwroot +'/lib/editor/atto/plugins/recitmathlive/js/mathlive.min.js';
                var that = this;
                requirejs([src], function(app) {
                    window.MathLive = app;
                    // Adding submit event.
                    var form = that.get('host').textarea.ancestor('form');

                    if (form) {
                        form.on('submit', that.submitAtto, that);
                    }
                    setTimeout(function(){that.renderMath()}, 600);
                });
                if(M.filter_mathjaxloader){
                    window.MathJaxd = {
                        jax: ["input/TeX", "output/SVG"],
                        extensions: ["tex2jax.js", "MathMenu.js", "MathZoom.js"],
                        showMathMenu: false,
                        showProcessingMessages: false,
                        messageStyle: "none",
                        SVG: {
                          useGlobalCache: false
                        },
                        TeX: {
                          extensions: ["AMSmath.js", "AMSsymbols.js", "autoload-all.js"]
                        },
                    }
                    M.filter_mathjaxloader.typeset(); 
                }
                
            }
        },

        getSelectedNode: function() {
            var node = document.getSelection().anchorNode;
            if (!node) return null;
            return (node.nodeType == 3 ? node.parentNode : node);
        },
    
        open: function(){
            
            this.dialogue = this.getDialogue({
                headerContent: M.util.get_string('pluginname', this.COMPONENTNAME),
                focusAfterHide: true,
                width: 'auto',
                height: 'auto'
            });
            
            // Apple bug: hide Safari navbar so users can see buttons
            if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
                /* iOS hides Safari address bar */
                window.scrollTo(0, 1);
            }

            // Set the dialogue content, and then show the dialogue.
            var content = 'f(x)=';
            if (!this.selectedNode){
                var node = this.getSelectedNode();
                node = this.getParentFromClass(node, this.COMPONENTNAME+'block');
                if (node && node.classList.contains(this.COMPONENTNAME+'block')){
                    this.selectedNode = node;
                }
            }
            
            var mathList = [];
            if (this.selectedNode){
                mathList = this.selectedNode.querySelectorAll('.'+this.COMPONENTNAME);
            }
            
            var template = Y.Handlebars.compile(this.TEMPLATE);
            var content = Y.Node.create(template({
                    elementid: this.get('host').get('elementid'),
                    component: this.COMPONENTNAME,
                    width: window.innerWidth * 0.8,
                    height: window.innerHeight * 0.8,
                }));
            this.dialogue.set('bodyContent', content).show();
            var inputs = document.getElementById(this.COMPONENTNAME+'inputblock');
            var closebutton = document.getElementById(this.COMPONENTNAME+'close');
            var submitbutton = document.getElementById(this.COMPONENTNAME+'submit');
            var that = this;
            var host = that.get('host');

            //Load
            if (mathList.length == 0){
                that.createField('f(x)=', false);
            }else{
                for (var math of mathList){
                    var latex = math.getAttribute('data-latex');
                    var input = that.createField(latex, true);
                }
            }

            
            closebutton.addEventListener('click', function(ev) {
                ev.preventDefault();
                that.close();
            });

            submitbutton.addEventListener('click', function(ev) {
                ev.preventDefault();
                var inputList = inputs.getElementsByTagName('math-field')
                var html = '';
                for (var input of inputList){
                    var latexorg = input.getValue('latex');
                    var latex = that.formatForMathJaxFilter(latexorg);
                    html = html + "<span class='"+that.COMPONENTNAME+"' data-latex='"+latexorg+"'>"+latex+"</span>" + '<br>';
                }
                host.focus();
                host.restoreSelection();
                if (that.selectedNode){
                    that.selectedNode.innerHTML = html;
                }else{
                    host.insertContentAtFocusPoint("<span class='"+that.COMPONENTNAME+"block'>"+html+"</span>");
                }
                that.close();
                setTimeout(function(){//Avoid stack overflow
                    that.renderMath();
                    that.markUpdated();
                }, 500);
            }, false);

            inputs.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    that.createField('', true);
                }
            });
            
    },

    createField(content, deleteBtn){
        var inputs = document.getElementById(this.COMPONENTNAME+'inputblock');
        var el = document.createElement('math-field');
        el.classList.add('d-inline-block');
        el.style.minWidth = '300px'
        el.setAttribute('virtual-keyboard-mode', 'onfocus');
        el.innerText = content;
        inputs.append(el);
        el.focus();

        if (deleteBtn){
            var del = document.createElement('a');
            del.innerHTML = "<i class='fa fa-times'></i>";
            del.href = '#';
            del.style.color = '#ff0000';
            del.addEventListener('click', () => {
                el.remove();
                del.remove();
            })
            inputs.append(del);
        }

        var br = document.createElement('br');
        inputs.append(br);
    },

    submitAtto(){
        this.unrenderMath();
        this.markUpdated();
    },

    formatForMathJaxFilter(latex){
        latex = latex.replace(' ', '\\ ');
        return "\\("+latex+"\\)";
    },

    doubleClickHandler(event) {
        var isformula = this.getParentFromClass(event.target, this.COMPONENTNAME+'block');
        if (isformula) {
            this.selectedNode = isformula;
            event.stopPropagation();
            this.open();
        }
    },

    getParentFromClass(el, cl){
        if (!el) return false;
        if (el.classList.contains(cl)){
            return el;
        }
        while (el = el.parentElement){
            if (el.classList.contains(cl)){
                return el;
            }
        }
        return false;
    },
    
    tex2img(formula, callback, args) {
        MathJax.Hub.Queue(function () {
            var wrapper = MathJax.HTML.Element("span", {}, formula);
            MathJax.Hub.Typeset(wrapper, function () {
                var svg = wrapper.getElementsByTagName("svg")[0];
                if (!svg){
                    callback(wrapper.innerHTML, args);
                    return;
                }
                svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                var image = new Image();
                image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg.outerHTML)));
                image.onload = function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    var context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0);
                    var img = '<img src="' + canvas.toDataURL('image/png') + '"/>';
                    callback(img, args);
                };
            });
        })
    },

    renderMath(){
        var target = this.get('host').editor.getDOMNode();
        //MathLive.renderMathInElement(target);
        var els = target.querySelectorAll('.'+this.COMPONENTNAME);
        for (var el of els){
            var latexorg = el.getAttribute('data-latex');
            var latex = this.formatForMathJaxFilter(latexorg);
            
            this.tex2img(latex, (img, el) => {
                el.innerHTML = img;
                el.onclick = this.doubleClickHandler.bind(this);
                el.setAttribute('contenteditable', 'false');
            }, el); 
        }
    },

    unrenderMath(){
        var target = this.get('host').editor.getDOMNode();
        var els = target.querySelectorAll('.'+this.COMPONENTNAME);
        for (var el of els){
            var latex = el.getAttribute('data-latex');
            el.innerHTML = this.formatForMathJaxFilter(latex);
        }
    },

    close: function(){
        this.getDialogue({
            focusAfterHide: null
        }).hide();
        this.selectedNode = null;
    },
    
});