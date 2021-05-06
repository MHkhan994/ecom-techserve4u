import React, { useState ,useEffect} from 'react'
import { Button, Modal, Form, Input, Radio, Select ,} from 'antd';
const { Option } = Select;
import axios from 'axios'
import zIndex from '@material-ui/core/styles/zIndex';
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};

function AddressModal({ isModalVisible, handleCancel ,sendData,selectedAddress,sendUpdatedData}) {
    const [form] = Form.useForm();
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [editId, setEditId] = useState(null)

    const save=(values)=>{
        setLoading(true)
        axios.post('/address/create', values)
            .then(res => {
                if(res.data.success){
                    sendData(res.data.address);
                    form.resetFields();
                    setLoading(false)
                    handleCancel()
                }
               
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
                err && err.response && setError(err.response.data)
            })
    }

    const update=(id,values)=>{
        setLoading(true)
        axios.patch('/address/update/'+id, values)
            .then(res => {
                if(res.data.success){
                    sendUpdatedData(res.data.address);
                    form.resetFields();
                    setLoading(false)
                    handleCancel()
                }
               
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
                err && err.response && setError(err.response.data)
            })
    }

    

    const onCreate = (values) => {
       if(editId){
          
        update(editId,values)
       }else{
           save(values)
       }
       
    }

useEffect(() => {
   if(selectedAddress){
       form.setFieldsValue(selectedAddress)
       setEditId(selectedAddress._id)
   }else{
    form.resetFields();
    setEditId(null)
   }
}, [selectedAddress])


    return (
        <>
            <Modal
            confirmLoading={loading}
                visible={isModalVisible}
                title={editId?"Update Address":"Add New Address"}
                okText={editId?"Update":"Create"}
                cancelText="Cancel"
                onCancel={handleCancel}
                zIndex={1111}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {                
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    {...layout}
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                    className='address_modal'
                >
                    <Form.Item
                        name="name"
                        label="Full Name"
                        validateStatus={error && error.name ? "error" : "succcess"}
                        help={error && error.name ? error.name : null}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="mobileNumber"
                        label="Mobile number"
                        validateStatus={error && error.mobileNumber ? "error" : "succcess"}
                        help={error && error.mobileNumber ? error.mobileNumber : null}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="region"
                        label="Region"
                        validateStatus={error && error.region ? "error" : "succcess"}
                        help={error && error.region ? error.region : null}
                    >
                        <Select
                            dropdownStyle={{zIndex:11111}}
                            showSearch
                            style={{ width: "100%", zIndex: 5 }}
                            placeholder="Select a region"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                            getPopupContainer={node => node.parentNode}
                        >
                            <Option  value="barishal">Barishal</Option>
                            <Option value="chittagonj">Chittagonj</Option>
                            <Option value="dhaka">Dhaka</Option>
                            <Option value="khulna">Khulna</Option>
                            <Option value="rajshahi">Rajshahi</Option>
                            <Option value="rangpur">Rangpur</Option>
                            <Option value="sylhet">Sylhet</Option>
                            <Option value="mymensingh">Mymensingh</Option>
                          
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="area"
                        label="Area"
                        validateStatus={error && error.area ? "error" : "succcess"}
                        help={error && error.area ? error.area : null}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        validateStatus={error && error.address ? "error" : "succcess"}
                        help={error && error.address ? error.address : null}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    {/* <Form.Item name="modifier" className="collection-create-form_last-form-item">
                        <Radio.Group>
                            <Radio value="public">Public</Radio>
                            <Radio value="private">Private</Radio>
                        </Radio.Group>
                    </Form.Item> */}
                </Form>
            </Modal>
        </>
    )
}

export default AddressModal
