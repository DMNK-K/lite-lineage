import React, { Component } from 'react';
import FamilyMemberExtension from './FamilyMemberExtension';
import '../App.css';
import IconDelete from '../icons/icon_delete.svg';
import IconBirth from '../icons/icon_birth.svg';
import IconDeath from '../icons/icon_death.svg';
import IconDrag from '../icons/icon_drag.svg';
import IconEdit from '../icons/icon_edit.svg';

//we don't want these ones to use context
class FamilyMember extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {extended: false}

        this.toggleExtend = this.toggleExtend.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    toggleExtend()
    {
        this.setState({extended: !this.state.extended});
    }

    onDelete()
    {
        this.props.familyHandlers.handleDeleteFamMember(this.props.person.id);
        this.props.reportDeletionToEdit(this.props.person.id);
    }

    calcCssPosObj()
    {
        const top = this.props.person.locationInTreeY * this.props.locationScale;
        const left = this.props.person.locationInTreeX * this.props.locationScale;
        return {top: top + "px", left: left + "px"}
    }
    
    render()
    {
        return (
            <div className={"family_member family_member_zoom_" + this.props.zoomLvl} style={this.calcCssPosObj()}>
                <div className="family_member_dragger" onMouseDown={this.props.startDrag.bind(this, this.props.person.id)}>
                    <img src={IconDrag}/>
                </div>
                <div className="family_member_bar">
                    <button className="family_member_task_button" onClick={this.props.startEdit.bind(this, this.props.person.id)}>
                        <img src={IconEdit} className="family_member_task_icon"/>
                    </button>
                    <button className="family_member_task_button family_member_task_button_with_text" onClick={this.props.familyHandlers.handleAddFamMember.bind(this, "child", this.props.person.id)}>
                        ADD CHILD
                    </button>
                    <button className="family_member_task_button family_member_task_button_with_text" onClick={this.props.familyHandlers.handleAddFamMember.bind(this, "parent", this.props.person.id)}>
                        ADD PARENT
                    </button>
                    <button className="family_member_task_button" onClick={this.onDelete.bind(this, this.props.person.id)}>
                        <img src={IconDelete} className="family_member_task_icon"/>
                    </button>
                </div>
                <div className="family_member_name_wrapper">
                    <p className="family_member_name">{this.props.person.getDisplayName()}</p>
                </div>
                <p className="family_member_info">
                    <img src={IconBirth} className="family_member_icon"/>
                    {this.props.person.getDisplayDateBirth()}
                </p>
                {
                    this.props.person.isDead === true && 
                    <p className="family_member_info">
                        <img src={IconDeath} className="family_member_icon"/>
                        {this.props.person.getDisplayDateDeath()}
                    </p>
                }

                <button className="family_member_extend" onClick={this.toggleExtend}>{(this.state.extended === true) ? "HIDE DETAILS" : "SHOW DETAILS"}</button>
                {this.state.extended === true && <FamilyMemberExtension/>}
            </div>
        );
    }
}

export default FamilyMember;