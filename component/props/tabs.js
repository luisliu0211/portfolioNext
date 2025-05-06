import { useEffect, useState } from 'react';
import styles from './tabs.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';
import ButtonActive from './buttonActive';
import { handleSignup } from '@/lib/signup';
export default function Tabs() {
  const { data, status } = useSession();
  const [activeTab, setActiveTab] = useState('signin');
  let tabData = [
    {
      id: 1,
      title: 'signin',
      className: 'loginSubmit',
    },
    // { id: 2, title: 'signup', className: 'signupSubmit' },
  ];
  let appLogin = {
    id: 1,
    title: 'Application Log in',
    active: signIn,
  };
  let appLogout = {
    id: 2,
    title: 'Application Log out',
    active: signOut,
  };

  return (
    <div className={styles.tabsContainer}>
      {!data && (
        <div className={styles.tabs}>
          {tabData.map((tab, id) => {
            return (
              <div
                key={id}
                className={`${styles.tab} ${
                  activeTab == tab.title ? styles.active : ''
                }`}
                onClick={() => setActiveTab(tab.title)}
              >
                {tab.title}
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.tabContent}>
        {activeTab === 'signin' && (
          <div className={styles.signIn}>
            {!data && <SignInForm />}
            {/* TODO: 如果判斷登入自動跳轉MEMBER頁面 */}
            {/* {!data && <h2>使用第三方應用程式登入</h2>}
            {!data && <ButtonActive settings={appLogin} />} */}
            {/* <br /> */}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            {data && <ButtonActive settings={appLogout} />}
          </div>
        )}
        {activeTab === 'signup' && (
          <div className={styles.signUp}>
            {/* TODO: 如果判斷登入自動跳轉MEMBER頁面 */}
            {!data && <SignUpForm />}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            {data && <ButtonActive settings={appLogout} />}
          </div>
        )}
      </div>
    </div>
  );
}
function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignin(e) {
    e.preventDefault();
    signIn('credentials', { email, password });
  }
  return (
    <form onSubmit={handleSignin}>
      <h2>一般 Email 登入</h2>
      <br />
      <label>
        <span>Email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <br />
      <label>
        <span>Password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Log in</button>
      <br />
      <hr />
    </form>
  );
}

function SignUpForm() {
  const [showSignupForm, setShowSignupForm] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleUserDetail = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  const handleSignupForm = (e) => {
    e.preventDefault(); // 防止預設的 form 提交行為
    handleSignup(e, user, () => {
      setUser({
        name: '',
        email: '',
        password: '',
      });
      setShowSignupForm(false);
    }); // 將事件和 user 資料傳遞給 handleSignup 函式
  };

  return (
    <div>
      {showSignupForm && (
        <form onSubmit={handleSignupForm}>
          <h2>一般 Email 註冊</h2>
          <br />
          <label>
            <span>Name:</span>
            <input
              name="name"
              type="text"
              value={user.name}
              onChange={handleUserDetail}
            />
          </label>
          <br />
          <label>
            <span>Email:</span>
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={handleUserDetail}
            />
          </label>
          <br />
          <label>
            <span>Password:</span>
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={handleUserDetail}
            />
          </label>
          <button type="submit">註冊</button>
        </form>
      )}

      <div className="resultBar"></div>
    </div>
  );
}
