import React from 'react';
import axios from 'axios';
import './Employee.css';

class Employee extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            employee: null
        }
    }

    async componentDidMount() {

        const { data } = await axios.get(`${process.env.PUBLIC_URL}/api/employees?id=${this.props.id}`)

        this.setState({ employee: data[0] })
    }

    render() {

        return (
            <div className='headerDiv'>
                <h1 className='nameHeader'>{this.state.employee?.name}</h1>
            </div>
        )
    }
}

export default Employee;