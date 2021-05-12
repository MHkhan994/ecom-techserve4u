
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Cookies from "js-cookie";


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function UserDrawer({ userDrawerState, closeUserDrawer, onCloseUserDrawer, categories }) {

    const { open } = useSelector(state => state.cart)
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const classes = useStyles();
    const [state, setState] = useState(true);



    const handleCloseCart = () => {
        dispatch({
            type: "CART_CLOSE"
        })
    }


    const handleLogout = () => {
        Cookies.remove("myshop_auth2");
        window.location.pathname = '/'
    }



    return (
        <div>
            <Drawer anchor={"left"} open={userDrawerState} onClose={onCloseUserDrawer()}>
                <div className="user_drawer_header">
                    <div className="avatar">
                        <img src={user.profilePicture||"https://via.placeholder.com/80"} alt="" />
                        <div className='name_mobile'>
                            <p>{user.name}</p>
                            <span>{user.mobile}</span>
                        </div>

                    </div>
                    <div className="auth_button">

                        {
                            isAuthenticated ? <>
                                <Link href="/user/profile"><a className="login">My account</a></Link>
                                <span className='logout' onClick={() => handleLogout()}>Logout</span>
                            </>
                                : <>
                                    <Link href="/auth/login"><a className="login">Login</a></Link>
                                    <Link href="/auth/register"><a className="register">register</a></Link>

                                </>
                        }


                    </div>
                </div>
                <div className="user_drawer_container">


                    <div className="list_content">
                        <li className="list_item">
                            <Link href="/">
                                <a className="list_item_link" >
                                    <span><i className="fas fa-home"></i></span>
                                    <p>Home</p>
                                </a>
                            </Link>

                        </li>
                        <li className="list_item">
                            <Link href="/campaigns">
                                <a className="list_item_link" href="#">
                                    <span><i className="fas fa-gift"></i></span>
                                    <p>Campaigns</p>
                                </a>
                            </Link>
                        </li>
                        <li className="list_item">
                            <Link href="/brands">
                                <a className="list_item_link">
                                    <span><i className="fa fa-list-alt"></i></span>
                                    <p>All Brands</p>
                                </a>
                            </Link>
                        </li>
                        <li className="list_item">
                            <Link href="/categories">
                                <a className="list_item_link">
                                    <span><i className="fas fa-th-list"></i></span>
                                    <p>All Categories</p>
                                </a>
                            </Link>
                        </li>
                        <li className="list_item">
                            <a className="list_item_link" href="#">
                                <span><i className="fas fa-truck-moving"></i></span>
                                <p>Track Order</p>
                            </a>
                        </li>
                        <li className="list_item">
                            <a className="list_item_link" href="#">
                                <span><i className="far fa-comments"></i></span>
                                <p>Help</p>
                            </a>
                        </li>
                        <li className="list_item">
                            <a className="list_item_link" href="#">
                                <span><i className="fas fa-file-contract"></i></span>
                                <p>Contact use</p>
                            </a>
                        </li>
                        <hr />
                    </div>
                    <div className="list_content">
                        {
                            categories.length > 0 &&
                            categories.map((cat, index) => {
                                return (

                                    <li key={index} className="list_item">
                                        <Link href={`/search?category=${cat.slug}`}>
                                            <a className="list_item_link" >
                                                {/* <span><i className="fas fa-home"></i></span> */}
                                                <p>{cat.name}</p>
                                            </a>
                                        </Link>
                                    </li>


                                )
                            })

                        }
                    </div>
                </div>
            </Drawer>
        </div>
    );
}













