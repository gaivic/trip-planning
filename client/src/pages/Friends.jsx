import { useCallback, useEffect, useState } from 'react';
import "./Friends.css"
import {FriendPosts} from '../component/FriendPost';
import {FriendList} from '../component/FriendList';
import { getPostsHome, getFriendList } from '../api/posts';
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";

export default function Friends() {
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
          const fetched = await getPostsHome();
          setPosts(fetched);
        }
    
        getPosts();
    }, []);

    useEffect(() => {
        const getFriends = async () => {
          const fetched = await getFriendList();
          setFriends(fetched);
        }
    
        getFriends();
    }, []);

    const renderedPosts = posts.map((post) => {
        return <FriendPosts key={post.id} post={post} />
    });

    const renderedFriends = friends.map((friend) => {
        return <FriendList key={friend.id} friend={friend} />
    });

    return (
        <div className="body flex w-full">
            <div className="fleft overflow-y-auto space-y-10">
                {renderedPosts}
            </div>
            <div className="fright overflow-y-auto">
                <div className="rounded-xl mx-auto px-10 py-5">
                    <div className=''>
                        <p className='text-2xl text-left mt-2 mb-6 ml-1 font-semibold'>Friends</p>
                        <div className="search rounded-2xl border border-gray-400">
                            <p className='text-xl text-left ml-5'>Search Friend</p>
                        </div>
                        <div className='add w-70 h-20 mt-4 mx-auto flex border justify-center items-center border-gray-400'>
                            <IoMdAdd size={50} className='adds mt-1 bg-blue-gray-300 rounded-full p-1'/>
                            <p className='text-gray-600 text-xl ml-3'>Add New Friends</p>
                        </div>
                    </div>
                    <div className="overflow-y-auto h-96">
                        {renderedFriends}
                    </div>
                </div>
            </div>
        </div>
    )
}