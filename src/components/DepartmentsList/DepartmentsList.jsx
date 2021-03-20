import React from 'react';
import axios from 'axios';
import './DepartmentsList.css';

class DepartmentsList extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            Departments: []
        }
    }

    async componentDidMount() {

        const { data } = await axios.get(`${process.env.PUBLIC_URL}/api/Departments`)

        this.setState({ Departments: data })
    }

    render() {

        const { Departments } = this.state;

        const DepartmentsList = Departments.map(department => {

            return <li onClick={(clickEvent) => this.props.departmentSelectHandler(clickEvent.target.id)} id={department.id} className='departmentLink'>{department.name}</li>
        });

        return (
            <div>
                <ul>
                    {DepartmentsList}
                </ul>
            </div>
        )
    }
}




export default DepartmentsList