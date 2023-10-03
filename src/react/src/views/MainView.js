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
import { Button, ButtonGroup, Col, Form, OverlayTrigger, Row, Tab, Tabs, Tooltip} from 'react-bootstrap';
import {faArrowDown, faArrowUp, faInfo, faInfoCircle, faPencilAlt, faPlus, faSpinner, faTrashAlt  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Mathml2latex from'mathml-to-latex';
import { ToggleButtons } from '../libs/components/ToggleButtons';

export class MainView extends Component {
    static customVirtualKeyboard = {
        layers: [
            "numeric", 
            "symbols", 
            //"alphabetic", 
            //"greek",
            {
                label: "Tableau periodique",
                tooltip: "Tableau périodique des principaux éléments",
                layer: "Tab",
                styles: "",
                rows: [
                    [{ class: "", latex: "H", },
                    { class: "separator w10" },
                    { class: "separator w10" },
                    { class: "separator w10" },
                    { class: "separator w10" },
                    { class: "separator w10" },                    
                    { class: "separator w10" },
                    { class: "separator w10" },
                    { latex: "He" },

                    ],
                    [{ latex: "Li" },
                    { latex: "Be", insert: "\\text{Be}" },
                    { class: "separator w10" },
                    { latex: "B" },
                    { latex: "C" },
                    { latex: "N" },
                    { latex: "O" },
                    { latex: "F" },
                    { latex: "Ne" },

                    ],
                    [{ latex: "Na" },
                    { latex: "Mg" },
                    { class: "separator w10" },
                    { latex: "Al" },
                    { latex: "Si" },
                    { latex: "P" },
                    { latex: "S" },
                    { latex: "Cl" },
                    { latex: "Ar" },

                    ],
                  /*  [{ latex: "K" },
                    { latex: "Ca" },
                    { class: "separator w10" },
                    { latex: "Ga" },
                    { latex: "Ge" },
                    { latex: "As" },
                    { latex: "Se" },
                    { latex: "Cl" },
                    { latex: "Kr" },
                    ],*/
                    [
                    { class: "separator w10" },
                    { class: "", latex: '→', insert: "\\to" },
                    { class: "", latex: "←", insert: "\\gets" },
                    { class: "", latex: "↔", insert: "\\biconditional" },
                    { latex: "\\underrightarrow{#@}" },
                    { latex: "{#@}←" },
                    { latex: "{#@}↔" },
                    { latex: "{#@}_{#@}"},
                    { class: "{#@}^{#@}" },
                    { latex: 'H_2O'},
                    { class: "separator w10" }, 
                    ],
                    
                ]
            },
            {
                label: "Science usuelle",
                tooltip: "Notations symboliques usuelles en science et technologie",
                layer: "chimie",
                rows: [
                    [
                        {
                            class: "tex w20", latex: "x", aside: "Variables usuelles",
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


                        { latex: 'H2O'},
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
            {
                label: "Symboles usuels",
                tooltip: "Notations symboliques usuelles",
                layer: "Math",
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
        ],
    };

    static defaultProps = {
        attoInterface: null
    };

    constructor(props) {
        super(props);

        this.onDataChange = this.onDataChange.bind(this);
        this.onOptionChange = this.onOptionChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onApply = this.onApply.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onComponentReady = this.onComponentReady.bind(this);
        this.onShift = this.onShift.bind(this);

        this.preLoadMathJax = this.preLoadMathJax.bind(this);
        this.loadMathJax = this.loadMathJax.bind(this);
        this.loadMathLive = this.loadMathLive.bind(this);

        this.state = {
            selectedTab: '0',
            data: [{latex: ""}], 
            iEditingItem: 0,
            options: {
                display: 'block',
                addSpace: '0',
                addBorder: '0',
               // chemicalEquation: '0'
            },
            mathLiveReady: false, 
            mathJaxReady: false, 
            componentReady: false,
            dropdownLists:{
                yesNoList: [
                    {value: '0', text: 'Non'},
                    {value: '1', text: 'Oui'},
                ],
                displayList: [
                    {value: 'block', text: 'Bloc'},
                    {value: 'inline', text: 'En ligne'},
                ]
            }
        };

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

    loadMathLive(counter){
        counter = counter || 0;

        if(this.mathliveRef.current && this.mathlivePlaceholder.current){
            this.mathliveRef.current.mathVirtualKeyboardPolicy = "manual";

            window.mathVirtualKeyboard.container = this.mathlivePlaceholder.current;
            window.mathVirtualKeyboard.layouts = MainView.customVirtualKeyboard.layers;

            this.mathliveRef.current.focus();
            this.setState({mathLiveReady: true}, this.onComponentReady);
        } 
        else if(counter <= 7){ 
            console.log(`Loading MathLive ${counter}...`);
            window.setTimeout(this.loadMathLive, 500);
        }
        else{
            alert(`RÉCIT MathLive: Failed to load MathLive.`);
            this.props.attoInterface.onClose();
        }  
    }

    preLoadMathJax(counter){
        counter = counter || 0;

        let iFrame = this.iFrameRef.current

        if(iFrame){
            this.loadMathJax();
        }
        else if(counter <= 7){ 
            console.log(`Preloading MathJax ${counter}...`);
            window.setTimeout(() => this.preLoadMathJax(++counter), 500);
        }
        else{
            alert(`RÉCIT MathLive: Failed to preload MathJax.`);
            this.props.attoInterface.onClose();
        }  
    }

    loadMathJax(counter){
        counter = counter || 0;
        let iFrame = this.iFrameRef.current
        let subWindow = iFrame.contentWindow || iFrame.contentDocument;

        if(subWindow.MathJax){
            this.myMathJax = subWindow.MathJax;
            this.setState({mathJaxReady: true}, this.onComponentReady);
        }
        else if(counter <= 7){ 
            console.log(`Loading MathJax ${counter}...`);
            window.setTimeout(() => this.loadMathJax(++counter), 1000);
        }
        else{
            alert(`RÉCIT MathLive: Failed to load MathJax.`);
            this.props.attoInterface.onClose();
        }  
    } 

    componentDidUpdate(prevProps, prevState){
        if(prevState.iEditingItem !== this.state.iEditingItem){
            this.mathliveRef.current.parentNode.parentNode.insertAdjacentElement('afterend', this.mathlivePlaceholder.current);
        }
    }

    render() {      
        /*if(window.mathVirtualKeyboard && !window.mathVirtualKeyboard.visible){
            window.mathVirtualKeyboard.show();  
        }*/

        let main = 
            <div>
                <Tabs activeKey={this.state.selectedTab} onSelect={(t) => this.setState({selectedTab: t})}>
                    <Tab eventKey="0" title="Équation(s)" className='p-2' style={{overflowY: 'auto', maxHeight: '65vh'}}>
                        <div>
                            {this.state.data.map((item, index) =>
                                <div key={index} className='mb-3'>
                                    <div className='mb-1 d-flex'>
                                        {this.state.iEditingItem === index ?
                                                <math-field ref={this.mathliveRef} style={{width: "100%"}} onInput={(event) => this.onDataChange(event, index)}>{item.latex}</math-field>
                                            :
                                                <div className='w-100' style={{fontSize: '1rem'}} dangerouslySetInnerHTML={{__html: this.myMathJax.tex2mml(item.latex)}} ></div>
                                        }

                                        <ButtonGroup className='ml-3'>
                                            <Button size="sm" disabled={index === this.state.iEditingItem} onClick={() => this.onEdit(index)}><FontAwesomeIcon icon={faPencilAlt} title="Modifier"/></Button>
                                            <Button size="sm" onClick={() => this.onAdd(index)}><FontAwesomeIcon icon={faPlus} title="Ajouter une autre ligne"/></Button>
                                            <Button size="sm" disabled={index === 0} onClick={() => this.onShift(index, index-1)}><FontAwesomeIcon icon={faArrowUp} title="Monter"/></Button>
                                            <Button size="sm" disabled={index === this.state.data.length - 1} onClick={() => this.onShift(index, index+1)}><FontAwesomeIcon icon={faArrowDown} title="Descendre"/></Button>
                                            <Button size="sm" disabled={index === 0} onClick={() => this.onDelete(index)}><FontAwesomeIcon icon={faTrashAlt} title="Supprimer"/></Button> 
                                        </ButtonGroup>
                                    </div>
                                </div>
                            )}                            
                        </div>
                        <div className='mt-2 mb-2' ref={this.mathlivePlaceholder} style={{height: this.getMathLiveKeyboardHeight()}}></div>
                    </Tab>
                    <Tab eventKey="1" title="Options" className='p-2'>
                        <Form.Group as={Row} controlId="formOptions1">
                            <Form.Label column sm="4">Type d'affichage</Form.Label>
                            <Col sm="8">
                                <ToggleButtons name='display' options={this.state.dropdownLists.displayList} value={[this.state.options.display]} type='radio' onChange={this.onOptionChange}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formOptions2">
                            <Form.Label column sm="4">Ajouter espacement</Form.Label>
                            <Col sm="8" className='d-flex align-items-center'> 
                                <ToggleButtons name='addSpace' options={this.state.dropdownLists.yesNoList} value={[this.state.options.addSpace]} type='radio' onChange={this.onOptionChange}/>
                                <OverlayTrigger overlay={<Tooltip>{"L'espacement ajoute un saut de paragraphe avant et après la formule afin de pouvoir faciliter l'ajout des autres contenus."}</Tooltip>}><Button size='sm' className='ml-2 rounded-circle'><FontAwesomeIcon icon={faInfoCircle}/> </Button></OverlayTrigger>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formOptions3">
                            <Form.Label column sm="4">Ajouter bordure</Form.Label>
                            <Col sm="8"> 
                                <ToggleButtons name='addBorder' options={this.state.dropdownLists.yesNoList} value={[this.state.options.addBorder]} type='radio' onChange={this.onOptionChange}/>
                            </Col>
                        </Form.Group>  
                    </Tab>
                </Tabs>

                <hr/>

                <ButtonGroup style={{display: 'grid', gridTemplateColumns: 'auto auto', justifyContent: 'flex-end'}}>
                    <Button variant='secondary' onClick={this.onCancel}>Annuler</Button> 
                    <Button variant='success' onClick={this.onApply}>Appliquer</Button>
                </ButtonGroup>
                
                <iframe style={{display: "none"}} ref={this.iFrameRef} src={`${M.cfg.wwwroot}/lib/editor/atto/plugins/recitmathlive/react/build/mathjax/index.html`}></iframe>

                {!this.state.componentReady &&
                    <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 9999, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <FontAwesomeIcon style={{width: 128, height: 128, position: 'relative', top: '30%', left: '38%'}} icon={faSpinner} spin />
                    </div>
                }   
            </div>;
 
        return (main);
    }

    getMathLiveKeyboardHeight(){
        if(window.innerWidth >= 1200){
            return 340;
        }
        else if((window.innerWidth < 1200) && (window.innerWidth >= 992)){
            return 275;
        }
        else{
            return 250;
        }
    }

    setInitialValue(){
        let data = this.state.data;
        let content  = this.props.attoInterface.getContent();
        let options = this.state.options;

        if(content.length !== 0){
            let doc = new DOMParser().parseFromString(content, "text/xml");
            
            options.display = doc.firstChild.getAttribute('display');
            options.addBorder = (doc.firstChild.classList.contains('border') ? '1' : '0');
            options.addSpace = '0';

            content = Mathml2latex.convert(content); 
            console.log("Mathml2latex", content)
           // content = content.replace(/\s\\/g, '\\'); // remove empty spaces before \ like "H \rightarrow"
            content = content.replace(/\\\\\s\\\\/g,'\\\\'); // remove empty spaces between lines
            content = content.split('\\\\');  

            data = [];
            for(let item of content){
                data.push({latex: item})
            }

            this.mathliveRef.current.setValue(data[0].latex, {suppressChangeNotifications: true});
        }
        else{ 
            options.addSpace = '1';
        }
        
        this.setState({data:data, options: options});

        window.mathVirtualKeyboard.show();  
    }

    onDataChange(event, index){
        let data = this.state.data;
        data[index].latex = event.target.value;
        // calling setValue onDataChange causes Mathlive to lose the cursor when entering the expression
       // this.mathliveRef.current.setValue(data[index].latex, {suppressChangeNotifications: true});
        this.setState({data: data});
    }

    onOptionChange(event){
        let options = this.state.options;
        options[event.target.name] = event.target.value;
        this.setState({options: options});
    }

    onEdit(index){
        this.setState({iEditingItem: index}, () => { 
            this.mathliveRef.current.focus(); 
            this.mathliveRef.current.setValue(this.state.data[index].latex, {suppressChangeNotifications: true});
        });
    }

    onShift(from, to){
        let data = this.state.data;

        if((typeof data[from] === 'undefined') || (typeof data[to] === 'undefined')){
            return;
        }

        let el = data[from];
        data.splice(from, 1);
        data.splice(to, 0, el);

        // force mathlive refresh
        if(this.state.iEditingItem === from){
            this.mathliveRef.current.setValue(data[from].latex, {suppressChangeNotifications: true}); 
        }
        else if(this.state.iEditingItem === to){
            this.mathliveRef.current.setValue(data[to].latex, {suppressChangeNotifications: true});
        }
        
        this.setState({data: data});
    }

    onAdd(index){
        let data = [...this.state.data];
        data.splice(index+1, 0, {latex: ""});
        this.setState({data: data, iEditingItem: index + 1}, () => { 
            this.mathliveRef.current.focus(); 
        });
    }

    onDelete(index){
        if(window.confirm("Confirmez-vous la suppression?")){
            let data = this.state.data;
            data.splice(index, 1); 
            this.setState({data: data, iEditingItem: (index === this.state.iEditingItem ? 0 : this.state.iEditingItem)}, () => {
                this.mathliveRef.current.focus(); 
                this.mathliveRef.current.setValue(this.state.data[this.state.iEditingItem].latex, {suppressChangeNotifications: true});
            });
        }
    }

    onCancel(){
        this.props.attoInterface.onClose();
    }

    onApply(){ 
        let pList = [];
        let newLine = '\\\\';
        let formula = "\\begin{equation}";
        formula += "\\begin{aligned}";

        let tmp = [];
        for(let item of this.state.data){
            tmp.push(item.latex);
        }

        tmp = tmp.join(newLine+newLine); 

       /* if(this.state.options.chemicalEquation === '1'){ 
            formula += `\\ce{${tmp}}`; 
        }
        else{
            formula += tmp; 
        }*/
        formula += tmp; 

       
        formula += "\\end{aligned}"; 
        formula += "\\end{equation}";
 
        console.log(formula);

        let p = this.myMathJax.tex2mmlPromise(formula);
        pList.push(p);
 
        Promise.all(pList).then((values) => {
            let result = values.join("");
            let doc = new DOMParser().parseFromString(result, "text/xml");

            doc.firstChild.setAttribute('display', this.state.options.display);

            if((this.state.options.display === 'block') && (this.state.options.addBorder === '1')){
                doc.firstChild.classList.add("border", "border-secondary", "rounded", "m-auto", "p-2", "d-flex");
                doc.firstChild.style.width = 'fit-content';
            }
            else if(this.state.options.addBorder === '1'){ 
                doc.firstChild.classList.add("border", "border-secondary", "rounded", "p-2");
            }

            result = doc.firstChild.outerHTML;
            
            if(this.state.options.addSpace === '1'){
                result =  "<p>&nbsp;</p>" + result +  "<p>&nbsp;</p>";
            }

            this.props.attoInterface.onApply(result); 
        },
        (v) => {
            console.log(v);
            throw new Error(v);
        });
    }
}