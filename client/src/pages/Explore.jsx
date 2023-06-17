import { useCallback, useEffect, useState } from 'react';
import "./Explore.css"
import {ExplorePosts} from '../component/ExplorePosts';
import { getPostsExplore } from '../api/posts';
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill } from "react-icons/bs";

export default function Explore() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
      const getPosts = async () => {
        const fetched = await getPostsExplore();
        setPosts(fetched);
      }
    
      getPosts();
  }, []);

  return (
    <div className="body">
      <ExplorePosts posts={posts}/>
    </div>
  )
}