import { client, Resolvable } from '@e-tourisme/client';
import { Entry } from '@e-tourisme/core';

export class TravelDiaryEntryResolvable extends Resolvable<TravelDiaryEntry> {

  async resolve(): Promise<TravelDiaryEntry> {
    throw new Error('Method not implemented.');
  }

}

export class TravelDiaryEntry extends Entry {}

export default TravelDiaryEntry;
