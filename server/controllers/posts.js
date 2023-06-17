import Post from "../models/Post.js";
import User from "../models/User.js";

import moment from 'moment';

/* CREATE */
export const createPost = async(req, res) => {
  try {
    const { creatorId, postTitle, picturePath, location, days, schedule, Members, dates } = req.body;
    
    const newPost = new Post({
      creatorId, 
      postTitle,
      picturePath,
      location,
      days,
      schedule,
      Members,
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
export const getPostsHome = async(req, res) => {
  console.log("in getpostshome");
  try {
    const { id } = req.params;
    const today = new Date();
    const formatted = moment(today).format("YYYY/MM/DD");
    console.log(formatted);
    const posts = await Post.find({creatorId: id, "dates.1": { $gt: formatted } }).sort({ 'dates.0': 1});

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err });
  }
}

export const getPostsExplore = async(req, res) => {
  try {
    const posts = await Post.find({published: true});
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err })
  }
}

export const getPostsPast = async(req, res) => {
  try {
    const today = new Date();
    const formatted = moment(today).format("YYYY/MM/DD");
    const posts = await Post.find({ creatorId: id, "dates.1": { $lt: formatted } });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err })
  }
}

export const getPostsBookmarks = async(req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const bookmarkedPostIds = user.bookmarks;

    const posts = await Post.find({_id: { $in: bookmarkedPostIds}});
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err })
  }
}

export const getPostsPublished = async(req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({creatorId: id, published: true}).sort({ 'dates.0': 1});
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err })
  }
}


/* UPDATE */
export const publishPost = async(req, res) => {
    try {
      const { id } = req.params;
      
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { published: true},
      )
      
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
}

export const likePost = async(req, res) => {
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

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const bookmarkPost = async(req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const user = await User.findById(userId);
    const isMarked = user.bookmarks.includes(id);

    if (isMarked) {
      user.bookmarks = user.bookmarks.filter((mark) => mark !== userId);
    } else {
      user.bookmarks.push(id);
    }

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}