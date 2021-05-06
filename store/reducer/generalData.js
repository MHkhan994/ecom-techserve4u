
let init ={
    paymentMethods:[],
    categories:[],
    brands:[],
    analytics:{}

}

const generalData = (state=init, action)=>{
    switch (action.type) {
        case "SET_PAYMENT_METHODS":
       return{
           ...state,
           paymentMethods:action.payload
        }
        case "SET_CATEGORIES":
       return{
           ...state,
           categories:action.payload
        }
        case "SET_BRANDS":
       return{
           ...state,
           brands:action.payload
        }
        case "SET_ANALYTICS":
       return{
           ...state,
           analytics:action.payload
        }
      
        
        default:
            return state;
    }
}

export default generalData