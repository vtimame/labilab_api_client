import React, { FunctionComponent, useState } from 'react';
import { Spinner, ControlGroup, HTMLSelect } from '@blueprintjs/core';
import { gql, useQuery } from '@apollo/client';
import { User } from '../types';
import moment from 'moment';
import { PayoutsTable } from './PayoutsTable';

const MANAGERS = gql`
  query managers($payload: DepartmentPayoutManagerInput, $period: String!) {
    departmentPayoutManagers(payload: $payload) {
      _id
      departmentId
      department {
        _id
        name
        divisions {
          _id
          name
          users {
            _id
            name
            surname
            payout(period: $period) {
              _id
              comment
              prepaid
              cellular
              otherPayouts
              prize
              compensation
              overtime
              salary
              firstHalf
              secondHalf
              userId
              toIssue
              period
            }
            role {
              _id
              name
            }
          }
        }
      }
      userId
      readFields
      writeFields
      user {
        name
        surname
      }
    }
  }
`;

interface PayoutsPageBodyProps {
  user: User;
  users: User[];
}

export const PayoutsPageBody: FunctionComponent<PayoutsPageBodyProps> = (
  props
) => {
  {
    const [period, setPeriod] = useState(
      localStorage.getItem('payouts.currentPeriod') ||
        moment().format('MM.YYYY')
    );

    const managersQuery = useQuery(MANAGERS, {
      variables: { payload: { userId: props.user?._id }, period },
    });

    const onDateChange = (property: any, value: string) => {
      let newPeriod = moment().format('MM.YYYY');
      const date = moment(period, 'MM.YYYY');
      if (property === 'year') {
        newPeriod = `${date.format('MM')}.${value}`;
      } else if (property === 'month') {
        newPeriod = `${value}.${date.format('YYYY')}`;
      }

      localStorage.setItem('payouts.currentPeriod', newPeriod);
      setPeriod(newPeriod);
    };

    if (!managersQuery.loading) {
      const managers = managersQuery.data?.departmentPayoutManagers;
      if (props.user.isAdmin || managers.length > 0) {
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <div
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginRight: '0.5rem',
                }}
              >
                Расчет заработной платы
              </div>
              <div className="d-flex align-items-center">
                <ControlGroup>
                  <HTMLSelect
                    minimal
                    value={moment(period, 'MM.YYYY').format('MM')}
                    onChange={(event) => {
                      onDateChange('month', event.target.value);
                    }}
                    options={[
                      { label: 'Январь', value: '01' },
                      { label: 'Февраль', value: '02' },
                      { label: 'Март', value: '03' },
                      { label: 'Апрель', value: '04' },
                      { label: 'Май', value: '05' },
                      { label: 'Июнь', value: '06' },
                      { label: 'Июль', value: '07' },
                      { label: 'Август', value: '08' },
                      { label: 'Сентябрь', value: '09' },
                      { label: 'Октябрь', value: '10' },
                      { label: 'Ноябрь', value: '11' },
                      { label: 'Декабрь', value: '12' },
                    ]}
                  />
                  <HTMLSelect
                    minimal
                    value={moment(period, 'MM.YYYY').format('YYYY')}
                    onChange={(event) => {
                      onDateChange('year', event.target.value);
                    }}
                    options={[
                      { value: '2020', label: '2020' },
                      { value: '2021', label: '2021' },
                      { value: '2022', label: '2022' },
                      { value: '2023', label: '2023' },
                    ]}
                  />
                </ControlGroup>
              </div>
            </div>
            <PayoutsTable
              key={period}
              user={props.user}
              users={props.users}
              managers={managers}
              period={period}
            />
          </div>
        );
      }

      return null;
    }

    return (
      <div className="d-flex justify-content-center py-4">
        <Spinner size={22} />
      </div>
    );
  }
};
