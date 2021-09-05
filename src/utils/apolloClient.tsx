import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { StoreInstance } from '../store/Store';

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_HOST}/graphql`,
});

const appCache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('jwt');
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }));

  if (operation.variables) {
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }

  return forward(operation);
});

function omitTypename(key: string, value: any) {
  return key === '__typename' ? undefined : value;
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    StoreInstance.app.setNetworkError(true);
  }

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === 'Unauthorized') {
        console.log('Unauthorized');
      }
    });
  }
});

export const client = new ApolloClient({
  link: from([authMiddleware, errorLink, httpLink]),
  cache: appCache,
});
