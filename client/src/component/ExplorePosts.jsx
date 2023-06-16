import React from 'react';
import { useState } from 'react';
import { IoIosPin } from 'react-icons/io';
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { Link, Navigate } from "react-router-dom";


export function ExplorePosts(props) {
  const exploreposts = props.posts;
  const ex = [];
  for (let i = 0; i < exploreposts.length; i += 3) {
    const chunk = exploreposts.slice(i, i + 3);
    const posts = chunk.map((item) => {
      return (

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
                <p className='text-gray-600'>Ed Sheeran</p>
              </div>
              <div className='flex'>
                <BsBookmark className='m-1' />
                <BsHeart className='m-1' />
                <p className='text-gray-600 mr-2'>{item.likes.length}</p>
              </div>
            </div>
          </div>
        </div>

      )
    });
    const row = (
      <div className='min-h-full w-full grid grid-cols-3'>
        {posts}
      </div>
    )
    ex.push(row);
  }
  const ret = (<div className='container w-4/5 m-auto bg-gray-50'>{ex}</div>)

  return ret;
}