import { client, Resolvable } from '@e-tourisme/client';
import Bill from './bill';

export class ReservationResolvable extends Resolvable<Reservation> {

  async resolve(): Promise<Reservation> {
    throw new Error('Method not implemented.');
  }

}

export class Reservation {}

export default Reservation;
