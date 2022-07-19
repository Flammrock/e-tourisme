import { client, Resolvable } from '@e-tourisme/client';

export class PostResolvable extends Resolvable<Post> {

  async resolve(): Promise<Post> {
    throw new Error('Method not implemented.');
  }

}

export class Post {}

export default Post;
