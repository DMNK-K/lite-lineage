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
        this.startEdit = this.startEdit.bind(this);
        this.reportDeletionToEdit = this.reportDeletionToEdit.bind(this);
        this.endEdit = this.endEdit.bind(this);
    }

    startEdit(personId)
    {
        const index = this.context.currentTree.family.findIndex(item => item.id == personId);
        this.setState({editingPerson: true, editedPerson: this.context.currentTree.family[index]});
    }

    reportDeletionToEdit(personId)
    {
        if (this.state.editingPerson === true && this.state.editedPerson && personId == this.state.editedPerson.id)
        {
            this.endEdit();
        }
    }

    endEdit()
    {
        this.setState({editingPerson: false, editedPerson: null});
    }
    
    render()
    {
        const familyMembers = this.context.currentTree.family.map((member) =>
            <FamilyMember key={member.id} person={member} familyHandlers={this.context.familyHandlers} reportDeletionToEdit={this.reportDeletionToEdit} startEdit={this.startEdit}/>
        );

        const sideDrawer = (
            <SideDrawer
                name="Editing..."
                editedPerson={this.state.editedPerson}
                content={<SideDrawerEditMemberForm/>}
                closeAction={this.endEdit}/>
        );

        return (
            <div className="family_view">
                {this.state.editingPerson === true && sideDrawer}
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