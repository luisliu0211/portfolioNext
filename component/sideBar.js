import { signOut } from 'next-auth/react';
import styles from './sideBar.module.css';
import React from 'react';
import Link from 'next/link';
export default function SideBar() {
  // const { memberSideBar } = props;
  let memberSideBar = [
    { id: 1, title: '填寫報價單', url: '/member/quotation' },
    { id: 2, title: '報價總表', url: '/member/quotationRecap' },
    { id: 3, title: '我的報價', url: '/member/myQuote' },
    { id: 4, title: '下載專區', url: '/member/downloads' },
    { id: 5, title: '聯絡我', url: '/member/quoteContact' },
  ];
  return (
    <>
      <ul className={styles.container}>
        {memberSideBar.map((item, id) => {
          return (
            <React.Fragment key={id}>
              <li>
                <Link href={item.url}>{item.title}</Link>
              </li>
              <hr />
            </React.Fragment>
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
