import React, { FunctionComponent } from 'react';
import { Button } from '@blueprintjs/core';
import { gql, useQuery } from '@apollo/client';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/Store';
import { useNavigate } from '@reach/router';
import { Routes } from '../../utils/Routes';

const PAYOUT_MANAGERS = gql`
  query payoutManages($payload: DepartmentPayoutManagerInput) {
    departmentPayoutManagers(payload: $payload) {
      _id
    }
  }
`;

export const PayoutsButton: FunctionComponent = observer(() => {
  const { app } = useStore();
  const navigate = useNavigate();
  const managersQuery = useQuery(PAYOUT_MANAGERS, {
    variables: { userId: app.user?._id },
  });

  if (
    app.user?.isAdmin ||
    (!managersQuery.loading &&
      managersQuery.data?.departmentPayoutManagers.length > 0)
  ) {
    return (
      <Button
        minimal
        small
        icon={'credit-card'}
        onClick={() => navigate(Routes.PAYOUTS)}
      >
        З/П
      </Button>
    );
  }

  return null;
});
