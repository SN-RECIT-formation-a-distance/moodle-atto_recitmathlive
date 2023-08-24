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
 * @package    atto_recitmathlive
 * @copyright  2023 RECIT
 * @license    {@link http://www.gnu.org/licenses/gpl-3.0.html} GNU GPL v3 or later
 */
import React, { Component  } from 'react';
import "../libs/mathlive/mathlive";
import { Button, ButtonGroup} from 'react-bootstrap';
import {faPencilAlt, faPlus, faSpinner, faTrashAlt  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Mathml2latex from'mathml-to-latex';

export class MainView extends Component {
    static virtualKeyboard = {
        customVirtualKeyboardLayers: {
            Tab: {
                styles: "",
                rows: [
                    [{ class: "", latex: "\\ce{H}", },
                    { class: "separator w10" },
                    { class: "separator w10" },
                    { class: "separator w10" },
                    { class: "separator w10" },
                    { class: "separator w10" },
                    { class: "separator w10" },
                    { class: "separator w10" },
                    { latex: "\\ce{He}" },

                    ],
                    [{ latex: "\\ce{Li}" },
                    { latex: "\\ce{Be}" },
                    { class: "separator w10" },
                    { latex: "\\ce{B}" },
                    { latex: "\\ce{C}" },
                    { latex: "\\ce{N}" },
                    { latex: "\\ce{O}" },
                    { latex: "\\ce{F}" },
                    { latex: "\\ce{Ne}" },

                    ],
                    [{ latex: "\\ce{Na}" },
                    { latex: "\\ce{Mg}" },
                    { class: "separator w10" },
                    { latex: "\\ce{Al}" },
                    { latex: "\\ce{Si}" },
                    { latex: "\\ce{P}" },
                    { latex: "\\ce{S}" },
                    { latex: "\\ce{Cl}" },
                    { latex: "\\ce{Ar}" },

                    ],
                    [{ latex: "\\ce{K}" },
                    { latex: "\\ce{Ca}" },
                    { class: "separator w10" },
                    { latex: "\\ce{Ga}" },
                    { latex: "\\ce{Ge}" },
                    { latex: "\\ce{As}" },
                    { latex: "\\ce{Se}" },
                    { latex: "\\ce{Cl}" },
                    { latex: "\\ce{Kr" },

                    ],
                ]
            },
            chimie: {
                rows: [
                    [
                        {
                            class: "tex", latex: "x", aside: "Variables usuelles",
                            variants: [
                                { class: "tex", latex: "C", aside: "concentration" },
                                { class: "tex", latex: "m", aside: "masse" },
                                { class: "tex", latex: "M", aside: "masse molaire" },
                                { class: "tex", latex: "n", aside: "nombre de particules" },
                                { class: "tex", latex: "V", aside: "volume" },

                                { class: "tex", latex: "T", aside: "température" },
                                { class: "tex", latex: "\\Delta{T}", aside: "variation de tempéature..." },
                                { class: "tex", latex: "t", aside: "temps" },
                                { class: "tex", latex: "\\Delta{t}", aside: "variation de temps..." },
                                { class: "tex", latex: "\\vec{s}", aside: "position" },
                                { class: "tex", latex: "\\overrightarrow{\\Delta{s}}", aside: "variation de position..." },
                                { class: "tex", latex: "\\vec{v}", aside: "vitesse" },
                                { class: "tex", latex: "\\overrightarrow{\\Delta{v}}", aside: "variation de vitesse..." },
                                { class: "tex", latex: "\\vec{a}", aside: "accélération" },
                                { class: "tex", latex: "\\overrightarrow{\\Delta{a}}", aside: "variation d'accélération'..." },
                                { class: "tex", latex: "\\theta_i", aside: "angle d'indidence" },
                                { class: "tex", latex: "\\theta_r", aside: "angle de réfl/réfra" },
                            ]
                        },


                        { latex: '\\ce{ H2O}', insert: '\\\(\\ce{H2O}\\\)' },
                    ],
                    [{
                        class: "tex", latex: "m/s^2", aside: "Unités",
                        variants: [
                            { class: "tex", latex: "^\\circ{C}", aside: "degrés Celcius" },
                            { class: "tex", latex: "m", aside: "mètres" },
                            { class: "tex", latex: "m/s", aside: "mètres par seconde " },
                            { class: "tex", latex: "m/s^2", aside: "mètres par seconde carrée" },
                            { class: "tex", latex: "s", aside: "secondes" },
                            { class: "tex", latex: "N", aside: "Newton" },
                            { class: "tex", latex: "W", aside: "Watt" },
                            { class: "tex", latex: "J", aside: "Joules" },
                            { class: "tex", latex: "g", aside: "grammes" },
                            { class: "tex", latex: "l", aside: "litres" },
                            { class: "tex", latex: "K", aside: "Kelvin" },
                            { class: "tex", latex: "mol", aside: "mol" },
                            { class: "tex", latex: "mol/l", aside: "mol/l" },
                            { class: "tex", latex: "M", aside: "(molaire) mol par litre" },
                            { class: "tex", latex: "A", aside: "Ampères" },
                            { class: "tex", latex: "V", aside: "Volt" },
                            { class: "tex", latex: "\\Omega", aside: "ohms" },

                        ]
                    },



                    ],
                    [
                        {
                            latex: '\\sqrt{#@}'
                        },
                        { latex: '\\pm' },
                        { latex: '\\overarc{#@}' },
                        { latex: '\\sim' },
                        { class: 'w15', latex: '#@_{#?}' },
                    ],
                    [{ class: 'separator w20' },
                    { class: 'separator w20' },
                    { class: 'separator w20' },
                    { class: 'separator w15' },
                    {
                        class: 'action', label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                        command: ['performWithFeedback', 'moveToPreviousChar'],
                    },
                    {
                        class: 'action', label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                        command: ['performWithFeedback', 'moveToNextChar'],
                    },
                    ],
                ],
            },
            Math: {
                styles: "",
                rows: [
                    [
                        {
                            aside: 'et autres...', latex: "\\\(\\left(#@\\right)\\\)", insert: "\\\(\\left(#@\\right)\\\)",
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
                        {
                            aside: 'et autres...', class: "small", latex: "\\frac{#0}{#0}", insert: "$$\\frac{#0}{#0}$$",
                            variants: [
                                { latex: "\\nicefrac{#0}{#0} ", insert: "$$\\nicefrac{#0}{#0}$$" }]
                        },
                        { latex: "\\vec{#@}" },
                        {
                            aside: 'autres constantes...', latex: "\\pi",
                            variants: [
                                { aside: 'Pi', latex: '\\pi' },
                                { aside: 'Plank', latex: '\\hbar' },
                                { aside: 'Vitesse lumière', latex: 'c' },
                                { aside: 'Gravitation universelle ', latex: 'G' },
                                { aside: 'Constante des gaz parfait', latex: 'k' },

                            ]
                        },
                        { class: "separator w5" },
                        { label: '7', key: '7' },
                        { label: '8', key: '8' },
                        { label: '9', key: '9' },
                        { latex: "\\div" },

                    ],
                    [
                        {
                            aside: 'et autres...', class: 'small', latex: '\\sin\\left( #@ \\right)',
                            variants: [
                                { class: 'small', latex: '\\sin^{-1}\\left( #@ \\right)' }, { class: 'small', latex: '\\arcsin\(#0\)' }
                            ]
                        },
                        {
                            aside: 'et autres...', class: "small", latex: "\\sqrt{#@}", insert: "\\(\\sqrt{#@}\\\)",
                            variants: [
                                { class: "small", latex: "\\sqrt[{#?}]{{#?}}", insert: "\\\(\\sqrt[{#?}]{{#?}}\\\)", }
                            ]
                        },
                        {
                            aside: 'et autres...', class: "small", latex: "\\leftrightarrow", insert: "$$\\leftrightarrow$$",
                            variants: [
                                { latex: "\\longleftrightarrow", insert: "$$\\longleftrightarrow$$" },
                                { latex: "\\Leftrightarrow", insert: "$$\\Leftrightarrow$$" },
                                { latex: "\\Longleftrightarrow", insert: "$$\\Longleftrightarrow$$" },
                                { latex: "\\rightarrow", insert: "$$\\rightarrow$$" },
                                { latex: "\\longrightarrow", insert: "$$\\longrightarrow$$" },
                                { latex: "\\rightarrow", insert: "$$\\rightarrow$$" },
                                { latex: "\\Longrightarrow", insert: "$$\\Longrightarrow$$" },
                                { class: "small", latex: "\\rightleftharpoons", insert: "$$\\rightleftharpoons$$" },
                                { latex: "\\rightleftharpoons", insert: "$$\\rightleftharpoons$$" },
                                { latex: "\\Leftrightharpoons", insert: "$$\\Leftrightharpoons$$" },
                                { latex: "\\Longleftrightharpoons", insert: "$$\\Longleftrightharpoons$$" },
                                { class: "small", latex: "\\leftarrow", insert: "$$\\leftarrow$$" },
                                { latex: "\\longleftarrow", insert: "$$\\longleftarrow$$" },
                                { latex: "\\Leftarrow", insert: "$$\\Leftarrow$$" },
                                { latex: "\\Longleftarrow", insert: "$$\\Longleftarrow$$" },
                            ]
                        },
                        {
                            class: "tex", latex: "x", aside: "Variables usuelles",
                            variants: [
                                { class: "tex", latex: "C", aside: "concentration" },
                                { class: "tex", latex: "m", aside: "masse" },
                                { class: "tex", latex: "M", aside: "masse molaire" },
                                { class: "tex", latex: "n", aside: "nombre de particules" },
                                { class: "tex", latex: "V", aside: "volume" },

                                { class: "tex", latex: "T", aside: "température" },
                                { class: "tex", latex: "\\Delta{T}", aside: "variation de tempéature..." },
                                { class: "tex", latex: "t", aside: "temps" },
                                { class: "tex", latex: "\\Delta{t}", aside: "variation de temps..." },
                                { class: "tex", latex: "\\vec{s}", aside: "position" },
                                { class: "tex", latex: "\\overrightarrow{\\Delta{s}}", aside: "variation de position..." },
                                { class: "tex", latex: "\\vec{v}", aside: "vitesse" },
                                { class: "tex", latex: "\\overrightarrow{\\Delta{v}}", aside: "variation de vitesse..." },
                                { class: "tex", latex: "\\vec{a}", aside: "accélération" },
                                { class: "tex", latex: "\\overrightarrow{\\Delta{a}}", aside: "variation d'accélération'..." },
                                { class: "tex", latex: "\\theta_i", aside: "angle d'indidence" },
                                { class: "tex", latex: "\\theta_r", aside: "angle de réfl/réfra" },
                            ]
                        },

                        { class: "separator w5" },
                        { label: "4", key: "4" },
                        { label: "5", key: "5" },
                        { label: "6", key: "6" },
                        {
                            latex: "\\times",
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
                    [{
                        aside: 'et autres...', class: 'small', latex: '\\cos\\left( #0 \\right)',
                        variants: [
                            { class: 'small', latex: '\\cos^{-1}\\left( #@ \\right)' }, { class: 'small', latex: '\\arccos\(#0\)' }
                        ]
                    },
                    {
                        aside: 'et autres...', latex: "\\\({#@}_{#@}\\\)",
                        variants: [
                            { aside: 'exposant', latex: "\\\({#@}^{#@}\\\)" },
                        ]
                    },

                    { latex: "^\\circ" },
                    {
                        class: "tex", latex: "m/s^2", aside: "Unités",
                        variants: [
                            { class: "tex", latex: "^\\circ{C}", aside: "degrés Celcius" },
                            { class: "tex", latex: "m", aside: "mètres" },
                            { class: "tex", latex: "m/s", aside: "mètres par seconde " },
                            { class: "tex", latex: "m/s^2", aside: "mètres par seconde carrée" },
                            { class: "tex", latex: "s", aside: "secondes" },
                            { class: "tex", latex: "N", aside: "Newton" },
                            { class: "tex", latex: "W", aside: "Watt" },
                            { class: "tex", latex: "J", aside: "Joules" },
                            { class: "tex", latex: "g", aside: "grammes" },
                            { class: "tex", latex: "l", aside: "litres" },
                            { class: "tex", latex: "K", aside: "Kelvin" },
                            { class: "tex", latex: "mol", aside: "mol" },
                            { class: "tex", latex: "mol/l", aside: "mol/l" },
                            { class: "tex", latex: "M", aside: "(molaire) mol par litre" },
                            { class: "tex", latex: "A", aside: "Ampères" },
                            { class: "tex", latex: "V", aside: "Volt" },
                            { class: "tex", latex: "\\Omega", aside: "ohms" },

                        ]
                    },
                    { class: "separator w5" },
                    { label: "1", key: "1" },
                    { label: "2", key: "2" },
                    { label: "3", key: "3" },
                    {
                        latex: "-",
                        variants: ['\\pm', '\\mp', '\\ominus', '\\vert #0  \\vert']
                    },

                    ],
                    [{
                        aside: 'et autres...', class: 'small', latex: '\\tan\\left( #0 \\right)',
                        variants: [
                            { class: 'small', latex: '\\tan^{-1}\\left( #@ \\right)' }, { class: 'small', latex: '\\arctan\(#0\)' }
                        ]
                    },
                    {
                        class: "action", label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                        command: ["performWithFeedback", "moveToPreviousChar"]
                    },
                    {
                        class: "action", label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                        command: ["performWithFeedback", "moveToNextChar"]
                    },


                    {
                        class: "action font-glyph bottom right", label: "&#x232b;",
                        command: ["performWithFeedback", "deleteBackward"]
                    },
                    { class: "separator w5" },
                    { label: "0", key: "0" },
                    { latex: "." },
                    {
                        latex: '=',
                        variants:
                            [{ latex: '\\neq' }, { latex: '\\approx' }, { latex: '\\cong' }]
                    },
                    {
                        latex: "+",
                        variants: [
                            '\\pm',
                            '\\mp',
                            '\\sum',
                            { latex: '\\sum_{n\\mathop=0}^{\\infty}', class: 'small' },
                            '\\dotplus',
                            '\\oplus',
                        ]
                    },


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
    };

    static defaultProps = {
        attoInterface: null
    };

    constructor(props) {
        super(props);

        this.onDataChange = this.onDataChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onApply = this.onApply.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onComponentReady = this.onComponentReady.bind(this);

        this.preLoadMathJax = this.preLoadMathJax.bind(this);
        this.loadMathJax = this.loadMathJax.bind(this);
        this.loadMathLive = this.loadMathLive.bind(this);

        this.state = {data: [{latex: "", mathml: ""}], iEditingItem: 0, mathLiveReady: false, mathJaxReady: false, componentReady: false};

        this.iFrameRef = React.createRef();
        this.mathliveRef = React.createRef();
        this.mathlivePlaceholder = React.createRef();
        this.myMathJax = null;
    }
 
    componentDidMount(){
        this.preLoadMathJax();
        this.loadMathLive();
    }
 
    onComponentReady(){
        if(this.state.mathJaxReady && this.state.mathLiveReady && !this.state.componentReady){
            this.setState({componentReady: true}, this.setInitialValue);
        }
    }

    loadMathLive(){
        if(this.mathliveRef.current && this.mathlivePlaceholder.current){
            //this.mathlivePlaceholder.current.mathVirtualKeyboardPolicy = "manual";
            window.mathVirtualKeyboard.container = this.mathlivePlaceholder.current;
            //window.mathVirtualKeyboard.show(); 
            this.mathliveRef.current.focus();
            this.setState({mathLiveReady: true}, this.onComponentReady);

            /*that.mathliveRef.current.addEventListener("focus", (evt) => {
                console.log("pum")
            });
            that.mathliveRef.current.addEventListener("focusout", (evt) => window.mathVirtualKeyboard.hide());
            console.log(that.mathliveRef.current.mathVirtualKeyboardPolicy, that.mathliveRef.current)*/
        } 
        else{
            console.log("Loading MathLive...")
            window.setTimeout(this.loadMathLive, 500);
        }
    }

    preLoadMathJax(){
        let iFrame = this.iFrameRef.current

        if(iFrame){
            let subWindow = iFrame.contentWindow || iFrame.contentDocument;
            let head = subWindow.document.head;
    
            let el = subWindow.document.createElement("script");
            el.setAttribute("type", "text/javascript");
            el.setAttribute("src", `${M.cfg.wwwroot}/lib/editor/atto/plugins/recitmathlive/react/build/mathjax.js`);
            head.appendChild(el);
            this.loadMathJax();
        }
        else{
            console.log("Preloading MathJax...")
            window.setTimeout(this.preLoadMathJax, 500);
        }
        
    }

    loadMathJax(){
        let iFrame = this.iFrameRef.current
        let subWindow = iFrame.contentWindow || iFrame.contentDocument;

        if(subWindow.MathJax){
            this.myMathJax = subWindow.MathJax;
            this.setState({mathJaxReady: true}, this.onComponentReady);
        }
        else{
            console.log("Loading MathJax...")
            window.setTimeout(this.loadMathJax, 1000);
        }  
    } 

    render() {      
        if(window.mathVirtualKeyboard){
            window.mathVirtualKeyboard.show();  
        }

        let main = 
            <div>
                <div style={{minWidth:320}}>
                    {this.state.data.map((item, index) =>
                        <div key={index} className='mb-3 d-flex'>
                            {this.state.iEditingItem === index ?
                                <math-field ref={this.mathliveRef} style={{width: "100%"}} onInput={(event) => this.onDataChange(event, index)}> 
                                    {item.latex}
                                </math-field>
                                :
                                <div className='w-100' style={{fontSize: '1rem'}} dangerouslySetInnerHTML={{__html: this.myMathJax.tex2mml(item.latex)}} />
                            }

                            <ButtonGroup className='ml-3'>
                                <Button size="sm" disabled={index === this.state.iEditingItem} onClick={() => this.onEdit(index)}><FontAwesomeIcon icon={faPencilAlt} title="Modifier"/></Button>
                                <Button size="sm" disabled={index === 0} onClick={() => this.onDelete(index)}><FontAwesomeIcon icon={faTrashAlt} title="Supprimer"/></Button>
                            </ButtonGroup>
                            
                        </div>
                    )}
                    <Button size="sm" onClick={this.onAdd}><FontAwesomeIcon icon={faPlus} title="Ajouter"/></Button>
                </div>

                <hr/>

                <div className='mb-5' ref={this.mathlivePlaceholder} style={{height: 230}}></div>

                <ButtonGroup className='float-right'>
                    <Button variant='secondary' onClick={this.onCancel}>Annuler</Button> 
                    <Button variant='success' onClick={this.onApply}>Appliquer</Button>
                </ButtonGroup>
                
                <iframe style={{display: "none"}} ref={this.iFrameRef}></iframe>

                {!this.state.componentReady &&
                    <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 9999, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <FontAwesomeIcon style={{width: 128, height: 128, position: 'relative', top: '30%', left: '38%'}} icon={faSpinner} spin />
                    </div>
                }   
            </div>;
 
        return (main);
    }

    setInitialValue(){
        let data = [];
        let content  = this.props.attoInterface.getContent();

        if(content.length !== 0){
            content = Mathml2latex.convert(content); 
            content = content.replace(/\\\\\s\\\\/g,'\\\\'); 
            content = content.split('\\\\'); 

            for(let item of content){
                data.push({latex: item})
            }

            this.mathliveRef.current.setValue(data[0].latex, {suppressChangeNotifications: true});

            this.setState({data:data});
        } 
    }

    onDataChange(event, index){
        let data = this.state.data;
        data[index].latex = event.target.value;
        this.setState({data: data});
    }

    onEdit(index){
        this.setState({iEditingItem: index}, () => { 
            this.mathliveRef.current.focus(); 
        });
    }

    onAdd(){
        let data = this.state.data;
        data.push({latex: ""});
        this.setState({data: data, iEditingItem: data.length - 1}, () => { 
            this.mathliveRef.current.focus(); 
        });
    }

    onDelete(index){
        if(window.confirm("Confirmez-vous la suppression?")){
            let data = this.state.data;
            data.splice(index, 1); 
            this.setState({data: data, iEditingItem: data.length - 1});
        }
    }

    onCancel(){
        this.props.attoInterface.onClose();
    }

    onApply(){ 
        let pList = [];
        /*for(let item of this.state.data){
            if (item.trim().length === 0){ continue; }
            
            let p = this.myMathJax.tex2mmlPromise(item);

            pList.push(p);
        }*/

        let newLine = '\\\\';
        let formula = "\\begin{equation}";
        formula += "\\begin{aligned}";

        let tmp = [];
        for(let item of this.state.data){
            tmp.push(item.latex);
        }

        formula += tmp.join(newLine+newLine);
        formula += "\\end{aligned}";
        formula += "\\end{equation}";

        let p = this.myMathJax.tex2mmlPromise(formula);
        pList.push(p);
 
        Promise.all(pList).then((values) => {
           // let result = "<p>&nbsp;</p>";
            let result = values.join("");
           // result += "<p>&nbsp;</p>";
            this.props.attoInterface.onApply(result);
        },
        (v) => {
            console.log(v);
            throw new Error(v);
        });

        
    }
}