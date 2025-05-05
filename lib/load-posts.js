// getStaticProps 與 API 路徑皆使用底下這個函式
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
export async function loadPosts() {
  try {
    if (!apiUrl) {
      throw new Error('API URL is not configured');
    }

    let postsDataUrl = `${apiUrl}/api/posts`;
    const response = await fetch(postsDataUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data) {
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}
