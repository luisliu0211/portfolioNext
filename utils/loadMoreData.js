export const loadMoreData = (
  loadNumber,
  maxDataNum,
  filter,
  setFilter,
  ifOverMaxShow
) => {
  setFilter(filter + loadNumber);
  if (ifOverMaxShow) {
    document.querySelector('.seeMore').style.display = 'none';
  }
  if (filter == maxDataNum) {
    if (ifOverMaxShow) {
      document.querySelector('.seeMore').style.display = 'block';
    }
    document.querySelector('.loadMore').style.display = 'none';
  }
};

export function resizeSet(setIsMobile, setItemPerPage) {
  if (window.innerWidth < 576) {
    setIsMobile(true);
    setItemPerPage(4);
    // console.log('phone');
  } else {
    setIsMobile(false);
    setItemPerPage(6);
    // console.log('desktop');
  }
}
