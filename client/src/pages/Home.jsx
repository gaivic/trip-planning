import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IoIosPin } from 'react-icons/io';


import "./Home.css"
import { DateRange } from 'react-date-range';
import useNewTripModal from '../hooks/useNewTripModal.js';
import NewTripModal from '../component/Modals/NewTripModal.jsx';
import Calendar from '../component/Calendar.jsx';
import {MainPost, OtherPosts} from '../component/HomePosts';
import { getPostsHome } from '../api/posts';


export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(2023, 6, 3),
      endDate: new Date(2023, 6, 5),
    },
    {
      startDate: new Date(2023, 6, 8),
      endDate: new Date(2023, 6, 9),
    },
  ]);


  const newTripModal = useNewTripModal();
  const onNewTrip = useCallback(() => {
    newTripModal.onOpen();
  }, [NewTripModal])

  useEffect(() => {
    const getPosts = async () => {
      const fetched = await getPostsHome();
      setPosts(fetched);
    }

    getPosts();
  }, []);

  return (
    <>
      <NewTripModal isOpen />
      <div className="body flex w-full">
        <div className="left overflow-y-auto">
          <div className="container w-3/5 min-h-full pt-8 pb-0 m-auto">
            <h1 className="text-left text-4xl font-bold pl-2 mb-5">Upcoming Trips</h1>
            {posts.length > 0 && <MainPost posts={posts}/>}
            <div>
            {posts.length > 1 && <OtherPosts posts={posts}/>}
            </div>
          </div>
        </div>
        <div className="right bg-gray-100">
          <button className='bg-addNewTrip hover:bg-addNewTripHover py-4 px-3 rounded-full font-semibold shadow-md text-sl leading-6 font-sans my-20' onClick={newTripModal.onOpen}>
            +Add New Trip</button>
          <h1 className='text-left text-4xl font-semibold pl-10 mb-3'>Calendar</h1>
          <div>
            <Calendar
              selectedRange={selectedRange}
            />
          </div>
        </div>
      </div>
    </>

  )
}


const Posts = () => {
  return (
    <div>
    <div className='min-h-full w-full flex justify-between mb-5'>
      <div className='post rounded-2xl'>
        <img src="images/travel.jpg" className='rounded-xl h-3/4 w-full object-cover' />
        <div className='w-full h-1/4'>
          <p className=' text-xl text-left'>Trip to Japan</p>
          <div className='flex items-center justify-between'>
            <p className=' text-gray-600'>5/3 - 5/4</p>
            <div className='w-6 h-6 mr-3'><img src="images/default.png" className='round-image ' /></div>
          </div>
        </div>
      </div>
      <div className='post rounded-2xl'>
        <img src="images/gray.png" className='rounded-xl h-3/4 w-full object-cover' />
        <div className='w-full h-1/4'>
          <p className=' text-xl text-left'>Trip to Japan</p>
          <div className='flex items-center justify-between'>
            <p className=' text-gray-600'>5/3 - 5/4</p>
            <div className='w-6 h-6 mr-3'><img src="images/default.png" className='round-image ' /></div>
          </div>
        </div>
      </div>
      <div className='post rounded-2xl'>
        <img src="images/gray.png" className='rounded-xl h-3/4 w-full object-cover' />
        <div className='w-full h-1/4'>
          <p className=' text-xl text-left'>Trip to Japan</p>
          <div className='flex items-center justify-between'>
            <p className=' text-gray-600'>5/3 - 5/4</p>
            <div className='w-6 h-6 mr-3'><img src="images/default.png" className='round-image ' /></div>
          </div>
        </div>
      </div>
    </div>
    <div className='min-h-full w-full flex justify-between mb-5'>
      <div className='post bg-white rounded-2xl'></div>
      <div className='post bg-white rounded-2xl'></div>
      <div className='post bg-white rounded-2xl'></div>
    </div>
    </div>
  )
}