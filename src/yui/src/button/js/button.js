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
    /**
     * Add the buttons to the toolbar
     *
     * @method initializer
     */
    initializer: function() {
        this.addButton({
            icon: 'atto-icon',
            iconComponent: 'atto_recitmathlive',
            callback: this.openModal,
             // Watch the following tags and add/remove highlighting as appropriate:
             tags: 'math, mtable, mtr, mtd, mrow mn'
        });

        this.editor._node.addEventListener("click", this.onAttoClick.bind(this), false);
        this.editor._node.addEventListener("keydown", this.onAttoKeyDown.bind(this));
    },

    myAttr: {
        popup: null,
        selectedNode: null
    },

    addRecitMathLiveReactJs(){
        let id = "recitmathlivereactjs";

        if(document.getElementById(id)){
            this.onLoadUI();
            return;
        }

        var url = M.cfg.wwwroot;
        var js = url +"/lib/editor/atto/plugins/recitmathlive/react/build/index.js";
        var css = url +"/lib/editor/atto/plugins/recitmathlive/react/build/index.css";

        var script = document.createElement('script');
        script.onload = this.onLoadUI.bind(this);
        script.setAttribute('src', js);
        script.setAttribute('id', id);
        script.setAttribute('type', 'text/javascript');
        document.getElementsByTagName('head')[0].appendChild(script);

        script = document.createElement('link');
        script.setAttribute('href', css);
        script.setAttribute('rel', 'stylesheet');
        document.getElementsByTagName('head')[0].appendChild(script);
    },

    getMathMlElement(dom){
        let result = null;
        
        let el = dom; 
        do{
            if(el && el.tagName && el.tagName.toLocaleLowerCase() === "math"){
                result = el;
            }

            el = el.parentNode;
        }
        while(el instanceof MathMLElement);

        return result;
    },

    onAttoKeyDown: function(e){
        let selectionObj = window.getSelection();

        if(selectionObj.type === 'Caret'){
            let mathNode = this.getMathMlElement(selectionObj.anchorNode);
            if(mathNode){
                e.preventDefault();

                this.myAttr.selectedNode = mathNode;
                this.openModal();
                
                return false;
            }
        }
    },

    onAttoClick: function(e){
        e.stopPropagation();
        
        let result = null;
        
        if(e.target){
            result = this.getMathMlElement(e.target);
        }

        this.myAttr.selectedNode = result;

        if(this.myAttr.selectedNode){
            this.openModal();
        }
    },

    openModal: function(e) {
        if(e){
            e.preventDefault();
        }
        
        var content = document.createElement('div');
        content.setAttribute('id', 'recitmathlive_container');
        this.createPopup(content);
        this.addRecitMathLiveReactJs();
    },
    
    createPopup: function(content) {        
        let modal = document.createElement('div');
        modal.classList.add('modal', 'fade');
        modal.setAttribute('style', 'overflow-y: hidden;');
        let inner2 = document.createElement('div');
        inner2.classList.add('modal-dialog', 'modal-xl');
        modal.appendChild(inner2);
        let inner = document.createElement('div');
        inner.classList.add('modal-content');
        inner2.appendChild(inner);

        let header = document.createElement('div');
        header.classList.add('modal-header');
        header.innerHTML = "<h2>"+M.util.get_string('pluginname', 'atto_recitmathlive')+"</h2>";
        inner.appendChild(header);
        
        let btn = document.createElement('button');
        btn.classList.add('close');
        btn.innerHTML = '<span aria-hidden="true">&times;</span>';
        btn.setAttribute('data-dismiss', 'modal');
        btn.onclick = this.destroy.bind(this);
        header.appendChild(btn);
        
        let body = document.createElement('div');
        body.classList.add('modal-body');
        inner.appendChild(body);
        body.appendChild(content);
        
        document.body.appendChild(modal);

        this.myAttr.popup = modal;
        this.myAttr.popup.classList.add('show');

        this.myAttr.backdrop = document.createElement('div');
        this.myAttr.backdrop.classList.add('modal-backdrop', 'fade', 'show');
        this.myAttr.backdrop.setAttribute('data-backdrop', 'static');
        document.body.appendChild(this.myAttr.backdrop);
    },

    destroy: function(){
        this.myAttr.popup.classList.remove('show');
        this.myAttr.backdrop.classList.remove('show');
        this.myAttr.popup.remove();
        this.myAttr.backdrop.remove();

        this.myAttr.selectedNode = null;
    },
    
    update: function(){
      //  $(this.myAttr.popup).modal('handleUpdate');
    },

    onLoadUI: function(){
        if (!window.openrecitmathliveui){
            throw new Error("Interface openrecitmathliveui not defined.");
        }

        var attoInterface = {
            onClose: this.onClose.bind(this),
            onApply: this.onApply.bind(this),
            getContent: () => {return (this.myAttr.selectedNode ? this.myAttr.selectedNode.outerHTML : ""); }
        }

        window.openrecitmathliveui(attoInterface);
        this.update();
    },
    
    onApply: function(content){        
        let host = this.get('host');
        
        host.focus();

        if(this.myAttr.selectedNode){
            this.myAttr.selectedNode.remove();
        }
        
        if(content.length > 0){
            /*if(this.editor.getHTML().length === 0){
                content = `<p>&nbsp;</p>${content}<p>&nbsp;</p>`
            }*/
            
            host.insertContentAtFocusPoint(content);
        }

        this.onClose();
    },

    onClose: function(){
        this.destroy();
    }  
});
