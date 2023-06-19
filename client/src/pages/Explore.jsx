import { useCallback, useEffect, useState } from 'react';
import { CircularProgress } from '@material-tailwind/react';
import "./Explore.css";
import { ExplorePosts } from '../component/ExplorePosts';
import { getPostsExplore } from '../api/posts';
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill } from "react-icons/bs";
import ExploreHead from './ExploreHead';
import { Spinner } from "@material-tailwind/react";


export default function Explore({ user }) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const fetched = await getPostsExplore(user);
      setPosts(fetched);
      setIsLoading(false);
    }

    getPosts();
  }, [user]);

  return (
    <div className="body">
      <ExploreHead />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <ExplorePosts posts={posts} user={user} />
      )}
    </div>
  );
}
