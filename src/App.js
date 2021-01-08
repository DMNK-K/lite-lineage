// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import React, { Component } from 'react';
// import Cookies from 'js-cookies';
import FamilyTree from './FamilyTree';
import Person from './Person';
import TreeContext from './TreeContext';

class App extends Component
{
  constructor(props)
  {
      super(props);
      this.state = {
        treeNames: this.loadTreeNames(), //array of treeNames
        isInTree: false,
        currentTree: null //null when none loaded, otherwise an instance of FamilyTree class
      }
      this.handleNewTree = this.handleNewTree.bind(this);
      this.handleDeleteTree = this.handleDeleteTree.bind(this);
      this.handleExitTree = this.handleExitTree.bind(this);
      this.handleRenameTree = this.handleRenameTree.bind(this);
      this.handleOpenTree = this.handleOpenTree.bind(this);
      
      this.handleAddFamMember = this.handleAddFamMember.bind(this);
      this.handleDeleteFamMember = this.handleDeleteFamMember.bind(this);

      this.treeHandlers = {
        handleNewTree: this.handleNewTree,
        handleDeleteTree: this.handleDeleteTree,
        handleExitTree: this.handleExitTree,
        handleRenameTree: this.handleRenameTree,
        handleOpenTree: this.handleOpenTree,
      };

      //similar thing with this:
      this.familyHandlers = {
        handleAddFamMember: this.handleAddFamMember,
        handleDeleteFamMember: this.handleDeleteFamMember,
      };
  }

  loadTreeNames()
  {
    const namesStr = localStorage.getItem("treeNames");
    const separator = "~";
    if (namesStr)
    {
      return namesStr.split(separator).filter(str => str !== "");
    }
    else
    {
      return [];
    }
  }

  saveTreeNames()
  {
    localStorage.setItem("treeNames", this.state.treeNames.join("~"));
    //console.log("saved, " + this.state.treeNames.toString());
  }

  loadTree(treeName)
  {
    if (treeName)
    {
      const loadedTreeStr = localStorage.getItem(treeName);
      if (loadedTreeStr)
      {
        const treeObj = new FamilyTree(treeName, Date(), []);
        treeObj.fillDataFromJSON(loadedTreeStr);
        return treeObj;
      }
      else
      {
        console.error("Loading tree " + treeName + " failed, string from localStorage is falsey.");
        return null;
      }
    }
    else
    {
      console.error("Loading tree " + treeName + " failed, this name is falsey.");
      return null;
    }
  }

  handleNewTree()
  {
    //console.log("trying to make tree");
    const newName = FamilyTree.makeNewName(this.state.treeNames);
    const newTree = new FamilyTree(newName, Date(), []);
    this.setState({
      treeNames: [...this.state.treeNames, newName],
      currentTree: newTree,
      isInTree: true
    }, () => {
        this.saveTreeNames();
        newTree.save();
        console.log(this.state);
      }
    );
  }

  handleDeleteTree(nameOfTreeToDelete)
  {
    //console.log("trying to delete " + nameOfTreeToDelete);
    localStorage.removeItem(nameOfTreeToDelete);
    this.setState(
      {
        treeNames: this.state.treeNames.filter(item => item !== nameOfTreeToDelete)
      },
      () => {
        this.saveTreeNames();
        //console.log(this.state);
      }
    );
  }

  handleRenameTree(oldTreeName, newTreeName)
  {
    if (oldTreeName === newTreeName || this.state.currentTree.treeName !== oldTreeName || !this.state.treeNames.includes(oldTreeName) || this.state.treeNames.includes(newTreeName))
    {
      console.log("handleRenameTree was ignored.");
      return;
    }

    let newTreeNames = [...this.state.treeNames];
    const i = newTreeNames.indexOf(oldTreeName);
    newTreeNames[i] = newTreeName;

    let copyOfCurrentTree = {...this.state.currentTree};
    copyOfCurrentTree.treeName = newTreeName;
    this.setState(
      {
        treeNames: newTreeNames,
        currentTree: copyOfCurrentTree
      },
      () => {
        this.saveTreeNames();
        this.state.currentTree.save();
      }
    );
  }

  handleOpenTree(treeName)
  {
    const loaded = this.loadTree(treeName);
    if (loaded !== null)
    {
      this.setState({
        currentTree: loaded,
        isInTree: true
      });
    }
  }

  handleExitTree()
  {
    this.state.currentTree.save();
    this.setState({
      currentTree: null,
      isInTree: false
    });
  }

  addFamMember(person)
  {
    if (person)
    {
      console.log("Adding family member: " + person.getDisplayName() + ", id will be: " + person.id);
      const newFamily = [...this.state.currentTree.family, person];
      const draftTree = FamilyTree.cloneFromOther(this.state.currentTree);
      draftTree.family = newFamily;
      this.setState(
        {
          currentTree: draftTree,
        },
        () => {this.state.currentTree.save();}
      );
    }
  }

  handleAddFamMember(mode = "default", locationX, locationY, anchorPersonId)
  {
    if (!this.state.currentTree){return;}
    const viableModes = ["default", "parent", "child"];
    if (viableModes.includes(mode))
    {
      const newId = this.state.currentTree.findLowestUnusedFamilyMemberId();  
      const newPerson = new Person(newId);
      newPerson.locationInTreeX = locationX;
      newPerson.locationInTreeY = locationY;
      if (anchorPersonId !== undefined && anchorPersonId >= 0)
      {
        if(mode === "parent")
        {
          newPerson.childrenIds.push(anchorPersonId);
        }
        else if(mode === "child")
        {
          newPerson.parentId0 = anchorPersonId;
        }
      }
      this.addFamMember(newPerson);
    }
    else
    {
      console.error("Invalid mode of adding a family member.");
    }
  }

  handleEditFamMember(personId, replacerPersonObj)
  {

  }

  handleDeleteFamMember(personId)
  {
    const newFamily = [...this.state.currentTree.family];
    const i = newFamily.findIndex(item => item.id == personId);
    if (i >= 0)
    {
      newFamily.splice(i, 1);
      const draftTree = FamilyTree.cloneFromOther(this.state.currentTree);
      draftTree.family = newFamily;
      this.setState(
        {
          currentTree: draftTree,
        },
        () => {this.state.currentTree.save();}
      );
    }
  }

  render()
  {
    return (
      <TreeContext.Provider className="app" value={{...this.state, treeHandlers: this.treeHandlers, familyHandlers: this.familyHandlers}}>
        <Header/>
        <Content/>
        <Footer/>
      </TreeContext.Provider>
    );
  }
}

export default App;