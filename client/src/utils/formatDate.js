function formatDate(date) {
  if (date === null) {
    return '';
  }
  return new Intl.DateTimeFormat().format(new Date(date));
}

export default formatDate;
