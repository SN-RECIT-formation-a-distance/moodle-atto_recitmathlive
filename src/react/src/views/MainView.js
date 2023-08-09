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
import {faPlus, faTrashAlt  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Mathml2latex from'mathml-to-latex';

export class MainView extends Component {
    static defaultProps = {
        attoInterface: null
    };

    constructor(props) {
        super(props);

        this.setValue = this.setValue.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onApply = this.onApply.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {data: []};

        this.iFrameRef = React.createRef();
        this.myMathJax = null;
    }
 
    componentDidMount(){
        this.createMathJax();
        this.setInitialValue();
    }

    createMathJax(){
        let iFrame = this.iFrameRef.current
        let subWindow = iFrame.contentWindow || iFrame.contentDocument;
        let head = subWindow.document.head;
        //let body = subWindow.document.body;

        let el = subWindow.document.createElement("script");
        el.setAttribute("type", "text/javascript");
        el.setAttribute("src", `${M.cfg.wwwroot}/lib/editor/atto/plugins/recitmathlive/react/build/mathjax.js`);
        head.appendChild(el);
        
        //console.log(window.MathJax.tex2mml())
        let p = new Promise((resolve, reject) => {
            var counter = 0;
            let loadMathJax = function () {
                if(subWindow.MathJax){
                    resolve(subWindow.MathJax);
                }
                if(counter >= 5){
                    reject("Fail to load MathJax.");
                }
                else{
                    counter++;
                    window.setTimeout(loadMathJax, 500);
                }
                console.log("Loading local MathJax...", counter);
            }

            loadMathJax();
        });    

        let that = this;
        p.then((instance) => {
            that.myMathJax = instance;
        }).catch((msg) => {
            console.log(`RECIT MathLive: ${msg}.`);
        });
    }

    render() {       
        let main = 
            <div>
                <div style={{minHeight: 150}}>
                    {this.state.data.map((item, index) =>
                        <div key={index} className='mb-3 d-flex' >
                            <math-field style={{width: "100%"}} onInput={(event) => this.setValue(event, index)}> 
                                {item}
                            </math-field>
                            <Button size="sm" className='ml-3' onClick={() => this.onDelete(index)}><FontAwesomeIcon icon={faTrashAlt} title="Supprimer"/></Button>
                        </div>
                    )}
                    <Button size="sm" onClick={this.onAdd}><FontAwesomeIcon icon={faPlus} title="Ajouter"/></Button>
                </div>
                <hr/>
                <ButtonGroup className='float-right'>
                    <Button variant='secondary' onClick={this.onCancel}>Annuler</Button>
                    <Button variant='success' onClick={this.onApply}>Appliquer</Button>
                </ButtonGroup>
                <iframe style={{display: "none"}} ref={this.iFrameRef}></iframe>
            </div>;
 
        return (main);
    }

    setInitialValue(){
        //let content  = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">    <msup>        <mn>6</mn>        <mn>2</mn>    </msup></math>';
        let data = [];
        let content  = this.props.attoInterface.getContent();

        if(content.length !== 0){
            content = Mathml2latex.convert(content); 
            content = content.replace(/\\\\\s\\\\/g,'\\\\'); 
            data = content.split('\\\\'); 
        } 
        else{ 
            data.push("");
        }

        this.setState({data:data});
    }

    setValue(event, index){
        let data = this.state.data;
        data[index] = event.target.value;
        this.setState({data: data});
    }

    onAdd(){
        let data = this.state.data;
        data.push("");
        this.setState({data: data});
    }

    onDelete(index){
        if(window.confirm("Confirmez-vous la suppression?")){
            let data = this.state.data;
            data.splice(index, 1); 
            this.setState({data: data});
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
        formula += this.state.data.join(newLine+newLine);
        formula += "\\end{aligned}";
        formula += "\\end{equation}";

        let p = this.myMathJax.tex2mmlPromise(formula);
        pList.push(p);
 
        Promise.all(pList).then((values) => {
            this.props.attoInterface.onApply(values.join(""));     
        },
        (v) => {
            console.log(v);
            throw new Error(v);
        });

        
    }
}