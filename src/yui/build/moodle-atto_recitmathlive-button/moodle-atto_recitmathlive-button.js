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
    /**
     * Add the buttons to the toolbar
     *
     * @method initializer
     */
    initializer: function() {
        this.addButton({
            title: 'pluginname',
            icon: 'math',
            iconComponent: 'atto_recitmathlive',
            callback: this.openModal,
            buttonName: 'recitmathlive'
        });

        this.editor._node.addEventListener("click", this.onAttoClick.bind(this), false);
    },

    myAttr: {
        popup: null,
        selectedNode: null
    },

    onAttoClick: function(e){
        e.stopPropagation();
        
        let result = null;
        
        if(e.target){
            let el = e.target; 
            
            while(el instanceof MathMLElement){
                if(el.tagName.toLocaleLowerCase() === "math"){
                    result = el;
                }

                el = el.parentNode;
            }
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
        
        var url = M.cfg.wwwroot;
        var js = url +"/lib/editor/atto/plugins/recitmathlive/react/build/index.js";
        //var css = url +"/lib/editor/atto/plugins/recitmathlive/build/index.css";
        
        var content = document.createElement('div');
        content.setAttribute('id', 'recitmathlive_container');
        this.createPopup(content);

        var script = document.createElement('script');
        script.onload = this.onloadUi.bind(this);
        script.setAttribute('src', js);
        script.setAttribute('id', 'recitmathlive');
        script.setAttribute('type', 'text/javascript');
        document.getElementsByTagName('head')[0].appendChild(script);
        /*script = document.createElement('link');
        script.setAttribute('href', css);
        script.setAttribute('rel', 'stylesheet');
        document.getElementsByTagName('head')[0].appendChild(script);*/
    },
    
    createPopup: function(content) {        
        let modal = document.createElement('div');
        modal.classList.add('modal', 'fade', 'autolink_popup');
        modal.setAttribute('style', 'overflow-y: hidden;');
        let inner2 = document.createElement('div');
        inner2.classList.add('modal-dialog');
        modal.appendChild(inner2);
        let inner = document.createElement('div');
        inner.classList.add('modal-content');
        inner.setAttribute('style', 'width:600px;padding:10px');
        inner2.appendChild(inner);

        let header = document.createElement('div');
        header.classList.add('modal-header');
        header.innerHTML = "<h2>"+M.util.get_string('pluginname', 'atto_recitmathlive')+"</h2>";
        inner.appendChild(header);
        let btn = document.createElement('button');
        btn.classList.add('close');
        btn.innerHTML = '<span aria-hidden="true">&times;</span>';
        btn.setAttribute('data-dismiss', 'modal');
        header.appendChild(btn);
        
        let body = document.createElement('div');
        body.classList.add('modal-body');
        inner.appendChild(body);
        body.appendChild(content);
        
        document.body.appendChild(modal);
        this.myAttr.popup = modal;
        $(modal).modal({show: true, backdrop: true});
        let that = this;
        $(".modal-backdrop").click(() => $(this.myAttr.popup).modal('hide'));
        $(modal).on('hidden.bs.modal', function (e) {
            that.destroy();
        });
    },

    destroy: function(){
        $(this.myAttr.popup).modal('hide')
        this.myAttr.popup.remove();
        this.myAttr.selectedNode = null;
    },
    
    update: function(){
        $(this.myAttr.popup).modal('handleUpdate');
    },

    onloadUi: function(){
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
        if(content.length === 0){
            this.onClose();
            return;
        }
        
        let host = this.get('host');
        
//        console.log(host, this, this.editor.getHTML());
        host.focus();
        if(this.myAttr.selectedNode){
            this.myAttr.selectedNode.remove();
        }
        
        host.insertContentAtFocusPoint(content)

       // host.restoreSelection();
       // console.log(formula, this.editor, host);

        /*formula = "2^2";
        formula = this.tex2MathJax(formula);
        this.tex2img(formula, function(output) {
            console.log(output);
            host.insertContentAtFocusPoint(output);
        });*/

        this.onClose();
    },

    onClose: function(){
        this.destroy();
    },

   /* tex2MathJax(latex){
        latex = latex.replace(' ', '\\ ');
        return "\\("+latex+"\\)";
    },*/

    /*tex2img(formula, callback) {
        MathJax.Hub.Queue(() => {
            let wrapper = MathJax.HTML.Element("span", {}, formula);
           
            MathJax.Hub.Typeset(wrapper, () => {
                var svg = wrapper.getElementsByTagName("svg")[0];
                if (!svg){
					var div = document.createElement('div');
					div.style.width = 'fit-content';
					div.innerHTML = wrapper.innerHTML;
					document.body.appendChild(div)
					html2canvas(div).then(canvas => {
						var img = '<img src="' + canvas.toDataURL('image/png') + '"/>';
						callback(img, args);
						div.remove();
					});
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

    }*/
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
