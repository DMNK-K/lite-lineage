import React, { Component } from 'react';
import '../App.css';

class StartView extends Component
{
    constructor(props)
    {
        super(props);
        //this.state = {}
    }

    render()
    { 
        return (
            <div className="start_view">
                <div className="start_box">
                    <h2>Welcome to LiteLineage</h2>
                    <p className="start_desc">Bla blab lbablabl lbal lba, create a new tree, or pick an existing one.</p>
                    <div className="start_button_wrapper">
                        <button>Blabla family tree</button>
                        <button>Blabla family tree</button>
                        <button className="start_button_special">NEW TREE</button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default StartView;