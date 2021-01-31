import React, { Component } from 'react';
import FamilyMemberExtension from './FamilyMemberExtension';
import '../App.css';
import IconBirth from './inline_icons/IconBirth';
import IconDeath from './inline_icons/IconDeath';
import IconEdit from './inline_icons/IconEdit';
import IconDelete from './inline_icons/IconDelete';

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


    onDelete(e)
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

    stopPropagation(e)
    {
        e.stopPropagation();
    }
    
    render()
    {
        //buttons that have an onclick need to laso have a onMouseDown that prevents propagation
        //to prevent starting dragging, since the drag is on a parent
        //it could also work with checking target vs current target on onStartDrag
        return (
            <div className={"family_member family_member_zoom_" + this.props.zoomLvl} onMouseDown={this.props.startDrag.bind(this, this.props.person.id)} style={this.calcCssPosObj()} onTouchStart={this.props.startDrag.bind(this, this.props.person.id)}>
                <div className="family_member_bar">
                    <button className="family_member_task_button" onClick={this.props.startEdit.bind(this, this.props.person.id)} onMouseDown={this.stopPropagation} onTouchStart={this.stopPropagation}>
                        <IconEdit className="family_member_task_icon"/>
                    </button>
                    <button className="family_member_task_button family_member_task_button_with_text" onClick={this.props.familyHandlers.handleAddFamMember.bind(this, "child", this.props.person.id)} onMouseDown={this.stopPropagation} onTouchStart={this.stopPropagation}>
                        ADD CHILD
                    </button>
                    <button className="family_member_task_button family_member_task_button_with_text" onClick={this.props.familyHandlers.handleAddFamMember.bind(this, "parent", this.props.person.id)} onMouseDown={this.stopPropagation} onTouchStart={this.stopPropagation}>
                        ADD PARENT
                    </button>
                    <button className="family_member_task_button" onClick={this.onDelete} onMouseDown={this.stopPropagation} onTouchStart={this.stopPropagation}>
                        <IconDelete className="family_member_task_icon"/>
                    </button>
                </div>
                <div className="family_member_name_wrapper">
                    <p className={"family_member_name" + (this.props.person.getDisplayName().length > 35 ? " family_member_name_shrinked" : "")}>
                        {this.props.person.getDisplayName()}
                    </p>
                </div>
                <p className="family_member_info family_member_info_single_line">
                    <IconBirth className="family_member_icon"/>
                    {this.props.person.getDisplayDateBirth()}
                </p>
                {
                    this.props.person.isDead === true && 
                    <p className="family_member_info family_member_info_single_line">
                        <IconDeath className="family_member_icon"/>
                        {this.props.person.getDisplayDateDeath()}
                    </p>
                }

                <button className="family_member_extend" onClick={this.toggleExtend} onMouseDown={this.stopPropagation} onTouchStart={this.stopPropagation}>
                    {(this.state.extended === true) ? "HIDE DETAILS" : "SHOW DETAILS"}
                </button>
                {this.state.extended === true && <FamilyMemberExtension person={this.props.person}/>}
            </div>
        );
    }
}

export default FamilyMember;