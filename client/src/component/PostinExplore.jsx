import React, { useEffect } from 'react';
import { useState } from "react";
import { IoIosPin } from 'react-icons/io';
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { Link, Navigate } from "react-router-dom";
import { likePost, markPost } from '../api/posts';

export default function PostinExplore({item, user}) {
  // useEffect(() => {
  //   console.log(`in a post : ${item}`);
  //   console.log(item.likes.length);
  //   console.log(liked);
  //   console.log(numLikes);
  // }, [])
  const [liked, setLiked] = useState(item.liked);
  const [marked, setMarked] = useState(item.bookmarked);
  const [numLikes, setNumLikes] = useState(item.likes.length);
  
  const handleLike = () => {
    if (liked) {
      setNumLikes((prev) => prev-1);
      setLiked(false);
    } else {
      setNumLikes((prev) => prev+1);
      setLiked(true);
    }
    likePost({item, user});
  }

  const handleMark = () => {
    if (marked) {
      setMarked(false);
    } else {
      setMarked(true);
    }
    markPost({item, user});
  }

  return(
    <div className='posts rounded-2xl m-6 px-4 py-2' >
      <Link to="/check" state={{ post: item }}>
        <div className='flex items-center'>
          <p className='text-2xl text-left font-semibold mb-2 ml-1 flex items-center'>{item.postTitle}</p>
          <IoIosPin className='ml-auto scale-150 mb-2' /><p className='text-xl mb-2 mx-2 flex items-center'>{item.location}</p>
        </div>
        <img src={item.picturePath} className='rounded-xl aspect-[4/3] w-full object-cover' />
      </Link>
      <div className='w-full'>
        <div className='flex items-center justify-between'>
          <div className='w-18 h-6 my-2 flex'>
            <img src="images/default.png" className='round-image mx-1' />
            <p className='text-gray-600'>{item.creatorId}</p>
          </div>
          <div className='flex'>
            <button onClick={handleMark}>
            {marked ? (<BsBookmarkFill className='m-1'/>) : (<BsBookmark className='m-1' />)}
            </button>
            <button onClick={handleLike}>
            {liked ? <BsHeartFill className='m-1' /> : <BsHeart className='m-1' />}
            </button>
            <p className='text-gray-600 mr-2'>{numLikes}</p>
          </div>
        </div>
      </div>
    </div>
  )

}