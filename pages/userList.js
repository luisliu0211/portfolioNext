import Layout from '@/component/layouts/layout';
import Breadcrumbs from '@/component/props/breadcrumbs';
import UserCard from '@/component/props/userCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { useScrollEnd } from '@/hook/useScrollEnd';
export default function UserList() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false); // 新增 loading 状态
  const router = useRouter();
  const nowPage = router.asPath;
  const page = useScrollEnd();

  useEffect(() => {
    let p = 6 + 4 * page;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://randomuser.me/api/?results=${p}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        setUserData(res.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (p >= 50) {
      setLoading(false);
      return;
    }
    fetchData();
  }, [page]);

  return (
    <>
      <Layout>
        <div>目前顯示筆數：{userData.length}</div>
        {userData && userData.length > 0 && <UserCard data={userData} />}

        {loading && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <CircularProgress /> {/* 显示 CircularProgress 组件 */}
          </div>
        )}
      </Layout>
    </>
  );
}
// TODO:記得改回getStaticProps()
// export async function getServerSideProps() {
//   try {
//     const response = await fetch('https://randomuser.me/api/?results=50');

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     return {
//       props: {
//         userData: { dataName: 'users', data },
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return {
//       props: {
//         userData: null,
//       },
//     };
//   }
// }
