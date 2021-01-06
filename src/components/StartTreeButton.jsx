import React, { Component } from 'react';
import IconDelete from '../icons/icon_delete.svg';
class StartTreeButton extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {tryingToDelete: false}
        this.handleCancelingDelete = this.handleCancelingDelete.bind(this);
        this.handleTryingToDelete = this.handleTryingToDelete.bind(this);
    }

    handleTryingToDelete()
    {
        this.setState({tryingToDelete: true});
    }

    handleCancelingDelete()
    {
        this.setState({tryingToDelete: false});
    }
    
    render()
    {
        const confirmation = (
            <div className="start_button_delete_confirmation">
                <p>{"Do you really want to delete " + this.props.treeName}</p>
                <button onClick={this.props.handleDeleteTree.bind(this, this.props.treeName)}>YES</button>
                <button onClick={this.handleCancelingDelete}>NO</button>
            </div>
        );

        return (
            <div className="start_button_wrapper">
                <button onClick={this.props.handleOpenTree.bind(this, this.props.treeName)} className="start_button">
                    {this.props.treeName}
                </button>
                <button onClick={this.handleTryingToDelete} className="start_button_delete">
                    <img src={IconDelete}/>
                </button>
                {(this.state.tryingToDelete === true && confirmation)}
            </div>
        );
    }
}

export default StartTreeButton;