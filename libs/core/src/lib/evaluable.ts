import { client, Collection } from '@e-tourisme/client';
import { Evaluation, EvaluationResolvable } from './evaluation';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Evaluable {

  fetchEvaluations(evaluations: EvaluationResolvable[]): Promise<Collection<Evaluation>>;

}

export default Evaluable;
