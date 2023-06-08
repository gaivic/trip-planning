import React from 'react';
import { IoIosPin } from 'react-icons/io';
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill } from "react-icons/bs";

export function FriendPosts({post}) {
    return (
            <div className="post rounded-xl mx-auto p-4 border border-gray">
                <div className='flex items-center'>
                    <p className='text-2xl text-left font-semibold mb-2 ml-1 flex items-center'>{post.postTitle}</p>
                    <IoIosPin className='ml-auto scale-150 mb-2'/><p className='text-xl mb-2 mx-2 flex items-center'>{post.location}</p>
                </div>
                <img src="images/travel.jpg" className='rounded-xl h-5/6 w-full object-cover' />
                <div className='w-full h-1/4'>
                    <div className='flex items-center justify-between'>
                        <div className='w-18 h-6 my-3 flex'>
                            <img src="images/default.png" className='round-image mx-1' />
                            <p className='text-gray-600'>Alan Walker</p>
                        </div>
                        <div className='flex'>
                            <BsBookmark className='m-1' />
                            <BsHeart className='m-1' />
                            <p className='text-gray-600 mr-2'>{post.likes}</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}
    