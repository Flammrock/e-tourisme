import { client, Collection, Resolvable, SnowFlake } from '@e-tourisme/client';
import Evaluable from './evaluable';
import Evaluation, { EvaluationResolvable } from './evaluation';

export interface AccountSettings {
  id: SnowFlake;
  userId: string;
  isVerify: boolean;
  isDisable: boolean;
};

export class AccountResolvable extends Resolvable<Account> {

  async resolve(): Promise<Account> {
    throw new Error('Method not implemented.');
  }

}

export class Account implements Evaluable {

  readonly _id: SnowFlake;
  readonly _userId: string;
  readonly _isVerify: boolean;
  readonly _isDisable: boolean;

  private constructor(settings: AccountSettings) {
    this._id = settings.id;
    this._userId = settings.userId;
    this._isVerify = settings.isVerify;
    this._isDisable = settings.isDisable;
  }

  async fetchEvaluations(evaluations: EvaluationResolvable[]): Promise<Collection<Evaluation>> {
    throw new Error('Method not implemented.');
  }

  async verify(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async unVerify(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async isVerify(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async enableGeoLocation(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async disableGeoLocation(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }

}

export default Account;
