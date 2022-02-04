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
                    that.math = app;
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
            if (node && node.classList.contains(this.COMPONENTNAME)){
                this.selectedNode = node;
                content = node.innerHTML.replace('\\ ', ' ').replace('\\(', '').replace('\\)', '');
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

            
            closebutton.addEventListener('click', function(ev) {
                ev.preventDefault();
                that.close();
            });

            submitbutton.addEventListener('click', function(ev) {
                ev.preventDefault();
                var latex = input.getValue('latex');
                latex = latex.replace(' ', '\\ ');
                latex = "\\("+latex+"\\)";
                var host = that.get('host');
                host.focus();
                host.restoreSelection();
                if (that.selectedNode){
                    that.selectedNode.innerHTML = latex;
                }else{
                    host.insertContentAtFocusPoint("<span class='"+that.COMPONENTNAME+"'>"+latex+"</span>");
                }
                that.markUpdated();
                that.close();
            }, false);

    },

    close: function(){
        this.getDialogue({
            focusAfterHide: null
        }).hide();
        this.selectedNode = null;
    },
    
});