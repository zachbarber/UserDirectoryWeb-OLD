import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            isExpanded: true,
        }

        this.sidebarButtonOnClick = this.sidebarButtonOnClick.bind(this);
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
                            <li className={isExpanded ? 'sidebarListItemExpanded' : 'sidebarListItemCollapsed'}>Link 1</li>
                            <li className={isExpanded ? 'sidebarListItemExpanded' : 'sidebarListItemCollapsed'}>Link 2</li>
                            <li className={isExpanded ? 'sidebarListItemExpanded' : 'sidebarListItemCollapsed'}>Link 3</li>
                        </ul>
                    </div>

                    <div className='sidebarButtonContainer'>
                        <img className='sidebarButton' onClick={this.sidebarButtonOnClick} src={isExpanded ? `${process.env.PUBLIC_URL}/leftArrow.png` : `${process.env.PUBLIC_URL}/rightArrow.png`} alt='sidebarArrow'/>
                    </div>
                </div>
            </>
        )
    }
}

export default Sidebar;