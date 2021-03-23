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

        const { data } = await axios.get(`${process.env.PUBLIC_URL}/api/departments/?id=${this.props.id}`);

        const employeesList = [];

        for (const employee in data) {

            employeesList.push({
                employeeId: data[employee].employeeId,
                employeeName: data[employee].employeeName,
                isSupervisor: data[employee].isSupervisor
            });
        }

        this.setState({
            departmentId: data[0].id,
            departmentName: data[0].name,
            supervisorId: data[0].supervisorId,
            employees: employeesList
        });

        console.log(this.state);
    }

    render() {

        return (
            <div className='headerDiv'>
                <h1 className='nameHeader'>{this.state.departmentName}</h1>
            </div>
            //add in buttons (edit, add, delete) and space-between? flex
        )
    }
}

export default Department;