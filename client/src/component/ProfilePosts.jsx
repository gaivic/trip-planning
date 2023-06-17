import { BsBookmarkFill } from "react-icons/bs";


export function Bookmarks(props) {
  const bookmarks = [];
  const postBookmarks = props.posts;
  // console.log(postBookmarks[4].id);
  for (let i = 0; i < postBookmarks.length; i+=4) {
    const chunk = postBookmarks.slice(i, i+4);
    const posts = chunk.map((item) => {
      return(
        <div className="post rounded-lg bg-[#35bdb815]">
          <img src={item.picturePath} className='rounded-xl h-4/5 w-full object-cover'/>
          <div className='w-full h-1/5 flex items-center justify-between'>
            <p className='ml-1 text-2xl font-medium text-left'>{item.postTitle}</p>
            <div className="flex items-center justify-between">
            <div className='w-6 h-6 mr-3'><img src="images/default.png" className='round-image '/></div>
            <p className='mr-3'><BsBookmarkFill/></p>
            </div>
          </div>
        </div>
      )
    });
    const row = (
      <div className="row w-full flex mb-5">
        {posts}
      </div>
    )
    bookmarks.push(row);
  }

  const ret = (<div className='w-full flex justify-center'><div className=" w-3/4">{bookmarks}</div></div>)

  return ret;
}

export function Published(props) {
  const publish = [];
  const postPublish = props.posts;
  for (let i = 0; i < postPublish.length; i+=4) {
    const chunk = postPublish.slice(i, i+4);
    const posts = chunk.map((item) => {
      return(
        <div className="post rounded-lg bg-[#35bdb815]">
          <img src={item.picturePath} className='rounded-xl h-4/5 w-full object-cover'/>
          <div className='w-full h-1/5 flex items-center justify-between'>
            <p className='ml-1 text-2xl font-medium text-left'>{item.postTitle}</p>
            <div className="flex items-center justify-between">
            <div className='w-6 h-6 mr-3'><img src="images/default.png" className='round-image '/></div>
            </div>
          </div>
        </div>
      )
    });
    const row = (
      <div className="row w-full flex mb-5">
        {posts}
      </div>
    )
    publish.push(row);
  }

  const ret = (<div className='w-full flex justify-center'><div className=" w-3/4">{publish}</div></div>)

  return ret;
}

export function PastEvents(props) {
  const past = [];
  const postPast = props.posts;
  for (let i = 0; i < postPast.length; i+=4) {
    const chunk = postPast.slice(i, i+4);
    const posts = chunk.map((item) => {
      return(
        <div className="post rounded-lg bg-[#35bdb815]">
          <img src={item.picturePath} className='rounded-xl h-4/5 w-full object-cover'/>
          <div className='w-full h-1/5 flex items-center justify-between'>
            <p className='ml-1 text-2xl font-medium text-left'>{item.postTitle}</p>
            <div className="flex items-center justify-between">
            <div className='w-6 h-6 mr-3'><img src="images/default.png" className='round-image '/></div>
            </div>
          </div>
        </div>
      )
    });
    const row = (
      <div className="row w-full flex mb-5">
        {posts}
      </div>
    )
    past.push(row);
  }

  const ret = (<div className='w-full flex justify-center'><div className=" w-3/4">{past}</div></div>)

  return ret;
}