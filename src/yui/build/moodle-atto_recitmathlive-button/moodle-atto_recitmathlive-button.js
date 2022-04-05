YUI.add('moodle-atto_recitmathlive-button', function (Y, NAME) {

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
            '<div style="margin-bottom:20px"><math-field id="{{component}}input" virtual-keyboard-mode="onfocus">{{content}}</math-field></div>'+
            '<button id="{{component}}close" class="btn btn-secondary">{{get_string "close" component}}</button>' +
            '<button class="btn btn-secondary" id="{{component}}submit"> {{get_string "save" component}}</button></div>',
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
                
            }
        },

        getSelectedNode: function() {
            var node = document.getSelection().anchorNode;
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
            var node = this.getSelectedNode();
            node = this.getParentFromClass(node, this.COMPONENTNAME);
            if (node && node.classList.contains(this.COMPONENTNAME)){
                this.selectedNode = node;
                content = node.getAttribute('data-latex');
            }
            var template = Y.Handlebars.compile(this.TEMPLATE);
            var content = Y.Node.create(template({
                    elementid: this.get('host').get('elementid'),
                    component: this.COMPONENTNAME,
                    content: content,
                    width: window.innerWidth * 0.8,
                    height: window.innerHeight * 0.8,
                }));
            this.dialogue.set('bodyContent', content).show();
            var input = document.getElementById(this.COMPONENTNAME+'input');
            var closebutton = document.getElementById(this.COMPONENTNAME+'close');
            var submitbutton = document.getElementById(this.COMPONENTNAME+'submit');
            var that = this;
            var host = that.get('host');

            
            closebutton.addEventListener('click', function(ev) {
                ev.preventDefault();
                that.close();
            });

            submitbutton.addEventListener('click', function(ev) {
                ev.preventDefault();
                var latexorg = input.getValue('latex');
                var latex = that.formatForMathJaxFilter(latexorg);
                host.focus();
                host.restoreSelection();
                if (that.selectedNode){
                    that.selectedNode.innerHTML = latex;
                    that.selectedNode.setAttribute('data-latex', latexorg);
                }else{
                    host.insertContentAtFocusPoint("<span class='"+that.COMPONENTNAME+"' data-latex='"+latexorg+"'>"+latex+"</span>");
                }
                that.close();
                setTimeout(function(){//Avoid stack overflow
                    that.renderMath();
                    that.markUpdated();
                }, 500);
            }, false);
            
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
        var isformula = this.getParentFromClass(event.target, this.COMPONENTNAME);
        if (isformula) {
            event.stopPropagation();
            this.open();
        }
    },

    getParentFromClass(el, cl){
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

    renderMath(){
        var target = this.get('host').editor.getDOMNode();
        var els = target.querySelectorAll('.'+this.COMPONENTNAME);
        for (var el of els){
            el.ondblclick = this.doubleClickHandler.bind(this);
            var latex = el.getAttribute('data-latex');
            el.innerHTML = "<math-field virtual-keyboard-mode=\"onfocus\" style='display:inline-block' default-mode='inline-math'>"+latex+"</math-field>";
        }
        MathLive.renderMathInElement(target);
        
        els = target.querySelectorAll('.'+this.COMPONENTNAME+' math-field');
        for (var el of els){
            el.addEventListener('focus', this.onFocus.bind(this));
            el.addEventListener('blur', this.onBlur.bind(this));
        }
    },

    onFocus(e){
        var host = this.get('host');
        if (e.isTrusted){
            this.selectedNode = e.target.parentElement;
            host.editor.getDOMNode().setAttribute('contenteditable', 'false');
            host.saveSelection();
        }
    },

    onBlur(e){ 
        var host = this.get('host');
        if (e.isTrusted && this.selectedNode){
            var latexorg = this.selectedNode.children[0].getValue('latex');
            host.editor.getDOMNode().setAttribute('contenteditable', 'true');
            host.focus();
            host.restoreSelection();
            if (this.selectedNode){
                this.selectedNode.setAttribute('data-latex', latexorg);
            }
            this.selectedNode = null;
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

}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
