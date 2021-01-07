import React, { Component } from 'react';
import TreeContext from '../TreeContext';

class NavInFamily extends Component
{
    static contextType = TreeContext;

    constructor(props)
    {
        super(props);
        //this.state = {}
    }
    
    render()
    {
        return (
            <nav className="main_nav">
                {/* <button className="header_button">EXPORT</button> */}
                <button className="header_button" onClick={this.context.familyHandlers.handleAddFamMember.bind(this, "default", 0, 0)}>
                    NEW PERSON
                </button>
                {/* <button className="header_button">HIGHLIGHT: OFF</button> */}
                <button className="header_button" onClick={this.context.treeHandlers.handleExitTree}>EXIT</button>
            </nav>
        );
    }
}

export default NavInFamily;