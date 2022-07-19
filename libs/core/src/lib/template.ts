import { client, Resolvable } from '@e-tourisme/client';

export class TemplateResolvable extends Resolvable<Template> {

  async resolve(): Promise<Template> {
    throw new Error('Method not implemented.');
  }

}
export class Template {}

export default Template;
