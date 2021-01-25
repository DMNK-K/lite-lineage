import React, { Component } from 'react';
import IconX from '../icons/icon_x.svg';

class Notice extends Component
{
    constructor(props)
    {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose()
    {
        this.props.handleClose(this.props.name, false);
    }

    render()
    {
        return (
           <div className="notice">
               <div className="notice_bar">
                    <p>{this.props.title}</p>
                    <button onClick={this.handleClose} className="notice_close_button close_button"><img alt="close icon" src={IconX}/></button>
               </div>
               <div className="notice_content">
                   {this.props.children}
               </div>
           </div> 
        );
    }
}

export default Notice;