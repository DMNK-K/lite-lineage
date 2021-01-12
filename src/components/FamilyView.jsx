import React, { Component } from 'react';
import SideDrawer from './SideDrawer';
import FamilyMember from './FamilyMember';
import SideDrawerEditMemberForm from './SideDrawerEditMemberForm';
import '../App.css';
import TreeContext from '../TreeContext';
import Person from '../Person';
import Helpers from '../Helpers';

class FamilyView extends Component
{
    static contextType = TreeContext;

    constructor(props)
    {
        super(props);
        this.state = {
            editingPerson: false,
            editedPersonId: null,
            locationScale: 75,
            isDragging: false,
            draggedId: null,
        }
        this.startEdit = this.startEdit.bind(this);
        this.reportDeletionToEdit = this.reportDeletionToEdit.bind(this);
        this.endEdit = this.endEdit.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.tryDrag = this.tryDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
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

    startDrag(personId)
    {
        // console.log("starting drag");
        this.setState({isDragging: true, draggedId: personId});
    }

    componentDidMount()
    {
        window.addEventListener("mouseup", this.endDrag);
    }

    componentWillUnmount()
    {
        window.removeEventListener("mouseup", this.endDrag);
    }

    tryDrag(e, referenceElement)
    {
        //this was the only solution that calculated coords correctly, but it needs a ref element passed somehow
        const offset = Helpers.getRelativeCoords(e.nativeEvent, referenceElement);
        // console.log("dragging "+ this.state.draggedId +" to [" + offset.x + ", " + offset.y + "]");
        if (this.state.isDragging === true && this.state.draggedId != null && this.state.draggedId >= 0)
        {
            const newLocation = this.calcLocationFromOffset(offset);
            const i = this.context.currentTree.family.findIndex(item => item.id == this.state.draggedId);
            const draftPerson = Person.cloneFromOther(this.context.currentTree.family[i]);
            // console.log("new location: [" + newLocation.x + ", " + newLocation.y + "]");
            draftPerson.locationInTreeX = newLocation.x;
            draftPerson.locationInTreeY = newLocation.y;
            this.context.familyHandlers.handleEditFamMember(this.state.draggedId, draftPerson);
        }
    }

    endDrag()
    {
        // console.log("ending drag");
        this.setState({isDragging: false, draggedId: null});
    }

    calcLocationFromOffset(offset)
    {
        return {
            x: Math.round(offset.x / this.state.locationScale),
            y: Math.round(offset.y / this.state.locationScale)
        };
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
                startDrag={this.startDrag}
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
                <div id="family_tree" className="family_tree" onMouseMove={this.state.isDragging ? (e) => this.tryDrag(e, document.getElementById("family_tree")) : undefined}>
                    {familyMembers}
                </div>
            </div>
        );
    }
}

export default FamilyView;