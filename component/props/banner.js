import Image from 'next/image';
import styles from './banner.module.css';
import BannerImg1 from '../../public/image/banner/banner1.jpeg';
import BannerImg2 from '../../public/image/banner/banner2.png';
import BannerImg3 from '../../public/image/banner/banner3.png';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';

// import './styles.css';

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
export default function Banner() {
  let data = {
    dataName: 'bannerData',
    bannerDetail: [
      {
        id: 1,
        bannerTitle: 'test1',
        bannerSubtitle: 'testDescription1',
        bannerImg: 'banner1.jpeg',
      },
      {
        id: 2,
        bannerTitle: 'test2',
        bannerSubtitle: 'testDescription2',
        bannerImg: 'banner2.png',
      },
      {
        id: 3,
        bannerTitle: 'test3',
        bannerSubtitle: 'testDescription3',
        bannerImg: 'banner3.png',
      },
    ],
  };
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
          {data.bannerDetail.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Image
                  src={require(`../../public/image/banner/${item.bannerImg}`)}
                  width={1600}
                  height={900}
                  alt={item.bannerTitle}
                  priority="high"
                ></Image>
                <div className={styles.bannerText}>
                  <div className={styles.bannerTitle}>{item.bannerTitle}</div>
                  <div className={styles.bannerSubtitle}>
                    {item.bannerSubtitle}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
