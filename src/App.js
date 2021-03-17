import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

class App extends React.Component {

  constructor() {

    super();

    this.sidebarSelector = this.sidebarSelector.bind(this);

    this.state = {
      sidebarLinkSelection: 'home'
    }
  }

  sidebarSelector(selectedLink) {
    this.setState({
      sidebarLinkSelection: selectedLink
    });
  }

  render() {

    return (
      <div className='app'>
        <Sidebar />
        <div className='pageContent'>

        </div>
      </div>
    );
  }

}

export default App;
