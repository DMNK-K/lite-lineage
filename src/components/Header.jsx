import React, { Component } from 'react';
import '../App.css';
import NavInFamily from './NavInFamily';

class Header extends Component
{
    constructor(props)
    {
        super(props);
    }

    //state = {  }
    render()
    {
        return(
        <header className="main_header">
            <h1>LiteLineage</h1>
            {this.props.isInTree === true && <NavInFamily handleExitTree={this.props.handleExitTree}/>}
        </header>
        );
    }
}
 
export default Header;