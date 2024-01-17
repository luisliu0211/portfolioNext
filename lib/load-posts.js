// getStaticProps 與 API 路徑皆使用底下這個函式
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
export async function loadPosts() {
  let postsDataUrl = `${apiUrl}/api/posts`;
  const response = await fetch(postsDataUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = response.json();
  return data;
}
