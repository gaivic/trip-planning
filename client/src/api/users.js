import axios from "axios";

const userBaseUrl = 'http://localhost:3030/users'

// CREATE
export async function createUser(user) {
  console.log(`in create user get param ${user.username}`);
  try {
    const data = {
      userName: user.username,
      userKey: user.attributes.sub,
    }
    console.log(userBaseUrl);
    const res = await axios.post(userBaseUrl, data);
    const User = await res.data;
    return User;
  } catch (err) {
    console.error('Error fetching data', err);
  }
}

//GET
export async function getUser(user) {
  try {
    let url = `${userBaseUrl}/${user.username}`;
    console.log(`in get user ${url}`);
    const res = await axios.get(url);
    const User = await res.data;
    return User;
  } catch (err) {
    console.error('Error fetching data', err);
  }
}


export async function getFriendList(user) {
  try {
    let url = `${userBaseUrl}/friends/${user._id}`
    const res = await axios.get(url);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
    return ([]);
  }
}

export async function getOtherList(user) {
  try {
    console.log("ingetotherlist")
    let url = `${userBaseUrl}/others/${user._id}`
    const res = await axios.get(url);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
    return ([]);
  }
}

export async function getRequest(user) {
  try {
    let url = `${userBaseUrl}/request/${user._id}`
    console.log(url);
    const res = await axios.get(url);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
    return ([]);
  }
}

//PATCH
export async function addFriend({user, other}) {
  try {
    let url = `${userBaseUrl}/friends/${user.username}/${other._id}`
    console.log(url);
    const updatedUser = await axios.patch(url);
    return updatedUser;
  } catch (err){
    console.error('Error adding friend', err);
    return user;
  }
}

export async function updateUserReq(members, id) {
  try {
    let url = `${userBaseUrl}/request`
    const res = await axios.patch(url, {members, id});
    if(res.status === 200) 
      console.log("requests sent");
    else
      console.log("failed to send requests");
  } catch (err){
    console.error('Error adding friend', err);
  }
}

export async function removeReq(post, User) {
  try {
    const id = User._id;
    const postId = post._id;
    let url = `${userBaseUrl}/request/${id}`
    const res = await axios.patch(url, {postId});
    if(res.status === 200) 
      console.log("requests sent");
    else
      console.log("failed to send requests");
  } catch (err){
    console.error('Error adding friend', err);
  }
}