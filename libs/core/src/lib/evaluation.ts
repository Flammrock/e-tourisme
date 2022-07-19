import { client, Resolvable } from '@e-tourisme/client';
import Reaction from './reaction';

export class EvaluationResolvable extends Resolvable<Evaluation> {

  async resolve(): Promise<Evaluation> {
    throw new Error('Method not implemented.');
  }

}

export class Evaluation {}

export default Evaluation;
