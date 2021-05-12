
let init ={
    addresses:[],
    categories:[],
    brands:[],

}

const generalData = (state=init, action)=>{
    switch (action.type) {
        case "SET_ADDRESSES":
       return{
           ...state,
           addresses:action.payload
        }
        case "ADD_NEW_ADDRESSES":
       return{
           ...state,
           addresses:[action.payload,...state.addresses]
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
      
        default:
            return state;
    }
}

export default generalData