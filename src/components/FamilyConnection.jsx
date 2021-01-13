import React, { Component } from 'react';

class FamilyConnection extends Component
{
    constructor(props)
    {
        super(props);
        //this.state = {}
    }
    
    render()
    {
        const coords = {
            x1: this.props.personA.locationInTreeX * this.props.locationScale + this.props.lineCenteringOffset.x,
            y1: this.props.personA.locationInTreeY * this.props.locationScale + this.props.lineCenteringOffset.y,

            x2: this.props.personB.locationInTreeX * this.props.locationScale + this.props.lineCenteringOffset.x,
            y2: this.props.personB.locationInTreeY * this.props.locationScale + this.props.lineCenteringOffset.y
        };

        return (
            <line {...coords} stroke={"white"}></line>
        );
    }
}

export default FamilyConnection;