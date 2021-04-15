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
        const { data } = await axios.get(`${process.env.PUBLIC_URL}/api/employees`);
        this.setState({ employees: data })
    }

    render() {
        const { employees } = this.state;
        const employeesList = employees.map(employee => {
            return <li onClick={(clickEvent) => this.props.employeeSelectHandler(clickEvent.target.id)} id={employee.id} className='employeeLink'>{employee.name}</li>
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