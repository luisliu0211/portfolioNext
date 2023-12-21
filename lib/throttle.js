export default function throttle(func, delay) {
  let timeoutId;

  return function (...args) {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null;
      }, delay);
    }
  };
}
