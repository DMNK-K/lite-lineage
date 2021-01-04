import React, { Component } from 'react';

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
                    <h2>Welcome to bsdfbsdh</h2>
                    <p className="start_desc">Bla blab lbablabl lbal lba, create a new tree, or pick an exisitng one.</p>
                    <div className="start_button_wrapper">
                        <button>Blabla family tree</button>
                        <button>Blabla family tree</button>
                        <button>Blabla family tree</button>
                        <button>New Tree</button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default StartView;