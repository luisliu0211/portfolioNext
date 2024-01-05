let scrollToTopBtn = document.querySelector('#scrollToTop');
let navBarBtn = document.querySelector('#navBarBtn');
let header = document.querySelector('#header');
let headerMobile = document.querySelector('.header-nav-mobile');
let heederDesktop = document.querySelector('.header-nav');
let memberSwiperViewSilde = document.querySelector('.memberSwiper');
let locateSwiperViewSilde = document.querySelector('.locateSwiper');
let browserWidth = window.innerWidth;
let moreAboutLi = headerMobile.querySelector('.moreAbout');
let moreCaseLi = headerMobile.querySelector('.moreCase');
let moreAboutExt = moreAboutLi.querySelector('.more');
let moreCaseExt = moreCaseLi.querySelector('.more');
let memberCard = document.querySelectorAll('.memberInfo');
let memberPopup = document.querySelectorAll('.memberDetailPopup');
let dropdownIcon = document.querySelector('.dropbtn>.icon');
let dropdownContent = document.querySelector(
  '.dropdownCategoryFilter>.dropdown-content'
);
//  點選TOP 跑到最上方
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

//  hover header navbar 從上方滑入選單
//  點選 navBar 按鈕從上方滑入 navBar
headerMobile.classList.remove('active');
headerMobile.classList.remove('close');
navBarBtn.addEventListener('click', () => {
  navBarBtn.classList.toggle('close');
  if (headerMobile.classList.value.includes('active')) {
    // 主選單收合的時候 次選單自動收合
    moreAboutExt.style.height = '0px';
    moreCaseExt.style.height = '0px';
    moreCaseExt.classList.remove('active');
    moreCaseLi.querySelector('.row1').classList.remove('active');
    moreAboutExt.classList.remove('active');
    moreAboutLi.querySelector('.row1').classList.remove('active');
    headerMobile.classList.remove('active');
    headerMobile.classList.add('close');
  } else {
    headerMobile.classList.add('active');
    headerMobile.classList.remove('close');
  }
  if (dropdownContent) {
    dropdownContent.classList.remove('open');
  }
});
//  偵測視窗自動更換banner顯示 slider數量
if (memberSwiperViewSilde) {
  if (browserWidth < 992 && browserWidth >= 768) {
    memberSwiperViewSilde.setAttribute('slides-per-view', '2');
  } else if (browserWidth < 768) {
    memberSwiperViewSilde.setAttribute('slides-per-view', '1');
  } else {
    memberSwiperViewSilde.setAttribute('slides-per-view', '3');
  }
  window.addEventListener('resize', () => {
    let browserWidth = window.innerWidth;
    if (browserWidth < 992 && browserWidth >= 768) {
      memberSwiperViewSilde.setAttribute('slides-per-view', '2');
    } else if (browserWidth < 768) {
      memberSwiperViewSilde.setAttribute('slides-per-view', '1');
    } else {
      memberSwiperViewSilde.setAttribute('slides-per-view', '3');
    }
  });
}
if (locateSwiperViewSilde) {
  if (browserWidth < 992 && browserWidth >= 768) {
    locateSwiperViewSilde.setAttribute('slides-per-view', '2');
  } else if (browserWidth < 768) {
    locateSwiperViewSilde.setAttribute('slides-per-view', '1');
  } else {
    locateSwiperViewSilde.setAttribute('slides-per-view', '3');
  }
  window.addEventListener('resize', () => {
    let browserWidth = window.innerWidth;
    if (browserWidth < 992 && browserWidth >= 768) {
      locateSwiperViewSilde.setAttribute('slides-per-view', '2');
    } else if (browserWidth < 768) {
      locateSwiperViewSilde.setAttribute('slides-per-view', '1');
    } else {
      locateSwiperViewSilde.setAttribute('slides-per-view', '3');
    }
  });
}

// 如何將下拉視窗放在header底部 待navbar被觸動時 將下拉視窗從上方滑入但跑在下方區塊的上方 ->css ok
// 手機版下拉選單

moreAboutExt.style.height = '0px';
moreCaseExt.style.height = '0px';
// 漢堡選單點選後 ＋號變成－號
// 動態偵測目前li下拉選項是否有更新
if (moreAboutLi && moreCaseLi) {
  console.log(moreAboutLi, '有沒有about！');
  console.log(moreCaseLi, '有沒有case！');
  console.log(moreAboutExt, '有沒有aboutext！');
  console.log(moreCaseExt, '有沒有caseext！');
  moreAboutLi.addEventListener('click', () => {
    console.log('點到我了about');
    let itemQty = moreAboutLi.querySelectorAll('.extendPage').length;
    moreCaseExt.classList.remove('active');
    moreCaseLi.querySelector('.row1').classList.remove('active');
    moreAboutLi.querySelector('.row1').classList.toggle('active');
    moreAboutExt.classList.toggle('active');
    if (moreAboutLi.querySelector('.more.active')) {
      moreAboutExt.style.height = `${itemQty * 53}px`;
      moreCaseExt.style.height = '0px';
    } else {
      moreAboutExt.style.height = '0px';
    }
  });

  moreCaseLi.addEventListener('click', () => {
    console.log('點到我了case');
    let itemQty = moreCaseLi.querySelectorAll('.extendPage').length;
    moreAboutExt.classList.remove('active');
    moreAboutLi.querySelector('.row1').classList.remove('active');
    moreCaseLi.querySelector('.row1').classList.toggle('active');
    moreCaseExt.classList.toggle('active');
    if (moreCaseLi.querySelector('.more.active')) {
      moreCaseExt.style.height = `${itemQty * 53}px`;
      moreAboutExt.style.height = '0px';
    } else {
      moreCaseExt.style.height = '0px';
    }
  });
}

// 團隊介紹 點選方卡片 彈出視窗

//選到卡片後綁定事件偵測按鈕
if (memberPopup.length > 0) {
  memberCard.forEach((item, index) => {
    let infoModal = document.querySelector(`.box${index}`);
    item.addEventListener('click', () => {
      console.log('點到', index);
      infoModal.showModal();
      infoModal.classList.add('active');
    });
    let close = infoModal.querySelector('.closeBtn');
    close.addEventListener('click', function () {
      infoModal.close();
    });
    infoModal.addEventListener('click', (e) => {
      const dialogDimensions = infoModal.getBoundingClientRect();
      console.log(dialogDimensions);
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        infoModal.close();
        infoModal.classList.remove('active');
      }
    });
  });
}
// 案例下拉選單 每隔10秒抖動
if (dropdownIcon) {
  dropdownIcon.addEventListener('click', () => {
    dropdownContent.classList.toggle('open');
  });
  // console.log(dropdonwIcon);
  let alertIcon = setInterval(() => {
    dropdownIcon.classList.add('animateActive');
    setTimeout(() => {
      dropdownIcon.classList.remove('animateActive');
    }, 3000);
  }, 10000);
}

// 背景黏在固定範圍
// 作法：html 包一個container 放背景圖
// 該container 固定高度 做position absolute 才不會影響其他的content
// 調整該container 位置
// 裡面的img 做postion sticky 調整sticky 狀態時的位置

// TODO: 首頁的團隊檔案是否點進去要用popup彈出視窗？ 需討論

// 設定cookie 第一次進入網站設定cookie
//取用cookie
function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
// 執行初始動畫 loading animation
let loadingPage = document.getElementById('opening');
let indexBanner = document.getElementById('indexBanner');
if (browserWidth < 576) {
  let openningBGend = document.querySelector('.animateText2');
  if (!getCookie('visitedTaiway') && loadingPage) {
    //   console.log('還沒去過首頁');
    indexBanner.style.marginTop = '0px';
    header.style.display = 'none';
    headerMobile.style.display = 'none';
    // 偵測動畫結束
    openningBGend.addEventListener('animationend', () => {
      //     console.log('跑完動畫了');
      indexBanner.style.marginTop = '100px';
      header.style.display = 'block';
      headerMobile.style.display = 'block';
      loadingPage.classList.add('fadeAway');
      window.scrollTo({ top: 0 });
      setTimeout(() => {
        loadingPage.style.display = 'none';
      }, 2000);
      document.cookie = 'visitedTaiway=true;  Max-Age=3600';
    });
  } else {
    //   console.log('已經去過首頁了 不跑讀取動畫');
    loadingPage.style.display = 'none';
  }
} else {
  let openningBGend = document.querySelector('.imgboxforBg');
  if (!getCookie('visitedTaiway') && loadingPage) {
    //console.log('還沒去過首頁');
    indexBanner.style.marginTop = '0px';
    header.style.display = 'none';
    headerMobile.style.display = 'none';
    // 偵測動畫結束
    openningBGend.addEventListener('animationend', () => {
      //console.log('跑完動畫了');
      indexBanner.style.marginTop = '100px';
      header.style.display = 'block';
      headerMobile.style.display = 'block';
      loadingPage.classList.add('fadeAway');
      window.scrollTo({ top: 0 });
      setTimeout(() => {
        loadingPage.style.display = 'none';
      }, 2000);
      document.cookie = 'visitedTaiway=true;  Max-Age=3600';
    });
  } else {
    //console.log('已經去過首頁了 不跑讀取動畫');
    loadingPage.style.display = 'none';
  }
}
