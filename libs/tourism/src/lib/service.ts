import { client, Resolvable } from '@e-tourisme/client';

export class ServiceResolvable extends Resolvable<Service> {

  async resolve(): Promise<Service> {
    throw new Error('Method not implemented.');
  }

}

export class Service {}

export default Service;
