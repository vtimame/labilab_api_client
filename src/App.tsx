import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Router } from '@reach/router';
import { LoginPage } from './Login/LoginPage';
import { useStore } from './store/Store';
import { reaction } from 'mobx';
import { Spinner } from '@blueprintjs/core';
import { gql, useQuery } from '@apollo/client';
import { MePage } from './Me/MePage';
import { NotFoundPage } from './NotFound/NotFoundPage';
import { AuthMiddleware } from './components/AuthMiddleware';
import { EmployeesPage } from './Employees/EmployeesPage';
import { Routes } from './utils/Routes';
import { UserPage } from './User/UserPage';
import { AuthPage } from './Auth/AuthPage';
import { ApplicationsPage } from './Applications/ApplicationsPage';
import { PayoutsPage } from './Payouts/PayoutsPage';

const LIGHT = 'application';
const DARK = 'application application--dark bp3-dark';
const USER = gql`
  query {
    whoAmI {
      name
      surname
    }
  }
`;

const loadedView = (classNames: string) => {
  return (
    <div style={{ minHeight: '100vh' }} className={classNames}>
      <Router>
        <AuthMiddleware
          child={<LoginPage />}
          path={Routes.LOGIN}
          requiredAuth={false}
        />
        <AuthMiddleware
          child={<AuthPage />}
          path={Routes.AUTH}
          requiredAuth={true}
        />
        <AuthMiddleware child={<MePage />} path={Routes.ME} />
        <AuthMiddleware child={<EmployeesPage />} path={Routes.EMPLOYEES} />
        <AuthMiddleware child={<UserPage />} path={Routes.USER} />
        <AuthMiddleware
          child={<ApplicationsPage />}
          path={Routes.APPLICATIONS}
        />
        <AuthMiddleware child={<PayoutsPage />} path={Routes.PAYOUTS} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

const App = observer(() => {
  const { app } = useStore();
  const { data, error } = useQuery(USER);
  const [classNames, setClassNamesState] = useState(
    app.brightness === 'light' ? LIGHT : DARK
  );

  const setClassNames = (brightness: string) => {
    if (brightness === 'light') setClassNamesState(LIGHT);
    else if (brightness === 'dark') setClassNamesState(DARK);
  };

  reaction(
    () => app.brightness,
    (brightness) => {
      setClassNames(brightness);
    }
  );

  if (error) {
    app.setUserIsLogged(false);
    return loadedView(classNames);
  }

  if (data) {
    app.setUserIsLogged(true);
    return loadedView(classNames);
  }

  if (app.networkError) {
    console.log(123);
  }

  return (
    <div style={{ minHeight: '100vh' }} className={classNames}>
      <div
        style={{ height: '100vh' }}
        className="d-flex justify-content-center align-items-center"
      >
        <Spinner />
      </div>
    </div>
  );
});

export default App;
