import React, { Component } from 'react';
import FamilyMemberExtension from './FamilyMemberExtension';
import '../App.css';
import IconDelete from '../icons/icon_delete.svg';
import IconBirth from '../icons/icon_birth.svg';
import IconDeath from '../icons/icon_death.svg';
import IconDrag from '../icons/icon_drag.svg';
import IconEdit from '../icons/icon_edit.svg';

class FamilyMember extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {extended: false}

        this.toggleExtend = this.toggleExtend.bind(this);
    }

    toggleExtend()
    {
        this.setState({extended: !this.state.extended});
    }
    
    render()
    {
        return (
            <div className="family_member">
                <div className="family_member_dragger">
                    <img src={IconDrag}/>
                </div>
                <div className="family_member_bar">
                    <button className="family_member_task_button"><img src={IconEdit} className="family_member_task_icon"/></button>
                    <button className="family_member_task_button family_member_task_button_with_text">ADD CHILD</button>
                    <button className="family_member_task_button family_member_task_button_with_text">ADD PARENT</button>
                    <button className="family_member_task_button" onClick={this.props.familyHandlers.handleDeleteFamMember.bind(this, this.props.person.id)}>
                        <img src={IconDelete} className="family_member_task_icon"/>
                    </button>
                </div>
                <div className="family_member_name_wrapper">
                    <p className="family_member_name">{this.props.person.getDisplayName()}</p>
                </div>
                <p className="family_member_info"><img src={IconBirth} className="family_member_icon"/>20.06.1955</p>
                <p className="family_member_info"><img src={IconDeath} className="family_member_icon"/>14.11.2003</p>

                <button className="family_member_extend" onClick={this.toggleExtend}>{(this.state.extended === true) ? "HIDE DETAILS" : "SHOW DETAILS"}</button>
                {this.state.extended === true && <FamilyMemberExtension/>}
            </div>
        );
    }
}

export default FamilyMember;