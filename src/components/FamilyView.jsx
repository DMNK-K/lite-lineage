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
        this.state = {editingPerson: false, editedPerson: null}
    }
    
    render()
    {
        const familyMembers = this.context.currentTree.family.map((member) =>
            <FamilyMember key={member.id} person={member} familyHandlers={this.context.familyHandlers}/>
        );

        return (
            <div className="family_view">
                {this.state.editingPerson === true && <SideDrawer name="Editing..." editedPerson={this.state.editedPerson} content={<SideDrawerEditMemberForm/>}/>}
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