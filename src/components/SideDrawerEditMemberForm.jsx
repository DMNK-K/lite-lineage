import React, { Component } from 'react';
import '../App.css';
import Person from '../Person';
import SelectParent from './SelectParent';
import SpecialDateInput from './SpecialDateInput';

class EditMemberForm extends Component
{
    #noneSign = "-";

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
        this.changeParents = this.changeParents.bind(this);
    }

    //there's a bunch of similar methods, because might need different processing for different types later
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

    changeParents(newParentId, parentIndex)
    {
        // console.log("newParentId: " + newParentId + " for parentIndex: " + parentIndex);
        if (parentIndex === 0 || parentIndex === 1)
        {
            const draftPerson = Person.cloneFromOther(this.props.editedPerson);
            draftPerson["parentId" + parentIndex] = (newParentId === this.#noneSign) ? null : parseInt(newParentId, 10);
            // console.log("draftPerson new parent: " + draftPerson["parentId" + parentIndex]);
            this.props.handleEdit(this.props.editedPerson.id, draftPerson);
        }
        else
        {
            console.error("invalid parentIndex, should be 0 or 1: " + parentIndex);
        }
    }

    changeHealthProblem(e, problemId)
    {
        problemId = parseInt(problemId, 10);
        const index = this.props.editedPerson.healthProblems.findIndex(item => item.id === problemId);
        // console.log(e);
        if (this.props.editedPerson.healthProblems.length > index && index >= 0)
        {
            const draftPerson = Person.cloneFromOther(this.props.editedPerson);
            draftPerson.healthProblems[index] = {text: e.target.value, id: problemId};
            this.props.handleEdit(this.props.editedPerson.id, draftPerson);
        }
    }

    changeNumberOfHealthProblems(n)
    {
        if (n === 0){return;}
        if (n === -1 && this.props.editedPerson.healthProblems.length < 1){return;}

        const draftPerson = Person.cloneFromOther(this.props.editedPerson);
        if (n > 0)
        {
            draftPerson.healthProblems.push({text:"", id: draftPerson.getUnusedHealthProblemId()});
        }
        else
        {
            draftPerson.healthProblems.splice(-1, 1);
        }
        this.props.handleEdit(this.props.editedPerson.id, draftPerson);
    }

    component

    render()
    {
        const healthProblemInputs = this.props.editedPerson.healthProblems.map((problem) => (
            <div className="side_drawer_row" key={"hp_" + problem.id}>
                <input value={problem.text} onChange={(e)=>this.changeHealthProblem(e, problem.id)} type="text" name={"health_problem_" + problem.id} className="word_input side_drawer_input"/>
            </div>
        ));

        const potentialParents0 = this.props.editedPerson.getValidPotentialParents(this.props.family, true, false);
        const potentialParents1 = this.props.editedPerson.getValidPotentialParents(this.props.family, false, true);
        const currentParents = this.props.editedPerson.getCurrentParents(this.props.family);

        return (
            <div>
                <div className="side_drawer_content_section">
                    <div className="side_drawer_row">
                        <label htmlFor="name_first" className="word_input_label">First name:</label>
                        <input value={this.props.editedPerson.firstName} onChange={(e) => this.changeName(e, "firstName")} type="text" name="name_first" className="word_input side_drawer_input"/>
                    </div>

                    <div className="side_drawer_row">
                        <label htmlFor="name_second" className="word_input_label">Second name:</label>
                        <input value={this.props.editedPerson.secondName} onChange={(e) => this.changeName(e, "secondName")} type="text" name="name_second" className="word_input side_drawer_input"/>
                    </div>

                    <div className="side_drawer_row">
                        <label htmlFor="name_last" className="word_input_label">Last name:</label>
                        <input value={this.props.editedPerson.lastName} onChange={(e) => this.changeName(e, "lastName")} type="text" name="name_last" className="word_input side_drawer_input"/>
                    </div>

                    <div className="side_drawer_row">
                        <label htmlFor="is_dead" className="checkbox_input_label">Deceased:</label>
                        <input checked={this.props.editedPerson.isDead} onChange={(e) => this.changeBool(e, "isDead")} type="checkbox" name="is_dead" className="checkbox_input side_drawer_input"/>
                    </div>
                </div>

                <div className="side_drawer_content_section">
                    <div className="side_drawer_row">Parents:
                        <SelectParent handleChange={this.changeParents} currentParent={currentParents[0]} potentialParents={potentialParents0} parentSlotIndex={0} noneSign={this.#noneSign}/>
                        <SelectParent handleChange={this.changeParents} currentParent={currentParents[1]} potentialParents={potentialParents1} parentSlotIndex={1} noneSign={this.#noneSign}/>
                    </div>
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
                    disabled={false}
                />

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
                    disabled={!this.props.editedPerson.isDead}
                />

                <div className="side_drawer_content_section">
                    <div className="side_drawer_row">
                    <label htmlFor="cause_of_death" className={"word_input_label" + ((this.props.editedPerson.isDead) ? "" : " label_disabled")}>Cause of death:</label>
                    <input disabled={!this.props.editedPerson.isDead} value={this.props.editedPerson.causeOfDeath} onChange={(e) => this.changeStr(e, "causeOfDeath")} type="text" name="cause_of_death" className="word_input side_drawer_input"/>
                    </div>

                    <div className="side_drawer_row">
                    <label htmlFor="place_birth" className="word_input_label">Place of birth:</label>
                    <input value={this.props.editedPerson.placeBirth} onChange={(e) => this.changeStr(e, "placeBirth")} type="text" name="place_birth" className="word_input side_drawer_input"/>
                    </div>

                    <div className="side_drawer_row">
                    <label htmlFor="place_death" className={"word_input_label" + ((this.props.editedPerson.isDead) ? "" : " label_disabled")}>Place of death:</label>
                    <input disabled={!this.props.editedPerson.isDead} value={this.props.editedPerson.placeDeath} onChange={(e) => this.changeStr(e, "placeDeath")} type="text" name="place_death" className="word_input side_drawer_input"/>
                    </div>
                </div>
                
                <div className="side_drawer_content_section">
                    <div className="side_drawer_row">
                    <label htmlFor="color_eye" className="word_input_label">Eye color:</label>
                    <input value={this.props.editedPerson.colorEyes} onChange={(e) => this.changeStr(e, "colorEyes")} type="text" name="color_eye" className="word_input side_drawer_input"/>
                    </div>

                    <div className="side_drawer_row">
                    <label htmlFor="color_hair" className="word_input_label">Hair color:</label>
                    <input value={this.props.editedPerson.colorHair} onChange={(e) => this.changeStr(e, "colorHair")} type="text" name="color_hair" className="word_input side_drawer_input"/>
                    </div>
                </div>

                <div className="side_drawer_content_section">
                    <div className="side_drawer_input_list">
                        <p className="side_drawer_row">Diseases and health problems:</p>
                        {healthProblemInputs}
                        <div className="side_drawer_row">
                            <button type="button" onClick={this.changeNumberOfHealthProblems.bind(this, 1)}>ADD</button>
                            <button type="button" onClick={this.changeNumberOfHealthProblems.bind(this, -1)}>REMOVE</button>
                        </div>
                    </div>

                    <label htmlFor="notes" className="side_drawer_row">Notes:</label>
                    <textarea value={this.props.editedPerson.notes} onChange={this.changeNotes} name="notes" className="multiline_input side_drawer_input"/> 
                </div>
            </div>
        );
    }
}

export default EditMemberForm;