import React, { useContext, useState } from 'react'
import './Header.scss'
import { Menu, Dropdown, Avatar, Popover } from 'antd';
import { Link } from 'react-router-dom'
import { AuthContext } from "../Auth/Auth";
import firebases from '../../services/base'

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [visiblePopup, setVisiblePopup] = useState(false)

  const handleVisibleChangePopup = () => {
    setVisiblePopup(!visiblePopup)
  }

  const content = (
    <div>
      <p>Привет,
      это карта воспоминаний твоего города!
      Нажимай на памятное место на карте и оставляй свое
      записку.</p>
      <p>В историях ты можешь посмотреть записки других людей!</p>

    </div>
  );
  const menu = (
    <Menu className='header__menu'>

      <Menu.Item key="1">


        {currentUser ? <Link to='/edit-account' >Редактировать</Link> : <Link to='/signup'>Зарегистрироваться</Link>}

      </Menu.Item>
      <Menu.Item key="2">
        {currentUser ? <Link to='/' onClick={() => { firebases.auth().signOut() }}> Выйти</Link> : <Link to='/login' >Войти</Link>}
      </Menu.Item>
    </Menu>
  );


  return (
    <div className='header'>
      <Popover
        className='header__popup'
        content={content}
        title='Помощь'
        trigger="click"
        visible={visiblePopup}
        onVisibleChange={handleVisibleChangePopup}
      >
        <Avatar size="large" icon='info' className='header__info' />
      </Popover>

      <Dropdown overlay={menu} className='header__dropdown'>
        <div className='header__avatar-wrap'>
          {currentUser && currentUser.photoURL ? <Avatar size="large" src={currentUser.photoURL} /> : <Avatar size="large" icon='user' />}
          <div className='header__diplayname'>{currentUser && currentUser.displayName ? currentUser.displayName : ''}</div>
        </div>

      </Dropdown>

    </div>
  );
}

export default Header
