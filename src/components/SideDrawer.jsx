import React, { Component } from 'react';
import '../App.css';

class SideDrawer extends Component
{
    render()
    {
        return (
            <div className="side_drawer">
                <div className="side_drawer_bar">
                    <h3>{this.props.name}</h3>
                    <button className="side_drawer_close_button" onClick={this.props.closeAction}>x</button>
                </div>
                <div className="side_drawer_content">
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default SideDrawer;