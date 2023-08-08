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
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import {MainView} from "./views/MainView";
import {$glVars} from "./common/common";
import { Options } from './common/Options';
 
class App extends Component {
    static defaultProps = {
        attoInterface: null
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {       
        let main = <MainView attoInterface={this.props.attoInterface}/>

        return (main);
    }
}

window.openrecitmathliveui = function(attoInterface){ 
    const domContainer = document.getElementById('recitmathlive_container');
    const root = createRoot(domContainer);
    root.render(<App attoInterface={attoInterface}/>);
    console.log(Options.appVersion());
};
