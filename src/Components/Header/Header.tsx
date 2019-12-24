import React, { useContext } from 'react'
import './Header.scss'
import { Menu, Dropdown,  Avatar } from 'antd';
import { Link } from 'react-router-dom'
import { AuthContext } from "../Auth/Auth";
import firebases from '../../services/base'

 const  Header  = ()=>{
  const { currentUser } = useContext(AuthContext);
  const menu = (
    <Menu className='header__menu'>
      
      <Menu.Item key="1">
     
  {currentUser?<Link to='/edit-account' >Редактировать</Link>:<Link to='/signup'>Зарегистрироваться</Link>  }
       
      </Menu.Item>
      <Menu.Item key="2">
      {currentUser?<Link to='/' onClick={()=>{firebases.auth().signOut()}}> выйти</Link>:<Link to='/login' >  Войти</Link>  }
      </Menu.Item>
    </Menu>
  );
 

    return (
      <div className='header'>
          <Avatar size="large"  icon='info' className='header__info'  />
          <Dropdown overlay={menu} className='header__dropdown'>
            <div className='header__avatar-wrap'>
            {currentUser && currentUser.photoURL?<Avatar size="large"  src={currentUser.photoURL} />:<Avatar size="large" icon='user' />} 
            <div className='header__diplayname'>{currentUser?currentUser.displayName:''}</div>   
            </div>
          
    </Dropdown>
    
      </div>    
    );
  }

  export default Header
  