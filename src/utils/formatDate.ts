export function formatDate(dateString: string) {
  const date: any = new Date(dateString);
  const now: any = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;

  if (isNaN(date.getTime())) return "";

  if (diffInSeconds < secondsInMinute) return "Just Now";
  else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} Minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} Hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInSeconds / secondsInDay);
    if (days === 0) return "Today";
    else if (days === 1) return "Yesterday";
    else return `${days} Day${days > 1 ? "s" : ""} ago`;
  }
}
