import { ResolverMap, RequestType, ResolverFunction, ResolverEntity  } from "./resolvers/type";

export class Resolver {

    data: ResolverMap;

    constructor() {
        this.data = {};
    }

    exists(endpoint: string): boolean {
        return typeof this.data[endpoint] !== 'undefined';
    }

    get(endpoint: string, method: RequestType): ResolverFunction {
        if (!this.exists(endpoint)) throw new Error('Entity Resolver `'+endpoint+'` doesn\'t exists');
        const fn = this.data[endpoint][method];
        if (typeof fn === 'undefined') throw new Error('Entity Resolver Method `'+method+'` doesn\'t defined');
        return fn;
    }

    register(endpoint: string, entity: ResolverEntity): void {
        this.data[endpoint] = entity;
    }

    unregister(endpoint: string): void {
        if (!this.exists(endpoint)) throw new Error('Entity Resolver `'+endpoint+'` doesn\'t exists');
        delete this.data[endpoint];
    }

}