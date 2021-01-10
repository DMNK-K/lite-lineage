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
        this.state = {
            editingPerson: false,
            editedPersonId: null,
            locationScale: 50,
        }
        this.startEdit = this.startEdit.bind(this);
        this.reportDeletionToEdit = this.reportDeletionToEdit.bind(this);
        this.endEdit = this.endEdit.bind(this);
    }

    startEdit(personId)
    {
        this.setState({editingPerson: true, editedPersonId: personId});
    }

    reportDeletionToEdit(personId)
    {
        if (this.state.editingPerson === true && this.state.editedPersonId != null && personId == this.state.editedPersonId)
        {
            this.endEdit();
        }
    }

    endEdit()
    {
        this.setState({editingPerson: false, editedPersonId: null});
    }
    
    render()
    {
        const familyMembers = this.context.currentTree.family.map((member) =>
            <FamilyMember
                key={member.id}
                person={member}
                familyHandlers={this.context.familyHandlers}
                reportDeletionToEdit={this.reportDeletionToEdit}
                startEdit={this.startEdit}
                locationScale={this.state.locationScale}
            />
        );

        const editedPersonIndex = this.context.currentTree.family.findIndex(item => item.id == this.state.editedPersonId);
        const editedPerson = (editedPersonIndex >= 0) ? this.context.currentTree.family[editedPersonIndex] : null;

        const sideDrawer = (
            <SideDrawer
                name="Editing..."
                content={
                    <SideDrawerEditMemberForm
                        editedPerson={editedPerson}
                        handleEdit={this.context.familyHandlers.handleEditFamMember}
                    />}
                closeAction={this.endEdit}
            />
        );

        return (
            <div className="family_view">
                {this.state.editingPerson === true && sideDrawer}
                <div className="family_tree">
                    {familyMembers}
                </div>
            </div>
        );
    }
}

export default FamilyView;