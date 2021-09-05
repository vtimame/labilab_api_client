import React, { FunctionComponent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Classes, ControlGroup, Dialog } from '@blueprintjs/core';
import { useStore } from '../../store/Store';
import { DatePicker } from '../UserEditor/DatePicker';
import { gql, useMutation } from '@apollo/client';

interface CreateUserHolidaysProps {
  userId: string;
  isOpen: boolean;
  setIsOpen: Function;
  fetch: Function;
}

export const CreateUserHolidays: FunctionComponent<CreateUserHolidaysProps> = observer(
  (props) => {
    const { app } = useStore();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [createHolidays] = useMutation(gql`
      mutation createHolidays($payload: CreateUserHolidayDto!) {
        creteUserHoliday(payload: $payload) {
          _id
        }
      }
    `);

    const saveHoliday = async () => {
      await createHolidays({
        variables: {
          payload: { userId: props.userId, start: startDate, end: endDate },
        },
      });
      await props.fetch();

      setStartDate(null);
      setEndDate(null);
      props.setIsOpen(false);
    };

    return (
      <Dialog
        isOpen={props.isOpen}
        onClose={() => props.setIsOpen(false)}
        className={`${app.isDark ? Classes.DARK : ''} pb-0`}
      >
        <div className={Classes.DIALOG_BODY}>
          <div style={{ fontWeight: 600 }}>Добавить отпуск</div>
          <div className="py-2">
            <ControlGroup>
              <DatePicker
                onChange={(date) => setStartDate(date)}
                value={startDate}
                placeholder="Начало отпуска"
              />
              <DatePicker
                onChange={(date) => setEndDate(date)}
                value={endDate}
                placeholder="Окончание отпуска"
              />
            </ControlGroup>
          </div>
          <Button
            intent={'success'}
            fill
            disabled={!startDate || !endDate}
            onClick={saveHoliday}
          >
            Сохранить
          </Button>
        </div>
      </Dialog>
    );
  }
);
