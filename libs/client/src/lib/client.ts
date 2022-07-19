import * as React from 'react';
import { Resolver } from './resolver';
import { accountResolverEntity } from './resolvers';

import { UserData, Group, Groups } from '@e-tourisme/data';

import { AuthForm, AppSyncModule, Hub } from '@e-tourisme/appsync';

export { UserData, Hub, Group, Groups };

const resolver = new Resolver();
resolver.register('/account', accountResolverEntity);

class Client<SupportedEndpoints extends string> {
  resolver: Resolver;

  constructor(resolver: Resolver) {
    this.resolver = resolver;
  }

  async get(endpoint: SupportedEndpoints, input: any): Promise<any> {
    return await this.resolver.get(endpoint, 'get')(input);
  }

  async post(endpoint: SupportedEndpoints, input: any) {
    return await this.resolver.get(endpoint, 'post')(input);
  }

  async put(endpoint: SupportedEndpoints, input: any) {
    return await this.resolver.get(endpoint, 'put')(input);
  }

  async delete(endpoint: SupportedEndpoints, input: any) {
    return await this.resolver.get(endpoint, 'delete')(input);
  }

  authForm(): () => JSX.Element {
    return AuthForm;
  }

  async getUser(): Promise<UserData> {
    return await AppSyncModule.getUser();
  }

  async setUserGroup(group: Group): Promise<void> {
    await AppSyncModule.setUserGroup(group);
  }

  async signOutUser(): Promise<void> {
    await AppSyncModule.signOutUser();
  }

}

/**
 * Endpoint list :
 * - `/account {get,post,put,delete}`
 */
const client = new Client<'/account'>(resolver);

export { client };

export * from './resolvable';

export type Collection<T> = T[];
