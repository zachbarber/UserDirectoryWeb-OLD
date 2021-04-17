import React from 'react';
import axios from 'axios';
import './Department.css';

class Department extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            departmentId: this.props.id,
            departmentName: null,
            supervisorId: null,
            employees: []
        }
    }

    async componentDidMount() {
        const { data: departmentData } = await axios.get(`${process.env.PUBLIC_URL}/api/departments/?id=${this.props.id}`);
        console.log(departmentData);
        const { data: employeeData } = await axios.get(`${process.env.PUBLIC_URL}/api/departmentEmployeeList/?id=${this.props.id}`);
        console.log(employeeData);

        this.setState({
            departmentId: departmentData[0].id,
            departmentName: departmentData[0].name,
            supervisorId: departmentData[0].supervisorId,
            employees: employeeData
        });
    }

    render() {
        const { employees } = this.state;
        const employeesList = employees.map(employee => {
            return <li onClick={(clickEvent) => this.props.employeeSelectHandler(clickEvent.target.id)} id={employee.employeeId} className='employeeLink'>{employee.employeeName}</li>
        })

        return (
            <div className='headerDiv'>
                <h1 className='nameHeader'>{this.state.departmentName}</h1>
                <ul>{employeesList}</ul>
            </div>
        )
    }
}

export default Department;