import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

export * from './graphql/mutations';
export * from './graphql/queries';
export * from './graphql/subscriptions';
export * from './API';

export { API, graphqlOperation } from 'aws-amplify';

export class AppSyncModule {}