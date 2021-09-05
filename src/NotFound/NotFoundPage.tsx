import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';
import { Emoji } from '../components/Emoji';

interface Props extends RouteComponentProps {}
export const NotFoundPage: FunctionComponent<Props> = observer(() => {
  return (
    <div
      style={{ height: '100vh' }}
      className="d-flex flex-column justify-content-center align-items-center container"
    >
      <Emoji />
      <h1>Whooooops!!</h1>
      <div>
        Запрашиваемой страницы не существует. Возможно она была перемещена, но
        это не точно
      </div>
    </div>
  );
});
