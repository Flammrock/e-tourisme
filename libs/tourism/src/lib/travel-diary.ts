import { client, Resolvable } from '@e-tourisme/client';
import { History } from '@e-tourisme/core';
import TravelDiaryEntry from './travel-diary-entry';

export class TravelDiaryResolvable extends Resolvable<TravelDiary> {

  async resolve(): Promise<TravelDiary> {
    throw new Error('Method not implemented.');
  }

}

export class TravelDiary extends History {}

export default TravelDiary;
