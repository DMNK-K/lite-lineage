import React, { Component } from 'react';

class Header extends Component
{
    //state = {  }
    render()
    { 
        return(
        <header id="main_header">
            <h1>LiteLineage</h1>
            <nav className="main_nav">
                <button className="header_button">EXPORT</button>
                <button className="header_button">NEW PERSON</button>
                <button className="header_button">HIGHLIGHT: OFF</button>
                <button className="header_button">EXIT</button>
            </nav>
        </header>
        );
    }
}
 
export default Header;