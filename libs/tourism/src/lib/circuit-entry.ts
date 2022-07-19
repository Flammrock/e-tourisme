import { client, Resolvable } from '@e-tourisme/client';
import { Entry } from '@e-tourisme/core';

export class CircuitEntryResolvable extends Resolvable<CircuitEntry> {

  async resolve(): Promise<CircuitEntry> {
    throw new Error('Method not implemented.');
  }

}

export class CircuitEntry extends Entry {}

export default CircuitEntry;
