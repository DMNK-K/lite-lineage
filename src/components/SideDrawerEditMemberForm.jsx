import React, { Component } from 'react';

class EditMemberForm extends Component
{
    constructor(props)
    {
        super(props);
        //this.state = {}
    }
    
    render()
    {
        return (
            <form>
                <div class="side_drawer_content_section">
                    <label for="name_first" class="word_input_label">First name:</label>
                    <input type="text" name="name_first" class="word_input side_drawer_input"></input>

                    <label for="name_second" class="word_input_label">Second name:</label>
                    <input type="text" name="name_second" class="word_input side_drawer_input"></input>

                    <label for="name_last" class="word_input_label">Last name:</label>
                    <input type="text" name="name_last" class="word_input side_drawer_input"></input>
                </div>

                <div class="side_drawer_content_section">
                    <p class="side_drawer_full_line">Date of death:</p>
                    <label for="death_day" class="date_input_label">dd:</label>
                    <input type="number" name="death_day" class="date_input side_drawer_input"></input>
                    <label for="death_month" class="date_input_label">mm:</label>
                    <input type="number" name="death_month" class="date_input side_drawer_input"></input>
                    <label for="death_year" class="date_input_label">yyyy:</label>
                    <input type="number" name="death_year" class="date_input side_drawer_input"></input>
                    <p class="side_drawer_full_line">Display date: 13.11.200X</p>

                    <label for="death_date_imprecise" class="checkbox_input_label">Uncertain of exact year:</label>
                    <input type="checkbox" name="death_date_imprecise" class="checkbox_input side_drawer_input"></input>
                    
                    <label for="death_date_full" class="checkbox_input_label">Use full date of death:</label>
                    <input type="checkbox" name="death_date_full" class="checkbox_input side_drawer_input"></input>

                    <label for="is_dead" class="checkbox_input_label">Deceased:</label>
                    <input type="checkbox" name="is_dead" class="checkbox_input side_drawer_input"></input>

                    <label for="cause_of_death" class="word_input_label">Cause of death:</label>
                    <input type="text" name="cause_of_death" class="word_input side_drawer_input"></input>

                    <label for="place_birth" class="word_input_label">Place of birth:</label>
                    <input type="text" name="place_birth" class="word_input side_drawer_input"></input>

                    <label for="place_death" class="word_input_label">Place of death:</label>
                    <input type="text" name="place_death" class="word_input side_drawer_input"></input>
                </div>
                
                <div class="side_drawer_content_section">
                    <label for="color_eye" class="word_input_label">Eye color:</label>
                    <input type="text" name="color_eye" class="word_input side_drawer_input"></input>

                    <label for="color_hair" class="word_input_label">Hair color:</label>
                    <input type="text" name="color_hair" class="word_input side_drawer_input"></input>

                    <div class="side_drawer_input_list">
                        <p class="side_drawer_full_line">Diseases and health problems:</p>
                        <input type="text" name="disease_0" class="word_input side_drawer_input"></input>
                        <input type="text" name="disease_1" class="word_input side_drawer_input"></input>
                        <input type="text" name="disease_2" class="word_input side_drawer_input"></input>
                        <button>+</button>
                        <button>-</button>
                    </div>

                    <label for="notes" class="side_drawer_full_line">Notes:</label>
                    <textarea name="notes" class="multiline_input side_drawer_input"></textarea>   
                </div>
            </form>
        );
    }
}

export default EditMemberForm;