import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import DepartmentsList from './components/DepartmentsList/DepartmentsList';
import Department from './components/Department/Department';
import EmployeesList from './components/EmployeesList/EmployeesList';
import Employee from './components/Employee/Employee';
import './App.css';

class App extends React.Component {

  constructor() {

    super();

    this.sidebarSelectHandler = this.sidebarSelectHandler.bind(this);

    this.employeeSelectHandler = this.employeeSelectHandler.bind(this);

    this.departmentSelectHandler = this.departmentSelectHandler.bind(this);

    this.state = {
      linkSelection: 'home',
      selectedEmployeeId: null,
      selectedDepartmentId: null,
    }
  }

  sidebarSelectHandler(selectedLink) {
    this.setState({
      linkSelection: selectedLink
    });
  }

  employeeSelectHandler(selectedEmployeeId) {
    this.setState({
      linkSelection: 'employee',
      selectedEmployeeId
    });
  }

  departmentSelectHandler(selectedDepartmentId) {
    this.setState({
      linkSelection: 'department',
      selectedDepartmentId
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

            <Route path ='/departments'>
              <DepartmentsList departmentSelectHandler={this.departmentSelectHandler} />
            </Route>

            <Route path='/department'>
              <Department id={this.state.selectedDepartmentId} />
            </Route>

            <Route path='/employees'>
              <EmployeesList employeeSelectHandler={this.employeeSelectHandler} />
            </Route>

            <Route path='/employee'>
              <Employee id={this.state.selectedEmployeeId} />
            </Route>


            <Redirect to={this.state.linkSelection} />

          </Router>

        </div>
      </div>
    );
  }

}

export default App;
