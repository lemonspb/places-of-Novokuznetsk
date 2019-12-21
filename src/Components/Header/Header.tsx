import React, { useState,useEffect } from 'react'
import './Header.scss'
import { Menu, Dropdown, Button, Icon, message, Avatar } from 'antd';

 const  Header = ()=>{
   
  const menu = (
    <Menu>
      <Menu.Item key="1">
        Зарегестрироваться 
      </Menu.Item>
      <Menu.Item key="2">
        Войти  
      </Menu.Item>
    </Menu>
  );
 

    return (
      <div className='header'>
          <Dropdown overlay={menu}>
          <Avatar size="large" icon="user" >
       
          </Avatar>
    </Dropdown>
 
      </div>    
    );
  }

  export default Header
  