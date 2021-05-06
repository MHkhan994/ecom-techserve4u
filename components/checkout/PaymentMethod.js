import React, { useState,useEffect } from "react";
import { Radio, Input } from 'antd';
import {useSelector} from 'react-redux'
import Paypal from "./Paypal";

const radioStyle = {
  display: 'block',
  height: '40px',
  lineHeight: '40px',
};


function PaymentMethod({ onStepChange,onChangeMethod,selectedPaymentMethod,handleConfirmOrder,isLoading,shippingCost,addressId}) {
  
  const {paymentMethods} = useSelector(state => state.general)
  const [loaded, setLoaded] = useState(false);


  
  return (
    <>
      <h5 className="heading">Select a payment method</h5>
      <div className="payment_wrapper">
      <Radio.Group onChange={onChangeMethod} value={selectedPaymentMethod} >
        {
          paymentMethods.length>0 && paymentMethods.map((method,index)=>{
            return(
              
              <Radio key={index} style={radioStyle} value={method.name}>
                {method.name === 'cod' ? "Cash On Delivery":method.name==="ssl"?"Sslcommerz":method.name}
                
                
            </Radio>
            
            )
          })
        }
       </Radio.Group>
          {/* <Radio style={radioStyle} value="bkash">
            Bkash
        </Radio>
          <Radio style={radioStyle} value="nagad">
           Nagad
        </Radio> */}

      </div>
      <div className='d-flex justify-content-between my-3 mt-5'>
        <button onClick={() => onStepChange(-1)} className='primary_outline_btn'>Back</button>
        {
          selectedPaymentMethod === 'paypal' ?<Paypal shippingCost={shippingCost} addressId={addressId} /> :
          <button disabled={isLoading} onClick={() =>  handleConfirmOrder()} className='primary_btn'>Confirm Order</button>
        }
        
       
      </div>
    </>
  );
}

export default PaymentMethod;
