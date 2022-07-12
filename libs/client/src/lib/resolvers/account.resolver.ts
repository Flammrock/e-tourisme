import {
  API,
  graphqlOperation,
  getAccount,
  createAccount,
  Account,
} from '@e-tourisme/appsync';

import { ResolverEntity } from "./type";

export const accountResolverEntity: ResolverEntity = {
  get: async (input: any): Promise<any> => {
    return (await API.graphql(
      graphqlOperation(getAccount, { input })
    )) as Account;
  },
  post: async (input: any): Promise<any> => {
    await API.graphql(graphqlOperation(createAccount, { input }));
  },
};
