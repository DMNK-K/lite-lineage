import React, { Component } from 'react';

class FamilyConnection extends Component
{
    constructor(props)
    {
        super(props);
        //this.state = {}
        this.calcCoords = this.calcCoords.bind(this);
    }

    calcCoords()
    {
        //there are only 2 types of connections between family members, either between parents and children
        //or between 1 parent and the other one
        if (this.props.personA1 && this.props.personA2 && !this.props.personB)
        {
            //it's a connection between one parent and the other, so the coords are simply a line between them
            return {
                x1: this.props.personA1.locationInTreeX * this.props.locationScale + this.props.lineCenteringOffset.x,
                y1: this.props.personA1.locationInTreeY * this.props.locationScale + this.props.lineCenteringOffset.y,

                x2: this.props.personA2.locationInTreeX * this.props.locationScale + this.props.lineCenteringOffset.x,
                y2: this.props.personA2.locationInTreeY * this.props.locationScale + this.props.lineCenteringOffset.y
            }
        }
        else
        {
            //its a connection between parent/parents and the child
            if (this.props.personA2)
            {
                //both parents are provided
                
            }
            else
            {
                //only 1 is provided
            }
        }
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