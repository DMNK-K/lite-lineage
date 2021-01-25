import React, { Component } from 'react';
import IconSelect from '../icons/icon_select.svg'
class SelectParent extends Component
{
    //regular select tag in firefox has problems and its hard to get it working the same way as in chrome
    //so custom select here
    constructor(props)
    {
        super(props);
        this.state = {open: false}
        this.getLabel = this.getLabel.bind(this);
        this.toggleTray = this.toggleTray.bind(this);
        this.closeTray = this.closeTray.bind(this);
        this.clickOption = this.clickOption.bind(this);
    }

    getLabel(person)
    {
        return (person) ? person.getDisplayName() + ", born: " + person.getDisplayDateBirth() : this.props.noneSign;
    }

    toggleTray()
    {
        this.setState(prevState => ({open: !prevState.open}));
    }

    closeTray()
    {
        this.setState({open: false});
    }

    clickOption(newParentId)
    {
        // this.closeTray();
        this.props.handleChange(newParentId, this.props.parentSlotIndex);
    }

    render()
    {
        const options = this.props.potentialParents.map((potentialParent) =>
            <button onClick={()=>this.clickOption(potentialParent.id)} key={potentialParent.id}>{this.getLabel(potentialParent)}</button>
        );

        // console.log(this.props.currentParent);

        return (
            <div className="parent_select" onClick={this.toggleTray}>
                <p>{(this.props.currentParent) ? this.getLabel(this.props.currentParent) : this.props.noneSign}</p>
                <img alt="select arrow" src={IconSelect} className="parent_select_arrow"/>
                {this.state.open && <div className="parent_select_tray">
                    <button onClick={()=>this.clickOption(this.props.noneSign)}>{this.props.noneSign}</button>
                    {options}
                </div> } 
            </div>
        );
    }
}

export default SelectParent;