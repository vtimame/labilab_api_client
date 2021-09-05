import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { QueryResult, useQuery } from '@apollo/client';
import { DEPARTMENTS, PERMISSIONS } from './graphql';
import { ErrorComponent } from '../components/ErrorComponent';
import { LoadingComponent } from '../components/LoadingComponent';
import { DefaultLayout } from '../components/DefaultLayout';
import { DepartmentsList } from './DepartmentsList';
import { WritersList } from './WritersList';
import { useLocation } from '@reach/router';
import { Button, ButtonGroup, Callout } from '@blueprintjs/core';
import { AddDepartment } from './DepartmentsList/AddDepartment';
import { RolesDrawer } from './RolesDrawer';
import { Department } from '../types';
import { PayoutsButton } from './EmplyeesPage/PayoutsButton';

interface Props {}

const DepartmentsContext = createContext({} as QueryResult);
export const useDepartmentsQuery = () => useContext(DepartmentsContext);

const PermissionsContext = createContext({} as QueryResult);
export const usePermissionsQuery = () => useContext(PermissionsContext);

const CompactViewContext = createContext(false);
export const useCompactViewState = () => useContext(CompactViewContext);

export const EmployeesPage: FunctionComponent<Props> = observer(() => {
  const location = useLocation();
  const [compactView, setCompactView] = useState<boolean>(
    localStorage.getItem('employees.compactView') !== null
  );
  const departmentsQuery = useQuery(DEPARTMENTS);
  const permissionQuery = useQuery(PERMISSIONS, {
    variables: { pathname: location.pathname },
  });
  const userIsWriter = permissionQuery?.data?.permission?.iAmIsWriter;

  const setCompactViewState = (newState: boolean) => {
    setCompactView(newState);
    if (!newState) localStorage.removeItem('employees.compactView');
    else localStorage.setItem('employees.compactView', '1');
  };

  if (departmentsQuery.error) return <ErrorComponent />;
  if (departmentsQuery.data) {
    const departments: Department[] = departmentsQuery.data?.departments;
    return (
      <PermissionsContext.Provider value={permissionQuery}>
        <DepartmentsContext.Provider value={departmentsQuery}>
          <CompactViewContext.Provider value={compactView}>
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
                    Сотрудники
                  </div>
                  <div>
                    <Button
                      icon={'equals'}
                      minimal
                      small
                      onClick={() => setCompactViewState(false)}
                      intent={compactView ? 'none' : 'success'}
                      active={!compactView}
                    />
                    <Button
                      icon={'drag-handle-horizontal'}
                      minimal
                      small
                      onClick={() => setCompactViewState(true)}
                      intent={compactView ? 'success' : 'none'}
                      active={compactView}
                    />
                  </div>
                </div>
                <ButtonGroup>
                  {userIsWriter ? (
                    <>
                      <AddDepartment
                        reFetchDepartments={departmentsQuery.refetch}
                      />
                      <RolesDrawer />
                    </>
                  ) : null}
                  <PayoutsButton />
                </ButtonGroup>
              </div>
              <DepartmentsList
                departments={departments}
                reFetchDepartments={departmentsQuery.refetch}
              />
              {userIsWriter ? (
                <div>
                  <div
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      marginRight: '0.5rem',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    Редакторы
                  </div>
                  <Callout className="d-flex justify-content-between align-items-center">
                    <WritersList
                      permissions={permissionQuery.data['permission']}
                    />
                  </Callout>
                </div>
              ) : null}
            </DefaultLayout>
          </CompactViewContext.Provider>
        </DepartmentsContext.Provider>
      </PermissionsContext.Provider>
    );
  }

  return <LoadingComponent />;
});
