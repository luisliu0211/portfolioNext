import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/component/layouts/layout';
import MdEditArea from '@/component/props/mdEditArea';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
export default function PostEdit({}) {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(`${apiUrl}/api/posts/${parseInt(id)}`, {
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result[0]);
          console.log(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Layout>
      <MdEditArea data={data} />
    </Layout>
  );
}
