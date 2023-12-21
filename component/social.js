import styles from './social.module.css';
import Link from 'next/link';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalculateIcon from '@mui/icons-material/Calculate';
import HomeIcon from '@mui/icons-material/Home';
export default function Social() {
  return (
    <>
      <div className={styles.socialLink}>
        <h3>Social Links</h3>
        <div className={styles.rows}>
          <Link href="/">
            <CalendarMonthIcon sx={{ fontSize: 50 }} />
          </Link>
          <Link href="/">
            <CalculateIcon sx={{ fontSize: 50 }} />
          </Link>
          <Link href="/">
            <HomeIcon sx={{ fontSize: 50 }} />
          </Link>
        </div>
      </div>
    </>
  );
}
