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
import Notice from './components/Notice';

class App extends Component
{
  constructor(props)
  {
      super(props);
      this.state = {
        treeNames: this.loadTreeNames(), //array of treeNames
        isInTree: false,
        currentTree: null, //null when none loaded, otherwise an instance of FamilyTree class
        defaultNewMemberLocation: {x: 1, y: 1},
        notices: {cookies: false}
      }
      this.handleWindowClose = this.handleWindowClose.bind(this);

      this.handleNewTree = this.handleNewTree.bind(this);
      this.handleImportTree = this.handleImportTree.bind(this);
      this.handleDeleteTree = this.handleDeleteTree.bind(this);
      this.handleExitTree = this.handleExitTree.bind(this);
      this.handleRenameTree = this.handleRenameTree.bind(this);
      this.handleOpenTree = this.handleOpenTree.bind(this);
      this.setDefaultNewFamMemberLocation = this.setDefaultNewFamMemberLocation.bind(this);

      this.handleAddFamMember = this.handleAddFamMember.bind(this);
      this.handleDeleteFamMember = this.handleDeleteFamMember.bind(this);
      this.handleEditFamMember = this.handleEditFamMember.bind(this);
      this.handleEditFamMembers = this.handleEditFamMembers.bind(this);

      this.toggleNotice = this.toggleNotice.bind(this);

      this.treeHandlers = {
        handleNewTree: this.handleNewTree,
        handleDeleteTree: this.handleDeleteTree,
        handleExitTree: this.handleExitTree,
        handleRenameTree: this.handleRenameTree,
        handleOpenTree: this.handleOpenTree,
        handleImportTree: this.handleImportTree,
        setDefaultNewFamMemberLocation: this.setDefaultNewFamMemberLocation,
      };

      //similar thing with this:
      this.familyHandlers = {
        handleAddFamMember: this.handleAddFamMember,
        handleDeleteFamMember: this.handleDeleteFamMember,
        handleEditFamMember: this.handleEditFamMember,
        handleEditFamMembers: this.handleEditFamMembers,
      };
  }

  componentDidMount()
  {
    window.addEventListener("beforeunload", this.handleWindowClose);
  }

  componentWillUnmount()
  {
    window.removeEventListener("beforeunload", this.handleWindowClose);
  }

  handleWindowClose()
  {
    if (this.state.isInTree)
    {
      this.state.currentTree.save();
    }
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
        // console.log(this.state);
      }
    );
  }

  handleImportTree(importedTree)
  {
    //imported tree might have a name identical to exisitng one, need to account for that
    let i = 1;
    const originalName = importedTree.treeName;
    while (this.state.treeNames.includes(importedTree.treeName))
    {
      importedTree.treeName = originalName + " " + i;
      i++;
    }
    const newTreeNames = [...this.state.treeNames, importedTree.treeName];
    importedTree.save();
    this.setState({treeNames: newTreeNames});
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
      // console.log("handleRenameTree was ignored.");
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

  setDefaultNewFamMemberLocation(newLoc)
  {
    newLoc.x += FamilyTree.minFamilyMemberLocation.x;
    newLoc.y += FamilyTree.minFamilyMemberLocation.y;
    this.setState({defaultNewMemberLocation: newLoc});
  }

  handleAddFamMember(mode = "default", anchorPersonId)
  {
    if (!this.state.currentTree){return;}
    const viableModes = ["default", "parent", "child"];
    if (!viableModes.includes(mode))
    {
      console.error("Invalid mode of adding a family member.");
      return;
    }
    const newId = this.state.currentTree.findLowestUnusedFamilyMemberId();  
    const newPerson = new Person(newId);
    const anchorPersonIndex = this.state.currentTree.family.findIndex(item => item.id === anchorPersonId);
    let draftAnchorPerson = null;
    if (anchorPersonIndex >= 0) {draftAnchorPerson = Person.cloneFromOther(this.state.currentTree.family[anchorPersonIndex]);}

    let loc = this.state.defaultNewMemberLocation;
    if (loc.x < FamilyTree.minFamilyMemberLocation.x || loc.y < FamilyTree.minFamilyMemberLocation.y)
    {
      loc = FamilyTree.minFamilyMemberLocation;
    }
    //doing mode specific things
    if (anchorPersonId !== undefined && anchorPersonId >= 0)
    {
      if(mode === "parent")
      {
        draftAnchorPerson?.addParentId(newId);
        loc = this.state.currentTree.findFreeLocationUpwards(anchorPersonId, 4, 2);
      }
      else if(mode === "child")
      {
        newPerson.addParentId(anchorPersonId);
        loc = this.state.currentTree.findFreeLocationDownwards(anchorPersonId, 4, 2);
      }
      else
      {
        loc = this.state.currentTree.findFreeLocationNearby(anchorPersonId, 4, 2, 100, 100);
      }
    }
    newPerson.locationInTreeX = loc.x;
    newPerson.locationInTreeY = loc.y;
    //we can get away with just spreading old family, since those people inside won't be mutated anyway
    let draftFamily = [...this.state.currentTree.family, newPerson];
    if (draftAnchorPerson && anchorPersonIndex >= 0) {draftFamily[anchorPersonIndex] = draftAnchorPerson;}
    //if the new person's location is below the tree's minimum, the entire family is shifted to accomodate the new person
    if (FamilyTree.isFamilyMemberLocationBelowMin(loc))
    {
      draftFamily = FamilyTree.shiftFamilyImmutably(draftFamily, FamilyTree.getShiftVector(loc));
    }
    const draftTree = FamilyTree.cloneFromOther(this.state.currentTree);
    draftTree.family = draftFamily;
    // console.log(draftAnchorPerson);
    this.setState(
      {
        currentTree: draftTree,
      },
      () => {
        this.state.currentTree.save();
        // console.log(this.state.currentTree.family[anchorPersonIndex]);
        // console.log(this.state.currentTree.family.length);
      }
    );
  }

  handleEditFamMember(personId, replacerPersonObj)
  {
    //edited data should already be validated before it gets here
    let newFamily = [...this.state.currentTree.family];
    const i = newFamily.findIndex(item => item.id === personId);
    // console.log("Handling edit of person with id: " + personId + " (should match this one: "+ replacerPersonObj.id +"). Their index within family is: " + i);
    if (i >= 0)
    {
      newFamily[i] = replacerPersonObj;
      if (FamilyTree.isFamilyMemberLocationBelowMin(replacerPersonObj.getLocation()))
      {
        const vector = FamilyTree.getShiftVector(replacerPersonObj.getLocation());
        newFamily = FamilyTree.shiftFamilyImmutably(newFamily, vector);
      }
      const draftTree = FamilyTree.cloneFromOther(this.state.currentTree);
      draftTree.family = newFamily;
      this.setState(
        {
          currentTree: draftTree,
        },
        () => {
          this.state.currentTree.save();
          // console.log(this.state.currentTree.family[i]);
        }
      );
    }
  }

  handleEditFamMembers(personIds, replacerPersonObjs)
  {
    if (personIds.length !== replacerPersonObjs.length){return;}
    console.log("trying to change multiple fam members");
    const newFamily = [...this.state.currentTree.family];
    for(let i = 0; i < personIds.length; i++)
    {
      const index = newFamily.findIndex(item => item.id === personIds[i]);
      if (index >= 0)
      {
        newFamily[index] = replacerPersonObjs[i];
      }
    }
    const draftTree = FamilyTree.cloneFromOther(this.state.currentTree);
    draftTree.family = newFamily;
    this.setState(
      {
        currentTree: draftTree,
      },
      () => {this.state.currentTree.save();}
    );
  }

  handleDeleteFamMember(personId)
  {
    const newFamily = [];
    //we need to loop to remove all places where this person is saved as parent
    //and while we're at it, w ejust skip this person from adding to newFamily, this is how the actual deletion is done
    for(let i = 0; i < this.state.currentTree.family.length; i++)
    {
      const member = Person.cloneFromOther(this.state.currentTree.family[i]);
      if (member.id !== personId)
      {
        member.parentId0 = (member.parentId0 === personId) ? null : member.parentId0;
        member.parentId1 = (member.parentId1 === personId) ? null : member.parentId1;
        newFamily.push(member);
      }
    }
    const draftTree = FamilyTree.cloneFromOther(this.state.currentTree);
    draftTree.family = newFamily;
    this.setState(
      {
        currentTree: draftTree,
      },
      () => {this.state.currentTree.save();}
    );
  }

  toggleNotice(name, desiredState)
  {
    const draftObj = {...this.state.notices};
    draftObj[name] = desiredState;
    this.setState({notices: draftObj});
  }

  render()
  {
    const noticeWrapper = 
      <div className="notice_wrapper">
        {this.state.notices.cookies &&
            <Notice title="Cookies and Other Technologies" name="cookies" handleClose={this.toggleNotice}>
              <p>Cookies are small text files stored on your device when you visit sites on the web. They are used for various purposes related to the functioning of a site, including registering your activity and remembering your preferences.</p>
              <p>LiteLineage does NOT use cookies, however it does use your browser's local storage to save tree data, which functions in a similar way. Data saved in such a way is persistent between browsing sessions and does not leave your device, unless you decide to export this data to a separate file and bring it with you somewhere else. However, you might lose data saved in local storage when clearing browser data. Check your browser settings for more information.</p>
              <p>By using this website you agree to local storage being used for saving and loading data for the purposes of providing the basic features such as tree editing, deletion, loading and saving for future viewing and editing.</p>
            </Notice>
          }
      </div>;

    return (
      <TreeContext.Provider className="app" value={{...this.state, treeHandlers: this.treeHandlers, familyHandlers: this.familyHandlers}}>
        <Header/>
        {Object.values(this.state.notices).some(item => item === true) && noticeWrapper}
        <Content/>
        <Footer toggleNotice={this.toggleNotice}/>
      </TreeContext.Provider>
    );
  }
}

export default App;