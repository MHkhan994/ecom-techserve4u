import React, { useState, useEffect } from 'react'

import Link from 'next/link'

// function sub({subcats}){
//     let nestedsub = subcats.children.map((sub,index)=>{
//         return <sub key={index} sub={sub} type="child" />
//     })
// }

function CatList({categories}) {

   
    return (
        <div className="category_list">
            <ul className='cat_main'>
                {
                    categories && categories.slice(0, 11).map((cat, index) => {
                        return (
                            <li  key={index}>
                                <Link href={`/search?category=${cat.slug}`}>
                                <a >{cat.name}<i className="fa fa-arrow-right"></i></a>
                                </Link>
                             <div  className={cat.children.length === 0 ? "sub_cat_container hide":"sub_cat_container"}>
                                {
                                    cat.children.length > 0 && cat.children.map((sub, index2) => {
                                        return (
                                           
                                                <div key={index2} className="sub_main_cat">
                                                    <Link href={`/search?category=${sub.slug}`}>
                                                    <a className="sub_category_name">{sub.name}</a>
                                                    </Link>
                                                   
                                                    <ul>
                                                    {
                                                        sub.children.length > 0 && sub.children.map((sub2,index3)=>{
                                                            return(
                                                                <li key={index3}>
                                                                    <Link href={`/search?category=${sub2.slug}`}>
                                                                    <a>{sub2.name}</a>
                                                                    </Link>
                                                                    
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                    </ul>
                                                    
                                                </div>
                                        )
                                    })
                                }
                                </div>
                            </li>
                        )
                    })
                }
               
            </ul>
        </div>
    )
}

export default CatList
