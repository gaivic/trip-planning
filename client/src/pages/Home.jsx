import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IoIosPin } from 'react-icons/io';


import "./Home.css"
import { DateRange } from 'react-date-range';
import useNewTripModal from '../hooks/useNewTripModal.js';
import NewTripModal from '../component/Modals/NewTripModal.jsx';
import Calendar from '../component/Calendar.jsx';
import { MainPost, OtherPosts } from '../component/HomePosts';
import { getPostsHome } from '../api/posts';
import { getUser, createUser } from "../api/users";
import { getFriendList } from '../api/users';

import { Spinner } from "@material-tailwind/react";


export default function Home({ user }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [User, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const getUserPosts = async () => {
    const fetchedUser = await getUser(user);
    if (fetchedUser.length === 0) {
      console.log("not created yet");
      const createdUser = await createUser(user);
      const fetchedPosts = await getPostsHome(createdUser[0].userName);
      setPosts(fetchedPosts);
      const fetched = await getFriendList(createdUser[0]);
      setFriends(fetched);
      setUser(createdUser[0]);

    }
    else {
      console.log(fetchedUser[0]);
      const fetchedPosts = await getPostsHome(fetchedUser[0].userName);
      setPosts(fetchedPosts);
      const fetched = await getFriendList(fetchedUser[0]);
      setFriends(fetched);
      setUser(fetchedUser[0]);
    }
    setIsLoading(false);
  }

  const newTripModal = useNewTripModal();
  const onNewTrip = useCallback(() => {
    newTripModal.onOpen();
  }, [NewTripModal])


  useEffect(() => {
    getUserPosts();
  }, []);



  // useEffect(() => {
  //   const getPosts = async () => {
  //     const fetched = await getPostsHome();
  //     setPosts(fetched);
  //   }
  //   getPosts();
  // }, []);

  return (
    <>
      <NewTripModal user={User} friends={friends} isOpen />
      <div className="body flex w-full">
        <div className="left overflow-y-auto">
          <div className="container w-3/5 min-h-full pt-8 pb-0 m-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-64 py-96">
                <Spinner className="h-12 w-12" />
              </div>
            ) : (
              <>
                <h1 className="text-left text-4xl font-bold pl-2 mb-5">Upcoming Trips</h1>
                {posts.length > 0 && <MainPost posts={posts} />}
                <div>
                  {posts.length > 1 && <OtherPosts posts={posts} />}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="right bg-gray-100">
          <button className='bg-addNewTrip hover:bg-addNewTripHover py-4 px-3 rounded-full font-semibold shadow-md text-sl leading-6 font-sans my-20' onClick={newTripModal.onOpen}>
            +Add New Trip</button>
          <h1 className='text-left text-4xl font-semibold pl-10 mb-3'>Calendar</h1>
          <div className='mt-1'>
            <Calendar
              posts={posts}
            />
          </div>      </div>
      </div>
    </>
  );

}

