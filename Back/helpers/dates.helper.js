import moment from 'moment';
/**
 * Get the start of one day before
 * @param  {string} date default now, format YYYY-MM-DD
 */
export const beginningOfDay = (date = moment()) => (
  moment(date).subtract(1, 'days').startOf('day').unix()
);
/**
 * Get the end of one day before
 * @param  {string} date default now, format YYYY-MM-DD
 */
export const endOfDay = (date = moment()) => (
  moment(date).subtract(1, 'days').endOf('day').unix()
);