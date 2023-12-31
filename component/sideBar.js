import { signOut } from 'next-auth/react';
import styles from './sideBar.module.css';
import Link from 'next/link';
export default function SideBar() {
  // const { memberSideBar } = props;
  let memberSideBar = [
    { id: 1, title: '會員資料', url: '/' },
    { id: 2, title: '報價總表', url: '/' },
    { id: 3, title: '我的報價', url: '/' },
    { id: 4, title: '聯絡我', url: '/' },
  ];
  return (
    <>
      <ul className={styles.container}>
        {memberSideBar.map((item, id) => {
          return (
            <>
              <li key={id}>
                <Link href={item.url}>{item.title}</Link>
              </li>
              <hr />
            </>
          );
        })}

        <li>
          <a onClick={signOut}>登出</a>
        </li>
        <hr />
      </ul>
    </>
  );
}
