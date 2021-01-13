import React, { Component } from 'react';
import '../App.css';
import NavInFamily from './NavInFamily';
import TreeContext from '../TreeContext';

class Header extends Component
{
    static contextType = TreeContext;

    constructor(props)
    {
        super(props);
        this.state = {tempTreeName: "", editingTreeName: false}
        this.editTreeName = this.editTreeName.bind(this);
        this.endEditingTreeName = this.endEditingTreeName.bind(this);
        this.startEditingTreeName = this.startEditingTreeName.bind(this);
    }

    editTreeName(e)
    {
        const regex = /[^a-zA-Z0-9ąęćżźśńłóĄĘĆŻŹŚŃŁÓ\- _]/;
        if (!regex.test(e.target.value))
        {
            this.setState({tempTreeName: e.target.value});
        }
        
    }

    endEditingTreeName(e, isSubmit)
    {
        if (isSubmit)
        {
            e.preventDefault();
        }
        if (this.state.tempTreeName.length > 0)
        {
            this.context.treeHandlers.handleRenameTree(this.context.currentTree.treeName, this.state.tempTreeName);
        }
        this.setState({editingTreeName: false});
    }

    startEditingTreeName()
    {
        this.setState({editingTreeName: true, tempTreeName: this.context.currentTree.treeName});
    }

    render()
    {
        return(
        <header className="main_header">
            <h1>LiteLineage</h1>
            {this.context.isInTree === true && 
                <form onSubmit={(e) => this.endEditingTreeName(e, true)} className="header_tree_title_form">
                    <input
                        onFocus={this.startEditingTreeName}
                        onBlur={(e) => this.endEditingTreeName(e, false)}
                        value={(this.state.editingTreeName === true) ? this.state.tempTreeName : this.context.currentTree.treeName}
                        onChange={(e) => this.editTreeName(e)}
                        type="text"
                        name="tree_name"
                        className="header_tree_title"
                    ></input>
                </form>
            }
            
            {this.context.isInTree === true && <NavInFamily/>}
        </header>
        );
    }
}
 
export default Header;