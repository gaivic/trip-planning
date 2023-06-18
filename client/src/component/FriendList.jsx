import React from 'react';
import { addFriend } from '../api/users';
import { useState } from 'react';

export function FriendList({friend}) {
    return (
        <div className='friend w-70 h-20 mx-auto flex hover:border hover:border-cyan-200'>
            <img src="images/default.png" className='round-image ml-5 mr-5' />
            <p className='text-gray-600 text-xl mt-3'>{friend.userName}</p>
        </div>
    )
}


export function OtherList({user, other}) {
    const [showadd, setShowadd] = useState(true);
    
    const handleClick = () => {
        addFriend({user, other});
        setShowadd(false);
    }

    return (
        <div className='friend w-70 h-20 mx-auto flex hover:border hover:border-cyan-200'>
            <img src="images/default.png" className='round-image ml-5 mr-5' />
            <p className='text-gray-600 text-xl mt-3'>{other.userName}</p>
            {showadd && <button onClick={handleClick} className='ml-auto mr-1 px-2 rounded bg-teal-400'>Add</button>}
        </div>
    )
}