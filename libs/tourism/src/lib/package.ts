import { client, Resolvable } from '@e-tourisme/client';
import Entity from './entity';

export class PackageResolvable extends Resolvable<Package> {

  async resolve(): Promise<Package> {
    throw new Error('Method not implemented.');
  }

}

export class Package implements Entity {}

export default Package;
