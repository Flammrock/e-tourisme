import { SnowFlake, ResolvableEntity } from "@e-tourisme/data";

export { SnowFlake, ResolvableEntity };

export abstract class Resolvable<T> {

  data: ResolvableEntity | SnowFlake;

  constructor(data: ResolvableEntity | SnowFlake) {
    this.data = data;
  }

  abstract resolve(): Promise<T>;

}