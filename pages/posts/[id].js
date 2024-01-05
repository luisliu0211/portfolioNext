import { useRouter } from 'next/router'; //用這個 hook 來做到
import Content from '@/component/layouts/content';
import Layout from '@/component/layouts/layout';
const apiUrl = process.env.REACT_APP_API_URL;

//頁面路徑依賴外部資料
export async function getStaticPaths() {
  // Fetch data from an external API
  const res = await fetch(`${apiUrl}/api/posts`);
  const data = await res.json();
  console.log(data, 'dd');
  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const res = await fetch(`${apiUrl}/api/posts/${params.id}`);
  const postData = await res.json();
  // Pass post data to the page via props
  return { props: { postData } };
}
export default function Post({ postData }) {
  const router = useRouter();
  let nowPage = router.asPath;
  let pageTitle;
  console.log(postData, 'pppddd');
  nowPage.split('/').length == 2
    ? (pageTitle = nowPage.split('/')[1].toUpperCase())
    : (pageTitle = nowPage.split('/')[2].toUpperCase());
  return (
    <>
      <Layout title={pageTitle}>
        <Content data={postData} />
      </Layout>
    </>
  );
}
// This function gets called at build time
