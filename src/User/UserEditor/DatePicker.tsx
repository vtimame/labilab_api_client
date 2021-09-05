import React, { FunctionComponent } from 'react';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime';
import moment from 'moment';

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
const WEEKDAYS_LONG = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];
const WEEKDAYS_SHORT = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

interface DatePickerProps {
  onChange: (selectedDate: Date, isUserChange: boolean) => void;
  value: Date | null;
  placeholder?: string;
}

export const DatePicker: FunctionComponent<DatePickerProps> = ({
  onChange,
  value,
  placeholder,
}) => {
  function getMomentFormatter(format: string): IDateFormatProps {
    return {
      formatDate: (date, locale: any) =>
        moment(date).locale(locale).format(format),
      parseDate: (str, locale: any) =>
        moment(str, format).locale(locale).toDate(),
      placeholder: placeholder || format,
    };
  }

  return (
    <DateInput
      fill
      {...getMomentFormatter('DD.MM.YYYY')}
      locale="ru"
      defaultValue={value ? new Date(value) : undefined}
      minDate={new Date(0)}
      onChange={onChange}
      dayPickerProps={{
        months: MONTHS,
        weekdaysLong: WEEKDAYS_LONG,
        weekdaysShort: WEEKDAYS_SHORT,
      }}
    />
  );
};
