import React, { Component } from 'react';
import FamilyView from './FamilyView';
import StartView from './StartView';
import '../App.css';
import TreeContext from '../TreeContext';

class Content extends Component
{
    static contextType = TreeContext;

    constructor(props)
    {
        super(props);
        //this.state = {}
    }
    
    render()
    {
        return (
            <div className="main_content">
                {(this.context.isInTree === true) ? <FamilyView/> : <StartView/>}
            </div>
        );
    }
}

export default Content;