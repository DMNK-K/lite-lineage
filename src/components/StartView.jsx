import React, { Component } from 'react';
import '../App.css';
import StartTreeButton from './StartTreeButton';
import TreeContext from '../TreeContext';

class StartView extends Component
{
    static contextType = TreeContext;

    constructor(props)
    {
        super(props);
        //this.state = {tryingToDeleteTree: false}
    }

    render()
    { 
        const treeButtons = this.context.treeNames.map((treeName) =>
            <StartTreeButton treeName={treeName} key={treeName}/>
        );

        return (
            <div className="start_view">
                <div className="start_box">
                    <h2>Welcome to LiteLineage</h2>
                    <p className="start_desc">A simple tool for making family trees, with all key family data kept on your machine and no need to create an account. To begin, create a new tree, or pick an existing one.</p>
                    <div className="start_button_tray">
                        {treeButtons}
                        <div className="start_button_wrapper">
                            <button className="start_button start_button_special" onClick={this.context.treeHandlers.handleNewTree}>NEW TREE</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default StartView;