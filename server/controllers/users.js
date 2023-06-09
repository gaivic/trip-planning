import Post from "../models/Post.js";
import User from "../models/User.js";


/* CREATE */
export const createUser = async (req, res) => {
  console.log(`in createUser ${req.body.userKey}`);
  try {
    // const { userName, userKey } = req.body;
    const newUser = new User({
      userName: req.body.userName,
      userKey: req.body.userKey
    });
    await newUser.save();
    console.log("saved");
    res.status(201).json(newUser);
  } catch (err) {
    res.status(409).json({ message: err });
  }
};

/* READ */
export const getUser = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.find({userName: name});
    if (user) {
      res.status(200).json(user);
    }
    else {
      res.status(200).json(null);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getFriends = async (req, res) => {
  console.log("in get friends server")
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await User.find({_id: { $in: user.friends } });
    res.status(200).json(friends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getOtherUsers = async (req, res) => {
  console.log("in get others server")
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const others = await User.find({$and: [{_id: { $nin: user.friends } }, { _id: { $ne: user._id }}]});
    res.status(200).json(others);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserRequests = async (req, res) => {
  console.log("fetching User request from server");
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const requests = user.request;
    const posts = await Post.find({_id: { $in: requests}});
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

/* UPDATE */
export const addFriend = async (req, res) => {
  try {
    console.log("in add friend srbve");
    const { id, friendId } = req.params;
    const users = await User.find({userName: id});
    const user = users[0];
    user.friends.push(friendId);
    console.log("pushded");
    await user.save();
    
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const sendReq = async (req, res) => {
  try {
    console.log("in sen req serve");
    const {members, id} = req.body;
    console.log(members);
    console.log(id.toString());
    const users = await User.find({_id: {$in: members}});
    users.map(async (user) => {
      user.request.push(id.toString());
      await user.save();
    })
    console.log(`send request to ${users.length} users`);
    
    res.status(200);
  } catch (err) {
    res.status(404);
  }
}

export const removeReq = async (req, res) => {
  try{
    console.log("remove request");
    const id = req.params;
    const {postId} = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {_id: id.id},
      {$pull: {request: postId}},
      {new: true}
    )
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404);
  }
}