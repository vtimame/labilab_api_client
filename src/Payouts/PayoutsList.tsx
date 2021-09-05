import React, { FunctionComponent } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Spinner } from '@blueprintjs/core';
import { PayoutInstance } from './PayoutInstance';
import { Payout, User } from '../types';
import moment from 'moment';

interface PayoutsListProps {
  period: string;
  payouts: Payout[];
  refetch: Function;
}

const USERS_QUERY = gql`
  query {
    users {
      _id
      name
      surname
      division {
        name
      }
      role {
        name
      }
    }
  }
`;

export const PayoutsList: FunctionComponent<PayoutsListProps> = (props) => {
  const usersQuery = useQuery(USERS_QUERY);

  if (usersQuery.loading) return <Spinner />;

  return (
    <div>
      <div className="d-flex justify-content-between py-2">
        <div style={{ flex: 2, fontSize: '11px' }} />
        <div style={{ flex: 2, fontSize: '11px' }} />
        <div style={{ flex: 1, fontSize: '11px' }}>Аванс</div>
        <div style={{ flex: 1, fontSize: '11px' }}>Сотовая</div>
        <div style={{ flex: 1, fontSize: '11px' }}>
          5/{moment(props.period, 'MM.YYYY').format('MM/YY')}
        </div>
        <div style={{ flex: 1, fontSize: '11px' }}>
          20/{moment(props.period, 'MM.YYYY').format('MM/YY')}
        </div>
        <div style={{ flex: 1, fontSize: '11px' }}>Иные</div>
        <div style={{ flex: 1, fontSize: '11px' }}>Наработка</div>
        <div style={{ flex: 1, fontSize: '11px' }}>Премия</div>
        <div style={{ flex: 1, fontSize: '11px' }}>Компенсация</div>
        <div style={{ flex: 1, fontSize: '11px' }}>Зарплата</div>
        <div style={{ flex: 1, fontSize: '11px' }}>К выдаче</div>
      </div>
      {usersQuery?.data?.users.map((user: User, index: number) => (
        <div key={user._id}>
          {/*<PayoutInstance*/}
          {/*  user={user}*/}
          {/*  period={props.period}*/}
          {/*  payout={props.payouts.find((el: Payout) => el.userId === user._id)}*/}
          {/*  refetch={props.refetch}*/}
          {/*/>*/}
        </div>
      ))}
    </div>
  );
};
