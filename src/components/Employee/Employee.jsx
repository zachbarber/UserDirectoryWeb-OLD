import React from 'react';
import axios from 'axios';
import './Employee.css';

class Employee extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            employee: {
                id: 0,
                name: '',
                role: '',
                departmentId: 0,
                isSupervisor: false,
                hireDate: '1900-01-01',
                createDate: '',
                deleteDate: '',
                departmentName: ''
            },
            isEditMode: false,
            departmentNameIds: []
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }


    async componentDidMount() {

        const employeeData = await (await axios.get(`${process.env.PUBLIC_URL}/api/employees?id=${this.props.id}`)).data[0];

        const departmentNameIds = await (await axios.get(`${process.env.PUBLIC_URL}/api/departmentNameIds`)).data;

        this.setState({
            employee: employeeData,
            departmentNameIds
        });
    }


    onFormSubmit(form) {

        form.preventDefault();

        console.log(form);

        this.setState({ isEditMode: false });
    }


    onEditClick() {

        this.setState({ isEditMode: true });
    }


    render() {

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
                            <input type='text' id='employeeName' name='EmployeeName' value={this.state.employee.name} /><br />

                            <label for='employeeRole'>Role:</label><br />
                            <input type='text' id='employeeRole' name='EmployeeRole' value={this.state.employee.role} /><br />

                            <label for='employeeDepartment'>Department:</label><br />
                            <select id='employeeDepartment' name='EmployeeDepartment'>
                                {selectOptions}
                            </select>

                            <input type='checkbox' id='isSupervisor' name='Supervisor' value={this.state.employee.isSupervisor} />
                            <label for='isSupervisor'>Supervisor</label><br />

                            <label for='hireDate'>Hire Date:</label><br />
                            <input type='date' id='hireDate' name='EmployeeHireDate' value={this.state.employee.hireDate} /><br />

                            <br /><input type='submit' id='editSubmit' name='editSubmit' vale='Submit' />
                        </form>
                    </>
                    :
                    <>
                        <div className='employeeHeader'>
                            <h1 className='employeeNameHeader'>Employee</h1>
                        </div>
                        <div className='employeeButtonHeader'>
                            <button onClick={() => this.onEditClick()}>Edit Employee</button>
                        </div>
                        <div className='employeeBody'>
                            <div className='employeeBodyName'>
                                <h1>Name: </h1>
                                <h1>{this.state.employee.name}</h1><br />
                            </div>

                            <div className='employeeBodyId'>
                                <h1>Employee Id: </h1>
                                <h1>{this.state.employee.id}</h1><br />
                            </div>

                            <div className='employeeBodyRole'>
                                <h1>Role: </h1>
                                <h1>{this.state.employee.role}</h1><br />
                            </div>

                            <div className='employeeBodyDepartment'>
                                <h1>Department: </h1>
                                <h1>{this.state.employee.departmentName}</h1><br />
                            </div>

                            <div className='employeeBodyHireDate'>
                                <h1>Hire Date: </h1>
                                <h1>{this.state.employee.hireDate}</h1><br />
                            </div>

                            <div className='employeeBodyIsSupervisor'>
                                <h1>Supervisor?: </h1>
                                <h1>{this.state.employee.isSupervisor ? `YES` : `NO`}</h1><br />
                            </div>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default Employee;