import React, { Component } from 'react';

class ConnectionRenderer extends Component
{
    render()
    {
        return (
            <svg style={this.props.style}>{this.props.children}</svg>
        );
    }
}

export default ConnectionRenderer;