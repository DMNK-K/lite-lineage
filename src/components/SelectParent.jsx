import React, { Component } from 'react';

class SelectParent extends Component
{
    constructor(props)
    {
        super(props);
        //this.state = {}
        this.getLabel = this.getLabel.bind(this);
    }

    getLabel(person)
    {
        return (person) ? person.getDisplayName() + ", born: " + person.getDisplayDateBirth() : this.props.noneSign;
    }

    render()
    {
        const options = this.props.potentialParents.map((potentialParent) =>
            <option key={potentialParent.id} value={potentialParent.id}>{this.getLabel(potentialParent)}</option>
        );

        console.log(this.props.currentParent);

        return (
            <select onChange={(e) => this.props.handleChange(e, this.props.parentSlotIndex)} value={(this.props.currentParent) ? this.props.currentParent.id : this.props.noneSign}>
                <option value={this.props.noneSign}>{this.props.noneSign}</option>
                {options}
            </select>
        );
    }
}

export default SelectParent;