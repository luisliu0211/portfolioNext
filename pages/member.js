import Layout from '@/component/layouts/layout';
import { useRouter } from 'next/router';
import ButtonActive from '@/component/props/buttonActive';
import { signOut, useSession } from 'next-auth/react';
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]';
import SideBar from '@/component/sideBar';
import Breadcrumbs from '@/component/props/breadcrumbs';
import FlexBox from '@/component/layouts/flexBox';
import MemberInfo from '@/component/pages/memberInfo';

export default function Member() {
  const { data, status } = useSession();
  // console.log(data);
  if (status === 'loading') {
    return <h3>loading...</h3>;
  }
  if (status === 'unauthenticated') {
    return <h3>{status}</h3>;
  }

  return (
    <>
      <Layout>
        <FlexBox>
          <SideBar />
          <MemberInfo />
        </FlexBox>

        {/* <pre>{JSON.stringify(data.user, null, 2)}</pre> */}
      </Layout>
    </>
  );
}

/**
 * @param {import('next').GetStaticPathsContext} ctx
 */

// // server side render (SSR) server 一開始處理抓取login 資料
export async function getServerSideProps(ctx) {
  const session = await getServerAuthSession(ctx.req, ctx.res);
  // const session = await getServerSession(ctx.req, ctx.res, authOptions);

  // 如果沒登入成功 返回首頁"/" 否則抓取user資料
  if (!session) {
    return {
      redirect: { destination: '/', permanent: false },
    };
  }
  return {
    props: {},
  };
}
// 一開始ssr 即判斷權限 不須在頁面控管
