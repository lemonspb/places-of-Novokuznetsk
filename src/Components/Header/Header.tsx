import React, { useState,useEffect,useContext } from 'react'
import './Header.scss'
import { Menu, Dropdown, Button, Icon, message, Avatar } from 'antd';
import { Link } from 'react-router-dom'
import { AuthContext } from "../Auth/Auth";
import firebases from '../../services/base'

 const  Header  = ()=>{
  const { currentUser } = useContext(AuthContext);
  const menu = (
    <Menu>
      <Menu.Item key="1">
  {currentUser?<Link to='/edit-account' >Редактировать</Link>:<Link to='/signup'>Зарегистрироваться</Link>  }
       
      </Menu.Item>
      <Menu.Item key="2">
      {currentUser?<Link to='/' onClick={()=>{firebases.auth().signOut()}}>выйти</Link>:<Link to='/login' >Войти</Link>  }
      </Menu.Item>
    </Menu>
  );
 

    return (
      <div className='header'>
          <Dropdown overlay={menu}>
          {currentUser && currentUser.photoURL?<Avatar size="large"  src={currentUser.photoURL} />:<Avatar size="large" icon='user' />} 

         
          
    </Dropdown>
    {currentUser?currentUser.displayName:''}
      </div>    
    );
  }

  export default Header
  