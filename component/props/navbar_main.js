import Link from 'next/link';
import Image from 'next/image';
import styles from './navBar_main.module.css';
import menuIcon from '../../public/icons/menu.svg';
import closeIcon from '../../public/icons/close.svg';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import NavList from '../../navList.json';
import { signOut, useSession } from 'next-auth/react';
import { useContext } from 'react';
import { ThemeContext } from '@/pages/_app';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export default function Navbar_main() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { data, status } = useSession();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuClassName = isMenuOpen ? styles.mobile_open : '';
  const router = useRouter();
  const nowPage = router.asPath;
  let title =
    nowPage.split('/').length == 2
      ? nowPage.split('/')[1].toUpperCase()
      : nowPage.split('/')[2].toUpperCase();
  useEffect(() => {
    document.querySelector('.slide').style.backgroundColor =
      theme == 'light' ? '#ccc' : 'black';
    document.querySelector('.dots').style.transform =
      theme == 'light' ? 'translateX(0px)' : 'translateX(26px)';
  }, [theme]);
  return (
    <>
      <ul className={styles.nav} key="nav-main">
        <label
          className={`${styles.switch} switch`}
          onClick={(e) => {
            toggleTheme(e);
            document.querySelector('.slide').style.backgroundColor =
              theme == 'light' ? '#ccc' : 'black';
            // console.log(document.querySelector('.dots'));
            document.querySelector('.dots').style.transform =
              theme == 'light' ? 'translateX(0px)' : 'translateX(26px)';
          }}
        >
          <input type="checkbox" id="switch" />
          <span className={`${styles.slider} ${styles.round} slide`}>
            <div className={`${styles.dots} dots`}></div>
          </span>
        </label>
        {NavList.map((list, id) => {
          return (
            <li
              key={id}
              className={
                list.title.toUpperCase() === title ? styles.active : ''
              }
            >
              <Link href={list.href}>{list.title}</Link>
            </li>
          );
        })}
        {data && (
          <li className={title === 'MEMBER' ? styles.active : ''}>
            <Link href="/member">Hello! {data.user.name}</Link>
          </li>
        )}
        {!data && (
          <li className={title == 'LOGIN' ? styles.active : ''}>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
      <div className={styles.tools}>
        <button className={styles.switch} onClick={toggleTheme}>
          {theme == 'light' ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
        <div
          className={styles.navBtn}
          onClick={() => setMenuOpen((prevState) => !prevState)}
        >
          {isMenuOpen ? (
            <Image src={closeIcon} alt="" width={50} height={50} />
          ) : (
            <Image src={menuIcon} alt="" width={50} height={50} />
          )}
        </div>
      </div>

      <ul className={`${styles.nav_mobile} ${menuClassName}`}>
        {data && (
          <>
            <li className={title === 'MEMBER' ? styles.active : ''}>
              <Link href="/member">Hello! {data.user.name}</Link>
            </li>
            <hr />
          </>
        )}
        {NavList.map((list, id) => {
          return (
            <div key={id}>
              <li
                key={id}
                className={
                  list.title.toUpperCase() === title ? styles.active : ''
                }
              >
                <Link href={list.href}>{list.title}</Link>
              </li>
              <hr />
            </div>
          );
        })}
        {!data && (
          <li className={title == 'LOGIN' ? styles.active : ''}>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </>
  );
}
