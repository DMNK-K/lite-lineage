import React, { Component } from 'react';

class ConnectionRenderer extends Component
{
    constructor(props)
    {
        super(props);
    }
    
    render()
    {
        return (
            <svg style={this.props.style}>{this.props.children}</svg>
        );
    }
}

export default ConnectionRenderer;