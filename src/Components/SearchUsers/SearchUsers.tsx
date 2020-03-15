import React, { useState, useEffect } from 'react'
import { Input, Avatar, Icon, Button } from 'antd';
import './SearchUsers.scss'


const SearchUsers = ({ listUsers, showSearchUsers, setShowSearchUsers, changeList }: any) => {

    const { Search } = Input;
    let tmpArray: any = [];
    const [userList, setUserList] = useState(listUsers)
    const [userName, setUserName] = useState('')

    useEffect(() => {
        setUserList(listUsers)
    }, [listUsers])

    function itemCheck(item: any) {
        if (tmpArray.indexOf(item.userId) === -1) {
            tmpArray.push(item.userId);
            return true
        }
        return false;
    }

    const onSearchUser = (name: any) => {
        if (name.target.value === '') {
            setUserList(listUsers)
        }
        else {
            setUserName(name.target.value)
            setUserList(listUsers.filter((el: any) => el.username.toLowerCase().startsWith(name.target.value.toLowerCase().trimStart())))
        }


    }


    return (<div className={`search-users ${showSearchUsers ? 'search-users--active' : 'search-users--hidden'}`}>
        <div className='search-users__top'>
            <Button onClick={() => setShowSearchUsers(false)}>назад</Button>
            <Search
                placeholder="найти человека"
                onChange={value => onSearchUser(value)}
                style={{ width: 200 }}
            />
        </div>
        <div className="search-users__list">
    
            {userList.length > 0 ? userList.filter((el: any) => itemCheck(el)).map((el: any, i: number) => {
                return (
                    
                    <div className='search-users__user' onClick={() => { changeList(el.userId); setShowSearchUsers(false) }} key={i}>
                        <Avatar size="large" icon="user" src={el.avatar} className='search-users__avatar' />
                        <span className='search-users__name'>{el.username ? el.username : 'неизвестно'}</span>
                    </div>
            
                )

            }):<div className='search-users__empty'>Пользователь с именем <span>"{userName}"</span> не найден</div>}

        </div>
    </div>)
}

export default SearchUsers
