import React, { FunctionComponent } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/Store';
import { Routes } from '../utils/Routes';

interface Props extends RouteComponentProps {
  child: React.ReactElement;
  requiredAuth?: boolean;
}
export const AuthMiddleware: FunctionComponent<Props> = observer(
  ({ child, requiredAuth = true }) => {
    const { app } = useStore();
    if (requiredAuth && !app.userIsLogged)
      return <Redirect to={Routes.LOGIN} noThrow />;
    else if (!requiredAuth && app.userIsLogged)
      return <Redirect to={Routes.ME} noThrow />;
    return <div>{child}</div>;
  }
);
