import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './Components/App/App';
import WrappedRegistration from './Components/RegistrationPages/RegistrationPage'
import WrappedLogIn from './Components/RegistrationPages/LoginPage'
import WrappedEditAccountPage  from './Components/RegistrationPages/EditAccountPage'
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import {BrowserRouter as Router,  Route,Switch, Redirect } from 'react-router-dom';
import {AuthProvider} from './Components/Auth/Auth'
import 'swiper/css/swiper.css'


ReactDOM.render(
    <AuthProvider>
<Router>  
<Route  path='/'  exact component ={App}/>
<Route  path='/signup'  exact render={ ()=> <WrappedRegistration />}/>
<Route  path='/login'  exact render={ ()=> <WrappedLogIn />}/>
<Route  path='/edit-account'  exact render={ ()=> <WrappedEditAccountPage />}/>
</Router>  
</AuthProvider>

    , document.getElementById('root'));


serviceWorker.unregister();
