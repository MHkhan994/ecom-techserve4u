
import axios from 'axios'
import ReactGA from 'react-ga';

  // export const setPaymentMethods = (payload) => {
  //   return async (dispatch) => {
  //      let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/settings/getactivemethod`)

  //      if (res.data.success){
  //           dispatch({
  //               type:"SET_PAYMENT_METHODS",
  //               payload:res.data.methods
  //           })
  //      }
        
  //     };
  // };




  export const  config=()=>{
    axios.get(process.env.NEXT_PUBLIC_API_URL+'/settings/initialdata')
    .then(res=>{
      let crisp = res.data.liveChat.crisp
      let analytics = res.data.analytics


      if(crisp.isEnable) {
        let scriptTag = document.createElement('script')
        scriptTag.innerHTML = ` window.$crisp=[];window.CRISP_WEBSITE_ID="${crisp.websiteId}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`
        document.body.appendChild(scriptTag)
      }


      if(analytics.ga && analytics.ga.isActive){
        ReactGA.initialize(analytics.ga.id);
        ReactGA.pageview(window.location.pathname + window.location.search);
      }
      if(analytics.pixel && analytics.pixel.isActive){
        const ReactPixel =  require('react-facebook-pixel');
        ReactPixel.default.init(analytics.pixel.id);
      }
  
    })
    .catch(err => {
      console.log(err);
    })
  
  }