import React, { FunctionComponent } from 'react';
import { DefaultLayout } from '../components/DefaultLayout';
import { gql, useMutation, useQuery } from '@apollo/client';
import { PERMISSIONS } from '../Employees/graphql';
import { Routes } from '../utils/Routes';
import { LoadingComponent } from '../components/LoadingComponent';
import { Redirect } from '@reach/router';
import { CreateApplicationDialog } from './CreateApplicationDialog';
import { Application } from '../types';
import { Button, Callout, Classes, Divider } from '@blueprintjs/core';

export const ApplicationsPage: FunctionComponent = (props) => {
  const permissionQuery = useQuery(PERMISSIONS, {
    variables: { pathname: Routes.APPLICATIONS },
  });

  const applicationsQuery = useQuery(gql`
    query {
      authApplications {
        _id
        name
        url
      }
    }
  `);

  const [deleteApplication] = useMutation(gql`
    mutation deleteAuthApplication($_id: String!) {
      deleteAuthApplication(_id: $_id) {
        _id
      }
    }
  `);

  const onDelete = async (_id: string) => {
    await deleteApplication({ variables: { _id } });
    await applicationsQuery.refetch();
  };

  if (!permissionQuery.loading) {
    const userIsWriter = permissionQuery.data?.permission?.iAmIsWriter;

    return userIsWriter ? (
      <DefaultLayout>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <div
              style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                marginRight: '0.5rem',
              }}
            >
              Приложения
            </div>
          </div>
          <CreateApplicationDialog
            onCreate={() => applicationsQuery.refetch()}
          />
        </div>
        <div>
          {applicationsQuery?.data?.authApplications.map(
            (item: Application) => {
              return (
                <div key={item._id}>
                  <Callout>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div>{item.name}</div>
                        <div className={Classes.TEXT_MUTED}>{item.url}</div>
                      </div>
                      <div>
                        <Button
                          intent={'danger'}
                          icon={'minus'}
                          minimal
                          onClick={() => onDelete(item._id)}
                        />
                      </div>
                    </div>
                  </Callout>
                  <Divider />
                </div>
              );
            }
          )}
        </div>
      </DefaultLayout>
    ) : (
      <Redirect to="/me" />
    );
  }

  return (
    <DefaultLayout>
      <LoadingComponent />
    </DefaultLayout>
  );
};
