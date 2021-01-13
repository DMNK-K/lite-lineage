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
      this.handleEditFamMember = this.handleEditFamMember.bind(this);

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
        handleEditFamMember: this.handleEditFamMember,
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

    const newTreeNames = [...this.state.treeNames];
    const i = newTreeNames.indexOf(oldTreeName);
    if (i >= 0)
    {
      newTreeNames[i] = newTreeName;

      const copyOfCurrentTree = FamilyTree.cloneFromOther(this.state.currentTree);
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
      //since a person might be added as a child or parent of some other exisitng person
      //this needs to be updated in those family members too
      //they can be mutated directly since a whole tree will be assigned in setState anyway
      if (person.parentId0 != undefined)
      {
        const parentIndex = newFamily.findIndex(item => item.id == person.parentId0);
        if (parentIndex >= 0)
        {
          //making the parent of newly added person have its id in childrenIds[]
          newFamily[parentIndex].childrenIds.push(person.id);
        }
      }
      for(let i = 0; i < person.childrenIds.length; i++)
      {
        const childIndex = newFamily.findIndex(item => item.id == person.childrenIds[i]);
        if (childIndex >= 0)
        {
          //making the i-th child of newly added person have its id in one of the 2 parent slots
          //it will override the second parent if both are taken
          if (newFamily[childIndex].parentId0 == undefined)
          {
            newFamily[childIndex].parentId0 = person.id;
          }
          else
          {
            newFamily[childIndex].parentId1 = person.id;
          }
        }
      }
      const draftTree = FamilyTree.cloneFromOther(this.state.currentTree);
      draftTree.family = newFamily;
      this.setState(
        {
          currentTree: draftTree,
        },
        () => {this.state.currentTree.save(); console.log(this.state.currentTree.family.length);}
      );
    }
  }

  handleAddFamMember(mode = "default", anchorPersonId)
  {
    if (!this.state.currentTree){return;}
    const viableModes = ["default", "parent", "child"];
    if (viableModes.includes(mode))
    {
      const newId = this.state.currentTree.findLowestUnusedFamilyMemberId();  
      const newPerson = new Person(newId);
      if (anchorPersonId !== undefined && anchorPersonId >= 0)
      {
        let loc;
        if(mode === "parent")
        {
          newPerson.childrenIds.push(anchorPersonId);
          loc = this.state.currentTree.findFreeLocationUpwards(anchorPersonId, 4, 2);
        }
        else if(mode === "child")
        {
          newPerson.parentId0 = anchorPersonId;
          loc = this.state.currentTree.findFreeLocationDownwards(anchorPersonId, 4, 2);
        }
        else
        {
          loc = this.state.currentTree.findFreeLocationNearby(anchorPersonId, 4, 2, 100, 100);
        }
        console.log(loc);
        newPerson.locationInTreeX = loc.x;
        newPerson.locationInTreeY = loc.y;
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
    //edited data should already be validated before it gets here
    //console.log("handling edit of person with id: " + personId + " (should match this one: "+ replacerPersonObj.id +")");
    const newFamily = [...this.state.currentTree.family];
    const i = newFamily.findIndex(item => item.id == personId);
    if (i >= 0)
    {
      newFamily[i] = replacerPersonObj;
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