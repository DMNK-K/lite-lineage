import React, { Component } from 'react';
import V2 from '../../geo/V2';
class FamilyConnection extends Component
{
    constructor(props)
    {
        super(props);
        //this.state = {}
        this.calcCoords = this.calcCoords.bind(this);
        this.coordsToStr = this.coordsToStr.bind(this);
        this.convertLocation = this.convertLocation.bind(this);
    }

    convertLocation(loc)
    {
        return loc.mult(this.props.locationScale).add(new V2(this.props.lineCenteringOffset.x, this.props.lineCenteringOffset.y));
    }

    coordsToStr(coords)
    {
        let str = "";
        console.log(coords);
        for (let i = 0; i < coords.length; i++)
        {
            str += coords[i].x + "," + coords[i].y + " ";
        }
        str = str.slice(0, -1);
        console.log(str);
        return str;
    }

    calcCoords()
    {
        let locA1 = (this.props.personA1) ? new V2(this.props.personA1.locationInTreeX, this.props.personA1.locationInTreeY) : null;
        let locA2 = (this.props.personA2) ? new V2(this.props.personA2.locationInTreeX, this.props.personA2.locationInTreeY) : null;
        let locB = (this.props.personB) ? new V2(this.props.personB.locationInTreeX, this.props.personB.locationInTreeY) : null;
        
        //there are only 2 types of connections between family members, either between parents and children
        //or between 1 parent and the other one
        if (this.props.personA1 && this.props.personA2 && !this.props.personB)
        {
            //it's a connection between one parent and the other, so the coords are simply a line between them
            return [this.convertLocation(locA1), this.convertLocation(locA2)];
        }
        else
        {
            //its a connection between parent/parents and the child
            const endPoint = this.convertLocation(locB);
            let bend1, bend2, bendY;
            if (this.props.personA2)
            {
                //both parents are provided
                const halfwayParentsPoint = V2.getPointBetween(this.convertLocation(locA1), this.convertLocation(locA2), 0.5);
                bendY = endPoint.y + 0.5 * (halfwayParentsPoint.y - endPoint.y)
                bend1 = new V2(halfwayParentsPoint.x, bendY);
                bend2 = new V2(endPoint.x, bendY);
                return [halfwayParentsPoint, bend1, bend2, endPoint];
            }
            else
            {
                //only 1 parent is provided
                const parentPoint = (this.props.personA1) ? this.convertLocation(locA1) : this.convertLocation(locA2);
                bendY = endPoint.y + 0.5 * (parentPoint.y - endPoint.y);
                bend1 = new V2(parentPoint.x, bendY);
                bend2 = new V2(endPoint.x, bendY);
                return [parentPoint, bend1, bend2, endPoint];
            }
        }
    }
    
    render()
    {
        const coords = this.calcCoords();

        return (
            <polyline points={this.coordsToStr(coords)} fill="none" stroke={(this.props.personB) ? "white" : "orange"}></polyline>
        );
    }
}

export default FamilyConnection;