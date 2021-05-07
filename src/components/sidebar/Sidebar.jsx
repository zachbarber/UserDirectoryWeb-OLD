import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.sidebarButtonOnClick = this.sidebarButtonOnClick.bind(this);
        this.state = {
            isExpanded: true,
        }
    }

    sidebarButtonOnClick() {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }

    render() {
        const { isExpanded } = this.state;
        return (
        <>
                    <div className={isExpanded ? 'sidebarContainerExpanded' : 'sidebarContainerCollapsed'} >
                    <div className={isExpanded ? 'sidebarListContainerExpanded' : 'sidebarListContainerCollapsed'} >
                        <ul className={isExpanded ? 'sidebarListExpanded' : 'sidebarListCollapsed'} >
                            <li onClick={(clickEvent) => this.props.sidebarSelectHandler(clickEvent.target.id)} id='home' className={isExpanded ? 'sidebarListItemExpanded' : 'sidebarListItemCollapsed'}>Home</li>
                            <li onClick={(clickEvent) => this.props.sidebarSelectHandler(clickEvent.target.id)} id='departmentsList' className={isExpanded ? 'sidebarListItemExpanded' : 'sidebarListItemCollapsed'}>Departments</li>
                            <li onClick={(clickEvent) => this.props.sidebarSelectHandler(clickEvent.target.id)} id='employeesList' className={isExpanded ? 'sidebarListItemExpanded' : 'sidebarListItemCollapsed'}>Employees</li>
                        </ul>
                    </div>

                    <div className='sidebarButtonContainer'>
                        <img className='sidebarButton' onClick={this.sidebarButtonOnClick} src={isExpanded ? `${process.env.PUBLIC_URL}/leftArrow.png` : `${process.env.PUBLIC_URL}/rightArrow.png`} alt={isExpanded ? 'collapse sidebar arrow' : 'expand sidebar arrow'}/>
                    </div>
                </div>
            </>
        )
    }
}

export default Sidebar;
