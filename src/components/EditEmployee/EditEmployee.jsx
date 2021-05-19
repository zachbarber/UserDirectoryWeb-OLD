import React from 'react';
import axios from 'axios';
import './EditEmployee.css';

class EditEmployee extends React.Component {
    constructor(props) {
        super(props)
        this.inputOnChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            employeeId: this.props.employeeId,
            departmentId: this.props.departmentId,
            employee: null,
            updatedEmployee: null,
            departmentNameIds: []
        }
    }

    async componentDidMount() {

        let employeeData = {};
        if (this.props.employeeId) {
            const { data } = await axios.get(`${process.env.PUBLIC_URL}/api/employees?id=${this.props.employeeId}`);
            employeeData = data[0];
        } 

        const { data: departmentNameIds } = await axios.get(`${process.env.PUBLIC_URL}/api/departmentNameIds`);
        this.setState({
            employee: employeeData,
            updatedEmployee: employeeData,
            departmentNameIds
        });
    }

    onInputChange(changeEvent) {
        const target = changeEvent.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const employeeDeepCopy = JSON.parse(JSON.stringify(this.state.updatedEmployee));
        employeeDeepCopy[target.id] = value;
        this.setState({
            updatedEmployee: employeeDeepCopy
        });
    }

    async onFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();
        const employeeDeepCopy = JSON.parse(JSON.stringify(this.state.updatedEmployee));
        employeeDeepCopy.departmentId = parseInt(employeeDeepCopy.departmentId)
        employeeDeepCopy.id = parseInt(employeeDeepCopy.id);
        employeeDeepCopy.hireDate = new Date(employeeDeepCopy.hireDate).toISOString().split('T')[0];

        if (this.props.employeeId) {
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
    }

    render() {
        const { employeeId, departmentId, employee, updatedEmployee, departmentNameIds } = this.state;
        const selectOptions = departmentNameIds.map(department => {
            return <option value={department.id} selected={department.id === updatedEmployee.departmentId ? 'selected' : ''}>{department.name}</option>
        })

        return (
            <form onSubmit={(e) => this.onFormSubmit(e)}>
                <label for='employeeName'>Name:</label><br />
                <input type='text' id='name' name='employeeName' value={updatedEmployee.name ? updatedEmployee.name : null} onChange={(e) => this.onInputChange(e)} /><br />

                <label for='employeeRole'>Role:</label><br />
                <input type='text' id='role' name='employeeRole' value={updatedEmployee.role ? updatedEmployee.role: null} onChange={(e) => this.onInputChange(e)} /><br />

                <label for='phoneNumber'>Phone Number:</label><br />
                <input type='text' id='phoneNumber' name='phoneNumber' value={updatedEmployee.phoneNumber ? updatedEmployee.phoneNumber : null} onChange={(e) => this.onInputChange(e)} /><br />

                <label for='emailAddress'>Email Address:</label><br />
                <input type='text' id='emailAddress' name='emailAddress' value={updatedEmployee.emailAddress ? updatedEmployee.emailAddress : null} onChange={(e) => this.onInputChange(e)} /><br />

                <label for='employeeDepartment'>Department:</label><br />
                <select id='departmentId' name='EmployeeDepartment' value={updatedEmployee.departmentId ? updatedEmployee.departmentId : null} onChange={(e) => this.onInputChange(e)} >
                    {selectOptions}
                </select>

                <input type='checkbox' id='isSupervisor' name='supervisor' checked={updatedEmployee.isSupervisor ? updatedEmployee.isSupervisor : null} onChange={(e) => this.onInputChange(e)} />
                <label for='isSupervisor'>Supervisor</label><br />

                <label for='hireDate'>Hire Date:</label><br />
                <input type='date' id='hireDate' name='employeeHireDate' onChange={(e) => this.onInputChange(e)} /><br />

                <br /><input type='submit' id='editSubmit' name='editSubmit' value='Submit' />
            </form>
        )
    }
}

export default EditEmployee;
