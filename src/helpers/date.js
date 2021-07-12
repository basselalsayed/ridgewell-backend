import { format } from 'date-fns';

const formats = {
  form: 'yyyy-MM-dd',
  popover: 'd/MM/yy',
  panel: 'do LLL y',
  panelTime: 'do LLL y, hh:mm aaaa',
};

const formatted = (date, type) => format(new Date(date), formats[type]);

export { formatted };
