import React, { Component } from 'react';
import TreeContext from '../TreeContext';

class NavInFamily extends Component
{
    static contextType = TreeContext;

    constructor(props)
    {
        super(props);
        this.state = {buttonMenuOpen: false}

        this.exportCurrentTree = this.exportCurrentTree.bind(this);
        this.toggleButtonMenu = this.toggleButtonMenu.bind(this);
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

    toggleButtonMenu()
    {
        this.setState(prevState => ({buttonMenuOpen: !prevState.buttonMenuOpen}));
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
                <div className="header_button_menu" onClick={this.toggleButtonMenu}>MENU
                   {this.state.buttonMenuOpen && 
                    <nav>
                        <button className="header_button_mobile" onClick={this.exportCurrentTree}>EXPORT</button>
                        <button className="header_button_mobile" onClick={this.context.familyHandlers.handleAddFamMember.bind(this, "default")}>NEW PERSON</button>
                        <button className="header_button_mobile" onClick={this.context.treeHandlers.handleExitTree}>EXIT</button>
                    </nav>
                   } 
                </div>
            </nav>
        );
    }
}

export default NavInFamily;