import { client, Resolvable } from '@e-tourisme/client';

export class ReactionResolvable extends Resolvable<Reaction> {

  async resolve(): Promise<Reaction> {
    throw new Error('Method not implemented.');
  }

}

export class Reaction {}

export default Reaction;
