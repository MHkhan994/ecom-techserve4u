import "../styles/main.scss"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import { Provider } from 'react-redux';
import App from 'next/app'
import { createWrapper } from 'next-redux-wrapper'
import store from '../store'
import AuthAndAxiso from '../helper/auth'
import {updateCart} from '../actions/cartActions'
import {setPaymentMethods} from '../actions/generalActions'
import ReactGA from 'react-ga';

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
NProgress.configure({ showSpinner: false });
//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());


const configAnalytics=()=>{
  let {general} = store.getState()
  let {analytics} = general
  if(analytics.ga && analytics.ga.isActive){
    ReactGA.initialize(analytics.ga.id);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  if(analytics.pixel && analytics.pixel.isActive){
    const ReactPixel =  require('react-facebook-pixel');
    ReactPixel.default.init(analytics.pixel.id);
  }

}


class MyApp extends App {
  componentDidMount(){
    store.dispatch(updateCart());
    store.dispatch(setPaymentMethods());
    configAnalytics()
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}


const makestore = () => store
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(AuthAndAxiso(MyApp))
