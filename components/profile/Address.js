import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AddressModal from '../adressModal/AddressModal';





function Address() {
    const [addresses, setAddresses] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    useEffect(() => {
        axios
            .get("/address/getaddress")
            .then((res) => {
                setAddresses(res.data.addresses);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedAddress(null)
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleSelected = (address) => {
        setSelectedAddress(address);
        showModal()
    }

    const handleUpdatedData = (address) => {
        let array = [...addresses]
        let index = array.findIndex(a => a._id === address._id)
        array[index] = address
        setAddresses(array)
        setSelectedAddress(null)
    }

    const handleDelete=(id)=>{
        axios.delete('/address/delete/'+id)
        .then(res=>{
            if(res.data.success){
                let array = [...addresses]
                let index = array.findIndex(a => a._id === id)
                array.splice(index,1)
                setAddresses(array)
            }
        })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mobile',
            dataIndex: 'mobileNumber',
            key: 'mobileNumber',
        },
        {
            title: 'Region',
            dataIndex: 'region',
            key: 'region',
        },
        {
            title: 'Area',
            dataIndex: 'area',
            key: 'area',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <span onClick={() => handleSelected(record)} style={{ cursor: 'pointer' }}><EditOutlined /></span>
                    <Popconfirm
                        title="Are you sure to delete this Address?"
                        onConfirm={()=>handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <span style={{ cursor: "pointer" }}><DeleteOutlined style={{ color: "red" }} /></span>
                    </Popconfirm>


                </Space>
            ),
        },
    ];



    return (
        <>
            <AddressModal
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
                sendData={(data) => setAddresses(prev => [...prev, data])}
                selectedAddress={selectedAddress}
                sendUpdatedData={(data) => handleUpdatedData(data)}

            />
            <div className='mb-5'>
                <div className="section_heading">
                    <span><i className="fas fa-file-alt"></i></span>

                    <div className='heading_title'>

                        <h5>YOUR ADDRESS</h5>
                        <button onClick={() => showModal()}>Add New</button>
                    </div>

                </div>
                <div style={{overflow:"auto"}}>
                <Table  columns={columns} dataSource={addresses} />
                </div>
                
            </div>
        </>
    )
}

export default Address
