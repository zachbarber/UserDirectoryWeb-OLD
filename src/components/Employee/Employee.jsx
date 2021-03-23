import React from 'react';
import axios from 'axios';
import './Employee.css';

class Employee extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            employee: null,
            isEditMode: false,
            departmentNameIds: []
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);

    }

    async componentDidMount() {

        const { data } = await axios.get(`${process.env.PUBLIC_URL}/api/employees?id=${this.props.id}`)

        const retrievedEmployee = data[0];

        this.setState({
            employee:
            {
                departmentId: retrievedEmployee.departmentId,
                departmentName: retrievedEmployee.departmentName,
                id: retrievedEmployee.id,
                name: retrievedEmployee.name,
                role: retrievedEmployee.role,
                isSupervisor: retrievedEmployee.isSupervisor,
                hireDate: retrievedEmployee.hireDate,
                createDate: retrievedEmployee.createDate
            }
        })
    }

    onFormSubmit(form) {

        form.preventDefault();

        console.log(form); //get the form data and figure out how to format it as employee

        //axios put call

        this.setState({ isEditMode: false });
    }

    onEditClick() {

        this.setState({ isEditMode: true });
    }

    async onDepartmentDropdown() {

        const { data } = await axios.get(`${process.env.PUBLIC_URL}/api/departmentNameIds`)

        const retrievedDepartments = [];

        for (const department in data) {

            retrievedDepartments.push({
                departmentId: data[department].departmentId,
                departmentName: data[department].departmentName
            })
        }
    }

    render() {

        const { isEditMode } = this.state;

        return (

            <>
                {isEditMode ?
                    <>
                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                            <label for='employeeName'>Name:</label><br />
                            <input type='text' id='employeeName' name='Employee Name' /><br />

                            <label for='employeeRole'>Role:</label><br />
                            <input type='text' id='employeeRole' name='Employee Role' /><br />

                            <label for='employeeName'>Employee Name:</label><br />
                            <input type='text' id='employeeName' name='Employee Name' /><br />

                            <label for='employeeName'>Employee Name:</label><br />
                            <input type='text' id='employeeName' name='Employee Name' /><br />
                        </form>
                    </>
                    :
                    <>
                        <div className='employeeHeader'>
                            <h1 className='employeeNameHeader'>Employee</h1>
                        </div>
                        <div className='employeeButtonHeader'>
                            <button onClick={this.state.onEditClick}>Edit Employee</button>
                        </div>
                        <div className='employeeBody'>
                            <h1>{this.state.employee.name}</h1>
                            <h1>{this.state.employee.id}</h1>
                            <h1>{this.state.employee.role}</h1>
                            <h1>{this.state.employee.departmentId}</h1>
                            <h1>{this.state.employee.isSupervisor}</h1>
                            <h1>{this.state.employee.hireDate}</h1>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default Employee;