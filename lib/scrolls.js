export function scrollHeight(element) {
  const scrollDistance = element.scrollY || element.scrollTop || 0;
  // console.log('移動高度距離：', scrollDistance);
  return scrollDistance;
}
