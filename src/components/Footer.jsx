import React, { Component } from 'react';
import '../App.css';

class Footer extends Component {

    constructor(props)
    {
        super(props);
        this.openNotice = this.openNotice.bind(this);
    }

    openNotice(name)
    {
        this.props.toggleNotice(name, true);
    }

    render()
    { 
        return (
            <footer className="main_footer">
                <button onClick={()=>this.openNotice("cookies")}>Cookies &#38; Other Technologies</button>
                <span>&#169;{new Date().getFullYear()}</span>
            </footer>
        );
    }
}
 
export default Footer;