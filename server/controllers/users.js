import User from "../models/User.js";


/* CREATE */
export const createUser = async (req, res) => {
  console.log(`in createUser ${req.body.userKey}`);
  try {
    const { userName, userKey } = req.body;
    const newUser = new User({
      userName,
      userKey,
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
      console.log(user);
      res.status(200).json(user);
    }
    else {
      res.status(200).json(null);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};