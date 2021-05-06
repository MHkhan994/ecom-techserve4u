import React from 'react'
import Link from 'next/link'

function OrderDetails({order}) {
    return (
        <>
            <div className="section_heading">
                <h6>ORDER DETAILS</h6>
            </div>

            <div className="item_details p-4">
                <div className="overflow-auto">
                    <table className="w-100 border_bottom">
                        <tbody>
                            <tr className="border_bottom">
                                <td style={{ width: "60%" }} >Description</td>
                                <td className='text-center' >Quantity</td>
                                <td className='text-center'>Amount</td>

                            </tr>

                            {
                                order && order.items.map((item, index) => {
                                    return (
                                        <tr key={index} className="">
                                            <td className="mt-2">
                                                <div className="d-flex align-items-center mt-2">
                                                    <div className="">
                                                        <img style={{ height: "80px", width: "80px", objectFit: "cover", marginRight: "10px" }} src={item.thumbnail} />
                                                    </div>
                                                    <div className="">
                                                        <Link href={`/product/${item.productSlug}`}>
                                                            <a >
                                                                <p className="">{item.productName}</p>
                                                            </a>
                                                        </Link>

                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <p className='font-weight-bold'>$ {item.payablePrice} X {item.purchasedQty}</p>
                                            </td>
                                            <td className="text-center">
                                                <p className='font-weight-bold'>$ {parseInt(item.payablePrice) * parseInt(item.purchasedQty)}</p>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>


                    <table className='w-100 mt-4'>
                        <tbody className='mt-4'>
                            <tr >
                                <td style={{ width: "50%" }}>Status: {order && order.paymentStatus}
                                    {
                                        order && order.paymentStatus === 'unpaid' && !order.paymentMethod && <button onClick={() => showModal()} className='primary_btn ml-2'>Pay Now</button>
                                    }

                                </td>
                                <td style={{ width: "13%" }}>
                                    <span>Total price :</span>
                                    <div className='font-weight-bold'>$ {order && order.totalAmount}</div>
                                </td>
                                <td className='text-center' style={{ width: "13%" }}>
                                    <span>Total paid :</span>
                                    <div className='font-weight-bold'>$ {order && order.paidAmount}</div>
                                </td>
                                <td className='text-center' style={{ width: "13%" }}>
                                    <span >Due :</span>
                                    <div className='font-weight-bold'>$ {order && order.totalAmount - order.paidAmount}</div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default OrderDetails
