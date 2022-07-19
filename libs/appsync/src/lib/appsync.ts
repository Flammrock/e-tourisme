import { Amplify, Auth } from 'aws-amplify';
import config from './aws-exports';
import { UserData, Group } from '@e-tourisme/data';

const urlsIn = config.oauth.redirectSignIn.split(',');
const urlsOut = config.oauth.redirectSignOut.split(',');
const oauth = {
  domain: config.oauth.domain,
  scope: config.oauth.scope,
  redirectSignIn: config.oauth.redirectSignIn,
  redirectSignOut: config.oauth.redirectSignOut,
  responseType: config.oauth.responseType,
};
const hasLocalhost = (hostname: string) =>
  Boolean(
    hostname.match(/localhost/) ||
      hostname.match(/127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/)
  );
const hasHostname = (hostname: string) =>
  Boolean(hostname.includes(window.location.hostname));
const isLocalhost = hasLocalhost(window.location.hostname);
if (isLocalhost) {
  urlsIn.forEach((e: string) => {
    if (hasLocalhost(e)) {
      oauth.redirectSignIn = e;
    }
  });
  urlsOut.forEach((e: string) => {
    if (hasLocalhost(e)) {
      oauth.redirectSignOut = e;
    }
  });
} else {
  urlsIn.forEach((e: string) => {
    if (hasHostname(e)) {
      oauth.redirectSignIn = e;
    }
  });
  urlsOut.forEach((e: string) => {
    if (hasHostname(e)) {
      oauth.redirectSignOut = e;
    }
  });
}
const configUpdate = config;
configUpdate.oauth = oauth;
const ListSocialProviders = (
  configUpdate.aws_cognito_social_providers as string[]
).map((provider: string) => provider.toLowerCase());
Amplify.configure(configUpdate);

export const redirectSignIn = configUpdate.oauth.redirectSignIn;
export const redirectSignOut = configUpdate.oauth.redirectSignOut;

export * from './graphql/mutations';
export * from './graphql/queries';
export * from './graphql/subscriptions';
export * from './API';

export { API, graphqlOperation, Hub } from 'aws-amplify';

export { ListSocialProviders };

/**
 * @exports
 *
 */
export const CustomFieldGroup = 'custom:group';



export { AuthForm } from './form';

export class AppSyncModule {

  static async getUser(): Promise<UserData> {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const user: UserData = {
      id: cognitoUser.attributes.sub,
      name: cognitoUser.attributes.name,
      email: cognitoUser.attributes.email,
      group: cognitoUser.attributes[CustomFieldGroup],
    };
    return user;
  }

  static async setUserGroup(group: Group): Promise<void> {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(cognitoUser, {
      [CustomFieldGroup]: group,
    });
  }


  static async signOutUser(): Promise<void> {
    await Auth.signOut();
  }

}
