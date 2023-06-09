import { useCallback, useEffect, useState } from 'react';
import "./Friends.css"
import {FriendPosts} from '../component/FriendPost';
import {FriendList, OtherList} from '../component/FriendList';
import { getPostsFriends} from '../api/posts';
import { getFriendList, getOtherList } from '../api/users';
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";

import { getUser, createUser } from "../api/users";
import { Spinner } from "@material-tailwind/react";


export default function Friends({ user }) {
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [others, setOthers] = useState([]);
    const [tolist, setTolist] = useState("friends");
    const [isLoading, setIsLoading] = useState(true);

    const getPosts = async () => {
        const fetchedUser = await getUser(user);
            if (fetchedUser.length === 0) {
                const createdUser = await createUser(user);
                const fetched = await getPostsFriends(createdUser[0]);
                setPosts(fetched);
            }
            else{
                const fetched = await getPostsFriends(fetchedUser[0]);
                setPosts(fetched);
            }
            setIsLoading(false);
    }
 
    const getOtherUsers = async () => {
        const fetchedUser = await getUser(user);
            if (fetchedUser.length === 0) {
                const createdUser = await createUser(user);
                const fetched = await getOtherList(createdUser[0]);
                setOthers(fetched);
            }
            else{
                console.log(fetchedUser[0]);
                const fetched = await getOtherList(fetchedUser[0]);
                setOthers(fetched);
            }
    }

    const getFriends = async () => {
        const fetchedUser = await getUser(user);
            if (fetchedUser.length === 0) {
                const createdUser = await createUser(user);
                const fetched = await getFriendList(createdUser[0]);
                setFriends(fetched);
            }
            else{
                console.log(fetchedUser[0]);
                const fetched = await getFriendList(fetchedUser[0]);
                setFriends(fetched);
            }
    }

    useEffect(() => {
        console.log(tolist);
    }, [tolist]);

    useEffect(() => {
        getPosts();
        getFriends();
        getOtherUsers();
    }, []);

    const renderedPosts = posts.map((post) => {
        return <FriendPosts user={user} post={post} />
    });

    const renderedFriends = friends.map((friend) => {
        return <FriendList friend={friend}/>
    });

    const renderedOthers = others.map((other) => {
        return <OtherList other={other} user={user}/>
    })

    const but = ({ handleClick }) => {
        return (
            <button onClick={handleClick} className='add bg-addNewTrip hover:bg-addNewTripHover w-70 mt-4 mx-auto flex border justify-center items-center rounded-full'>
                <p className='text-lg font-semibold'>+Add New Friends</p>
            </button>
        )
    }
    
    const handleClick = () => {
        if (tolist === "friends")
            setTolist("others");
        else
            setTolist("friends");
    }

    return (
        <div className="body flex w-full">
            {isLoading ? (
                <div className="flex justify-center items-center h-64 py-96 fleft">
                    <Spinner className="h-12 w-12" />
                </div>
            ) : (
                <div className="fleft overflow-y-auto space-y-10">
                    {renderedPosts}
                </div>
            )}
            <div className="fright overflow-y-auto">
                <div className="rounded-xl mx-auto px-10 py-5">
                    <p className='text-2xl text-left mt-2 mb-6 ml-1 font-semibold'>Friends</p>
                    <div className='flex items-center h-16'>
                        {/* <div className="search rounded-2xl border border-gray-400">
                            <p className='text-xl text-left ml-5'>Search Friend</p>
                        </div> */}
                        <button onClick={handleClick} className={`rounded-full 
                         ${tolist === "friends" ? "mx-auto bg-addNewTrip hover:bg-addNewTripHover add " : ""}`}>
                            <p className='text-lg font-semibold'>{tolist === "friends" ? "+Add New Friends" : <IoArrowBack size={40}/>}</p>
                        </button>
                    </div>
                    <div className="overflow-y-auto h-96">
                        {tolist === "friends" ?  renderedFriends : renderedOthers}
                    </div>
                </div>
            </div>
        </div>
    )

}

