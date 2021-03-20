import React from 'react';
import axios from 'axios';
import './Department.css';

class Department extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            department: null
        }
    }

    async componentDidMount() {

        const { data } = await axios.get(`${process.env.PUBLIC_URL}/api/departments/?id=${this.props.id}`);

        this.setState({ department: data[0] });
    }

    render() {

        return (
            <div className='headerDiv'>
                <h1 className='nameHeader'>{this.state.department?.name}</h1>
            </div>
            //add in buttons (edit, add, delete) and space-between? flex
        )
    }
}

export default Department;