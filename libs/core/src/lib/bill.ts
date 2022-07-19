import { client, Resolvable } from '@e-tourisme/client';

export class BillResolvable extends Resolvable<Bill> {

  async resolve(): Promise<Bill> {
    throw new Error('Method not implemented.');
  }

}
export class Bill {}

export default Bill;
