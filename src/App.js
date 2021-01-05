// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import React, { Component } from 'react';
// import Cookies from 'js-cookies';
import FamilyTree from './FamilyTree';

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
        return treeObj.fillDataFromJSON(loadedTreeStr);
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
        //console.log(this.state);
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

  render()
  {
    return (
      <div className="app">
        <Header isInTree={this.state.isInTree}/>
        <Content {...this.state} handleNewTree={this.handleNewTree} handleDeleteTree={this.handleDeleteTree}/>
        <Footer/>
      </div>
    );
  }
}

export default App;