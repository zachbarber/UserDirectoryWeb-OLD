import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home'
import Employee from './components/Employee/Employee'
import './App.css';

class App extends React.Component {

  constructor() {

    super();

    this.sidebarSelectHandler = this.sidebarSelectHandler.bind(this);

    this.state = {
      sidebarLinkSelection: 'home'
    }
  }

  sidebarSelectHandler(selectedLink) {
    this.setState({
      sidebarLinkSelection: selectedLink
    });
  }

  render() {

    return (
      <div className='app'>
        <Sidebar sidebarSelectHandler={this.sidebarSelectHandler} />
        <div className='pageContent'>

          <Router>

            <Route path='/home'>
              <Home />
            </Route>

            <Route path ='/employee'>
              <Employee />
            </Route>

            <Redirect to={this.state.sidebarLinkSelection} />

          </Router>

        </div>
      </div>
    );
  }

}

export default App;
