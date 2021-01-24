import React, { Component } from 'react';
import FamilyView from './FamilyView';
import StartView from './StartView';
import '../App.css';
import TreeContext from '../TreeContext';

class Content extends Component
{
    static contextType = TreeContext;

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