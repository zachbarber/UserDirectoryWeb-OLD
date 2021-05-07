import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import DepartmentsList from './components/DepartmentsList/DepartmentsList';
import Department from './components/Department/Department';
import EmployeesList from './components/EmployeesList/EmployeesList';
import Employee from './components/Employee/Employee';
import EditEmployee from './components/EditEmployee/EditEmployee';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.sidebarSelectHandler = this.sidebarSelectHandler.bind(this);
    this.employeeSelectHandler = this.employeeSelectHandler.bind(this);
    this.editEmployeeSelectHandler = this.editEmployeeSelectHandler.bind(this);
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

  editEmployeeSelectHandler(selectedEmployeeId, selectedDepartmentId) {
    this.setState({
      linkSelection: 'editEmployee',
      selectedEmployeeId,
      selectedDepartmentId
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
        <div className='contentContainer'>

          <Router>

            <Route path='/home'>
              <Home />
            </Route>

            <Route path='/departmentsList'>
              <DepartmentsList departmentSelectHandler={this.departmentSelectHandler} />
            </Route>

            <Route path='/department'>
              <Department id={this.state.selectedDepartmentId} employeeSelectHandler={this.employeeSelectHandler} editEmployeeSelectHandler={this.editEmployeeSelectHandler} />
            </Route>

            <Route path='/employeesList'>
              <EmployeesList employeeSelectHandler={this.employeeSelectHandler} editEmployeeSelectHandler={this.editEmployeeSelectHandler} />
            </Route>

            <Route path='/employee'>
              <Employee id={this.state.selectedEmployeeId} editEmployeeSelectHandler={this.editEmployeeSelectHandler} />
            </Route>

            <Route path='/editEmployee'>
              <EditEmployee employeeId={this.state.selectedEmployeeId} departmentId={this.state.selectedDepartmentId} />
            </Route>

            <Redirect to={this.state.linkSelection} />

          </Router>

        </div>
      </div>
    );
  }
}

export default App;
