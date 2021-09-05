import React, { FunctionComponent } from 'react';
import { DepartmentPayoutManager, Division, Payout, User } from '../types';
import { PayoutInstance } from './PayoutInstance';
import { gql, useQuery } from '@apollo/client';
import { HTMLTable } from '@blueprintjs/core';
import _flatten from 'lodash/flatten';
import moment from 'moment';

interface PayoutsTableProps {
  user: User;
  users: User[];
  managers: any[];
  period: string;
}

// const PAYOUTS_QUERY = gql`
//   query payouts($period: String!) {
//     payouts(payload: { period: $period }) {
//       _id
//       comment
//       prepaid
//       cellular
//       otherPayouts
//       prize
//       compensation
//       overtime
//       salary
//       firstHalf
//       secondHalf
//       userId
//       toIssue
//       period
//     }
//   }
// `;

const previousPeriod = moment().subtract(1, 'month');

export const PayoutsTable: FunctionComponent<PayoutsTableProps> = (props) => {
  // const payoutsQuery = useQuery(PAYOUTS_QUERY, {
  //   variables: { period: props.period },
  // });

  const blockedTable = () => {
    const firstDayOfThePeriod = moment(props.period, 'MM.YYYY').startOf(
      'month'
    );
    const firstDayOfThePreviousPeriod = previousPeriod.startOf('month');
    const currentDay = moment().day();

    if (firstDayOfThePeriod < firstDayOfThePreviousPeriod) {
      return firstDayOfThePeriod < firstDayOfThePreviousPeriod;
    } else if (firstDayOfThePeriod === firstDayOfThePreviousPeriod) {
      return currentDay >= 10;
    } else {
      return Boolean(0);
    }
  };

  const canRead = (field: string, rule: DepartmentPayoutManager): boolean => {
    return rule.readFields.findIndex((el) => el === field) !== -1;
  };

  const renderPayoutsByDepartmentRules = () => {
    // if (!payoutsQuery.loading) {
    //   const payouts = payoutsQuery.data.payouts;
    return props.managers.map((rule) => {
      const departmentUsers: User[] = _flatten(
        rule.department.divisions.map((division: Division) => division.users)
      );
      return (
        <div key={rule._id} className="mb-2">
          <div style={{ fontWeight: 600 }} className="mb-2">
            {rule?.department?.name}
          </div>
          <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-striped bp3-html-table-condensed payouts-table">
            <thead>
              <tr>
                <th>ФИО - Должность</th>
                {canRead('prepaid', rule) ? <th>Аванс</th> : null}
                {canRead('cellular', rule) ? <th>Сотовая</th> : null}
                {canRead('secondHalf', rule) ? (
                  <th>
                    20.{moment(props.period, 'MM.YYYY').format('MM.YYYY')}
                  </th>
                ) : null}
                {canRead('firstHalf', rule) ? (
                  <th>
                    05.
                    {moment(props.period, 'MM.YYYY')
                      .add(1, 'month')
                      .format('MM.YYYY')}
                  </th>
                ) : null}

                {canRead('otherPayouts', rule) ? <th>Иные</th> : null}
                {canRead('overtime', rule) ? <th>Наработка</th> : null}
                {canRead('prize', rule) ? <th>Премия</th> : null}
                {canRead('compensation', rule) ? <th>Компенсации</th> : null}
                {canRead('salary', rule) ? <th>Зарплата</th> : null}
                {canRead('toIssue', rule) ? <th>К выдаче</th> : null}
                {canRead('comment', rule) ? <th>Комментарий</th> : null}
              </tr>
            </thead>
            <tbody>
              {departmentUsers.map((user: User) => {
                return (
                  <tr key={user._id}>
                    <td
                      style={{
                        width: '50px',
                        padding: 0,
                      }}
                    >
                      <input
                        className="payouts-table__input"
                        disabled
                        value={`${user.surname} ${user.name} - ${
                          user.role?.name || 'Без роли'
                        }`}
                      />
                    </td>
                    <PayoutInstance
                      user={user}
                      period={props.period}
                      managerRule={rule}
                      payout={user.payout}
                      blocked={blockedTable()}
                    />
                    {/*<td>0</td>*/}
                    {/*<td>0</td>*/}
                    {/*<td>0</td>*/}
                    {/*<td>0</td>*/}
                    {/*<td>0</td>*/}
                    {/*<td>0</td>*/}
                    {/*<td>0</td>*/}
                    {/*<td>0</td>*/}
                    {/*<td>0</td>*/}
                    {/*<td style={{ width: '10%' }}>0</td>*/}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/*{rule?.department?.divisions.map((division: Division) => {*/}
          {/*  return (*/}
          {/*    <div key={division._id}>*/}
          {/*      {division.users.map((user, userIndex: number) => {*/}
          {/*        return (*/}
          {/*          <div key={userIndex}>*/}
          {/*            <PayoutInstance*/}
          {/*              user={user || ({} as User)}*/}
          {/*              managerRule={rule}*/}
          {/*              period={props.period}*/}
          {/*              refetch={() => payoutsQuery.refetch()}*/}
          {/*              payout={payouts.find(*/}
          {/*                (payout: Payout) => payout.userId === user?._id*/}
          {/*              )}*/}
          {/*            />*/}
          {/*          </div>*/}
          {/*        );*/}
          {/*      })}*/}
          {/*    </div>*/}
          {/*  );*/}
          {/*})}*/}
        </div>
      );
    });
    // }
  };

  return <div className="mt-3">{renderPayoutsByDepartmentRules()}</div>;
};
