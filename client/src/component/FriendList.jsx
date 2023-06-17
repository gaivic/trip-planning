import React from 'react';

export function FriendList({friend}) {
    return (
        <div className='friend w-70 h-20 mx-auto flex hover:border hover:border-cyan-200'>
            <img src="images/default.png" className='round-image ml-5 mr-5' />
            <p className='text-gray-600 text-xl mt-3'>{friend.userName}</p>
        </div>
    )
    }