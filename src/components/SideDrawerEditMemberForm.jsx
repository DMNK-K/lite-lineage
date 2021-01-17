import React, { Component } from 'react';
import '../App.css';
import Person from '../Person';
import SpecialDateInput from './SpecialDateInput';

class EditMemberForm extends Component
{
    constructor(props)
    {
        super(props);
        //this.state = {}
        this.changeName = this.changeName.bind(this);
        this.changeStr = this.changeStr.bind(this);
        this.changeBool = this.changeBool.bind(this);
        this.changeNotes = this.changeNotes.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeNumberOfHealthProblems = this.changeNumberOfHealthProblems.bind(this);
        this.changeHealthProblem = this.changeHealthProblem.bind(this);
    }

    //there's a bunch of similar methods, might need different processing for different types later
    changeName(e, propertyName)
    {
        const draftPerson = Person.cloneFromOther(this.props.editedPerson);
        const possibleVariants = ["firstName", "lastName", "secondName"];
        if (possibleVariants.includes(propertyName) && draftPerson.hasOwnProperty(propertyName))
        {
            draftPerson[propertyName] = e.target.value;
            this.props.handleEdit(this.props.editedPerson.id, draftPerson);
        }
        else
        {
            console.error("propertyName:" + propertyName + " not recognized as a possible variant, or is not an own property of a Person obj");
        }
    }

    changeNotes(e)
    {
        const draftPerson = Person.cloneFromOther(this.props.editedPerson);
        draftPerson.notes = e.target.value;
        this.props.handleEdit(this.props.editedPerson.id, draftPerson);
    }

    changeStr(e, propertyName)
    {
        const draftPerson = Person.cloneFromOther(this.props.editedPerson);
        if (draftPerson.hasOwnProperty(propertyName))
        {
            draftPerson[propertyName] = e.target.value.toString();
            this.props.handleEdit(this.props.editedPerson.id, draftPerson);
        }
        else
        {
            console.error("propertyName:" + propertyName + " is not an own property of a Person obj");
        }
    }

    changeBool(e, propertyName)
    {
        const draftPerson = Person.cloneFromOther(this.props.editedPerson);
        if (draftPerson.hasOwnProperty(propertyName))
        {
            draftPerson[propertyName] = e.target.checked;
            this.props.handleEdit(this.props.editedPerson.id, draftPerson);
        }
        else
        {
            console.error("propertyName:" + propertyName + " is not an own property of a Person obj");
        }
    }

    changeDate(dateObj, propertyName)
    {
        const draftPerson = Person.cloneFromOther(this.props.editedPerson);
        const possibleVariants = ["dateBirth", "dateDeath"];
        if (possibleVariants.includes(propertyName) && draftPerson.hasOwnProperty(propertyName))
        {
            draftPerson[propertyName] = dateObj;
            this.props.handleEdit(this.props.editedPerson.id, draftPerson);
        }
        else
        {
            console.error("propertyName:" + propertyName + " not recognized as a possible variant, or is not an own property of a Person obj");
        }
    }

    changeParents(e, parentIndex)
    {
        // console.log("trying to change parent " + parentIndex);
        const newParentId = e.target.value;
        console.log("newParentId: " + newParentId);
        const draftPerson = Person.cloneFromOther(this.props.editedPerson);
        if (parentIndex == 0 || parentIndex == 1)
        {
            //first if there is a parent already in that index, remove person as a child since Person class has both childrenIds array and 2 slots for parent
            let i;
            const oldParentId = this.props.editedPerson["parentId" + parentIndex];
            if (oldParentId)
            {
                i = this.props.family.findIndex(item => item.id == oldParentId);
                if (i >= 0)
                {
                    const draftOldParent = Person.cloneFromOther(this.props.family[i]);
                    const q = draftOldParent.childrenIds.findIndex(item => item == this.editedPerson.id);
                    if (q >= 0)
                    {
                        draftOldParent.childrenIds.splice(q, 1);
                        this.props.handleEdit(oldParentId, draftOldParent);
                    }
                }
            }
            //now assign parent, but because of Person class having childrenIds too, edit that parent as well
            draftPerson["parentId" + parentIndex] = newParentId;
            this.props.handleEdit(this.props.editedPerson.id, draftPerson);

            i = this.props.family.findIndex(item => item.id == newParentId);
            if (i >= 0)
            {
                const draftNewParent = Person.cloneFromOther(this.props.family[i]);
                draftNewParent.childrenIds.push(this.props.editedPerson.id);    
                this.props.handleEdit(newParentId, draftNewParent);
            }
        }
        else
        {
            console.error("invalid parentIndex, should be 0 or 1: " + parentIndex);
        }
    }

    changeHealthProblem(e)
    {
        const index = e.target.name.replace("health_problem_", "");
        console.log(e);
        if (this.props.editedPerson.healthProblems.length > index && index >= 0)
        {
            const draftPerson = Person.cloneFromOther(this.props.editedPerson);
            draftPerson.healthProblems[index] = e.target.value;
            this.props.handleEdit(this.props.editedPerson.id, draftPerson);
        }
    }

    changeNumberOfHealthProblems(n)
    {
        if (n == 0){return;}
        if (n == -1 && this.props.editedPerson.healthProblems.length < 1){return;}

        const draftPerson = Person.cloneFromOther(this.props.editedPerson);
        if (n > 0)
        {
            draftPerson.healthProblems.push("");
        }
        else
        {
            draftPerson.healthProblems.splice(-1, 1);
        }
        this.props.handleEdit(this.props.editedPerson.id, draftPerson);
    }

    render()
    {
        const healthProblemInputs = this.props.editedPerson.healthProblems.map((problem, index) => (
            <input value={problem} onChange={this.changeHealthProblem.bind(this)} type="text" key={index} name={"health_problem_" + index} className="word_input side_drawer_input"/>
        ));
            //unsure if parent related stuff would be better as array, since only has 2 elements, always
        const parentIndex0 = this.props.family.findIndex(item => item.id == this.props.editedPerson.parentId0);
        const parentIndex1 = this.props.family.findIndex(item => item.id == this.props.editedPerson.parentId1);
        const potentialParents0 = this.props.editedPerson.getValidPotentialParents(this.props.family, true);
        const potentialParents1 = this.props.editedPerson.getValidPotentialParents(this.props.family, false, true);
        const parentOptions0 = potentialParents0.map((potentialParent) =>
            <option value={potentialParent.id} key={potentialParent.id}>
                {potentialParent.getDisplayName() + ", born " + potentialParent.getDisplayDateBirth()}
            </option>
        );
        const parentOptions1 = potentialParents1.map((potentialParent) =>
            <option value={potentialParent.id} key={potentialParent.id}>
                {potentialParent.getDisplayName() + ", born " + potentialParent.getDisplayDateBirth()}
            </option>
        );

        return (
            <form>
                <div className="side_drawer_content_section">
                    <label htmlFor="name_first" className="word_input_label">First name:</label>
                    <input value={this.props.editedPerson.firstName} onChange={(e) => this.changeName(e, "firstName")} type="text" name="name_first" className="word_input side_drawer_input"/>

                    <label htmlFor="name_second" className="word_input_label">Second name:</label>
                    <input value={this.props.editedPerson.secondName} onChange={(e) => this.changeName(e, "secondName")} type="text" name="name_second" className="word_input side_drawer_input"/>

                    <label htmlFor="name_last" className="word_input_label">Last name:</label>
                    <input value={this.props.editedPerson.lastName} onChange={(e) => this.changeName(e, "lastName")} type="text" name="name_last" className="word_input side_drawer_input"/>

                    <label htmlFor="is_dead" className="checkbox_input_label">Deceased:</label>
                    <input checked={this.props.editedPerson.isDead} onChange={(e) => this.changeBool(e, "isDead")} type="checkbox" name="is_dead" className="checkbox_input side_drawer_input"/>
                </div>

                <div className="side_drawer_content_section">
                    <p className="side_drawer_full_line">Parents:</p>
                    <select name="parent_0" onChange={(e) => this.changeParents(e, 0)} value={(parentIndex0 >= 0) ? this.props.family[parentIndex0].getDisplayName() : "-"}>
                        <option value={undefined}>none</option>
                        {parentOptions0}
                    </select>
                    <select name="parent_1" onChange={(e) => this.changeParents(e, 1)} value={(parentIndex1 >= 0) ? this.props.family[parentIndex1].getDisplayName() : "-"}>
                        <option value={undefined}>none</option>
                        {parentOptions1}
                    </select>
                </div>

                <SpecialDateInput
                    date={this.props.editedPerson.dateBirth}
                    useFull={this.props.editedPerson.useFullDateBirth}
                    impreciseYear={this.props.editedPerson.unsurePreciseYearOfBirth}
                    unknownDate={this.props.editedPerson.unknownDateOfBirth}
                    dateOfStr={"birth"}
                    displayedDate={this.props.editedPerson.getDisplayDateBirth()}
                    handleChangeDate={this.changeDate}
                    handleChangeBool={this.changeBool}
                    propertySuffix={"Birth"}
                />

                {this.props.editedPerson.isDead && (
                    <SpecialDateInput
                        date={this.props.editedPerson.dateDeath}
                        useFull={this.props.editedPerson.useFullDateDeath}
                        unsurePreciseYear={this.props.editedPerson.unsurePreciseYearOfDeath}
                        unknownDate={this.props.editedPerson.unknownDateOfDeath}
                        dateOfStr={"death"}
                        displayedDate={this.props.editedPerson.getDisplayDateDeath()}
                        handleChangeDate={this.changeDate}
                        handleChangeBool={this.changeBool}
                        propertySuffix={"Death"}
                    />
                )}

                <div className="side_drawer_content_section">
                    <label htmlFor="cause_of_death" className="word_input_label">Cause of death:</label>
                    <input value={this.props.editedPerson.causeOfDeath} onChange={(e) => this.changeStr(e, "causeOfDeath")} type="text" name="cause_of_death" className="word_input side_drawer_input"/>

                    <label htmlFor="place_birth" className="word_input_label">Place of birth:</label>
                    <input value={this.props.editedPerson.placeBirth} onChange={(e) => this.changeStr(e, "placeBirth")} type="text" name="place_birth" className="word_input side_drawer_input"/>

                    <label htmlFor="place_death" className="word_input_label">Place of death:</label>
                    <input value={this.props.editedPerson.placeDeath} onChange={(e) => this.changeStr(e, "placeDeath")} type="text" name="place_death" className="word_input side_drawer_input"/>
                </div>
                
                <div className="side_drawer_content_section">
                    <label htmlFor="color_eye" className="word_input_label">Eye color:</label>
                    <input value={this.props.editedPerson.colorEyes} onChange={(e) => this.changeStr(e, "colorEyes")} type="text" name="color_eye" className="word_input side_drawer_input"/>

                    <label htmlFor="color_hair" className="word_input_label">Hair color:</label>
                    <input value={this.props.editedPerson.colorHair} onChange={(e) => this.changeStr(e, "colorHair")} type="text" name="color_hair" className="word_input side_drawer_input"/>

                    <div className="side_drawer_input_list">
                        <p className="side_drawer_full_line">Diseases and health problems:</p>
                        {healthProblemInputs}
                        <button type="button" onClick={this.changeNumberOfHealthProblems.bind(this, 1)}>+</button>
                        <button type="button" onClick={this.changeNumberOfHealthProblems.bind(this, -1)}>-</button>
                    </div>

                    <label htmlFor="notes" className="side_drawer_full_line">Notes:</label>
                    <textarea value={this.props.editedPerson.notes} onChange={this.changeNotes} name="notes" className="multiline_input side_drawer_input"/> 
                </div>
            </form>
        );
    }
}

export default EditMemberForm;