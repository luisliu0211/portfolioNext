export function getFormattedDate() {
  // 把日期變成YYYY-MM-DD
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1; // Months are zero-based
  let day = today.getDate();

  // Add leading zero if month or day is a single digit
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  // Formatted date in "YYYY-MM-DD" format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
export function getFormattedDateTime() {
  // 把日期變成YYYY-MM-DD
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1; // Months are zero-based
  let day = today.getDate();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  // Add leading zero if month or day is a single digit
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  // Formatted date in "YYYY-MM-DD" format
  const getFormattedDateTime = `${year}-${month}-${day} ${hour}:${min}:${sec}`;

  return getFormattedDateTime;
}
