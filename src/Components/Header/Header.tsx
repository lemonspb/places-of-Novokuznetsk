import React, { useState,useEffect,useContext } from 'react'
import './Header.scss'
import { Menu, Dropdown, Icon,  Avatar } from 'antd';
import { Link } from 'react-router-dom'
import { AuthContext } from "../Auth/Auth";
import firebases from '../../services/base'

 const  Header  = ()=>{
  const { currentUser } = useContext(AuthContext);
  const menu = (
    <Menu className='header__menu'>
        <Menu.Item key="1">
     
{currentUser?currentUser.displayName:''}                  
         </Menu.Item>
      <Menu.Item key="2">
     
  {currentUser?<Link to='/edit-account' >  <Icon type="edit" /> Редактировать</Link>:<Link to='/signup'><Icon type="user-add" />Зарегистрироваться</Link>  }
       
      </Menu.Item>
      <Menu.Item key="3">
      {currentUser?<Link to='/' onClick={()=>{firebases.auth().signOut()}}> <Icon type="close" /> выйти</Link>:<Link to='/login' > <Icon type="check" /> Войти</Link>  }
      </Menu.Item>
    </Menu>
  );
 

    return (
      <div className='header'>
          <Avatar size="large"  icon='info' className='header__info'  />
          <Dropdown overlay={menu} className='header__dropdown'>
          {currentUser && currentUser.photoURL?<Avatar size="large"  src={currentUser.photoURL} />:<Avatar size="large" icon='user' />} 

         
          
    </Dropdown>
      </div>    
    );
  }

  export default Header
  