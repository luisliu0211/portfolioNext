import styles from './contactForm.module.css';
import Breadcrumbs from '../props/breadcrumbs';
import { useRouter } from 'next/router';
export default function ContactForm() {
  const router = useRouter();
  const nowPage = router.asPath;
  let title =
    nowPage.split('/').length == 2
      ? nowPage.split('/')[1]
      : nowPage.split('/')[2];

  return (
    <>
      <Breadcrumbs nowPage={nowPage} />
      <h1 className={styles.title}>Contact Me</h1>
      <hr />
      <form id="contact" className={styles.contactForm} action="">
        <label htmlFor="">
          Name：
          <input type="text" />
        </label>
        <label htmlFor="">
          Email：
          <input type="text" />
        </label>{' '}
        <label htmlFor="">
          Request：
          <input type="text" />
        </label>{' '}
        <label htmlFor="">
          Text：
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </label>
      </form>
    </>
  );
}
