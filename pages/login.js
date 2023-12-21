import Layout from '@/component/layouts/layout';
import Breadcrumbs from '@/component/props/breadcrumbs';
import Tabs from '@/component/props/tabs';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
export default function Login() {
  return (
    <>
      <Layout>
        <Tabs />
      </Layout>
    </>
  );
}
