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