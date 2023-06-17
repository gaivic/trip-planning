import { useState } from "react";
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill } from "react-icons/bs";

export default function PostExplore(props) {
  const item = props.item;
  const userId = props.userId;
  const [liked, setLiked] = useState(false);
  const {marked, setMarked} = useState(false);
  const {numLikes, setNumLikes} = useState(item.likes.length);

  useEffect(() => {
    setLiked(item.likes.includes(userId));
  }, [])
  
  const handleLike = async () => {
    if (liked) {
      setNumLikes(prev => prev-1);
    } else {
      setNumLikes(prev => prev+1);
    }
    setLiked(prev => !prev);
    //update to server
    axios.patch(`http://localhost:3001/posts/${item._id}/like`, userId)
      .then((response) => {
        if (response.status === 200) {
          console.log('Likes updated successfully');
        } else {
            console.log('Failed to update like:', response.status);
        }
      })
  }

  return(
    <div className='posts rounded-2xl m-6 px-4 py-2'>
      <div className='flex items-center'>
          <p className='text-2xl text-left font-semibold mb-2 ml-1 flex items-center'>{item.postTitle}</p>
          <IoIosPin className='ml-auto scale-150 mb-2'/><p className='text-xl mb-2 mx-2 flex items-center'>{item.location}</p>
      </div>
      <img src={item.picturePath} className='rounded-xl aspect-[4/3] w-full object-cover' />
      <div className='w-full'>
        <div className='flex items-center justify-between'>
          <div className='w-18 h-6 my-2 flex'>
            <img src="images/default.png" className='round-image mx-1' />
            <p className='text-gray-600'>Ed Sheeran</p>
          </div>
          <div className='flex'>
            <BsBookmark className='m-1' />
            {liked ? (<BsHeartFill className='m-1' onClick={handleLike}/>) : (<BsHeart className='m-1' onClick={handleLike}/>)}
            <p className='text-gray-600 mr-2'>{numLikes}</p>
          </div>
        </div>
      </div>
    </div>
  )

}