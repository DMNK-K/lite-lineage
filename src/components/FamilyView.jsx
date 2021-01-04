import React, { Component } from 'react';
import SideDrawer from './SideDrawer';
import FamilyMember from './FamilyMember';

class FamilyView extends Component
{
    constructor(props)
    {
        super(props);
        //this.state = {}
    }
    
    render()
    {
        return (
            <div className="family_view">
                {this.props.editingPerson === true && <SideDrawer name="Editing..." content=""/>}
                <div className="family_box">
                    <div className="family_tree">
                        <FamilyMember/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FamilyView;