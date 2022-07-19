import { client } from '@e-tourisme/client';

export function core(): string {
  return 'core';
}

export * from './user';
export * from './account';
export * from './reservation';
export * from './bill';
export * from './evaluation';
export * from './reaction';
export * from './history';
export * from './entry';
export * from './template';

export const AuthForm = client.authForm();


// TODO: Main Core App