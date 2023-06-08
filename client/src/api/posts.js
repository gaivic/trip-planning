import axios from "axios";

const postBaseUrl = 'http://localhost:3030/posts'

export async function getPostsHome() {
  try {
    const res = await axios.get(postBaseUrl);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
  }
}

export async function getPostsPast() {
  try {
    const res = await axios.get(postBaseUrl);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
  }
}

export async function getPostsBookmarks() {
  try {
    const res = await axios.get(postBaseUrl);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
  }
}

export async function getPostsPublished() {
  try {
    const res = await axios.get(postBaseUrl);
    const posts = await res.data;
    return posts;
  } catch (err) {
    console.error('Error fetching data', err);
  }
}