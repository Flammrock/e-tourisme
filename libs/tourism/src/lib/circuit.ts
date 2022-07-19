import { client, Resolvable } from '@e-tourisme/client';
import { History } from '@e-tourisme/core';
import CircuitEntry from './circuit-entry';

export class CircuitResolvable extends Resolvable<Circuit> {

  async resolve(): Promise<Circuit> {
    throw new Error('Method not implemented.');
  }

}

export class Circuit extends History {}

export default Circuit;
