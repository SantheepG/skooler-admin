export const formatDate = (dateString) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = new Date(dateString).toLocaleString("en-US", options);
  return formattedDate;
};

export const calculateElapsedTime = (dateTimeString) => {
  const currentDate = new Date();
  const givenDate = new Date(dateTimeString);
  const elapsedMilliseconds = currentDate - givenDate;

  const minutes = Math.floor(elapsedMilliseconds / (1000 * 60));
  const hours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
  const days = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
};
