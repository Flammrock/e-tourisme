import { client, Resolvable } from '@e-tourisme/client';
import Entity from './entity';

export class PlaceResolvable extends Resolvable<Place> {

  async resolve(): Promise<Place> {
    throw new Error('Method not implemented.');
  }

}

export class Place implements Entity {}

export default Place;
