import { client, Resolvable } from '@e-tourisme/client';
import Entity from './entity';

export class ActivityResolvable extends Resolvable<Activity> {

  async resolve(): Promise<Activity> {
    throw new Error('Method not implemented.');
  }

}

export class Activity implements Entity {}

export default Activity;
