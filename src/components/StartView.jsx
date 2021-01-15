import React, { Component } from 'react';
import '../App.css';
import StartTreeButton from './StartTreeButton';
import TreeContext from '../TreeContext';
import FamilyTree from '../FamilyTree';

class StartView extends Component
{
    static contextType = TreeContext;

    constructor(props)
    {
        super(props);
        //this.state = {tryingToDeleteTree: false}
        this.fileInput = React.createRef();
        this.openFileImport = this.openFileImport.bind(this);
        this.onChooseImport = this.onChooseImport.bind(this);
        this.onReadImport = this.onReadImport.bind(this);
    }

    openFileImport()
    {
        this.fileInput.current.click();
    }

    onChooseImport(e)
    {
        if (e.target.files.length > 0)
        {
            const file = e.target.files[0];
            console.log(file);
            const blob = new Blob([file], {type : 'application/json'});
            const reader = new FileReader();
            reader.addEventListener("load", e => this.onReadImport(reader.result));
            reader.readAsText(blob);
        }
    }

    onReadImport(fileReaderResult)
    {
        const obj = JSON.parse(fileReaderResult);
        // console.log(obj);
        if (obj.hasOwnProperty("treeName") && obj.hasOwnProperty("family") && obj.hasOwnProperty("creationDate"))
        {
            const newTree = new FamilyTree("imported", new Date(), []);
            newTree.fillDataFromParsedJSON(obj);
            this.context.treeHandlers.handleImportTree(newTree);
        }
    }

    render()
    { 
        const treeButtons = this.context.treeNames.map((treeName) =>
            <StartTreeButton treeName={treeName} key={treeName}/>
        );

        return (
            <div className="start_view">
                <div className="start_box">
                    <h2>Welcome to LiteLineage</h2>
                    <p className="start_desc">A simple tool for making family trees, with all key family data kept on your machine and no need to create an account. To begin, create a new tree, or pick an existing one.</p>
                    <div className="start_button_tray">
                        {treeButtons}
                        <div className="start_button_wrapper">
                            <button className="start_button start_button_special" onClick={this.context.treeHandlers.handleNewTree}>NEW TREE</button>
                        </div>
                        <div className="start_button_wrapper">
                            <button className="start_button start_button_special" onClick={this.openFileImport}>
                                IMPORT . JSON FILE
                                <input onChange={(e) => this.onChooseImport(e)} ref={this.fileInput} type="file" accept=".json"></input>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default StartView;