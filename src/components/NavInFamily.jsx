import React, { Component } from 'react';

class NavInFamily extends Component
{
    constructor(props)
    {
        super(props);
        //this.state = {}
    }
    
    render()
    {
        return (
            <nav className="main_nav">
                <button className="header_button">EXPORT</button>
                <button className="header_button">NEW PERSON</button>
                <button className="header_button">HIGHLIGHT: OFF</button>
                <button className="header_button" onClick={this.props.handleExitTree}>EXIT</button>
            </nav>
        );
    }
}

export default NavInFamily;