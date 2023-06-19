import Post from "../models/Post.js";
import User from "../models/User.js";

import moment from 'moment';

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { creatorId, postTitle, picturePath, location, days, schedule, members, dates } = req.body;

    const newPost = new Post({
      creatorId,
      postTitle,
      picturePath,
      location,
      days,
      schedule,
      members,
      dates,
    });
    await newPost.save();
    console.log('New post saved:', newPost);

    // const postId = newPost._id;
    // const user = await User.findById(creatorId);
    // user.posts.push(postId);
    // await user.save();

    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(409).json({ message: err });
  }
}

/* READ */
export const getPostsHome = async (req, res) => {
  console.log("in getpostshome");
  try {
    const { id } = req.params;
    const user = await User.find({userName: id});
    const today = new Date();
    const formatted = moment(today).format("YYYY/MM/DD");
    const posts = await Post.find({$or: [ { members: user[0]._id, "dates.1": { $gte: formatted } }, 
                        { creatorId: id, "dates.1": { $gte: formatted } } ]})
                        .sort({ 'dates.0': 1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err });
  }
}

export const getPostsExplore = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.find( {userName: id} );
    const posts = await Post.find({ published: true });

    const addPostsState = posts.map((post) => {
      const isBookmarked = user[0].bookmarks.includes(post._id);
      const isLiked = post.likes.includes(user[0].userName);
      const newPost = {
        ...post.toObject(),
        bookmarked: isBookmarked,
        liked: isLiked,
      }
      return newPost;
    })
    res.status(200).json(addPostsState);
  } catch (err) {
    res.status(404).json({ message: err })
  }
}

export const getPostsFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.find( {userName: id} );
    const friendIds = user[0].friends;
    const friends = await User.find({ _id: { $in: friendIds}}, 'userName');
    const friendNames = friends.map(friend => friend.userName);
    console.log(friendNames);
    const posts = await Post.find({$and: [{ creatorId: { $in: friendNames} }, { published: true}]});

    const addPostsState = posts.map((post) => {
      const isBookmarked = user[0].bookmarks.includes(post._id);
      const isLiked = post.likes.includes(user[0].userName);
      const newPost = {
        ...post.toObject(),
        bookmarked: isBookmarked,
        liked: isLiked,
      }
      return newPost;
    })

    res.status(200).json(addPostsState);
  } catch (err) {
    res.status(404).json({ message: err })
  }
}

export const getPostsPast = async (req, res) => {
  console.log("in post past");
  try {
    const { id } = req.params;
    const today = new Date();
    const formatted = moment(today).format("YYYY/MM/DD");
    const posts = await Post.find({ creatorId: id, "dates.1": { $lt: formatted } });
    console.log(posts.length);
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err })
  }
}

export const getPostsBookmarks = async (req, res) => {
  console.log("in book mark");
  try {
    const { id } = req.params;
    const user = await User.find({userName: id});

    const bookmarkedPostIds = user[0].bookmarks;

    const posts = await Post.find({_id: { $in: bookmarkedPostIds}});
    console.log(`${posts.length}`)

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err })
  }
}

export const getPostsPublished = async (req, res) => {
  console.log("postpublished");
  try {
    const { id } = req.params;

    const posts = await Post.find({creatorId: id, published: true});

    // const posts = await Post.find({creatorId: "12345", published: true}).sort({ 'dates.0': 1});
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err })
  }
}


/* UPDATE */
export const publishPost = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { published: true },
    )
    
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// an array of userName
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes = post.likes.filter((like) => like !== userId);
    } else {
      post.likes.push(userId);
    }

    const updatedPost = await post.save();
    console.log("liked");
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// an array of post._id
export const bookmarkPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    console.log(userId);
    const users = await User.find({userName: userId});
    const user = users[0];
    const isMarked = user.bookmarks.includes(id);
    if (isMarked) {
      user.bookmarks = user.bookmarks.filter((mark) => mark !== id);
    } else {
      user.bookmarks.push(id);
    }

    const updatedUser = await user.save();
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const {schedule} = req.body;
    console.log({id, schedule});
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { schedule: schedule },
    )

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}


export const updatePublished = async (req, res) => {
  try {
    const { id } = req.params;
    const { published } = req.body;
    console.log({ id, published });
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { published: published },
    )

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}


export const updateMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const {userId} = req.body;
    console.log({id, userId});
    const post = await Post.findById(id);
    console.log(post);

    post.members.push(userId);
    post.save();
    res.status(200).json(post);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}