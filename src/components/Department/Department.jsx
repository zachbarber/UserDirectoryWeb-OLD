import React from 'react';
import axios from 'axios';
import './Department.css';

class Department extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            departmentId: this.props.id,
            departmentName: null,
            employees: []
        }
    }

    async componentDidMount() {
        const { data: departmentData } = await axios.get(`${process.env.PUBLIC_URL}/api/departments/?id=${this.props.id}`);
        const { data: employeeData } = await axios.get(`${process.env.PUBLIC_URL}/api/departmentEmployeeList/?id=${this.props.id}`);

        this.setState({
            departmentId: departmentData[0].id,
            departmentName: departmentData[0].name,
            employees: employeeData
        });
    }

    render() {
        const { employees } = this.state;
        const employeesList = employees.map(employee => {
            return <li onClick={(clickEvent) => this.props.employeeSelectHandler(clickEvent.target.id)} id={employee.id} className='employeeLink'>{employee.name}</li>
        })

        return (
            <>
                <div className='headerDiv'>
                    <h1 className='nameHeader'>{this.state.departmentName}</h1>
                    <ul>{employeesList}</ul>
                </div>
                <div className='addEmployeeButtonDiv'>
                    <br />
                    <button className='addEmployeeButton' name='addEmployee' value='Add Employee' id={this.props.id} onClick={(clickEvent) => this.props.editEmployeeSelectHandler(0, clickEvent.target.id)} />
                    <br />
                </div>
            </>
        )
    }
}

export default Department;
