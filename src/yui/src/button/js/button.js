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
        virtualKeyboard: {
          customVirtualKeyboardLayers: {
            Tab: {
              styles: "",
              rows: [
                [{class: "", latex: "\\ce{H}", },
                  {class: "separator w10"},
                  {class: "separator w10"},
                  {class: "separator w10"},
                  {class: "separator w10"},
                  {class: "separator w10"},
                  {class: "separator w10"},
                  {class: "separator w10"},
                  {latex: "\\ce{He}"},
    
                ],
                [{latex: "\\ce{Li}"},
                  {latex: "\\ce{Be}"},
                  {class: "separator w10"},
                  {latex: "\\ce{B}"},
                  {latex: "\\ce{C}"},
                  {latex: "\\ce{N}"},
                  {latex: "\\ce{O}"},
                  {latex: "\\ce{F}"},
                  {latex: "\\ce{Ne}"},
    
                ],
                [{latex: "\\ce{Na}"},
                  {latex: "\\ce{Mg}"},
                  {class: "separator w10"},
                  {latex: "\\ce{Al}"},
                  {latex: "\\ce{Si}"},
                  {latex: "\\ce{P}"},
                  {latex: "\\ce{S}"},
                  {latex: "\\ce{Cl}"},
                  {latex: "\\ce{Ar}"},
    
                ],
                [{latex: "\\ce{K}"},
                  {latex: "\\ce{Ca}"},
                  {class: "separator w10"},
                  {latex: "\\ce{Ga}"},
                  {latex: "\\ce{Ge}"},
                  {latex: "\\ce{As}"},
                  {latex: "\\ce{Se}"},
                  {latex: "\\ce{Cl}"},
                  {latex: "\\ce{Kr"},
    
                ],
              ]
            },
            chimie: {
              rows: [
                [
                {class:"tex", latex: "x", aside:"Variables usuelles",
                variants: [ 
                {class:"tex", latex: "C", aside:"concentration"}, 
                {class:"tex", latex: "m", aside:"masse"}, 
                {class:"tex", latex: "M", aside:"masse molaire"}, 
                {class:"tex", latex: "n", aside:"nombre de particules"},
                {class:"tex", latex: "V", aside:"volume"},
                
                {class:"tex", latex: "T", aside:"température"},
                {class:"tex", latex: "\\Delta{T}", aside:"variation de tempéature..."},
                {class:"tex", latex: "t", aside:"temps"},
                {class:"tex", latex: "\\Delta{t}", aside:"variation de temps..."}, 
                {class:"tex", latex: "\\vec{s}", aside:"position"},
                {class:"tex", latex: "\\overrightarrow{\\Delta{s}}", aside:"variation de position..."},
                {class:"tex", latex: "\\vec{v}", aside:"vitesse"},
                {class:"tex", latex: "\\overrightarrow{\\Delta{v}}", aside:"variation de vitesse..."},   
                {class:"tex", latex: "\\vec{a}", aside:"accélération"},
                {class:"tex", latex: "\\overrightarrow{\\Delta{a}}", aside:"variation d'accélération'..."},
                {class:"tex", latex: "\\theta_i", aside:"angle d'indidence"},
                {class:"tex", latex: "\\theta_r", aside:"angle de réfl/réfra"},
                ]},
               
                
                  {latex:'\\ce{ H2O}', insert:'\\\(\\ce{H2O}\\\)' },              
                ],
                [ {class:"tex", latex: "m/s^2", aside:"Unités",
                variants: [ 
                {class:"tex", latex: "^\\circ{C}", aside:"degrés Celcius"}, 
                {class:"tex", latex: "m", aside:"mètres"}, 
                {class:"tex", latex: "m/s", aside:"mètres par seconde "}, 
                {class:"tex", latex: "m/s^2", aside:"mètres par seconde carrée"}, 
                {class:"tex", latex: "s", aside:"secondes"},
                {class:"tex", latex: "N", aside:"Newton"},
                {class:"tex", latex: "W", aside:"Watt"},
                {class:"tex", latex: "J", aside:"Joules"},
                {class:"tex", latex: "g", aside:"grammes"},
                {class:"tex", latex: "l", aside:"litres"},
                {class:"tex", latex: "K", aside:"Kelvin"},
                {class:"tex", latex: "mol", aside:"mol"}, 
                {class:"tex", latex: "mol/l", aside:"mol/l"}, 
                {class:"tex", latex: "M", aside:"(molaire) mol par litre"},
                {class:"tex", latex: "A", aside:"Ampères"},
                {class:"tex", latex: "V", aside:"Volt"},
                {class:"tex", latex: "\\Omega", aside:"ohms"},
               
                ]},
                
                  
                  
                ],
                [
                {
                  latex: '\\sqrt{#@}'
                },
                {latex: '\\pm'},
                {latex: '\\overarc{#@}'},
                {latex: '\\sim'},
                {class: 'w15', latex: '#@_{#?}'},
              ],
              [ {class: 'separator w20'},
                {class: 'separator w20'},
                {class: 'separator w20'},
                {class: 'separator w15'},
                {class: 'action', label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                    command: ['performWithFeedback', 'moveToPreviousChar'],
                  },
                {class: 'action', label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                    command: ['performWithFeedback', 'moveToNextChar'],
                  },
                ],
              ],
            },
    
            Math: {
              styles: "",
              rows: [
             [ 
              {aside:'et autres...', latex: "\\\(\\left(#@\\right)\\\)",  insert: "\\\(\\left(#@\\right)\\\)",
                variants: [
                '\\lbrace', 
                  '\\rbrace', 
                  '\\lparen', 
                  '\\rparen', 
                  '\\langle', 
                  '\\rangle', 
                  '\\vert',
                    ],
                },
                {aside:'et autres...',class: "small", latex: "\\frac{#0}{#0}", insert: "$$\\frac{#0}{#0}$$",
                variants:[
                { latex: "\\nicefrac{#0}{#0} ", insert: "$$\\nicefrac{#0}{#0}$$"}]},
                {latex: "\\vec{#@}"},
                {aside:'autres constantes...',latex: "\\pi",
                variants: [
                {aside:'Pi',latex:'\\pi'} ,
                {aside:'Plank',latex:'\\hbar'} ,
                {aside:'Vitesse lumière',latex:'c'},
                {aside:'Gravitation universelle ',latex:'G'} ,
                {aside:'Constante des gaz parfait',latex:'k'} ,
    
              ]
              },
                { class: "separator w5"},
                { label: '7', key: '7'},
                { label: '8', key: '8'},
                { label: '9', key: '9'},
                {latex: "\\div"},
                
              ],
              [
                {aside:'et autres...', class: 'small', latex: '\\sin\\left( #@ \\right)',
                variants: [ 
                  {class: 'small', latex: '\\sin^{-1}\\left( #@ \\right)'}, {class: 'small', latex: '\\arcsin\(#0\)'}           
                ]},
                {aside:'et autres...', class: "small", latex: "\\sqrt{#@}", insert: "\\(\\sqrt{#@}\\\)",
                variants:[
                {class: "small", latex: "\\sqrt[{#?}]{{#?}}", insert: "\\\(\\sqrt[{#?}]{{#?}}\\\)",}
              ]},
                {aside:'et autres...', class: "small", latex: "\\leftrightarrow", insert: "$$\\leftrightarrow$$",
                    variants: [
                    {latex: "\\longleftrightarrow", insert: "$$\\longleftrightarrow$$"},
                    {latex: "\\Leftrightarrow", insert: "$$\\Leftrightarrow$$"},
                    {latex: "\\Longleftrightarrow", insert: "$$\\Longleftrightarrow$$"},
                    {latex: "\\rightarrow", insert: "$$\\rightarrow$$"},
                    {latex: "\\longrightarrow", insert: "$$\\longrightarrow$$"},
                    {latex: "\\rightarrow", insert: "$$\\rightarrow$$"},
                    {latex: "\\Longrightarrow", insert: "$$\\Longrightarrow$$"},
                    {class: "small", latex: "\\rightleftharpoons", insert: "$$\\rightleftharpoons$$"},
                    {latex: "\\rightleftharpoons", insert: "$$\\rightleftharpoons$$"},
                    {latex: "\\Leftrightharpoons", insert: "$$\\Leftrightharpoons$$"},
                    {latex: "\\Longleftrightharpoons", insert: "$$\\Longleftrightharpoons$$"},
                    {class: "small", latex: "\\leftarrow", insert: "$$\\leftarrow$$"},
                    {latex: "\\longleftarrow", insert: "$$\\longleftarrow$$"},
                    {latex: "\\Leftarrow", insert: "$$\\Leftarrow$$"},
                    {latex: "\\Longleftarrow", insert: "$$\\Longleftarrow$$"},
                                     ]},
                {class:"tex", latex: "x", aside:"Variables usuelles",
                variants: [ 
                {class:"tex", latex: "C", aside:"concentration"}, 
                {class:"tex", latex: "m", aside:"masse"}, 
                {class:"tex", latex: "M", aside:"masse molaire"}, 
                {class:"tex", latex: "n", aside:"nombre de particules"},
                {class:"tex", latex: "V", aside:"volume"},
                
                {class:"tex", latex: "T", aside:"température"},
                {class:"tex", latex: "\\Delta{T}", aside:"variation de tempéature..."},
                {class:"tex", latex: "t", aside:"temps"},
                {class:"tex", latex: "\\Delta{t}", aside:"variation de temps..."}, 
                {class:"tex", latex: "\\vec{s}", aside:"position"},
                {class:"tex", latex: "\\overrightarrow{\\Delta{s}}", aside:"variation de position..."},
                {class:"tex", latex: "\\vec{v}", aside:"vitesse"},
                {class:"tex", latex: "\\overrightarrow{\\Delta{v}}", aside:"variation de vitesse..."},   
                {class:"tex", latex: "\\vec{a}", aside:"accélération"},
                {class:"tex", latex: "\\overrightarrow{\\Delta{a}}", aside:"variation d'accélération'..."},
                {class:"tex", latex: "\\theta_i", aside:"angle d'indidence"},
                {class:"tex", latex: "\\theta_r", aside:"angle de réfl/réfra"},
                ]},
    
                {class: "separator w5"},
                {label: "4",  key: "4"},
                {label: "5", key: "5"},
                {label: "6", key: "6"},
                {latex: "\\times",
                variants: [
                          '\\cdot',
                          '\\ast',
                          '\\star',
                          '\\bigstar',
                          '\\ltimes',
                          '\\rtimes',
                          '\\rightthreetimes',
                          '\\leftthreetimes',
                          '\\interc',
                          
                          '\\prod',
                          { latex: '\\prod_{n\\mathop=0}^{\\infty}', class: 'small' },
                        ]
              },
               
                
                ],
                [{aside:'et autres...', class: 'small', latex: '\\cos\\left( #0 \\right)',
                variants: [
                {class: 'small', latex: '\\cos^{-1}\\left( #@ \\right)'},{class: 'small', latex: '\\arccos\(#0\)'}
            ]
            } ,
                  {aside:'et autres...',latex: "\\\({#@}_{#@}\\\)",
                  variants:[
                    {aside:'exposant',latex: "\\\({#@}^{#@}\\\)"}, 
                  ]
                },
                 
                  {latex: "^\\circ"},
                  {class:"tex", latex: "m/s^2", aside:"Unités",
                variants: [ 
                {class:"tex", latex: "^\\circ{C}", aside:"degrés Celcius"}, 
                {class:"tex", latex: "m", aside:"mètres"}, 
                {class:"tex", latex: "m/s", aside:"mètres par seconde "}, 
                {class:"tex", latex: "m/s^2", aside:"mètres par seconde carrée"}, 
                {class:"tex", latex: "s", aside:"secondes"},
                {class:"tex", latex: "N", aside:"Newton"},
                {class:"tex", latex: "W", aside:"Watt"},
                {class:"tex", latex: "J", aside:"Joules"},
                {class:"tex", latex: "g", aside:"grammes"},
                {class:"tex", latex: "l", aside:"litres"},
                {class:"tex", latex: "K", aside:"Kelvin"},
                {class:"tex", latex: "mol", aside:"mol"}, 
                {class:"tex", latex: "mol/l", aside:"mol/l"}, 
                {class:"tex", latex: "M", aside:"(molaire) mol par litre"},
                {class:"tex", latex: "A", aside:"Ampères"},
                {class:"tex", latex: "V", aside:"Volt"},
                {class:"tex", latex: "\\Omega", aside:"ohms"},
               
                ]},
                  {class: "separator w5"},
                  {label: "1", key: "1"},
                  {label: "2", key: "2"},
                  {label: "3", key: "3"},
                  {latex: "-",
                    variants:['\\pm', '\\mp', '\\ominus', '\\vert #0  \\vert']},
                   
                ],
                [  {aside:'et autres...', class: 'small', latex: '\\tan\\left( #0 \\right)',
                variants: [ 
                  {class: 'small', latex: '\\tan^{-1}\\left( #@ \\right)'}, {class: 'small', latex: '\\arctan\(#0\)'}           
                ]},
                    {class: "action", label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                    command: ["performWithFeedback", "moveToPreviousChar"]
                  },
                  {class: "action", label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                    command: ["performWithFeedback", "moveToNextChar"]
                  },
                  
                  
                   {class: "action font-glyph bottom right", label: "&#x232b;",
                    command: ["performWithFeedback", "deleteBackward"]
                  },
                  {class: "separator w5"},
                  {label: "0",  key: "0"},
                  {latex: "."},
                  { latex: '=' ,
                  variants:
              [ { latex: '\\neq' }, { latex: '\\approx' },{latex: '\\cong'}]},
                  {latex: "+",
                variants:
              [
        '\\pm',
        '\\mp',
        '\\sum',
        { latex: '\\sum_{n\\mathop=0}^{\\infty}', class: 'small' },
        '\\dotplus',
        '\\oplus',
      ]},
                  
                 
                ]
              ]
            },
          },
          customVirtualKeyboards: {
            Tab: {
              label: "Tableau periodique",
              tooltip: "Tableau périodique des principaux éléments",
              layer: "Tab"
            },
            chimie: {
              label: "Science usuelle",
              tooltip: "Notations symboliques usuelles en science et technologie",
              layer: "chimie"
            },
            "highschoolkeyboard": {
              label: "Symboles usuelles",
              tooltip: "Notations symboliques usuelles",
              layer: "Math"
            }
          },
          virtualKeyboards: "highschoolkeyboard Tab greek symbols functions "
        },
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
                
                var src = M.cfg.wwwroot +'/lib/editor/atto/plugins/recitmathlive/js/';
                var that = this;
                if (!document.getElementById('recitmathcanvas')){
                    var script = document.createElement('script');
                    script.setAttribute('src', src+'html2canvas.min.js');
                    script.setAttribute('id', 'recitmathcanvas');
                    script.setAttribute('type', 'text/javascript');
                    document.getElementsByTagName('head')[0].appendChild(script);
                }


                requirejs([src+'mathlive.min.js'], function(app) {
                    window.MathLive = app;
                    // Adding submit event.
                    var form = that.get('host').textarea.ancestor('form');

                    if (form) {
                        form.on('submit', that.submitAtto, that);
                    }
                    setTimeout(that.renderMath.bind(that), 500)
                });

                if(M.filter_mathjaxloader && window.MathJax){
                    M.filter_mathjaxloader.typeset(); 
                }else{
                    if (!document.getElementById('recitmathjax')){
                        window.MathJax = {
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
                        var script = document.createElement('script');
                        script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/latest.js');
                        script.setAttribute('id', 'recitmathjax');
                        script.setAttribute('type', 'text/javascript');
                        document.getElementsByTagName('head')[0].appendChild(script);
                    }
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

            this.plus = document.createElement('a');
            this.plus.innerHTML = "<i class='fa fa-plus'></i><br>";
            this.plus.href = '#';
            this.plus.style.color = '#000';
            this.plus.addEventListener('click', () => {
                this.createField('', true);
            })
            inputs.append(this.plus);
            
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
                    if (latexorg.trim().length > 0){
                        var latex = that.formatForMathJaxFilter(latexorg);
                        html = html + "<span class='"+that.COMPONENTNAME+"block'><span class='"+that.COMPONENTNAME+"' data-latex='"+latexorg+"'>"+latex+"</span><br></span>";
                    }
                }
                host.focus();
                host.restoreSelection();
                if (that.selectedNode){
                    that.selectedNode.innerHTML = html;
                }else{
                    //host.insertContentAtFocusPoint("<span class='"+that.COMPONENTNAME+"block'>"+html+"</span>");
                    host.insertContentAtFocusPoint(html);
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

    createField(content, deleteBtn, before){
        var div = document.createElement('div');
        if (deleteBtn){
            var del = document.createElement('a');
            del.innerHTML = "<i class='fa fa-plus'></i><br>";
            del.href = '#';
            del.style.color = '#000';
            del.addEventListener('click', () => {
                this.createField('', true, div);
            })
            div.append(del);
        }

        var inputs = document.getElementById(this.COMPONENTNAME+'inputblock');
        const mf = new MathfieldElement();
        mf.classList.add("d-inline-block")
        mf.setAttribute("style", "min-width:300px;");
        mf.value = content;
        mf.setOptions({
            virtualKeyboardMode: "onfocus",
            ...this.virtualKeyboard
        });
        div.append(mf);

        if (deleteBtn){
            var del = document.createElement('a');
            del.innerHTML = "<i class='fa fa-times'></i>";
            del.href = '#';
            del.style.color = '#ff0000';
            del.addEventListener('click', () => {
                mf.remove();
                del.remove();
            })
            div.append(del);
        }

        if (before){
            before.before(div);
        }else{
            this.plus.before(div);
        }
        mf.focus();
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
    },

    renderMath(){
        var target = this.get('host').editor.getDOMNode();
        //MathLive.renderMathInElement(target);
        var els = target.querySelectorAll('.'+this.COMPONENTNAME);
        this.renderBlock(els, 0);
    },

	renderBlock(list, index){
		if (!list[index]) return;
		
		var el = list[index];
		var latexorg = el.getAttribute('data-latex');
		el.onclick = this.doubleClickHandler.bind(this);
		var latex = this.formatForMathJaxFilter(latexorg);
		
		this.tex2img(latex, (img, el) => {
			el.innerHTML = img;
			el.setAttribute('contenteditable', 'false');
			this.renderBlock(list, index+1);
		}, el); 
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