import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            isExpanded: true,
        }
    }

    render() {

        return (
            <>
                <div className='sidebarContainer'>
                    {
                        this.state.isExpanded ?
                            <div className='listContainer'>
                            <ul className='sidebarList'>
                                <li className='sidebarListItem'>Link 1</li>
                                <li className='sidebarListItem'>Link 2</li>
                                <li className='sidebarListItem'>Link 3</li>
                            </ul>
                            </div>
                            : 
                    }
                </div>
            </>
        )
    }
}

export default Sidebar;