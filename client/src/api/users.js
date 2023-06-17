import axios from "axios";

const userBaseUrl = 'http://localhost:3030/users'

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