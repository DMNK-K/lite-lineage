import React, { Component } from 'react';
import '../App.css';

class FamilyMemberExtension extends Component
{
    constructor(props)
    {
        super(props);
        //this.state = {}
    }
    
    render()
    {
        return (
            <div className="family_member_extended">
                <p className="family_member_info">Eye color: brown</p>
                <p className="family_member_info">Hair color: black</p>
                <p className="family_member_info"></p>
            </div>
        );
    }
}

export default FamilyMemberExtension;