import { client, Resolvable } from '@e-tourisme/client';

export class BlogResolvable extends Resolvable<Blog> {

  async resolve(): Promise<Blog> {
    throw new Error('Method not implemented.');
  }

}

export class Blog {}

export default Blog;
