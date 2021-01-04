import React, { Component } from 'react';
import FamilyMemberExtension from './FamilyMemberExtension';
import '../App.css';

class FamilyMember extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {extended: false}
        
    }
    
    render()
    {
        return (
            <div className="family_member">
                <div className="family_member_dragger">
                    <img src="icon_drag.svg"/>
                </div>
                <div className="family_member_bar">
                    <button className="family_member_task_button"><img src="icon_edit.svg" className="family_member_task_icon"/></button>
                    <button className="family_member_task_button family_member_task_button_with_text">ADD CHILD</button>
                    <button className="family_member_task_button family_member_task_button_with_text">ADD PARENT</button>
                    <button className="family_member_task_button"><img src="icon_delete.svg" className="family_member_task_icon"/></button>
                </div>
                <div className="family_member_name_wrapper">
                    <p className="family_member_name">Daniel Naroditsky</p>
                </div>
                <p className="family_member_info"><img src="icon_birth.svg" className="family_member_icon"/>20.06.1955</p>
                <p className="family_member_info"><img src="icon_death.svg" className="family_member_icon"/>14.11.2003</p>

                <button className="family_member_extend">{(this.state.extended === true) ? "HIDE DETAILS" : "SHOW DETAILS"}</button>
                {(this.state.extended === true && <FamilyMemberExtension/>)}
            </div>
        );
    }
}

export default FamilyMember;