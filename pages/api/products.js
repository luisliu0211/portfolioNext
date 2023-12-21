// pages/api/posts.js

const url = 'https://jsonplaceholder.typicode.com/posts';

export default async function handler(req, res) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json({ message: err.message });
  }
}
