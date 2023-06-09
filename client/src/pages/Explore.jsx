import { useCallback, useEffect, useState } from 'react';
import "./Explore.css"
import {ExplorePosts} from '../component/ExplorePost';
import { getPostsHome } from '../api/posts';
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill } from "react-icons/bs";

export default function Explore() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
      const getPosts = async () => {
        const fetched = await getPostsHome();
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