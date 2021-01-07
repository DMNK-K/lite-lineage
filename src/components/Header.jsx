import React, { Component } from 'react';
import '../App.css';
import NavInFamily from './NavInFamily';
import TreeContext from '../TreeContext';

class Header extends Component
{
    static contextType = TreeContext;

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
            {this.context.isInTree === true && <NavInFamily/>}
        </header>
        );
    }
}
 
export default Header;