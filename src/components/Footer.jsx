import React, { Component } from 'react';
import '../App.css';

class Footer extends Component {
    render()
    { 
        return (
            <footer className="main_footer">
                <button>Cookies &#38; Other Technologies</button>
                <span>&#169;{new Date().getFullYear()}</span>
            </footer>
        );
    }
}
 
export default Footer;