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
        //the ternary was too long, broken up for clarity:
        const view = null;
        if (this.props.isInTree === true)
        {
            view = <FamilyView currentTree={this.props.currentTree}/>;
        }
        else
        {
            view = <StartView treeNames={this.props.treeNames}/>;
        }

        return (
            <div className="main_content">
                {view}
            </div>
        );
    }
}

export default Content;