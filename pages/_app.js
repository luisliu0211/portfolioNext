import '@/styles/globals.css';
import { useEffect, useState, createContext } from 'react';
import { SessionProvider } from 'next-auth/react';
import Maintenance from './maintenance';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
// 获取 maintenanceMode 的值，这里假设 process.env 中有相关的配置
const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
export const ThemeContext = createContext();
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // 從 localStorage 中讀取主題選擇
      const savedTheme = localStorage.getItem('theme');
      // 如果 localStorage 中有存儲的主題，使用它；否則使用預設主題
      // If localStorage has a stored theme, use it; otherwise, use the default theme
      return savedTheme || 'light';
    }
    // Default to 'light' if window is not defined (e.g., during SSR)
    return 'light';
  });

  // 可以在這裡檢查用戶的設定或者根據時間等條件切換主題
  const toggleTheme = (e) => {
    e.preventDefault();
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    document.body.style.backgroundColor = theme === 'light' ? '#fff' : '#333';
    document.body.style.color = theme === 'light' ? '#000' : '#fff';
  };
  useEffect(() => {
    console.log('now', theme);
    localStorage.setItem('theme', theme);
    document.body.style.backgroundColor = theme === 'light' ? '#fff' : '#333';
    document.body.style.color = theme === 'light' ? '#000' : '#fff';
  }, [theme]);

  return maintenanceMode ? (
    <Maintenance />
  ) : (
    <SessionProvider session={session}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeContext.Provider>
    </SessionProvider>
  );
}
export function Auth({ children }) {
  const router = useRouter();
  // 使用 useSession hook 取得用戶會話資訊
  const { data: session, status } = useSession();
  // 在這裡，你可能想要將 `data` 改為 `session`，因為上面使用的是 `session`
  console.log(session, status);
  // TODO: 意思？
  // 檢查用戶是否存在
  const isUser = !!session.user;
  // 檢查是否仍在載入中
  const loading = status === 'loading';
  useEffect(() => {
    if (!loading && !isUser) {
      // 如果用戶不存在，將使用者導向首頁
      // 如果跑完發現沒有user資料 則跳轉首頁
      router.push('/');
    }
  }, [isUser, loading]);
  if (loading) {
    // 如果還在載入中，顯示 Loading...
    return <h3>Loading...</h3>;
  }
  if (!loading && isUser) {
    // 如果載入完成且用戶存在，顯示子元件
    return <div>{children}</div>;
  }
  return null;
}
