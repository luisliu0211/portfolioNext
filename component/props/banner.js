import Image from 'next/image';
import styles from './banner.module.css';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
// import './styles.css';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
export default function Banner() {
  const [bannerPost, setBannerPost] = useState([]);
  function getRandomElements(array, numberOfElements) {
    // Fisher-Yates 洗牌算法
    const shuffledArray = array.sort(() => Math.random() - 0.5);

    // 取前 numberOfElements 個元素
    return shuffledArray.slice(0, numberOfElements);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`${apiUrl}/api/posts`, {
          credentials: 'include',
        });
        const data = await response.json();
        let randomData = getRandomElements(data, 3);
        setBannerPost(randomData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.banner}>
        <Swiper
          effect={'fade'}
          className={`${styles.mySwiper} mySwiper`}
          pagination={{ clickable: true }}
          modules={[EffectFade, Autoplay, Pagination, Navigation]}
          navigation={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {bannerPost.length !== 0
            ? bannerPost.map((item) => {
                return (
                  <SwiperSlide key={item.id} className={styles.slider}>
                    <Link href={`/posts/${item.id}`}>
                      <div
                        className={styles.bannerText}
                        style={{ backgroundImage: `url(${item.coverImage})` }}
                      >
                        <div className={styles.bannerTitle}>{item.title}</div>
                        <div className={styles.bannerSubtitle}>
                          {item.subtitle}
                        </div>
                        <div className={styles.tagList}>
                          {item.tags.map((tag, i) => (
                            <div key={i} className={styles.tag}>
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })
            : ''}
        </Swiper>
      </div>
    </>
  );
}
