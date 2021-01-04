import React, { Component } from 'react';
import FamilyView from './FamilyView';
import StartView from './StartView';
import '../App.css';

class Content extends Component
{
    constructor(props)
    {
        super(props);
        //this.state = {}
    }
    
    render()
    {
        const view = (this.props.isInTree === true) ? <FamilyView/> : <StartView/>;
        return (
            <div className="main_content">
                {view}
            </div>
        );
    }
}

export default Content;