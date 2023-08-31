import moment from 'moment';
import showToast from './toast';

type errorTypes = {
  message?: string;
  status?: number;
};

export const handleApiErrors = (error: errorTypes) => {
  const {message} = error || {};

  showToast({message});
};
export function dateToFromNowDaily(myDate: Date) {
  // get from-now for this date
  var fromNow = moment(myDate).format('dddd, DD/MM');

  // ensure the date is displayed with today and yesterday
  return moment(myDate).calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    // when the date is further away, use from-now functionality
    sameElse: function () {
      return '[' + fromNow + ']';
    },
  });
}

export const truncateString = (str = '', limit = 14) => {
  if (typeof str !== 'string') {
    return '';
  }
  if (str.length > limit) {
    return str.substring(0, limit) + '...';
  } else {
    return str;
  }
};
