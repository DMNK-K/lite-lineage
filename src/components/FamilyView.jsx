import React, { Component } from 'react';
import SideDrawer from './SideDrawer';
import FamilyMember from './FamilyMember';
import SideDrawerEditMemberForm from './SideDrawerEditMemberForm';
import '../App.css';
import TreeContext from '../TreeContext';

class FamilyView extends Component
{
    static contextType = TreeContext;

    constructor(props)
    {
        super(props);
        this.state = {editingPerson: false}
    }
    
    render()
    {
        const familyMembers = this.context.currentTree.family.map((member) =>
            <FamilyMember person={member}/>
        );

        return (
            <div className="family_view">
                {this.state.editingPerson === true && <SideDrawer name="Editing..." content={<SideDrawerEditMemberForm/>}/>}
                <div className="family_box">
                    <div className="family_tree">
                        {familyMembers}
                    </div>
                </div>
            </div>
        );
    }
}

export default FamilyView;