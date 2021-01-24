import React, { Component } from 'react';
import SideDrawer from './SideDrawer';
import FamilyMember from './FamilyMember';
import SideDrawerEditMemberForm from './SideDrawerEditMemberForm';
import '../App.css';
import TreeContext from '../TreeContext';
import Person from '../Person';
import Helpers from '../Helpers';
import ConnectionRenderer from './ConnectionRenderer';
import FamilyConnection from './FamilyConnection';

class FamilyView extends Component
{
    static contextType = TreeContext;
    #zoomMin = 0;
    #zoomMax = 4;
    #locationScalesByZoom = [20, 30, 40, 60, 80];
    #lineCenteringOffsetByZoom = [
        {x: 40, y: 20},
        {x: 60, y: 30},
        {x: 80, y: 40},
        {x: 120, y: 60},
        {x: 160, y: 80}
    ];

    constructor(props)
    {
        super(props);
        this.state = {
            editingPerson: false,
            editedPersonId: null,
            zoomLvl: 2,
            locationScale: 40,
            stretcherOverhead: {x: 7, y: 5},
            isDragging: false,
            draggedId: null,
            lineCenteringOffset: {x: 80, y: 40},
        }
        this.startEdit = this.startEdit.bind(this);
        this.reportDeletionToEdit = this.reportDeletionToEdit.bind(this);
        this.endEdit = this.endEdit.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.tryDrag = this.tryDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
        this.zoom = this.zoom.bind(this);
    }

    startEdit(personId)
    {
        this.setState({editingPerson: true, editedPersonId: personId});
    }

    reportDeletionToEdit(personId)
    {
        if (this.state.editingPerson === true && this.state.editedPersonId != null && personId === this.state.editedPersonId)
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
            const i = this.context.currentTree.family.findIndex(item => item.id === this.state.draggedId);
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

    calcCssSizeOfConnectionRenderer()
    {
        //bounds of the tree incremented by 2 in both axis, so the line renderer also acts as a stretcher
        //for the whole area of the tree
        const bounds = this.context.currentTree.getBounds(this.state.stretcherOverhead.x, this.state.stretcherOverhead.y);
        return {
            width: (bounds.x * this.state.locationScale) + "px",
            height: (bounds.y * this.state.locationScale) + "px"
        };
    }

    zoom(dir)
    {
        if (dir === 0){return;}
        dir = (dir > 0) ? 1 : -1;
        this.setState((prevState, props) => (
            {
                zoomLvl: prevState.zoomLvl + dir,
                locationScale: this.#locationScalesByZoom[prevState.zoomLvl + dir],
                lineCenteringOffset: this.#lineCenteringOffsetByZoom[prevState.zoomLvl + dir]
            }
        ));
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
                zoomLvl={this.state.zoomLvl}
                startDrag={this.startDrag}
            />
        );

        //finding people taking part in a connection
        const connectionMembers = [];
        const establishedParentIdPairs = [];
        for (let i = 0; i < this.context.currentTree.family.length; i++)
        {
            const b = this.context.currentTree.family[i];
            const parents = b.getCurrentParents(this.context.currentTree.family);
            if (parents[0] || parents[1])
            {
                //there is a connection that exists for b
                connectionMembers.push({
                    a1: parents[0],
                    a2: parents[1],
                    b: b
                });

                if (parents[0] && parents[1])
                {
                    //check if this parent pair was already established (checking both orders of being saved since they might differ in different child)
                    //we're doing it in order not to duplicate connections that are suppoosed to represent relationships between 2 people that had children together
                    //since they are distinct from the child-parent connections 
                    if (!establishedParentIdPairs.includes(parents[0].id + "_" + parents[1].id) && !establishedParentIdPairs.includes(parents[1].id + "_" + parents[0].id))
                    {
                        connectionMembers.push({
                            a1: parents[0],
                            a2: parents[1],
                            b: null
                        });
                        establishedParentIdPairs.push(parents[0].id + "_" + parents[1].id);
                    }
                }
            }
        }

        const connections = connectionMembers.map((connectionMember) =>
            <FamilyConnection
                key={connectionMember.a1?.id + "_" + connectionMember.a2?.id + "|" + connectionMember.b?.id}
                personA1={connectionMember.a1}
                personA2={connectionMember.a2}
                personB={connectionMember.b}
                locationScale={this.state.locationScale}
                lineCenteringOffset={this.state.lineCenteringOffset}
            />
        );

        const editedPersonIndex = this.context.currentTree.family.findIndex(item => item.id === this.state.editedPersonId);
        const editedPerson = (editedPersonIndex >= 0) ? this.context.currentTree.family[editedPersonIndex] : null;

        const sideDrawer = (
            <SideDrawer
                name="Editing..."
                content={
                    <SideDrawerEditMemberForm
                        editedPerson={editedPerson}
                        handleEdit={this.context.familyHandlers.handleEditFamMember}
                        handleEditMultiple={this.context.familyHandlers.handleEditFamMembers}
                        family={this.context.currentTree.family}
                    />}
                closeAction={this.endEdit}
            />
        );

        return (
            <div className="family_view">
                {this.state.editingPerson === true && sideDrawer}
                <div className="zoom_wrapper">
                    <button onClick={this.zoom.bind(this, 1)} disabled={this.state.zoomLvl === this.#zoomMax}>+</button>
                    <button onClick={this.zoom.bind(this, -1)} disabled={this.state.zoomLvl === this.#zoomMin}>-</button>
                </div>
                <div id="family_tree" className="family_tree" onMouseMove={this.state.isDragging ? (e) => this.tryDrag(e, document.getElementById("family_tree")) : undefined}>
                    {familyMembers}
                    <ConnectionRenderer style={this.calcCssSizeOfConnectionRenderer()}>
                        {connections}
                    </ConnectionRenderer>
                </div>
            </div>
        );
    }
}

export default FamilyView;