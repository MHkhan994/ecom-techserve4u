import store from "../store";
import axios from 'axios'

  export const setPaymentMethods = (payload) => {
    return async (dispatch) => {
       let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/settings/getactivemethod`)

       if (res.data.success){
            dispatch({
                type:"SET_PAYMENT_METHODS",
                payload:res.data.methods
            })
       }
        
      };
  };