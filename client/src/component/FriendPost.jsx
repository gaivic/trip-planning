import React, { useEffect }  from 'react';
import { useState } from "react";
import { IoIosPin } from 'react-icons/io';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { likePost, markPost } from '../api/posts';

export function FriendPosts({post, user}) {
    const [liked, setLiked] = useState(post.liked);
    const [marked, setMarked] = useState(post.bookmarked);
    const [numLikes, setNumLikes] = useState(post.likes.length);

    const handleLike = () => {
        if (liked) {
          setNumLikes((prev) => prev-1);
          setLiked(false);
        } else {
          setNumLikes((prev) => prev+1);
          setLiked(true);
        }
        likePost({item: post, user});
      }
    
    const handleMark = () => {
        if (marked) {
            setMarked(false);
        } else {
            setMarked(true);
        }
        markPost({item: post, user});
    }

    return (
            <div className="post rounded-xl mx-auto p-4 border border-gray">
                <div className='flex items-center'>
                    <p className='text-2xl text-left font-semibold mb-2 ml-1 flex items-center'>{post.postTitle}</p>
                    <IoIosPin className='ml-auto scale-150 mb-2'/><p className='text-xl mb-2 mx-2 flex items-center'>{post.location}</p>
                </div>
                <img src={post.picturePath} className='rounded-xl h-5/6 w-full object-cover' />
                <div className='w-full h-1/12 items-center'>
                    <div className='flex items-center justify-between'>
                        <div className='w-18 h-6 my-3 flex'>
                            <img src="images/default.png" className='round-image mx-1' />
                            <p className='text-gray-600'>{post.creatorId}</p>
                        </div>
                        <div className='flex items-center'>
                            <button onClick={handleMark}>
                            {marked ? (<FaBookmark className="m-2 text-2xl" />) : (<FaRegBookmark className="m-2 text-2xl" />)}
                            </button>
                            <button onClick={handleLike}>
                            {liked ? <FaHeart className="m-2 text-2xl" style={{ color: 'red' }} /> : <FaRegHeart className="m-2 text-2xl" />}
                            </button>
                            <p className='text-gray-600 mr-2'>{numLikes}</p>
                            {/* <BsBookmark className='m-1' />
                            <BsHeart className='m-1' />
                            <p className='text-gray-600 mr-2'>{post.likes}</p> */}
                        </div>
                    </div>
                </div>
            </div>
    )
}
    