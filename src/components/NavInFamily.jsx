import React, { Component } from 'react';
import TreeContext from '../TreeContext';

class NavInFamily extends Component
{
    static contextType = TreeContext;

    constructor(props)
    {
        super(props);
        //this.state = {}

        this.exportCurrentTree = this.exportCurrentTree.bind(this);
    }

    exportCurrentTree()
    {
        const fileName = this.context.currentTree.treeName + ".json";
        const element = document.createElement("a");
        const obj = (localStorage.getItem(this.context.currentTree.treeName));
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(obj));
        element.setAttribute('download', fileName);
        element.click();
    }
    
    render()
    {
        return (
            <nav className="main_nav">
                <button className="header_button" onClick={this.exportCurrentTree}>EXPORT</button>
                <button className="header_button" onClick={this.context.familyHandlers.handleAddFamMember.bind(this, "default")}>
                    NEW PERSON
                </button>
                {/* <button className="header_button">HIGHLIGHT: OFF</button> */}
                <button className="header_button" onClick={this.context.treeHandlers.handleExitTree}>EXIT</button>
            </nav>
        );
    }
}

export default NavInFamily;