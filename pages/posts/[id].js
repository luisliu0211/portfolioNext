import Layout from '@/component/layouts/layout';
import PostDetail from '@/component/props/postDetail';
const apiUrl = process.env.REACT_APP_API_URL;

//頁面路徑依賴外部資料
export async function getStaticPaths() {
  // Fetch data from an external API
  const res = await fetch(`${apiUrl}/api/posts`);
  const data = await res.json();
  console.log('Fetched data:', data); // 添加這行打印語句

  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  let t = 'http://localhost:8080';
  const res = await fetch(`${apiUrl}/api/posts/${params.id}`);
  const postData = await res.json();
  // Pass post data to the page via props
  return { props: { postData } };
}
export default function Post({ postData }) {
  if (!postData) {
    return (
      <>
        <Layout title="Post Not Found">
          <p>Sorry, the post could not be found.</p>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout title={postData[0].title || ''}>
        <PostDetail data={postData || []} />
      </Layout>
    </>
  );
}
// This function gets called at build time
