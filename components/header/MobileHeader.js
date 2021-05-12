import React, { useState } from 'react'
import Search from './Search'
import Link from 'next/link'

function MobileHeader({ setUserDrawerOpen }) {
    const [isSearch, setIsSearch] = useState(false)
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
                        </a>
                    </Link>
                </div>
                <div className="search_logo">
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
