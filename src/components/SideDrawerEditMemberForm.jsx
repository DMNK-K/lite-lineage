import React, { Component } from 'react';
import '../App.css';
import Person from '../Person';

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
    }

    changeBool(e, propertyName)
    {
        const draftPerson = Person.cloneFromOther(this.props.editedPerson);
        const possibleVariants = ["isDead", "lastName", "secondName"];
        if (possibleVariants.includes(propertyName) && draftPerson.hasOwnProperty(propertyName))
        {
            draftPerson[propertyName] = e.target.value;
            this.props.handleEdit(this.props.editedPerson.id, draftPerson);
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

                <div className="side_drawer_content_section">
                    <p className="side_drawer_full_line">Date of death:</p>
                    <label htmlFor="death_day" className="date_input_label">dd:</label>
                    <input type="number" name="death_day" className="date_input side_drawer_input"/>
                    <label htmlFor="death_month" className="date_input_label">mm:</label>
                    <input type="number" name="death_month" className="date_input side_drawer_input"/>
                    <label htmlFor="death_year" className="date_input_label">yyyy:</label>
                    <input type="number" name="death_year" className="date_input side_drawer_input"/>
                    <p className="side_drawer_full_line">Displayed date: {this.props.editedPerson.getDisplayDateDeath()}</p>

                    <label htmlFor="death_date_imprecise" className="checkbox_input_label">Uncertain of exact year:</label>
                    <input type="checkbox" name="death_date_imprecise" className="checkbox_input side_drawer_input"/>
                    
                    <label htmlFor="death_date_full" className="checkbox_input_label">Use full date of death:</label>
                    <input type="checkbox" name="death_date_full" className="checkbox_input side_drawer_input"/>

                    <label htmlFor="is_dead" className="checkbox_input_label">Deceased:</label>
                    <input value={this.props.editedPerson.isDead} type="checkbox" name="is_dead" className="checkbox_input side_drawer_input"/>

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