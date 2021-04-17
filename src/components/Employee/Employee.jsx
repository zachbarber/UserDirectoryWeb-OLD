import React from 'react';
import axios from 'axios';
import './Employee.css';

class Employee extends React.Component {
    constructor(props) {
        super(props)
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.state = {
            employee: null,
            updatedEmployee: null,
            departmentNameIds: [],
            isEditMode: false
        }
    }

    async componentDidMount() {
        const { data: employeeData } = await axios.get(`${process.env.PUBLIC_URL}/api/employees?id=${this.props.id}`);
        const { data: departmentNameIds } = await axios.get(`${process.env.PUBLIC_URL}/api/departmentNameIds`);
        this.setState({
            employee: employeeData[0],
            updatedEmployee: employeeData[0],
            departmentNameIds
        });
    }

    async onFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();
        const employeeDeepCopy = JSON.parse(JSON.stringify(this.state.updatedEmployee));
        employeeDeepCopy.departmentId = parseInt(employeeDeepCopy.departmentId);      
        employeeDeepCopy.id = parseInt(employeeDeepCopy.id);
        employeeDeepCopy.hireDate = new Date(employeeDeepCopy.hireDate).toISOString().split('T')[0];
        
        try {
            const { data: employeePutReturned } = await axios.put(`${process.env.PUBLIC_URL}/api/employees?id=${this.state.updatedEmployee.id}`, employeeDeepCopy);           
            this.setState({
                employee: employeePutReturned[0],
                updatedEmployee: employeePutReturned[0],
                isEditMode: false
            });
        } catch (err) {
            console.log(err)
        };
    }

    onEditClick() {
        this.setState({ isEditMode: true });
    }

    inputOnChange(changeEvent) {
        const target = changeEvent.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const employeeDeepCopy = JSON.parse(JSON.stringify(this.state.updatedEmployee));
        employeeDeepCopy[target.id] = value;
        this.setState({
            updatedEmployee: employeeDeepCopy
        });
    }

    render() {
        const { isEditMode, departmentNameIds, updatedEmployee, employee } = this.state;
        const selectOptions = departmentNameIds.map(department => {
            return <option value={department.id} selected={department.id === updatedEmployee.departmentId ? 'selected' : ''}>{department.name}</option>
        })

        return (
            <>
                {isEditMode ?
                    <>
                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                            <label for='employeeName'>Name:</label><br />
                            <input type='text' id='name' name='employeeName' value={updatedEmployee.name} onChange={(e) => this.inputOnChange(e)} /><br />

                            <label for='employeeRole'>Role:</label><br />
                            <input type='text' id='role' name='employeeRole' value={updatedEmployee.role} onChange={(e) => this.inputOnChange(e)} /><br />

                            <label for='phoneNumber'>Phone Number:</label><br />
                            <input type='text' id='phoneNumber' name='phoneNumber' value={updatedEmployee.phoneNumber} onChange={(e) => this.inputOnChange(e)} /><br />

                            <label for='emailAddress'>Email Address:</label><br />
                            <input type='text' id='emailAddress' name='emailAddress' value={updatedEmployee.emailAddress} onChange={(e) => this.inputOnChange(e)} /><br />

                            <label for='employeeDepartment'>Department:</label><br />
                            <select id='departmentId' name='EmployeeDepartment' value={updatedEmployee.departmentId} onChange={(e) => this.inputOnChange(e)} >
                                {selectOptions}
                            </select>

                            <input type='checkbox' id='isSupervisor' name='supervisor' checked={updatedEmployee.isSupervisor} onChange={(e) => this.inputOnChange(e)} />
                            <label for='isSupervisor'>Supervisor</label><br />

                            <label for='hireDate'>Hire Date:</label><br />
                            <input type='date' id='hireDate' name='employeeHireDate' onChange={(e) => this.inputOnChange(e)} /><br />

                            <br /><input type='submit' id='editSubmit' name='editSubmit' value='Submit' />
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
                                <h1>{employee?.name}</h1><br />
                            </div>

                            <div className='employeeBodyId'>
                                <h1>Employee Id: </h1>
                                <h1>{employee?.id}</h1><br />
                            </div>

                            <div className='employeeBodyRole'>
                                <h1>Role: </h1>
                                <h1>{employee?.role}</h1><br />
                            </div>

                            <div className='employeeBodyPhoneNumber'>
                                <h1>Phone Number: </h1>
                                <h1>{employee?.phoneNumber}</h1><br />
                            </div>

                            <div className='employeeBodyEmailAddress'>
                                <h1>Email Address: </h1>
                                <h1>{employee?.emailAddress}</h1><br />
                            </div>

                            <div className='employeeBodyDepartment'>
                                <h1>Department: </h1>
                                <h1>{employee?.departmentName}</h1><br />
                            </div>

                            <div className='employeeBodyHireDate'>
                                <h1>Hire Date: </h1>
                                <h1>{new Date(employee?.hireDate).toLocaleDateString()}</h1><br />
                            </div>

                            <div className='employeeBodyIsSupervisor'>
                                <h1>Supervisor?: </h1>
                                <h1>{employee?.isSupervisor ? `YES` : `NO`}</h1><br />
                            </div>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default Employee;