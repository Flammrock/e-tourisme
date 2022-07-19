import { client, Hub, UserData, Group, Groups, SnowFlake } from '@e-tourisme/client';
import Account from './account';

export { Groups, Group };



// toto: explain
export { Hub };



export class User {
  //private readonly account: Account;

  readonly id: SnowFlake;
  readonly name: string;
  readonly email: string;
  readonly group: Group;

  private constructor(settings: UserData) {
    //this.account = new Account(); // TODO

    this.id = settings.id; // fetch associated data with this id
    this.name = settings.name;
    this.email = settings.email;
    this.group = settings.group; // current group user (very important)
  }

  static async fetch(): Promise<User> {
    const dataUser = await client.getUser();

    // TODO: Fetch Account from API (AppSync GraphQL)

    return new User(dataUser);
  }

  async setGroup(group: Group): Promise<void> {
    await client.setUserGroup(group);
  }

  async signOut(): Promise<void> {
    await client.signOutUser();
  }
}

export default User;
