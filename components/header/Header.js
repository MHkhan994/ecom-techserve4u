import Head from 'next/head'
import CartDrawer from '../cart/CartDrawer.js'
import MobileBottomNav from './MobileBottomNav.js'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserMenu from './UserMenu'
import UserDrawer from './UserDrawer.js'
import CategoryDropdown from './CategoryDropdown.js'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Badge } from 'antd';
import Link from 'next/link'


export default function Header() {
    const dispatch = useDispatch()
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)
    const {categories} = useSelector(state => state.general)
    const Router = useRouter()

    const [query, setQuery] = useState("")
    const [searchedProducts, setSearchedProducts] = useState([])

    const [userDrawerOpen, setUserDrawerOpen] = useState(false)
    const [anchor, setAnchor] = useState(null);
    const [showDropCat, setShowDropCat] = useState(false)

 

    useEffect(() => {
        if (query === '') {
            return setSearchedProducts([])
        }
        const delayed = setTimeout(() => {
            axios.get(`/product/getsearchproducts?search=${query}`)
                .then(res => {
                    setSearchedProducts(res.data.products);
                    console.log(res.data.products);
                })
        }, 100)
        return () => clearTimeout(delayed)
    }, [query])




    useEffect(() => {
        if (Router.route === '/') {
            setShowDropCat(false)
        } else {
            setShowDropCat(true)
        }
    }, [Router])

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setUserDrawerOpen(false)

    };

    const closeUserDrawer = () => {
        setUserDrawerOpen(false)
    }


    const handleCartOpen = () => {
        dispatch({
            type: "CART_OPEN"
        })
    }

    const handleClickUser = (event) => {
        if (isAuthenticated) {
            setUserDrawerOpen(true)
        } else {
            setAnchor(event.currentTarget);
        }
    }

    const handleClose = () => {
        setAnchor(null);
    };


    let handleKey = (e) => {

        if (e.keyCode === 13) {
            e.preventDefault()
            Router.push(`/search?query=${query}`)
        }
    }
    return (
        <>
            <div className="top_nav">
                <div className="main_container">
                    <div className="left_info">
                        <div className="item">
                            <i className="fas fa-phone"></i>
                            <span>09630000000</span>
                        </div>
                        <div className="item">
                            <i className="far fa-envelope"></i>
                            <span>support@yoursite.com</span>
                        </div>

                    </div>
                    <div className="Right_info">
                        <i className="fas fa-mobile-alt"></i>
                        <span>Download our app</span>
                    </div>
                </div>
            </div>
            <header id="header" className="sticky-top" >



                <div className="main_nav_container">
                    <nav className="main_nav">
                        <div className="main_container">
                            <div className="logo">
                                <i onClick={() => setUserDrawerOpen(true)} className="fas fa-bars mr-3"></i>
                                <Link href="/"><a>DCEL</a></Link>
                            </div>
                            <div className="search_wrapper">
                                <input onKeyDown={(e) => handleKey(e)} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="search for..."></input>
                                <i onClick={() => Router.push(`/search?query=${query}`)} className="fas fa-search"></i>
                                <div className={`search_overlay ${searchedProducts.length == 0 && "d-none"}`}>
                                    <div className="search_products">
                                        {

                                            searchedProducts.length > 0 && searchedProducts.map((product, index) => {
                                                return (
                                                    <Link key={index} href={`/product/${product.slug}`}>
                                                        <a>
                                                            <div className="items">
                                                                <img src={product.thumbnail}></img>
                                                                <h5>{product.name}</h5>
                                                                <div className="product-price">
                                                                    {
                                                                        product?.discount?.value > 0 ?
                                                                            <>
                                                                                <span className="old-price">${product.price}</span>
                                                                                {
                                                                                    product.discount.discountType === 'flat' ?
                                                                                        <span className="new-price">${product.price - product.discount.value}</span> :
                                                                                        <span className="new-price">${product.price - Math.floor((product.price * (product.discount.value / 100)))}</span>
                                                                                }

                                                                            </> :
                                                                            <span className="new-price">$119</span>
                                                                    }


                                                                </div>
                                                            </div>
                                                        </a>
                                                    </Link>



                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="header_info">
                                <span onClick={() => handleCartOpen()}>
                                    <Badge count={cartItems && Object.keys(cartItems).length || 0}>
                                        <i className="fas fa-shopping-bag"></i>
                                    </Badge>

                                </span>
                                <span><i className="far fa-bell"></i></span>
                                <span onClick={handleClickUser}><i className="far fa-user"></i></span>
                            </div>
                        </div>
                    </nav>

                    <nav className="bottom_nav">
                        <div className="main_container">
                            <div className="categories">
                                <i onClick={() => setUserDrawerOpen(true)} className="fas fa-bars"></i>
                                <div className="cat_menu_hover">
                                    <span className='mr-2'>Categories</span>
                                    <i className="fas fa-arrow-down"></i>
                                </div>

                                {
                                    showDropCat && <CategoryDropdown categories={categories} />
                                }

                            </div>
                            <div className="pages_list">
                                <li><Link href="/campaigns"><a >Campaigns</a></Link></li>
                                <li><Link href="/brands"><a>Brands</a></Link></li>
                                <li><Link href="/categories"><a>Categories</a></Link></li>
                                <li><a href="#">Help</a></li>
                                <li><a href="#">FAQ</a></li>
                            </div>
                        </div>


                    </nav>
                </div>
            </header>
            <MobileBottomNav />
            <CartDrawer />
            <UserMenu handleClose={handleClose} anchor={anchor} />
            <UserDrawer categories={categories} closeUserDrawer={closeUserDrawer} userDrawerState={userDrawerOpen} onCloseUserDrawer={toggleDrawer} />
        </>
    )
}
