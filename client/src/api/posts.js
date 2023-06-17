import axios from "axios";

const postBaseUrl = 'http://localhost:3030/posts'
const friendBaseUrl = 'http://localhost:3030/friends'

export async function getPostsHome() {
  let userId = "12345";
  let url = `${postBaseUrl}/home/${userId}`
  console.log(url);
  try {
    const res = await axios.get(url);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
    return ([]);
  }
}

export async function getPostsPast() {
  try {
    const res = await axios.get(postBaseUrl);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
    return ([]);
  }
}

export async function getPostsBookmarks() {
  try {
    const res = await axios.get(postBaseUrl);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
    return ([]);
  }
}

export async function getPostsPublished() {
  try {
    const res = await axios.get(postBaseUrl);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
    return ([]);
  }
}

export async function getFriendList() {
  try {
    const res = await axios.get(friendBaseUrl);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
    return ([]);
  }
}

export async function getPostsExplore() {
  let url = `${postBaseUrl}/explore`
  console.log(url);
  try {
    const res = await axios.get(url);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
    return ([]);
  }
}