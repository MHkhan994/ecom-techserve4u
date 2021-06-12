import React, { useState } from 'react'
import Search from './Search'
import Link from 'next/link'
import {useSelector} from 'react-redux'
import NotificationComp from './NotificationComp'

function MobileHeader({ setUserDrawerOpen }) {
    const [isSearch, setIsSearch] = useState(false)
    const { user, isAuthenticated } = useSelector(state => state.auth)
    return (
        <div className="mobile_nav_container">
            <div className="nav_content">
                <div className="bars">
                    <i onClick={setUserDrawerOpen} className="fas fa-bars mr-3"></i>
                </div>
                <div className="mobile_logo">

                    <Link href='/'>
                        <a>
                            <img src='/logo.png'></img>
                            {/* Protocol Inc */}
                        </a>
                    </Link>
                </div>
                <div className="search_logo">
                    {
                        isAuthenticated && <NotificationComp />
                    }
                    <i onClick={() => setIsSearch(!isSearch)} className="fas fa-search"></i>
                </div>
            </div>
            {
                isSearch &&
                <div style={{ marginBottom: "10px" }}>
                    <Search />
                </div>
            }
        </div>
    )
}

export default MobileHeader
