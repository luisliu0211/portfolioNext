// http://localhost:3000/api/posts
// pages/api/posts.js

const url =
  'https://ef8a-2001-b042-3803-1f02-4c79-b5d2-a25-39fc.ngrok-free.app/api/posts';

export default async function handler(req, res) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json({ message: err.message });
  }
}
