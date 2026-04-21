const formatDate = (dateString) => {
  if (!dateString) return '---';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return 'INVALID_DATE';

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(date)
    .toUpperCase();
};
export default formatDate;
