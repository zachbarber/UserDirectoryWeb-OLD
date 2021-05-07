import React from 'react';
import axios from 'axios';
import './Department.css';

class Department extends React.Component {
    constructor(props) {
        super(props)
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.state = {
            department: null,
            updatedDepartment: null,
            employeesList: [],
            isEditMode: false
        }
    }

    async componentDidMount() {
        const departmentData = await (await axios.get(`${process.env.PUBLIC_URL}/api/departments?id=${this.props.id}`)).data[0];
        const employeesData = await (await axios.get(`${process.env.PUBLIC_URL}/api/departmentEmployeeList?id=${this.props.id}`)).data;
        const employeesList = []
        for (const employee in employeesData) {
            employeesList.push({
                employeeId: employeesData[employee].id,
                employeeName: employeesData[employee].name,
                employeeIsSupervisor: employeesData[employee].isSupervisor
            })
        }

        this.setState({
            department: departmentData,
            updatedDepartment: departmentData,
            employeesList
        });
    }

    async onFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();
        const departmentDeepCopy = JSON.parse(JSON.stringify(this.state.updatedDepartment));
        departmentDeepCopy.departmentId = parseInt(departmentDeepCopy.departmentId);

        try {
            const departmentPutReturned = await (await axios.put(`${process.env.PUBLIC_URL}/api/departments?id=${this.state.updatedDepartment.id}`, departmentDeepCopy)).data[0];
            this.setState({
                employee: departmentPutReturned,
                updatedEmployee: departmentPutReturned,
                isEditMode: false
            });
        } catch (err) {
            console.log(err)
        };
    }

    onEditClick() {
        this.setState({ isEditMode: true });
    }

    inputOnChange(changeEvent) {
        const departmentDeepCopy = JSON.parse(JSON.stringify(this.state.updatedDepartment));
        departmentDeepCopy[changeEvent.target.id] = changeEvent.target.value;
        this.setState({
            updatedDepartment: departmentDeepCopy
        });
    }

    render() {
        const { isEditMode, employeesList, updatedDepartment, department } = this.state;
        const employeesListMapped = employeesList.map(employee => {
            return <li value={employee.id}>{employee.name}</li>
        })

        return (
            <>
                {isEditMode ?
                    <>
                        <form onSumbit={(e) => this.onFormSubmit(e)}>
                            <label for='departmentName'>Name:</label><br />
                            <input type='text' id='name' name='departmentName' value={updatedDepartment.name} onChange={(e) => this.inputOnChange(e)} /><br />



                            <input type='submit' id='editSubmit' name='editSubmit' value='Submit' />
                        </form>
                    </>
                    :
                    <>

                    </>
                }
            </>
        )
    }
}

export default Department;
