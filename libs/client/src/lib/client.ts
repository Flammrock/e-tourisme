import { Resolver } from './resolver';
import { accountResolverEntity } from './resolvers';

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
}

/**
 * Endpoint list :
 * - `/account {get,post,put,delete}`
 */
const client = new Client<'/account'>(resolver);

export { client };
