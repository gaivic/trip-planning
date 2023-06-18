import axios from "axios";

const postBaseUrl = 'http://localhost:3030/posts'

export async function getPostsHome(userName) {
  let url = `${postBaseUrl}/home/${userName}`
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

export async function getPostsPast(userId) {
  try {
    let url = `${postBaseUrl}/past/${userId}`;
    const res = await axios.get(url);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
    return ([]);
  }
}

export async function getPostsBookmarks(userId) {
  try {
    let url = `${postBaseUrl}/bookmarks/${userId}`;
    const res = await axios.get(url);
    const posts = await res.data;
    console.log(`fetched bookmarks: ${posts.length}`)
    return posts;
  } catch (err) {
    console.error('Error fetching data from bookmarks', err);
    return ([]);
  }
}

export async function getPostsPublished(userId) {
  try {
    let url = `${postBaseUrl}/published/${userId}`;
    const res = await axios.get(url);
    const posts = await res.data;
    console.log(`fetched published: ${typeof posts}`)
    return posts;
  } catch (err) {
    console.error('Error fetching data from published', err);
    return ([]);
  }
}

export async function getPostsExplore(user) {
  let url = `${postBaseUrl}/explore/${user.username}`
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

export async function getPostsFriends(user) {
  let url = `${postBaseUrl}/friends/${user.userName}`
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

export async function updateSchedule({ post, schedule }) {
  try {
    let url = `${postBaseUrl}/update/schedule/${post._id}`;
    console.log({ url });
    console.log({schedule});
    const res = await axios.patch(url, { schedule: schedule });
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data from published', err);
    return ([]);
  }
}

export async function likePost({item, user}) {
  try {
    const id = item._id;
    const userId = user.username;
    let url = `${postBaseUrl}/${id}/like`;
    const res = await axios.patch(url, {userId});
    const post = await res.data;
    return post;
  } catch (err) {
    console.error('Error updating like', err);
  }
}

export async function markPost({item, user}) {
  try {
    const id = item._id;
    const userId = user.username;
    let url = `${postBaseUrl}/${id}/bookmark`;
    const res = await axios.patch(url, {userId});
    const post = await res.data;
    return post;
  } catch (err) {
    console.error('Error updating bookmark', err);
  }
}
