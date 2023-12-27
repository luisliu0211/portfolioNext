import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './navBar_sub.module.css';
import NavList from '../../navList.json';
import { signOut, useSession } from 'next-auth/react';
export default function NavBar_sub() {
  const { data, status } = useSession();
  const router = useRouter();
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    router.push(`${selectedValue}`);
  };
  useEffect(() => {
    const currentPagePath = window.location.pathname;
    setSelectedOption(currentPagePath);
  }, []);
  const [selectedOption, setSelectedOption] = useState('');
  return (
    <>
      <div className={styles.navBar_sub}>
        <h3>Quick Enter</h3>
        <select
          name=""
          id="navBar_sub"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          {NavList.map((option, id) => {
            return (
              <option key={id} value={option.href}>
                {option.title}
              </option>
            );
          })}
          {data && <option value="/member">Member</option>}
          {!data && <option value="/login">Login</option>}
        </select>
      </div>
    </>
  );
}
