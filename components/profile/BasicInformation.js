import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import { notificationFunc } from '../global/notification'


function BasicInformation() {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [mobile, setMobile] = useState('')
    const [name, setName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [gender, setGender] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [email, setEmail] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [isEditEmail, setIsEditEmail] = useState(false)

    const reset = () => {
        if (user) {

            setMobile(user.mobile)
            setName(user.name)
            setContactNumber(user.contactNumber || '')
            setGender(user.gender)
            setBirthDate(user.birthDate || '')
            setEmail(user.email || '')
            setCreatedAt(user.createdAt)
        }
    }
    useEffect(() => {
        reset()
    }, [user])

    const saveGeneralInfo = () => {
        let data = {
            mobile,
            name,
            contactNumber,
            gender: gender === 'N/A' ? "" : gender,
            birthDate
        }
        axios.patch('/user/update', data)
            .then(res => {
                if (res.data.success) {
                    dispatch({
                        type: "SET_USER",
                        payload: res.data.user
                    })
                    setIsEdit(false)
                    notificationFunc("success", "Profile updated")
                }
            })
            .catch(err => {
                err && err.response && notificationFunc("error", err.response.data.error)
            })
    }
    const saveEmail = () => {
        if (!email) {
            return notificationFunc("error", "Please enter your email")
        }
        let data = {
            email
        }
        axios.patch('/user/email', data)
            .then(res => {
                if (res.data.success) {
                    dispatch({
                        type: "SET_USER",
                        payload: res.data.user
                    })
                    setIsEditEmail(false)
                    notificationFunc("success", "Email updated")
                }
            })
            .catch(err => {
                err && err.response && notificationFunc("error", err.response.data.error)
            })
    }
    return (
        <>
            <div className='mb-5'>
                <div className="section_heading">
                    <span><i className="fas fa-file-alt"></i></span>

                    <div className='heading_title'>

                        <h5>PERSONAL INFORMATION</h5>
                        {
                            !isEdit && <button onClick={() => setIsEdit(true)}>Edit</button>
                        }

                    </div>

                </div>
                <div className="section_content">
                    <div className="single_item">
                        <span className="key">Mobile Number:</span>
                        <input disabled={!isEdit} onChange={e=>setMobile(e.target.value)} value={mobile && mobile} className="value"></input>
                    </div>
                    <div className="single_item">
                        <span className="key">Name:</span>
                        <input onChange={(e) => setName(e.target.value)} disabled={!isEdit} value={name} className="value"></input>
                    </div>
                    {/* <div className="single_item">
                                        <span className="key">Last Name:</span>
                                        <span className="value">Alam</span>
                                    </div> */}
                    <div className="single_item">
                        <span className="key">Contact Number:</span>
                        <input placeholder='Your contact number' onChange={(e) => setContactNumber(e.target.value)} disabled={!isEdit} value={contactNumber && contactNumber} className="value"></input>
                    </div>
                    <div className="single_item">
                        <span className="key">Gender:</span>
                        <select onChange={(e) => setGender(e.target.value)} disabled={!isEdit} value={gender ? gender : "N/A"} className="value w-100">
                            <option value="N/A">select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">other</option>
                        </select>
                    </div>

                    <div className="single_item">
                        <span className="key">Dte Of Birth:</span>
                        {
                            !isEdit ? <input disabled={!isEdit} value={birthDate ? moment(birthDate).format("DD MMM YYYY") : "N/A"} className="value"></input> :
                                <input onChange={(e) => setBirthDate(e.target.value)} type='date' value={birthDate ? birthDate : "N/A"} className="value"></input>
                        }




                    </div>
                    <div className="single_item">
                        <span className="key">Member Since:</span>
                        <input disabled value={createdAt && moment(createdAt).format("DD MMM YYYY")} className="value"></input>
                    </div>
                    <div className="single_item">
                        <span className="key"></span>
                        {
                            isEdit && <div className="mt-2">
                                <button onClick={() => {
                                    setIsEdit(false)
                                    reset()
                                }} className="primary_outline_btn mr-2">Cancel</button>
                                <button onClick={() => saveGeneralInfo()} className='primary_btn'>Save</button>
                            </div>
                        }

                    </div>
                </div>
            </div>


            <div>
                <div className="section_heading">
                    <span><i className="fas fa-envelope-square"></i></span>

                    <div className='heading_title'>

                        <h5>EMAIL ADDRESS</h5>
                        {/* {
                            !isEditEmail && <button onClick={() => setIsEditEmail(true)}>Edit</button>
                        } */}

                    </div>

                </div>
                <div className="section_content">
                    <div className="single_item">
                        <span className="key">Primary Email:</span>
                        <input onChange={(e) => setEmail(e.target.value)} placeholder='Your email' disabled={true} value={email && email} className="value"></input>
                    </div>
                    {/* <div className="single_item">
                                        <span className="key">Other:</span>
                                        <span className="value">N/A</span>
                                    </div> */}
                    <div className="single_item">
                        <span className="key"></span>
                        {
                            isEditEmail && <div className="mt-2">
                                <button onClick={() => setIsEditEmail(false)} className="primary_outline_btn mr-2">Cancel</button>
                                <button onClick={() => saveEmail()} className='primary_btn'>Save</button>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default BasicInformation
