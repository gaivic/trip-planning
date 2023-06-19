import { useState } from 'react';
import { IoIosPin } from 'react-icons/io';
import { setPostMembers } from '../api/posts';
import { removeReq } from '../api/users';

export function RequestPost({post, User}) {
  const [isVisible, setIsVisible] = useState(true);

  const dates = post.dates.map((item) => {
    const splitDate = item.split('/');
    return splitDate[1] + '/' + splitDate[2];
  })

  const handleDecline = () => {
    setIsVisible(false);
    removeReq(post, User);
  } 

  const handleAccept = () => {
    setIsVisible(false);
    setPostMembers(post, User);
    removeReq(post, User);
  }

  if(!isVisible) {
    return null;
  }

  return (
    <div className='w-11/12 h-40 bg-gray-50 mx-auto my-2 rounded-xl px-3'>
      <div className="h-1/3 flex items-center border-b-2">
        <div className='overflow-hidden text-white bg-gray-500 border border-gray-500 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative w-5 h-5 top-1">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
        </div>
        <p className='ml-2  font-medium'>{post.creatorId}</p>
      </div>
      <div className="h-2/5 flex justify-between items-center">
        <div className="h-full w-7/12 flex justify-start items-center"><p className="text-start text-lg font-medium">{post.postTitle}</p></div>
        <div className="h-full w-5/12 flex-col">
          <p className="h-1/2 flex items-center text-xs text-start py-1 font-medium">Date: {dates[0]}-{dates[1]}</p>
          <p className="h-1/2 flex items-center text-xs text-start py-1  font-medium"><IoIosPin/>{post.location}</p>
        </div>
      </div>
      <div className="flex-auto flex mt-2 justify-around">
        <button onClick={handleDecline} className="bg-blue-gray-100 ml-1 px-4 text-gray-700 rounded-lg">Decline</button>
        <button onClick={handleAccept} className="bg-teal-200 mr-1 px-4 text-white rounded-lg">Accept</button>
      </div>
    </div>
  )
}