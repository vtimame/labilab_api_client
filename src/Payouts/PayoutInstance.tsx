import React, { FunctionComponent, useEffect, useState } from 'react';
import { DepartmentPayoutManager, Payout, User } from '../types';
import { gql, useMutation } from '@apollo/client';

interface PayoutInstanceProps {
  user: User;
  payout: Payout;
  period: string;
  managerRule?: DepartmentPayoutManager;
  blocked: boolean;
}

const UPDATE_PAYOUT = gql`
  mutation updatePayout($payload: UpdatePayoutDto!) {
    updatePayout(payload: $payload) {
      _id
    }
  }
`;

export const PayoutInstance: FunctionComponent<PayoutInstanceProps> = (
  props
) => {
  const [updatePayoutMutation] = useMutation(UPDATE_PAYOUT);
  const [payout, setPayout] = useState<Payout>(props.payout);
  const [toIssue, setToIssue] = useState<string | null | undefined>(
    props.payout.toIssue
  );

  const getNumber = (value: any) => {
    // const reg = new RegExp(/^\d+$/);
    // const isNum = reg.test(value);
    // return isNum ? parseFloat(value) : 0;
    const num = value?.replace(',', '.');
    return isNaN(parseFloat(num)) ? 0 : parseFloat(num);
  };

  const calculateToIssue = () => {
    const prepaid = getNumber(payout.prepaid);
    const cellular = getNumber(payout.cellular);
    const firstHalf = getNumber(payout.firstHalf);
    const secondHalf = getNumber(payout.secondHalf);
    const otherPayouts = getNumber(payout.otherPayouts);
    const overtime = getNumber(payout.overtime);
    const prize = getNumber(payout.prize);
    const compensation = getNumber(payout.compensation);
    const salary = getNumber(payout.salary);

    const positive = overtime + prize + compensation + salary;
    const negative = prepaid + cellular + firstHalf + secondHalf + otherPayouts;

    const result = positive - negative;
    return Number(result.toFixed(5));
  };

  useEffect(() => {
    setToIssue(String(calculateToIssue()));
  }, [calculateToIssue, payout]);

  const canRead = (field: string): boolean => {
    if (props.managerRule)
      return (
        props.managerRule.readFields.findIndex((el) => el === field) !== -1
      );
    else return Boolean(1);
  };

  const cantWrite = (field: string): boolean => {
    if (props.managerRule)
      return (
        props.managerRule.writeFields.findIndex((el) => el === field) === -1
      );
    return Boolean(0);
  };

  const changePayout = (instance: Payout) => {
    setPayout({ ...instance });
    // await updatePayoutMutation({ variables: { payload: payout } });
  };

  const renderField = (
    name: string,
    width: string = '7%',
    disabled: boolean = false
  ) => {
    const isToIssue = name === 'toIssue';
    const payoutInstance: any = Object.assign({}, payout);
    if (canRead(name)) {
      return (
        <td style={{ width, padding: 0 }}>
          <div>
            {isToIssue ? (
              <input
                className="payouts-table__input"
                disabled={disabled || cantWrite(name) || props.blocked}
                onChange={() => {}}
                value={toIssue || ''}
              />
            ) : (
              <input
                value={payoutInstance[name] || ''}
                className="payouts-table__input"
                disabled={disabled || cantWrite(name) || props.blocked}
                onChange={() => {}}
                onBlur={() =>
                  updatePayoutMutation({
                    variables: {
                      payload: {
                        ...{
                          toIssue,
                          [name]: payoutInstance[name],
                          _id: payoutInstance._id,
                        },
                      },
                    },
                  })
                }
                onInputCapture={(event: any) =>
                  changePayout({
                    ...payoutInstance,
                    ...{ [name]: event.nativeEvent.target.value },
                  })
                }
              />
            )}
          </div>
        </td>
      );
    }
  };

  return (
    <>
      {renderField('prepaid')}
      {renderField('cellular')}
      {renderField('secondHalf')}
      {renderField('firstHalf')}
      {renderField('otherPayouts')}
      {renderField('overtime')}
      {renderField('prize')}
      {renderField('compensation')}
      {renderField('salary')}
      {renderField('toIssue', '7%', true)}
      {renderField('comment', '16%')}
    </>
  );
};
