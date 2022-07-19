import { client, Collection, Resolvable, SnowFlake } from '@e-tourisme/client';
import { Account, AccountResolvable } from '@e-tourisme/core';
import Entity from './entity';
import { PlaceResolvable } from './place';

export interface CitySettings {
  id: SnowFlake;
  name: string;
  description: string;
  places: Collection<PlaceResolvable>;
  owner: AccountResolvable;
  partner: AccountResolvable;
};

export class CityResolvable extends Resolvable<City> {

  async resolve(): Promise<City> {
    throw new Error('Method not implemented.');
  }

}

export class City implements Entity {

  readonly id: SnowFlake;
  readonly name: string;
  readonly description: string;
  readonly places: Collection<PlaceResolvable>;
  readonly owner: AccountResolvable;
  readonly partner: AccountResolvable;

  private constructor(settings: CitySettings) {
    this.id = settings.id;
    this.name = settings.name;
    this.description = settings.description;
    this.places = settings.places;
    this.owner = settings.owner;
    this.partner = settings.partner;
  }

  /**
   * 
   * @param settings 
   */
  static async create(settings: CitySettings): Promise<City> {
    
    // client.post('/city',settings);
    // return new City(settings);

    throw new Error('Method not implemented.');
  }

  static async fetch(/*search settings*/): Promise<Collection<City>> {
    
    // const rawCity = client.get('/city',settings);
    
    throw new Error('Method not implemented.');
  }

  async delete(): Promise<void> {

    // client.delete('/city',settings);

    throw new Error('Method not implemented.');
  }

}

export default City;
