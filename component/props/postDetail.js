import Image from 'next/image';
import styles from './postDetail.module.css';
export default function PostDetail(props) {
  const { data } = props;
  if (data[0].contentType == 'markdown') {
    console.log('this is markDown file');
    //TODO: 讀取後端的markdown檔案 渲染到前端
    // let id = data[0].id;
    // let postsDataUrl = `http://localhost:8080/api/posts/markdownPost/${id}`;
    // fetch(postsDataUrl)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
    // console.log(response);

    return (
      <div className={styles.container}>
        <Image
          // src={`../public/image/posts/${data.img}`}
          src={require(`../../public/image/posts/${data[0].coverImage}`)}
          width={100}
          height={100}
          alt=""
        />
        <div>{data[0].id}</div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: data[0].content }}
        />
      </div>
    );
  } else {
    console.log('as usual');
    return (
      <div className={styles.container}>
        <Image
          // src={`../public/image/posts/${data.img}`}
          src={require(`../../public/image/posts/${data[0].coverImage}`)}
          width={100}
          height={100}
          alt=""
        />
        <div>{data[0].id}</div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: data[0].content }}
        />
      </div>
    );
  }
}
