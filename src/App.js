// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import React, { Component } from 'react';
import Cookies from 'js-cookies';
import FamilyTree from './FamilyTree';

class App extends Component
{
  constructor(props)
  {
      super(props);
      this.state = {
        treeNames = this.loadTreeNames(), //array of treeNames
        isInTree: false,
        currentTree: null //null when none loaded, otherwise an instance of FamilyTree class
      }
  }

  loadTreeNames()
  {
    const namesStr = localStorage.getItem("treeNames");
    const separator = "~";
    if (namesStr)
    {
      return namesStr.split(separator).filter(str => str != "");
    }
    else
    {
      return [];
    }
  }

  loadTree(treeName)
  {
    if (treeName)
    {
      const loadedTreeStr = localStorage.getItem(treeName);
      if (loadedTreeStr)
      {
        treeObj = new FamilyTree(treeName, Date(), []);
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

  newTree()
  {
    
  }

  render()
  {
    return (
      <div className="app">
        <Header isInTree={this.state.isInTree}/>
        <Content isInTree={this.state.isInTree} treeNames={this.state.treeNames} currentTree={this.state.currentTree}/>
        <Footer/>
      </div>
    );
  }
}

export default App;