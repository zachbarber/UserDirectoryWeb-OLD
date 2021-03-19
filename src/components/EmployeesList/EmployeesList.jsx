import React from 'react';
import axios from 'axios';
import './EmployeesList.css';

class EmployeesList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
    }


    async componentDidMount() {

        const employees = await axios.get('localhost:35565/api/employees')

        this.setState({ employees })
    }

    render() {

        const { employees } = this.state;

        const employeesList = employees.map(employee => {

            return <li id={employee.id}>{employee.name}</li>
        });

        return(
            <div>
                <ul>
                    {employeesList}
                </ul>
            </div>
        )
    }
}




export default EmployeesList