import React, { Component, Fragment } from 'react';
import '../App.css';

class FamilyMemberExtension extends Component
{
    render()
    {
        return (
            <div className="family_member_extended" onMouseDown={(e)=>(e.stopPropagation())}>
                <p className="family_member_info">Place of birth: {this.props.person.placeBirth}</p>
                {this.props.person.isDead && 
                <Fragment>
                    <p className="family_member_info">Place of death: {this.props.person.placeDeath}</p>
                    <p className="family_member_info">Cause of death: {this.props.person.causeOfDeath}</p>
                </Fragment>
                }
                <p className="family_member_info">Eye color: {this.props.person.colorEyes}</p>
                <p className="family_member_info">Hair color: {this.props.person.colorHair}</p>
                <p className="family_member_info">Health problems: {this.props.person.getHealthProblemsText().join(", ")}</p>
                <p className="family_member_info">Notes: {this.props.person.notes}</p>
            </div>
        );
    }
}

export default FamilyMemberExtension;