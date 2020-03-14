import React, { useState, useEffect } from 'react'
import { List, Avatar, Icon } from 'antd';
import './SearchUsers.scss'





const SearchUsers = ({listUsers,showSearchUsers}:any) => {
   
    let tmpArray:any = [];

    function itemCheck(item:any) {
        if (tmpArray.indexOf(item.userId) === -1) {
            tmpArray.push(item.userId);
            return true
        }
        return false;
    }

 return (<div className={`search-users ${showSearchUsers?'search-users--active':'search-users--hidden'}`}>
     {listUsers.filter((el:any)=>itemCheck(el)).map((el:any   ,i:number)=>{
return(
    <div className='search-users__user'  key={i}>
    <Avatar size="large" icon="user" src={el.avatar} className='search-users__avatar' />
    <span className='search-users__name'>{el.username ? el.username : 'неизвестно'}</span>
  </div>
)

     })}
        
     
     </div>)
}

export default SearchUsers
