import { differenceInDays, parseISO, startOfDay } from 'date-fns';

const calculateRemains = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = startOfDay(new Date(startDate));
  const end = startOfDay(new Date(endDate));

  const daysRemaining = differenceInDays(end, start);

  return daysRemaining;
};

export default calculateRemains;
