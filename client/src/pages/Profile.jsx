import { useEffect, useState } from "react";
import { BsBookmarkFill } from "react-icons/bs";

import { Bookmarks, Published, PastEvents } from "../component/ProfilePosts";
import { getPostsBookmarks, getPostsPublished, getPostsPast } from "../api/posts";
import { getUser, createUser } from "../api/users";

import './Profile.css'

export default function Profile ({ user, signOut }) {
  const [User, setUser] = useState({})
  const [empty, setEmpty] = useState(false);
  const [activeButton, setActiveButton] = useState("pastEvents");
  const [pastposts, setPastPosts] = useState([]);
  const [publishedposts, setPublishedPosts] = useState([]);
  const [bookmarkposts, setBookmarkPosts] = useState([]);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    setDefault();
  };

  const getPastPosts = async () => {
    const fetched = await getPostsPast(User._id);
    setPastPosts(fetched);
  }

  const getPublishedPosts = async () => {
    const fetched = await getPostsPublished(User._id);
    setPublishedPosts(fetched);
  }

  const getBookmarkPosts = async () => {
    const fetched = await getPostsBookmarks(User._id);
    console.log(`fetched book marked post: ${fetched}`);
    setBookmarkPosts(fetched);
  }

  const getUserschema = async () => {
    const fetched = await getUser(user);
    if (fetched === null) {
      console.log("not created yet");
      const created = await createUser(user);
      setUser(created);
    }
    else{
      console.log(`fetched user schema: ${fetched}`);
      setUser(fetched);
    }
  }

  const setDefault = () => {
    if (activeButton === 'pastEvents') {
      setEmpty(pastposts.length > 0 ? false : true);
    } else if (activeButton === 'bookmarks') {
      setEmpty(bookmarkposts.length > 0 ? false : true);
    } else if (activeButton === 'published') {
      setEmpty(publishedposts.length > 0 ? false : true);
    }
  }



  useEffect(() => {
    setDefault();
    getUserschema();
  }, []);


  useEffect(() => {
    console.log(User);
    getPastPosts();
    getBookmarkPosts();
    getPublishedPosts();
  }, [User]);
  
  useEffect(() => {
    setDefault();
  }, [pastposts, bookmarkposts, publishedposts]);
  

  let componentToRender;
  if (activeButton === 'pastEvents') {
    componentToRender = <PastEvents posts={pastposts}/>;
  } else if (activeButton === 'bookmarks') {
    componentToRender = <Bookmarks posts={bookmarkposts} />;
  } else if (activeButton === 'published') {
    componentToRender = <Published posts={publishedposts}/>;
  }

  return (
    <div className="profile ">
      <div className="border-b-2">
        <div className="person w-full h-48  flex items-center justify-center">
          <div className='overflow-hidden h-20 w-20 text-white border border-gray-500 rounded-full'>
              <img src="images/default.png" alt="" />
          </div>
          <div className="ml-5">
            <p className="text-xl font-semibold">{user.username}</p>
          </div>
        </div>
        <div className="flex justify-end"><button onClick={signOut}>Sign Out</button></div>
      </div>
      <div className="posts w-full flex justify-center mt-[-2px] mb-4">
        <button className="w-40 h-12 flex justify-center"
          onClick={() => handleButtonClick('pastEvents')}
        >
          <p className={`h-full text-xl font-medium text-center flex items-center border-y-2 border-transparent
            ${activeButton === 'pastEvents' ? 'active' : ''}`}>PastEvents</p>
        </button>
        <button className="w-40 h-12 flex justify-center"
          onClick={() => handleButtonClick('bookmarks')}
        >
          <p className={`h-full text-xl font-medium text-center flex items-center border-y-2 border-transparent
            ${activeButton === 'bookmarks' ? 'active' : ''}`}>Bookmarks</p>
        </button>
        <button className="w-40 h-12 flex justify-center"
          onClick={() => handleButtonClick('published')}
        >
          <p className={`h-full text-xl font-medium text-center flex items-center border-y-2 border-transparent
            ${activeButton === 'published' ? 'active' : ''}`}>Published</p>
        </button>
      </div>
      <div className="w-full">
        {empty ? <Defaultwords/> : componentToRender}
        {/* {posts.length > 0 && componentToRender} */}
      </div>
    </div>
  )
}

const Defaultwords = () => {
  return(
    <div className="h-20 w-full flex items-center justify-center text-gray-600">
      <p>No post yet.</p>
    </div>
  )
}

const Bookmark = () => {
  return(
    <div className="w-full flex justify-center">
      <div className=" w-3/4">
        <div className="row w-full flex justify-between mb-5">
          <div className="post rounded-lg bg-[#35bdb815]">
            <img src="images/travel.jpg" className='rounded-xl h-4/5 w-full object-cover'/>
            <div className='w-full h-1/5 flex items-center justify-between'>
              <p className='ml-1 text-2xl font-medium text-left'>Trip to Japan</p>
              <div className="flex items-center justify-between">
              <div className='w-6 h-6 mr-3'><img src="images/default.png" className='round-image '/></div>
              <p className='mr-3'><BsBookmarkFill/></p>
              </div>
            </div>
          </div>
          <div className="post bg-[#35bdb815] rounded-lg"></div>
          <div className="post bg-[#35bdb815] rounded-lg"></div>
          <div className="post bg-[#35bdb815] rounded-lg"></div>
        </div>
        <div className="row w-full flex justify-between mb-5">
          <div className="post bg-[#35bdb815] rounded-lg"></div>
          <div className="post bg-[#35bdb815] rounded-lg"></div>
          <div className="post bg-[#35bdb815] rounded-lg"></div>
          <div className="post bg-[#35bdb815] rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}