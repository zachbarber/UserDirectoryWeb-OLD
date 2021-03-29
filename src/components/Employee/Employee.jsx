import React from 'react';
import axios from 'axios';
import './Employee.css';

class Employee extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            employee: null,
            updatedEmployee: null,
            isEditMode: false,
            departmentNameIds: []
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);


    }


    async componentDidMount() {

        const employeeData = await (await axios.get(`${process.env.PUBLIC_URL}/api/employees?id=${this.props.id}`)).data[0];

        const departmentNameIds = await (await axios.get(`${process.env.PUBLIC_URL}/api/departmentNameIds`)).data;

        this.setState({
            employee: employeeData,
            updatedEmployee: employeeData,
            departmentNameIds
        });
    }


    onFormSubmit(formSubmitEvent) {

        formSubmitEvent.preventDefault();

        console.log(formSubmitEvent);

        this.setState({ isEditMode: false });
    }


    onEditClick() {

        this.setState({ isEditMode: true });
    }


    inputOnChange(changeEvent) {

        const employeeDeepCopy = JSON.parse(JSON.stringify(this.state.updatedEmployee));

        employeeDeepCopy[changeEvent.target.id] = changeEvent.target.value;

        this.setState({
            updatedEmployee: employeeDeepCopy
        });
    }


    render() {

        console.log(this.state.updatedEmployee?.departmentId);

        const { isEditMode, departmentNameIds } = this.state;

        const selectOptions = departmentNameIds.map(department => {

            return <option value={department.id} selected={department.id === this.state.employee.departmentId ? 'selected' : ''}>{department.name}</option>
        })


        return (

            <>
                {isEditMode ?
                    <>
                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                            <label for='employeeName'>Name:</label><br />
                            <input type='text' id='name' name='EmployeeName' value={this.state.updatedEmployee.name} onChange={(e) => this.inputOnChange(e)} /><br />

                            <label for='employeeRole'>Role:</label><br />
                            <input type='text' id='role' name='EmployeeRole' value={this.state.updatedEmployee.role} onChange={(e) => this.inputOnChange(e)} /><br />

                            <label for='employeeDepartment'>Department:</label><br />
                            <select id='departmentName' name='EmployeeDepartment' onChange={(e) => this.inputOnChange(e)} >
                                {selectOptions}
                            </select>

                            <input type='checkbox' id='isSupervisor' name='Supervisor' value={this.state.updatedEmployee.isSupervisor} onChange={(e) => this.inputOnChange(e)} />
                            <label for='isSupervisor'>Supervisor</label><br />

                            <label for='hireDate'>Hire Date:</label><br />
                            <input type='date' id='hireDate' name='EmployeeHireDate' onChange={(e) => this.inputOnChange(e)} /><br />

                            <br /><input type='submit' id='editSubmit' name='editSubmit' vale='Submit' />
                        </form>
                    </>
                    :
                    <>
                        <div className='employeeHeader'>
                            <h1 className='employeeNameHeader'>Employee</h1>
                        </div>
                        <div className='employeeButtonHeader'>
                            <button onClick={this.onEditClick}>Edit Employee</button>
                        </div>
                        <div className='employeeBody'>
                            <div className='employeeBodyName'>
                                <h1>Name: </h1>
                                <h1>{this.state.employee?.name}</h1><br />
                            </div>

                            <div className='employeeBodyId'>
                                <h1>Employee Id: </h1>
                                <h1>{this.state.employee?.id}</h1><br />
                            </div>

                            <div className='employeeBodyRole'>
                                <h1>Role: </h1>
                                <h1>{this.state.employee?.role}</h1><br />
                            </div>

                            <div className='employeeBodyDepartment'>
                                <h1>Department: </h1>
                                <h1>{this.state.employee?.departmentName}</h1><br />
                            </div>

                            <div className='employeeBodyHireDate'>
                                <h1>Hire Date: </h1>
                                <h1>{new Date(this.state.employee?.hireDate).toLocaleDateString()}</h1><br />
                            </div>

                            <div className='employeeBodyIsSupervisor'>
                                <h1>Supervisor?: </h1>
                                <h1>{this.state.employee?.isSupervisor ? `YES` : `NO`}</h1><br />
                            </div>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default Employee;