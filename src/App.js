// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import React, { Component } from 'react';

class App extends Component
{
  constructor(props)
  {
      super(props);
      this.state = {isInTree: false, family: null}
  }

  openTree()
  {
    
  }

  render()
  {
    return (
      <div className="app">
        <Header isInTree={this.state.isInTree}/>
        <Content isInTree={this.state.isInTree}/>
        <Footer/>
      </div>
    );
  }
}

export default App;