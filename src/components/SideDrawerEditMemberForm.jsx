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
        const possibleVariants = ["placeBirth", "placeDeath", "causeOfDeath", "colorEyes", "colorHair"];
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

    changeBool(e, propertyName)
    {
        const draftPerson = Person.cloneFromOther(this.props.editedPerson);
        const possibleVariants = ["isDead", "lastName", "secondName", "useFullDateBirth", "useFullDateDeath", "unsurePreciseYearOfBirth", "unsurePreciseYearOfDeath"];
        if (possibleVariants.includes(propertyName) && draftPerson.hasOwnProperty(propertyName))
        {
            draftPerson[propertyName] = e.target.checked;
            this.props.handleEdit(this.props.editedPerson.id, draftPerson);
        }
        else
        {
            console.error("propertyName:" + propertyName + " not recognized as a possible variant, or is not an own property of a Person obj");
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

    render()
    {
        return (
            <form>
                <div className="side_drawer_content_section">
                    <label htmlFor="name_first" className="word_input_label">First name:</label>
                    <input value={this.props.editedPerson.firstName} onChange={(e) => this.changeName(e, "firstName")} type="text" name="name_first" className="word_input side_drawer_input"/>

                    <label htmlFor="name_second" className="word_input_label">Second name:</label>
                    <input value={this.props.editedPerson.secondName} onChange={(e) => this.changeName(e, "secondName")} type="text" name="name_second" className="word_input side_drawer_input"/>

                    <label htmlFor="name_last" className="word_input_label">Last name:</label>
                    <input value={this.props.editedPerson.lastName} onChange={(e) => this.changeName(e, "lastName")} type="text" name="name_last" className="word_input side_drawer_input"/>
                </div>

                <SpecialDateInput
                    date={this.props.editedPerson.dateBirth}
                    useFull={this.props.editedPerson.useFullDateBirth}
                    impreciseYear={this.props.editedPerson.unsurePreciseYearOfBirth}
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
                        dateOfStr={"death"}
                        displayedDate={this.props.editedPerson.getDisplayDateDeath()}
                        handleChangeDate={this.changeDate}
                        handleChangeBool={this.changeBool}
                        propertySuffix={"Death"}
                    />
                )}

                <div className="side_drawer_content_section">
                    <label htmlFor="is_dead" className="checkbox_input_label">Deceased:</label>
                    <input checked={this.props.editedPerson.isDead} onChange={(e) => this.changeBool(e, "isDead")} type="checkbox" name="is_dead" className="checkbox_input side_drawer_input"/>

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
                        <input type="text" name="disease_0" className="word_input side_drawer_input"/>
                        <input type="text" name="disease_1" className="word_input side_drawer_input"/>
                        <input type="text" name="disease_2" className="word_input side_drawer_input"/>
                        <button>+</button>
                        <button>-</button>
                    </div>

                    <label htmlFor="notes" className="side_drawer_full_line">Notes:</label>
                    <textarea value={this.props.editedPerson.notes} onChange={this.changeNotes} name="notes" className="multiline_input side_drawer_input"/> 
                </div>
            </form>
        );
    }
}

export default EditMemberForm;